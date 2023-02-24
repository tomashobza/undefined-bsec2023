<script lang="ts">
    import RecordCard from "$components/RecordCard.svelte";
    import { getSortedMealRecordsByDate } from "$ts/functions";
    import type { MealRecord } from "$ts/interfaces";
    import { onMount } from "svelte"
    import dayjs from "dayjs"
    import Chart from 'chart.js/auto';

    let records: MealRecord[] = [];
    let groups: {dateString: string, records: MealRecord[]}[] = [];

    onMount(() => {
      records = getSortedMealRecordsByDate();

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

      groups.forEach(g => {
        g.records.sort((a, b) => b.dateTime - a.dateTime)
      })

      groups = groups
    })
</script>

<div class="pb-3">
  <div>graf</div>
  {#each groups as group}
    <div class="py-2 px-2 mt-4 font-semibold">{group.dateString}</div>
  
    <div class="">
        <div class="overflow-hidden rounded-xl border">
          {#each group.records as record}
            <RecordCard {record} />
          {/each}
        </div>
    </div>
  {/each}
</div>