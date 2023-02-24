<script lang="ts">
    import RecordCard from "$components/RecordCard.svelte";
    import { getSortedMealRecordsByDate } from "$ts/functions";
    import type { MealRecord } from "$ts/interfaces";
    import { onMount } from "svelte"
    import dayjs from "dayjs"
    import Chart from 'chart.js/auto';
  import Chevron from "$icons/Chevron.svelte";

    let records: MealRecord[] = [];
    let groups: {dateString: string, records: MealRecord[]}[] = [];
    let cnvs: HTMLCanvasElement;
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

      console.log(records);


      new Chart(cnvs, {
      type: 'bar',
      data: {
        labels: records.map(v => dayjs(v.dateTime*1000).format('DD.MM.')),
        datasets: [
          {
            label: "glykemie",
            backgroundColor: ["#F5EAEA", "#FFB84C","#F16767"],
            data: records.map(v => v.init)
          }
        ]
      },
      options: {
        indexAxis: 'y',
        legend: { display: false },
        plugins: {
        legend: {
            display: false,
         } }
      }
  });
    })


    let showGraph = false;
    const toggleGraph = () => showGraph = !showGraph;
  
</script>

<div class="pb-3">
  <button class="w-full flex flex-row items-center mb-2" on:click={toggleGraph}>
    <div class="flex-grow text-left">Ukázat graf posledních 30 dní</div>
    <div class="w-5 transition-all duration-500" class:rotate-180={showGraph}><Chevron /></div>
  </button>
  <div class="w-full overflow-y-scroll" style="height: {showGraph ? 'auto' : '0'}">
    <canvas bind:this={cnvs} class="w-full" height="2000"></canvas>
  </div>
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