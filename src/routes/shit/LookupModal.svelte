<script lang="ts">
  import Button from "../../components/Button.svelte";
  import Modal from "../../components/Modal.svelte";

  export let showModal = false;
  export let original: string = ''
  export let meaning: string = ''
</script>

<Modal title="Meaning" bind:open={showModal} outsideclose>
  <p class=" font-semibold italic">{original}</p>
  <hr />
  <p>
    {#if meaning}
      {meaning}
    {:else}
      Loading...
    {/if}
  </p>
  <svelte:fragment slot="footer">
    <Button on:click={() => showModal = false}>Close</Button>
  </svelte:fragment>
</Modal>