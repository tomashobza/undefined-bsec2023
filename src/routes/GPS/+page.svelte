<script lang="ts">
  // import { history } from "$ts/data";
const successCallback = (position) => {
  console.log(position);
};

const errorCallback = (error) => {
  console.log(error);
};
function GPS(){
	navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}
</script>

<svelte:head>
	<title></title>
	<meta name="description" content="" />
</svelte:head>

<div class="w-full h-screen flex items-center justify-center"><button class="p-3 rounded-lg bg-stone-400" on:click={GPS}>GPS(v konzoli)</button></div>

<style lang="postcss">	
</style>