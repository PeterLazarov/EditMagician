<script lang="ts">
    import { Label } from "flowbite-svelte";

    export let className: string = "";
</script>

<Label
    class={`text-text ${className}`}
    {...$$restProps}
>
    <slot />
</Label>
