<script lang="ts">
   import Dropdown from '$lib/components/Dropdowns/index.svelte'
  import Chevron from '$lib/icons/Chevron.svelte';
  import Plus from '$lib/icons/Plus.svelte';
  import { restaurants } from "$ts/restaurants";


  // RESTAURACE
	let mistoOpen = false;

let restaurace = Object.keys(restaurants);
let filteredRestaurace = restaurace;
export let chosenRestaurace: null | string = null;
const chooseRestaurace = (name: string) => {
  chosenRestaurace = name;
}
const addRestaurant = () => {
  restaurace.push(mistoSearch);
  filteredRestaurace = restaurace.filter(r => r.includes(mistoSearch));
  chooseRestaurace(mistoSearch);
}
let mistoInput: HTMLInputElement;
let mistoSearch: string = "";

$: filteredRestaurace = restaurace.filter(r => r.includes(mistoSearch));

$: if (mistoOpen) {
  mistoInput?.focus();
}
</script>

<!-- Misto -->
<div class="w-full my-4">
  <div class="text-gray-400 mb-1">Místo</div>
  <Dropdown bind:isDropdownOpen={mistoOpen}>
    <div slot="button" class="cursor-pointer w-full bordered-thing flex flex-row items-center gap-2 py-2 px-3">
      {#if mistoOpen}
        <input type="text" placeholder="Název..." bind:value={mistoSearch} bind:this={mistoInput} class="flex-grow">
      {:else}
        {#if chosenRestaurace}
          <div class="flex-grow">{chosenRestaurace}</div>
        {:else}
          <div class="flex-grow text-gray-300">Vyberte místo</div>
        {/if}
      {/if}
      <div class="w-4 transition-all duration-400" class:rotate-180={mistoOpen} on:click={() => mistoOpen = !mistoOpen}><Chevron /></div>
    </div>
    <div slot="dropdown" class="bordered-thing mt-2 flex flex-col max-h-[20rem] overflow-y-auto">
      <!-- {#if filteredRestaurace.length > 0} -->
        {#each filteredRestaurace as restAuRace}
          <div class="restaurace" on:click={() => chooseRestaurace(restAuRace)}>
            {restAuRace}
          </div>
        {/each}
      <!-- {:else}
        <div class="cursor-pointer flex flex-row items-center gap-2 px-2 py-3 bg-blue-200" on:click={addRestaurant}>
          <div class="w-5"><Plus/></div>
          <div>Přidat restauraci</div>
        </div>
      {/if} -->
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