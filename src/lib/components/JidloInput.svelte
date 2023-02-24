<script lang="ts">
  import Dropdown from '$lib/components/Dropdowns/index.svelte'
  import Chevron from '$lib/icons/Chevron.svelte';
  import Plus from '$lib/icons/Plus.svelte';
  import { calculateBolus, getMealTypes, saveMealType } from '$ts/functions';
  import type { MealType, Restaurant } from '$ts/interfaces';
  import { restaurants } from "$ts/restaurants";
  import { onMount } from 'svelte';

  import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();


  export let chosenRestaurace: null | Restaurant;

  let mounted = false;
  onMount(() => mounted = true);

  // JIDLA
	let jidloOpen = false;
	let jidloInput: HTMLInputElement;
	let jidloSearch: string = "";

	let jidla: MealType[] = [];
  let filteredJidla = jidla;
	$: if (chosenRestaurace && mounted && !jidloSearch) {
    console.log('asdd')
    jidla = getMealTypes().filter(v => v.restaurantId == chosenRestaurace?.id);
    filteredJidla = jidla;
    filteredJidla = filteredJidla.sort((a, b) => {
      const f1 = calculateBolus(a.id);
      const f2 = calculateBolus(b.id);

      return (f1.a+f1.b) - (f2.a+f2.b);
    });
    chosenJidlo = null;
    jidloSearch = "";
  };
	let chosenJidlo: null | MealType = null;
	const chooseJidlo = (meal: MealType) => {
		chosenJidlo = meal;
    dispatch('choose', chosenJidlo);
	}

	const addJidlo = () => {
    console.log('o')
    const new_meal = saveMealType(chosenRestaurace.id, jidloSearch);
		filteredJidla = getMealTypes(jidloSearch);
    filteredJidla = filteredJidla.sort((a, b) => {
      const f1 = calculateBolus(a.id);
      const f2 = calculateBolus(b.id);

      return (f1.a+f1.b) - (f2.a+f2.b);
    });
		chooseJidlo(new_meal);
	}

	$: if (mounted && jidloSearch) {
    console.log('bam')
    filteredJidla = jidla.filter(v => v.name.includes(jidloSearch));
    filteredJidla = filteredJidla.sort((a, b) => {
      const f1 = calculateBolus(a.id);
      const f2 = calculateBolus(b.id);

      return (f1.a+f1.b) - (f2.a+f2.b);
    });
  };

</script>

<!-- Jidlo -->
<div class="w-full my-4">
  <div class="font-bold mb-1">Jídlo</div>
  <Dropdown bind:isDropdownOpen={jidloOpen} disabled={!chosenRestaurace}>
    <div slot="button" class="cursor-pointer w-full bordered-thing flex flex-row items-center gap-2 py-4 px-3" on:click={() => jidloInput?.focus()}>
      {#if jidloOpen}
        <input type="text" placeholder="Název..." bind:value={jidloSearch} bind:this={jidloInput} class="flex-grow">
      {:else}
        {#if chosenJidlo}
          <div class="flex-grow">{chosenJidlo.name}</div>
        {:else}
          <div class="flex-grow text-black/40">Vyberte jídlo</div>
        {/if}
      {/if}
      <div class="w-4 transition-all duration-400" class:rotate-180={jidloOpen} on:click={() => jidloOpen = !jidloOpen}><Chevron /></div>
    </div>
    <div slot="dropdown" class="bordered-thing mt-2 flex flex-col max-h-[20rem] overflow-y-auto">
      {#if filteredJidla.length > 0}
        {#each filteredJidla as jidlo}
          <div class="restaurace flex flex-row items-center" on:click={() => {chooseJidlo(jidlo); jidloInput?.blur()}}>
            <div class="flex-grow">{jidlo.name}</div>
            <div class="text-gray-400 font-semibold">{Math.round(calculateBolus(jidlo.id).a)} j</div>
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