<script lang="ts">
    import { sendContextPrompt } from "../../services/openAI";
    import PromptBuilder from "./PromptBuilder.svelte";
    import SettingsModal from "./SettingsModal.svelte";

    let builderVisible = true;
    let settingsVisible = false;
    let loading = false;
    $: output = "";

    function sendPropmt(prompt: string, context: string) {
        loading = true;
        sendContextPrompt(context, prompt).then((val) => {
            loading = false;
            output = val || "";
        });
    }

    $: console.log({ output });
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
        <button class="toggleBuilderButton" on:click={togglePromptBuilder}>
            Toggle prompt builder
        </button>
        <button
            class="toggleBuilderButton"
            on:click={() => (settingsVisible = true)}
        >
            Settings
        </button>
    </div>
    {#if builderVisible}
        <h1>Busild Prompt</h1>
        <PromptBuilder {sendPropmt} {loading} />
    {/if}

    <div class="outputPanel">
        {@html output}
    </div>
</div>

<SettingsModal bind:showModal={settingsVisible} />

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
</style>
