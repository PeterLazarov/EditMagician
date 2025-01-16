<script lang="ts">
    import Button from "../../components/Button.svelte";
    import { sanitiseOutput } from "../../services/outputSanitiser";

    import PromptForm from "./PromptForm.svelte";
    import SettingsModal from "./SettingsModal.svelte";

    let builderVisible = true;
    let settingsVisible = false;
    let settings = {
        fontSize: 22,
        paragraphSpacing: 20
    };
    $: output = "";

    function onOutputShow(val: string) {
        output = sanitiseOutput(val)
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    function togglePromptBuilder() {
        console.log("togglePromptBuilder");
        builderVisible = !builderVisible;
    }
</script>

<svelte:head>
    <title>About</title>
    <meta name="description" content="About this app" />
</svelte:head>

<div class="container flex-1">
    <div class="buttonsPanel">
        <Button class="toggleBuilderButton" on:click={togglePromptBuilder}>
            Toggle prompt builder
        </Button>
        <Button
            class="toggleBuilderButton"
            on:click={() => (settingsVisible = true)}
        >
            Settings
        </Button>
    </div>
    {#if builderVisible}
        <h1 class="text-text">Build Prompt</h1>
        <PromptForm {onOutputShow} />
    {/if}

    <div class="outputPanel text-text border-border border bg-background-500 flex-1" style="
        font-size: {settings.fontSize}px;
        --paragraph-spacing: {settings.paragraphSpacing}px;
    ">
        {@html output}
    </div>
</div>

{#if output}
    <button class="scrollToTopButton" on:click={scrollToTop}
        >Scroll to Top</button
    >
{/if}

<SettingsModal bind:showModal={settingsVisible} bind:settings />

<style>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .buttonsPanel {
        display: flex;
        flex-direction: row;
        gap: 8px;
    }
    .toggleBuilderButton {
        padding: 0 50px;
    }
    .outputPanel {
        border-radius: 8px;
        padding: 20px;
        max-width: 1024px;
        width: 100%;
        margin: 20px 100px;
        box-sizing: border-box;

        
        & > p {
            margin-top: var(--paragraph-spacing);
            margin-bottom: var(--paragraph-spacing);
        }
    }
    .scrollToTopButton {
        align-self: flex-end;
        position: sticky;
        bottom: 10px;
        right: 10px;
        padding: 5px 10px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    .scrollToTopButton:hover {
        background-color: #0056b3;
    }
</style>
