<script lang="ts">
	import JidloInput from '$components/JidloInput.svelte';
  import RestauraceInput from '$components/RestauraceInput.svelte';
  import Plus from '$icons/Plus.svelte';
  import Warning from '$icons/Warning.svelte';
  import X from '$icons/X.svelte';
  import { calculateBolus, getMealRecordsOfType, getSortedMealRecordsByDate, saveMealRecord } from '$ts/functions';
  import type { MealRecord, MealType, Restaurant } from '$ts/interfaces';
  import { fly, scale, slide } from 'svelte/transition';
	import dayjs from 'dayjs';
	import Toastify from 'toastify-js'
    import { goto } from '$app/navigation';

	let chosenRestaurace: null | Restaurant;
	let chosenJidlo: null | MealType;
	let init: number;

	let drawerOpen = false;
	let maloDat = false;
	let saved = false;
	let glykogenInput;
	let davkaInput;

	let doporucenaDavka: null | number = null;

	const save = () => {
		console.log('4')
		if (chosenRestaurace && chosenJidlo && init && doporucenaDavka && !saved) {
			saveMealRecord(chosenJidlo.id, init, doporucenaDavka, dayjs());
			Toastify({
				text: "Záznam uložen!",
				duration: 3000,
				close: true,
				gravity: "top", 
				position: "right",
				style: {
					background: "rgb(74, 222, 128)",
				},
			}).showToast();

			saved = true;

			goto('/stats')
		}
	}

	let groups: {dateString: string, records: MealRecord[]}[] = [];
	let records;

	const openDrawer = () => {
		console.log('3')
		if (chosenRestaurace && chosenJidlo) {
			records = getMealRecordsOfType(chosenJidlo.id);

      for (const record of records) {
        const datetime = dayjs(record.dateTime * 1000);
        const dateString = datetime.format('DD. MM. YYYY')

        const group = groups.find(g => g.dateString === dateString);

        if (group) {
          group.records.push(record);
        } else {
          groups.push({dateString, records: [record]})
        }
      }

      groups = groups;
			groups = groups.sort((a, b) => -1);

			console.log(groups);

			drawerOpen=true;
		}
	}

	$: if (!chosenRestaurace || !chosenJidlo || !init) {
		console.log('2')
		doporucenaDavka = null;
		maloDat = false;
	}

	$: if (chosenRestaurace && chosenJidlo && init && !doporucenaDavka) {
		console.log('1')
		saved = false;
		const { a, b, avgJVB } = calculateBolus(chosenJidlo.id);
		if (a == b && b == avgJVB && avgJVB == 0) {
				maloDat = true;
				doporucenaDavka = 8;
		} else {
			if (a != 0 && b != 0) {
				doporucenaDavka = Math.max(Math.floor(b*(6-init)+a), 0);
				maloDat = false;
			} else {
				maloDat = true;
				doporucenaDavka = Math.max(Math.round(avgJVB-6+init), 0);
			}
		}
	}
</script>

<div class="flex-grow flex flex-col items-stretch relative">
	<RestauraceInput on:choose={(e) => chosenRestaurace = e.detail} />

	<JidloInput chosenRestaurace={chosenRestaurace} on:choose={(e) => chosenJidlo = e.detail} />
	<div class="w-full my-4">
		<div class="mb-1 font-bold">Současná hladina glukózy</div>
		<div class="cursor-pointer w-full bordered-thing flex flex-row items-center gap-2 py-4 px-3" on:click={() => glykogenInput.focus()}>
			<input type="number" min='0' class="flex-grow" bind:value={init} bind:this={glykogenInput}>
			<div class="text-gray-400">mmol/L</div>
		</div>
	</div>
	{#if maloDat}
		<div transition:slide class="bg-red-100 self-center p-2 rounded-md flex flex-row items-center gap-2">
			<div class="w-6 text-red-500">
				<Warning />
			</div>
			<div class="text-xs text-red-500">Pozor, vypočteno s málo daty. <br>Přidejte více záznamů pro přesnější doporučení.</div>
		</div>
	{/if}
	<div class="flex-grow flex flex-col items-center justify-center">
		{#if doporucenaDavka !== null}
			<input type="number" class="text-[6rem] leading-[6rem] font-semibold text-black text-center max-w-full" bind:this={davkaInput} bind:value={doporucenaDavka} on:click={() => davkaInput.focus()}>
		{:else}
			<input type="text" class="text-[6rem] leading-[6rem] font-semibold text-black text-center max-w-full" disabled value={'--'}>
		{/if}
		<div class="text-xl text-gray-400 font-thin">jednotek</div>
	</div>
	<div class="flex flex-row w-full justify-evenly mb-6 gap-2">
		<button class="bottom-btn" on:click={openDrawer}>Zobrazit data</button>
		<button class="bottom-btn" on:click={save}>Uložit</button>
	</div>

	{#if drawerOpen}
		<div transition:fly={{y: 800, duration:500, opacity:1}} class="absolute w-full bg-white bottom-0 z-[99] rounded-t-xl shadow-xl border border-b-0 h-[90%] p-4 pb-0 flex flex-col">
			<button class="self-end w-5 cursor-pointer" on:click={() => drawerOpen=false}><X /></button>
			<div class="flex-grow overflow-y-auto flex flex-col items-stretch">
				{#each groups || [] as group}
					<div class="font-bold">{group.dateString}</div>
					{#each group.records || [] as rec}
						<div class="border rounded-lg flex flex-col items-stretch my-1 py-2 px-3 mb-6">
							<div class="flex flex-row items-center">
								<div class="flex-grow">Glukóza před:</div>
								<div>
									<span>{rec.init}</span>
									<span class="text-gray-500">mmol/L</span>
								</div>
							</div>
							<div class="flex flex-row items-center">
								<div class="flex-grow">Glukóza 2 hod. po:</div>
								<div>
									<span>{rec.result}</span>
									<span class="text-gray-500">mmol/L</span>
								</div>
							</div>
							<div class="flex flex-row items-center">
								<div class="flex-grow">Bolus:</div>
								<div>
									<span>{rec.dose}</span>
									<span class="text-gray-500">jednotek</span>
								</div>
							</div>
						</div>
					{/each}
				{/each}
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
	.bordered-thing {
		@apply border rounded-lg bg-white;
	}

	.bottom-btn {
		@apply px-3 py-2;
		@apply rounded-full;
		@apply border;
		@apply w-[8rem]
	}

	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type=number] {
		-moz-appearance: textfield;
	}
</style>