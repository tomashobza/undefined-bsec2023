<script lang="ts">
	import JidloInput from '$components/JidloInput.svelte';
  import RestauraceInput from '$components/RestauraceInput.svelte';
  import type { Restaurant } from '$ts/interfaces';

	let chosenRestaurace: null | Restaurant = null;
	let chosenJidlo: null | string;

</script>

		<RestauraceInput bind:chosenRestaurace={chosenRestaurace} />

		<JidloInput chosenRestaurace={"chosenRestaurace"} {chosenJidlo} />