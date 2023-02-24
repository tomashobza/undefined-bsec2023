<script lang="ts">
	import JidloInput from '$components/JidloInput.svelte';
  import RestauraceInput from '$components/RestauraceInput.svelte';
  import type { MealType, Restaurant } from '$ts/interfaces';

	let chosenRestaurace: null | Restaurant;
	let chosenJidlo: null | MealType;

	$: console.log(chosenRestaurace, chosenJidlo);
</script>

<RestauraceInput on:choose={(e) => chosenRestaurace = e.detail} />
<JidloInput chosenRestaurace={chosenRestaurace} on:choose={(e) => chosenJidlo = e.detail} />
<div class="w-full my-4">
	<div class="text-gray-400 mb-1">Současná hladina glukózy</div>
	<div class="cursor-pointer w-full bordered-thing flex flex-row items-center gap-2 py-4 px-3 font-semibold">
		<input type="number" class="flex-grow">
		<div class="text-gray-400">mmol/L</div>
			</div>
</div>
<div class="flex-grow flex flex-col items-center justify-center">
	<div class="text-[6rem] leading-[6rem] font-semibold">--</div>
	<div class="text-xl text-gray-400 font-thin">jednotek</div>
</div>
<div class="flex flex-row w-full justify-evenly mb-2 gap-2">
	<button class="bottom-btn">Zobrazit data</button>
	<button class="bottom-btn">Uložit</button>
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