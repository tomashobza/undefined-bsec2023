<script lang='ts'>
  import Food from '$icons/Food.svelte';
	import Graph from '$icons/Graph.svelte';
	import HomeSelected from '$icons/HomeSelected.svelte';

  import { page } from '$app/stores';
  import Home from '$icons/Home.svelte';
  import FoodSelected from '$icons/FoodSelected.svelte';
  import GraphSelected from '$icons/GraphSelected.svelte';
  import { goto } from '$app/navigation';

  let width;
  let option = 1;

  $: {
    if ($page.url.pathname === '/') {
      option = 1;
    } else if ($page.url.pathname.includes('filters')) {
      option = 0;
    } else if ($page.url.pathname.includes('stats')) {
      option = 2;
    } else {
      option = 1;
    }
  }

</script>

<div class="relative">
  <div class="w-full flex items-center justify-evenly bg-[#35B9F1] h-14" bind:offsetWidth={width}>
    <button class="min-w-[2rem] flex justify-center" on:click={() => goto('/filters')}>
      <div class="w-5">
        {#if option === 0}
          <FoodSelected />
        {:else}
          <Food />
        {/if}
      </div>
    </button>
    <button class="w-8 grid place-items-center" on:click={() => goto('/')}>
      {#if option === 1}
        <HomeSelected />
      {:else}
        <Home />
      {/if}
    </button>
    <button class="w-8" on:click={() => goto('/stats')}>
        {#if option === 2}
          <GraphSelected />
        {:else}
          <Graph />
        {/if}
    </button>
  </div>
  <div class="w-12 bg-white rounded-lg h-2 absolute -bottom-[4px] transition-all ease-in-out left-[calc(50%-24px)]" style:left={((width - 72)/4) + option*((width - 72)/4 + 24) - 12 + 'px'}></div>
</div>