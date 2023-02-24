<script lang="ts">
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
</script>

<button on:click={laodTestData}>Load Test Data</button>