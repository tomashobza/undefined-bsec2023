<script lang="ts">
  import Dropdown from '$lib/components/Dropdowns/index.svelte'
  import Chevron from '$lib/icons/Chevron.svelte';
  import Plus from '$lib/icons/Plus.svelte';
  import { restaurants } from "$ts/restaurants";


  export let chosenRestaurace: null | string;

  // JIDLA
	let jidloOpen = false;
	let jidloInput: HTMLInputElement;
	let jidloSearch: string = "";

	let jidla: string[] = [];
	$: if (chosenRestaurace) {
    jidla = Object.keys(restaurants[chosenRestaurace]);
    chosenJidlo = null;
    jidloSearch = "";
  };
	let filteredJidla = jidla;
	export let chosenJidlo: null | string = null;
	const chooseJidlo = (name: string) => {
		chosenJidlo = name;
	}

	const addJidlo = () => {
		jidla.push(jidloSearch);
		filteredJidla = jidla.filter(r => r.includes(jidloSearch));
		chooseJidlo(jidloSearch);
	}

	$: filteredJidla = jidla.filter(r => r.includes(jidloSearch));

	$: if (jidloOpen) {
		jidloInput?.focus();
	}
</script>

<!-- Jidlo -->
<div class="w-full my-4">
  <div class="text-gray-400 mb-1">Jídlo</div>
  <Dropdown bind:isDropdownOpen={jidloOpen}>
    <div slot="button" class="cursor-pointer w-full bordered-thing flex flex-row items-center gap-2 py-2 px-3">
      {#if jidloOpen}
        <input type="text" placeholder="Název..." bind:value={jidloSearch} bind:this={jidloInput} class="flex-grow">
      {:else}
        {#if chosenJidlo}
          <div class="flex-grow">{chosenJidlo}</div>
        {:else}
          <div class="flex-grow text-gray-300">Vyberte místo</div>
        {/if}
      {/if}
      <div class="w-4 transition-all duration-400" class:rotate-180={jidloOpen} on:click={() => jidloOpen = !jidloOpen}><Chevron /></div>
    </div>
    <div slot="dropdown" class="bordered-thing mt-2 flex flex-col max-h-[20rem] overflow-y-auto">
      {#if filteredJidla.length > 0}
        {#each filteredJidla as jidlo}
          <div class="restaurace" on:click={() => chooseJidlo(jidlo)}>
            {jidlo}
          </div>
        {/each}
      {:else}
        <div class="cursor-pointer flex flex-row items-center gap-2 px-2 py-3 bg-blue-200" on:click={addJidlo}>
          <div class="w-5"><Plus/></div>
          <div>Přidat jídlo</div>
        </div>
      {/if}
    </div>
  </Dropdown>
</div>


<style lang="postcss">	
	.bordered-thing {
		@apply border rounded-lg bg-white;
	}

	.restaurace {
		@apply w-full px-2 py-3 cursor-pointer;
	}

	.restaurace:not(:last-child) {
		@apply border-b;
	}
</style>