<script lang="ts">
  import Button from "../../components/Button.svelte";
  import Modal from "../../components/Modal.svelte";

  export let showModal = false;
  export let generateImage: () => void 
  export let imageUrl: string = ''
</script>

<Modal title="Generated Image" bind:open={showModal} outsideclose>
  {#if imageUrl}
    <img src={imageUrl} alt='Generated Result' />
  {:else}
    Loading...
  {/if}

  <svelte:fragment slot="footer">
    <Button on:click={() => showModal = false}>Close</Button>
    <Button on:click={generateImage}>Generate new</Button>
  </svelte:fragment>
</Modal>