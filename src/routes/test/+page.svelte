<script lang="ts">
    import { saveRestaurant } from "$ts/functions";
    import { getStorage } from "$ts/storage";
    import { onMount } from "svelte";

  onMount(() => {
    const storage = getStorage();

    console.log({storage})

    const rest = saveRestaurant('poe poe');

    console.log(rest)
  })
</script>