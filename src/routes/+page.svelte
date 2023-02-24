<script lang="ts">
	import JidloInput from '$components/JidloInput.svelte';
  import RestauraceInput from '$components/RestauraceInput.svelte';
  import Plus from '$icons/Plus.svelte';
  import Warning from '$icons/Warning.svelte';
  import X from '$icons/X.svelte';
  import { calculateBolus, saveMealRecord } from '$ts/functions';
  import type { MealType, Restaurant } from '$ts/interfaces';
  import { fly, scale, slide } from 'svelte/transition';
	import dayjs from 'dayjs';
	import Toastify from 'toastify-js'

	let chosenRestaurace: null | Restaurant;
	let chosenJidlo: null | MealType;
	let init: number;

	let drawerOpen = false;
	let maloDat = false;
	let saved = false;

	let doporucenaDavka: null | number = null;

	const save = () => {
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
		}
	}

	$: if (!chosenRestaurace || !chosenJidlo || !init) {
		doporucenaDavka = null;
		maloDat = false;
	}

	$: if (chosenRestaurace && chosenJidlo && init) {
		saved = false;
		const { a, b, avgJVB } = calculateBolus(chosenJidlo.id);
		if (a == b && b == avgJVB && avgJVB == 0) {
			// TODO: nejde vypocitat, vymyslet
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
		<div class="text-gray-400 mb-1">Současná hladina glukózy</div>
		<div class="cursor-pointer w-full bordered-thing flex flex-row items-center gap-2 py-4 px-3 font-semibold">
			<input type="number" class="flex-grow" bind:value={init}>
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
		<div class="text-[6rem] leading-[6rem] font-semibold">{doporucenaDavka ?? '--'}</div>
		<div class="text-xl text-gray-400 font-thin">jednotek</div>
	</div>
	<div class="flex flex-row w-full justify-evenly mb-6 gap-2">
		<button class="bottom-btn" on:click={() => drawerOpen=true}>Zobrazit data</button>
		<button class="bottom-btn" on:click={save}>Uložit</button>
	</div>

	{#if drawerOpen}
		<div transition:fly={{y: 800, duration:500, opacity:1}} class="absolute w-full bg-white bottom-0 z-[99] rounded-t-xl shadow-xl border border-b-0 h-[90%] p-4 flex flex-col">
			<button class="self-end w-5 cursor-pointer" on:click={() => drawerOpen=false}><X /></button>
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
</style>