<script>
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';
	import { clickOutside } from '$utils/clickOutside';

	const dispatch = createEventDispatcher();

</script>

<div
	class="grid place-items-center fixed top-0 left-0 w-screen h-screen backdrop-blur-lg bg-black/20 bg-opacity-50 z-[10000]"
	transition:fade={{ duration: 200, easing: expoOut }}
>
    <div
        class="max-w-max max-h-max"
        use:clickOutside
        on:click_outside={() => dispatch('closeModal')}
    >
        <slot />
    </div>
</div>
