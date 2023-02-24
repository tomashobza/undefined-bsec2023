<script lang="ts">
   import Dropdown from '$lib/components/Dropdowns/index.svelte'
  import Chevron from '$lib/icons/Chevron.svelte';
  import Plus from '$lib/icons/Plus.svelte';
  import { findNearestRestaurant, getRestaurants, saveRestaurant, showError, showNotif } from '$ts/functions';
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

  let loadingLocation = false;

  function completeSelectWithLocation(lat: number, long: number) {
    console.log(lat, long)

    chosenRestaurace = findNearestRestaurant(lat, long)
    dispatch('choose', chosenRestaurace);
  }

  function handleSelectWithLocation() {
    loadingLocation = true;

    showNotif("Loading location...")

    navigator.geolocation.getCurrentPosition((v) => {
      loadingLocation = false;
      completeSelectWithLocation(v.coords.latitude, v.coords.longitude)
    }, () => {
      loadingLocation = false;
      showError("Nepodařilo se načíst lokaci.")
    })
  }

  onMount(() => {
    restaurace = getRestaurants();
  })
</script>

<!-- Misto -->
<div class="w-full my-4">
  <div class="mb-1  font-semibold">Místo</div>
    <div class="flex gap-2">
    <Dropdown bind:isDropdownOpen={mistoOpen} disabled={loadingLocation}>
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
    <button class="bordered-thing w-16 disabled:opacity-50 grid place-items-center" on:click={handleSelectWithLocation} disabled={loadingLocation}>
      <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.467107 8.47369H1.80262C2.03291 11.5263 4.48028 13.9803 7.52634 14.2105V15.5263C7.52634 15.7895 7.73028 16 7.99342 16C8.26316 16 8.46711 15.7895 8.46711 15.5263V14.2105C11.5132 13.9803 13.9606 11.5263 14.1907 8.47369H15.5264C15.7895 8.47369 16 8.26314 16 8C16 7.73686 15.7895 7.53289 15.5264 7.53289H14.1907C13.9606 4.48026 11.5132 2.02631 8.46711 1.79606V0.473686C8.46711 0.210514 8.26316 0 7.99342 0C7.73028 0 7.52634 0.210514 7.52634 0.473681V1.79606C4.48028 2.02631 2.03291 4.48026 1.80262 7.53289H0.467107C0.203964 7.53289 0.0285645 7.73686 0.0285645 8C0.0285645 8.26314 0.203964 8.47369 0.467107 8.47369ZM7.99342 5.40131C8.26316 5.40131 8.46711 5.1908 8.46711 4.92763V2.86843C10.9408 3.09211 12.8618 5.03289 13.079 7.53289H11.0724C10.8092 7.53289 10.5987 7.73686 10.5987 8C10.5987 8.26314 10.8092 8.47369 11.0724 8.47369H13.079C12.8618 10.9671 10.9408 12.9079 8.46711 13.1316V11.0724C8.46711 10.8092 8.26316 10.6053 7.99342 10.6053C7.73028 10.6053 7.52634 10.8092 7.52634 11.0724V13.1316C5.05262 12.9079 3.13159 10.9671 2.91448 8.47369H4.92108C5.18422 8.47369 5.39474 8.26314 5.39474 8C5.39474 7.73686 5.18422 7.53289 4.92108 7.53289H2.91448C3.13159 5.03289 5.05262 3.09211 7.52634 2.86843V4.92763C7.52634 5.1908 7.73028 5.40131 7.99342 5.40131Z" fill="black"/>
        </svg>        
    </button>
  </div>
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