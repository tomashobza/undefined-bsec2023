<script lang="ts">
	import JidloInput from '$components/JidloInput.svelte';
  import RestauraceInput from '$components/RestauraceInput.svelte';

	let chosenRestaurace: null | string;
	let chosenJidlo: null | string;

</script>

		<RestauraceInput bind:chosenRestaurace={chosenRestaurace} />

		<JidloInput chosenRestaurace={chosenRestaurace} {chosenJidlo} />