<script lang="ts">
	import JidloInput from '$components/JidloInput.svelte';
  import RestauraceInput from '$components/RestauraceInput.svelte';
  import Plus from '$icons/Plus.svelte';
  import X from '$icons/X.svelte';
  import { calculateBolus } from '$ts/functions';
  import type { MealType, Restaurant } from '$ts/interfaces';
  import { fly } from 'svelte/transition';

	let chosenRestaurace: null | Restaurant;
	let chosenJidlo: null | MealType;
	let init: number;

	let drawerOpen = false;

	let doporucenaDavka: null | number = null;

	$: if (chosenRestaurace && chosenJidlo && init) {
		const { a, b, avgJVB } = calculateBolus(chosenJidlo.id);
		if (a == b && b == avgJVB && avgJVB == 0) {
			// TODO: nejde vypocitat, vymyslet
		} else {
			
		}
	}

	$: console.log(chosenRestaurace, chosenJidlo, init);
</script>

<div class="flex-grow flex flex-col items-stretch relative">
	<RestauraceInput on:choose={(e) => chosenRestaurace = e.detail} />
	<JidloInput chosenRestaurace={chosenRestaurace} on:choose={(e) => chosenJidlo = e.detail} />
	<div class="w-full my-4">
		<div class="mb-1 font-bold">Současná hladina glukózy</div>
		<div class="cursor-pointer w-full bordered-thing flex flex-row items-center gap-2 py-4 px-3 font-semibold">
			<input type="number" class="flex-grow" bind:value={init}>
			<div class="text-gray-400">mmol/L</div>
				</div>
	</div>
	<div class="flex-grow flex flex-col items-center justify-center">
		<div class="text-[6rem] leading-[6rem] font-semibold">{doporucenaDavka ?? '--'}</div>
		<div class="text-xl text-gray-400 font-thin">jednotek</div>
	</div>
	<div class="flex flex-row w-full justify-evenly mb-6 gap-2">
		<button class="bottom-btn" on:click={() => drawerOpen=true}>Zobrazit data</button>
		<button class="bottom-btn">Uložit</button>
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