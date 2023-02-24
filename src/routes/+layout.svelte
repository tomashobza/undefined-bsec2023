<script lang="ts">
	import Food from '$icons/Food.svelte';
	import Graph from '$icons/Graph.svelte';
	import Home from '$icons/Home.svelte';
	import '../app.css';
	// import '$ts/firebase';
	// import '$ts/auth'
	// import '$ts/data';
	// import '$ts/restaurants'

</script>

<svelte:head>
	<title></title>
	<meta name="description" content="" />
</svelte:head>

<div class="sm:p-4 transition-all bg-slate-100 w-full h-full flex flex-col items-center justify-center text-sm">
	<div class="mobile">
		<div class="w-full grid grid-cols-3 place-items-center pt-2 bg-[#35B9F1] h-10">
			<button class="w-6"><Home></Home></button>
			<button class="w-4"><Food></Food></button>
			<button class="w-6"><Graph></Graph></button>
			<div class="w-1/3 bg-white rounded-lg h-1 justify-end mt-[0.33rem]"></div>
		</div>

		<div class="p-4 overflow-y-auto flex-grow flex flex-col items-stretch">
			<slot />
		</div>

	</div>
</div>

<style lang="postcss">	
	.mobile {
		@apply bg-white;
		@apply w-full sm:max-w-[28rem] h-full;
		@apply sm:rounded-xl;
		@apply overflow-hidden;
		@apply shadow-lg;
		@apply transition-all;
		@apply flex flex-col items-stretch;
	}
</style>