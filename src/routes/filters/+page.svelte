<script lang="ts">
	import JidloInput from '$components/JidloInput.svelte';
  import RestauraceInput from '$components/RestauraceInput.svelte';
  import { getFilteredMealRecords } from '$ts/functions';
  import type { MealType, Restaurant } from '$ts/interfaces';
	import dayjs from 'dayjs';
  import RecordCard from "$components/RecordCard.svelte";
  import type { MealRecord } from "$ts/interfaces";
  import { onMount } from "svelte"

	let chosenRestaurace: null | Restaurant;
	let chosenJidlo: null | MealType;

  let groups: {dateString: string, records: MealRecord[]}[] = [];

  function updateData() {
    const records = getFilteredMealRecords(chosenRestaurace?.id, chosenJidlo?.id)

    groups = []

    for (const record of records) {
      const datetime = dayjs(record.dateTime * 1000);
      const dateString = datetime.format('DD. MM. YYYY')

      const group = groups.find(g => g.dateString === dateString);

      if (group) {
        group.records.push(record);
      } else {
        groups.push({dateString, records: [record]})
      }
    }

    groups = groups
  }

  function handleChooseRestaurant(e: any) {
    chosenRestaurace = e.detail;
    updateData();
  }

  function handleChooseMeal(e: any) {
    chosenJidlo = e.detail;
    updateData();
  }

  onMount(() => {
    updateData();
  })

  $: console.log(chosenRestaurace)
</script>

<div class="flex flex-col items-stretch relative">
	<RestauraceInput on:choose={handleChooseRestaurant} />
	<JidloInput chosenRestaurace={chosenRestaurace} on:choose={handleChooseMeal} />
</div>
<div class="mb-2">
  {#each groups as group}
  <div class="py-2 px-2 mt-4 font-semibold">{group.dateString}</div>
  
  <div class="border rounded-xl">
    {#each group.records as record (record.id)}
    <RecordCard {record} />
    {/each}
  </div>
  {/each}
</div>