<script lang="ts">
    import { getMealRecords, planNotificationForMeal } from "$ts/functions";
    import { laodTestData } from "$ts/testData";
    import { onMount } from "svelte";

  onMount(() => {
    // const storage = getStorage();

    // console.log({storage})

    // // const rest = saveRestaurant('poe poe');

    // // console.log(rest)

    // const rest = getRestaurants();

    // console.log({rest})
  })

  function showNotifHandler() {
    const mealRecord = getMealRecords()[0]

    console.log(mealRecord)

    planNotificationForMeal(mealRecord.id, 3)
  }
</script>

<button on:click={laodTestData}>Load Test Data</button>
<button on:click={showNotifHandler}>Show notification</button>