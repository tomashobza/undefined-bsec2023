<script lang="ts">
    import { clickOutside } from "$utils/clickOutside";
  import { slide } from "svelte/transition";

    export let isDropdownOpen = false;
    export let doNotCloseOnDropownClick = false;
    export let doNotCloseOnClickOutside = false;
    export let dropdownTakesPlace = false;

    export let disabled = false;

    let buttonHeight = 0;
    let buttonWidth = 0;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div 
    class='relative w-full'
    class:opacity-50={disabled}
    bind:offsetHeight={buttonHeight}
    bind:offsetWidth={buttonWidth}
    use:clickOutside 
    on:click_outside={() => {if (!doNotCloseOnClickOutside) isDropdownOpen = false}}
    on:click={() => (!disabled) && (isDropdownOpen = !isDropdownOpen)}
>
    <div>
        <slot name='button' />
    </div>

    {#if isDropdownOpen}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            class='{dropdownTakesPlace ? 'relative' : 'absolute left-0'} overflow-hidden z-10'
            style:top='{dropdownTakesPlace ? '0' : buttonHeight}px'
            style:width='{buttonWidth}px'
            style:min-width='{buttonWidth}px'
            transition:slide
            on:click|stopPropagation={() => {if (!doNotCloseOnDropownClick) isDropdownOpen = false}}
        >
            <slot name='dropdown'/>
        </div>
    {/if}
</div>