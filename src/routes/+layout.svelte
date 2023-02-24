<script lang="ts">
	import TopBarMenu from '$components/TopBarMenu.svelte';
	import '../app.css';
	import "toastify-js/src/toastify.css"
	// import '$ts/firebase';
	// import '$ts/auth'
	// import '$ts/data';
	// import '$ts/restaurants'

</script>

<svelte:head>
	<title>undefined</title>
	<meta name="description" content="" />
</svelte:head>

<div class="sm:p-4 transition-all bg-slate-100 w-full h-full flex flex-col items-center justify-center text-sm">
	<div class="mobile">

		<div class="px-4 pb-0 overflow-y-auto flex-grow flex flex-col items-stretch">
			<slot />
		</div>

		<TopBarMenu />

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