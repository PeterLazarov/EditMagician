<script lang="ts">
    import { Button } from "flowbite-svelte";
    import type { ButtonColorType } from "flowbite-svelte";
    import { createEventDispatcher } from "svelte";

    export let color: ButtonColorType = "primary";
    export let className: string = "";

    const dispatch = createEventDispatcher();

    function handleClick(event: MouseEvent) {
        dispatch("click", event);
    }
</script>

<Button
    {color}
    class={`focus-within:ring-0 focus-within:bg-transparent text-text ${className}`}
    on:click={handleClick}
    {...$$restProps}
>
    <slot />
</Button>
