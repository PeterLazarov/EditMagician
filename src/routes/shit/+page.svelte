<script lang="ts">
    import { sendContextPrompt } from "../../services/openAI";
    import PromptBuilder from "./PromptBuilder.svelte";

    let builderVisible = true;
    $: output = "";

    function sendPropmt(prompt: string, context: string) {
        sendContextPrompt(context, prompt).then((val) => (output = val || ""));
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
    <button class="toggleBuilderButton" on:click={togglePromptBuilder}>
        Toggle prompt builder
    </button>
    {#if builderVisible}
        <h1>Build Prompt</h1>
        <PromptBuilder {sendPropmt} />
    {/if}

    <pre class="outputPanel">
        {@html output}
    </pre>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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
