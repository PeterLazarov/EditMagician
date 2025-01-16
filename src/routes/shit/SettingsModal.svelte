<script lang="ts">
    import { Select, Range, Modal } from "flowbite-svelte";
    import Button from "../../components/Button.svelte";
    import Label from "../../components/Label.svelte";

    export let showModal = false;
    export let settings = {
        fontSize: 22,
        paragraphSpacing: 10
    }

    let fontSizes = [
        { value: 10, name: "10" },
        { value: 11, name: "11" },
        { value: 12, name: "12" },
        { value: 13, name: "13" },
        { value: 14, name: "14" },
        { value: 15, name: "15" },
        { value: 16, name: "16" },
        { value: 17, name: "17" },
        { value: 18, name: "18" },
        { value: 20, name: "20" },
        { value: 22, name: "22" },
        { value: 24, name: "24" },
        { value: 28, name: "28" },
        { value: 32, name: "32" },
    ];
</script>

<div>
  <Modal class='bg-background-500' classHeader='bg-background-500 text-text' classFooter='bg-background-500 justify-end' title="Settings" bind:open={showModal} autoclose outsideclose>
    <Label>Font Size</Label>
    <Select items={fontSizes} bind:value={settings.fontSize} />

    <Label>Paragraph Spacing {settings.paragraphSpacing}</Label>
    <Range min="0" max="20" bind:value={settings.paragraphSpacing} step="1" />

    <svelte:fragment slot="footer">
      <Button on:click={() => showModal = false}>Close</Button>
    </svelte:fragment>
  </Modal>
</div>

<style>
</style>
