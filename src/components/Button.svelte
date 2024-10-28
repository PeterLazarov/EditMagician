<script lang="ts">
    import { Button } from "flowbite-svelte";
    import type { ButtonColorType } from "flowbite-svelte";

    export let color: ButtonColorType = "blue";
</script>

<Button {color} {...$$restProps}>
    <slot />
</Button>
