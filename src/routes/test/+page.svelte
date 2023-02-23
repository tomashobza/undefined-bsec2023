<script lang="ts">
    import { getRestaurants, saveRestaurant } from "$ts/functions";
    import { getStorage } from "$ts/storage";
    import { onMount } from "svelte";

  onMount(() => {
    const storage = getStorage();

    console.log({storage})

    // const rest = saveRestaurant('poe poe');

    // console.log(rest)

    const rest = getRestaurants();

    console.log({rest})
  })
</script>