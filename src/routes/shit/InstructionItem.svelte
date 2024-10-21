<script lang="ts">
    export let text: string;
    export let onRemove: () => void;
</script>

<div class="container">
    <input bind:value={text} />
    <button on:click={() => onRemove()}> x </button>
</div>

<style>
    .container {
        display: flex;
        justify-content: space-between;
        gap: 10;
    }
</style>
