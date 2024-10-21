<script lang="ts">
    let prompt = "How many test items did I send?";
    $: instructions = ["initial"] as string[];

    function addInstruction() {
        instructions = [...instructions, "test"];
    }
    function removeInstruction(index: number) {
        instructions = instructions.toSpliced(index, 1);
    }

    export let sendPropmt: (prompt: string, instructions: string[]) => void;
</script>

<div class="builder">
    <div class="flex-1 instructionList">
        <button on:click={addInstruction}> Add instruction </button>
        {#each instructions as instruction, index}
            <div class="instruction">
                <textarea
                    class="instructionInput"
                    placeholder="Enter instruction"
                    bind:value={instruction}
                />
                <button on:click={() => removeInstruction(index)}> x </button>
            </div>
        {/each}
    </div>
    <div class="flex-1 inputPanel">
        <textarea
            class="promptInput"
            bind:value={prompt}
            placeholder="Enter content"
        />

        <button on:click={() => sendPropmt(prompt, instructions)}>
            Send
        </button>
    </div>
</div>

<style>
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
