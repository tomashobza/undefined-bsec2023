<script lang="ts">
   import Dropdown from '$lib/components/Dropdowns/index.svelte'
  import Chevron from '$lib/icons/Chevron.svelte';
  import Plus from '$lib/icons/Plus.svelte';
  import { getRestaurants, saveRestaurant, showError } from '$ts/functions';
  import type { Restaurant } from '$ts/interfaces';
  import { restaurants } from "$ts/restaurants";
  import { onMount } from 'svelte';

  import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();


  // RESTAURACE
	let mistoOpen = false;

  let restaurace: Restaurant[] = [];
  let filteredRestaurace = restaurace;
  let chosenRestaurace: null | Restaurant = null;
  const chooseRestaurace = (res: Restaurant) => {
    chosenRestaurace = res;
    dispatch('choose', chosenRestaurace);
  }
  const addRestaurant = () => {
    function completeSaveRestaurant(lat: number, long: number) {
      const new_rest = saveRestaurant(mistoSearch, lat, long);
      filteredRestaurace = restaurace.filter(r => r.name.includes(mistoSearch));
      chooseRestaurace(new_rest);
    }

    navigator.geolocation.getCurrentPosition((v) => {
      completeSaveRestaurant(v.coords.latitude, v.coords.longitude)
    }, () => {
      showError("Nepodařilo se načíst lokaci.")
      completeSaveRestaurant(0, 0)
    })
  }
  let mistoInput: HTMLInputElement;
  let mistoSearch: string = "";

  $: filteredRestaurace = restaurace.filter(r => r.name.includes(mistoSearch));

  $: if (mistoOpen) {
    mistoInput?.focus();
  }

  onMount(() => {
    restaurace = getRestaurants();
  })
</script>

<!-- Misto -->
<div class="w-full my-4">
  <div class="mb-1  font-semibold">Místo</div>
  <Dropdown bind:isDropdownOpen={mistoOpen}>
    <div slot="button" class="cursor-pointer w-full bordered-thing flex flex-row items-center gap-2 py-4 px-3">
      {#if mistoOpen}
        <input type="text" placeholder="Název..." bind:value={mistoSearch} bind:this={mistoInput} class="flex-grow">
      {:else}
        {#if chosenRestaurace}
          <div class="flex-grow">{chosenRestaurace.name}</div>
        {:else}
          <div class="flex-grow text-black/40">Vyberte místo</div>
        {/if}
      {/if}
      <div class="w-4 transition-all duration-400" class:rotate-180={mistoOpen} on:click={() => mistoOpen = !mistoOpen}><Chevron /></div>
    </div>
    <div slot="dropdown" class="bordered-thing mt-2 flex flex-col max-h-[20rem] overflow-y-auto">
      {#if filteredRestaurace.length > 0}
        {#each filteredRestaurace as restAuRace}
          <div class="restaurace" on:click={() => chooseRestaurace(restAuRace)}>
            {restAuRace.name}
          </div>
        {/each}
      {:else}
        <div class="cursor-pointer flex flex-row items-center gap-2 px-2 py-3 bg-blue-200" on:click={addRestaurant}>
          <div class="w-5"><Plus/></div>
          <div>Přidat restauraci</div>
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