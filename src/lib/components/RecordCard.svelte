<script lang="ts">
    import { getMealTypeById } from "$ts/functions";
    import type { MealRecord, MealType } from "$ts/interfaces";
    import { onMount } from "svelte";
    import dayjs from "dayjs"
    import { goto } from "$app/navigation";
    import duration from "dayjs/plugin/duration"

    dayjs.extend(duration)

    export let record: MealRecord;

    $: datetime = dayjs(record.dateTime * 1000)
    $: timeToComplete = datetime.add(2, "hours").unix() - dayjs().unix()
    $: stringToComplete = dayjs.duration(timeToComplete, "seconds").format("DD[d] HH[h] MM[m]");

    $: console.log(stringToComplete)

    let mealType: MealType;

    function handleClick() {
      goto('/complete-record/' + record.id)
    }

    onMount(() => {
      mealType = getMealTypeById(record.mealTypeId);
    })
</script>

<button class="block w-full text-left border-b last:border-b-0 pt-4 pb-4 px-4" class:bg-orange-300={!record?.result} on:click={handleClick}>
  <div class="flex">
    <div class="flex-grow text-lg font-semibold">{mealType?.name}</div>
    <div class="font-semibold text-lg">{datetime?.format('HH:MM')}</div>
  </div>

  <div class="flex">
    <div class="flex-grow">Glykemie před jídlem:</div>
    <div>{record.init} <span class="text-gray-500">mmol/L</span></div>
  </div>

  <div class="flex">
    <div class="flex-grow">Glykemie 2 hod. po jídle:</div>
    <div>
      {#if timeToComplete < 0}
        <span class="text-red-500 font-semibold">
          za {stringToComplete}
        </span>
      {:else}
        {record.result || 'Nezazn.'} <span class="text-gray-500">mmol/L</span>
      {/if}
    </div>
  </div>

  <div class="flex">
    <div class="flex-grow">Bolus:</div>
    <div>{record.dose} <span class="text-gray-500">jednotek</span></div>
  </div>
</button>