<script lang="ts">
    import { sendContextPrompt } from "../../services/openAI";
    import PromptBuilder from "./PromptBuilder.svelte";

    let builderVisible = true;
    $: output = "";

    function sendPropmt(prompt: string, instructions: string[]) {
        sendContextPrompt(instructions, prompt).then(
            (val) => (output = val || ""),
        );
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
    <button class="toggleBuilderButton" on:click={togglePromptBuilder}>
        Toggle prompt builder
    </button>
    {#if builderVisible}
        <h1>Build Prompt</h1>
        <PromptBuilder {sendPropmt} />
    {/if}

    <div>
        {output}
    </div>
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
</style>
