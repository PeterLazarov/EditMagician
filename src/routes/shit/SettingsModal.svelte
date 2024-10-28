<script lang="ts">
    import Modal from "../../components/Modal.svelte";
    import { Select } from "flowbite-svelte";

    export let showModal = false;
    export let fontSize = 22;

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
    <Modal bind:showModal>
        <span slot="header"> Settings </span>
        <Select items={fontSizes} bind:value={fontSize} />
    </Modal>
</div>

<style>
</style>
