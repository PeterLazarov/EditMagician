<script lang="ts">
    import Modal from "../../components/Modal.svelte";

    export let showModal = false;
</script>

<div>
    <Modal bind:showModal>
        <span slot="header"> Settings </span>
        Test
    </Modal>
</div>

<style>
</style>
