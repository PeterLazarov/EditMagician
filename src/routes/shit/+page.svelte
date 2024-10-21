<script lang="ts">
    import { sendContextPrompt } from "../../services/openAI";

    let builderVisible = true;
    let input = "";
    $: output = "";
    $: instructions = ["initial"] as string[];

    function sendPropmt() {
        sendContextPrompt(instructions, input).then(
            (val) => (output = val || ""),
        );
    }
    function addInstruction() {
        instructions = [...instructions, "test"];
    }
    function removeInstruction(index: number) {
        instructions = instructions.toSpliced(index, 1);
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
        <div class="builder">
            <div class="flex-1 instructionList">
                <button on:click={addInstruction}> Add instruction </button>
                {#each instructions as instruction, index}
                    <div class="instruction">
                        <textarea
                            lass
                            class="instructionInput"
                            placeholder="Enter instruction"
                            bind:value={instruction}
                        />
                        <button on:click={() => removeInstruction(index)}>
                            x
                        </button>
                    </div>
                {/each}
            </div>
            <div class="flex-1 inputPanel">
                <textarea
                    class="promptInput"
                    bind:value={input}
                    placeholder="Enter content"
                />

                <button on:click={sendPropmt}> Send </button>
            </div>
        </div>
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
    .builder {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 20px;
    }

    .flex-1 {
        flex: 1;
    }

    .instructionList {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .instruction {
        display: flex;
        justify-content: space-between;
        gap: 4px;
    }
    .instructionInput {
        width: 100%;
    }

    .inputPanel {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .promptInput {
        height: 100%;
    }
</style>
