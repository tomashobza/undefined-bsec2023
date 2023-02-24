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