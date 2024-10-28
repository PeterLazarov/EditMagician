<script lang="ts">
    import { sendContextPrompt } from "../../services/openAI";
    import Button from "../../components/Button.svelte";
    import PromptBuilder from "./PromptBuilder.svelte";
    import SettingsModal from "./SettingsModal.svelte";

    let builderVisible = true;
    let settingsVisible = false;
    let loading = false;
    let fontSize = 22;
    $: output = "";

    function sendPropmt(prompt: string, context: string) {
        loading = true;
        sendContextPrompt(context, prompt).then((val) => {
            loading = false;
            output = val || "";
        });
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    function togglePromptBuilder() {
        builderVisible = !builderVisible;
    }
</script>

<svelte:head>
    <title>About</title>
    <meta name="description" content="About this app" />
</svelte:head>

<div class="container">
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
        <h1>Build Prompt</h1>
        <PromptBuilder {sendPropmt} {loading} />
    {/if}

    <div class="outputPanel" style={`font-size: ${fontSize}px;`}>
        {@html output}
    </div>
</div>

{#if output}
    <button class="scrollToTopButton" on:click={scrollToTop}
        >Scroll to Top</button
    >
{/if}

<SettingsModal bind:showModal={settingsVisible} bind:fontSize />

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
        border: 1px solid black;
        border-radius: 8px;
        padding: 20px;
        max-width: 1024px;
        width: 100%;
        margin: 20px 100px;
        box-sizing: border-box;
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
