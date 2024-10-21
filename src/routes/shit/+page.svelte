<script lang="ts">
    import { sendContextPrompt } from "../../services/openAI";

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
</script>

<svelte:head>
    <title>About</title>
    <meta name="description" content="About this app" />
</svelte:head>
<div>
    <h1>Enter Instructions</h1>
    <div class="text-column container">
        <div>
            <button on:click={addInstruction}> + </button>

            <div>
                {#each instructions as instruction, index}
                    <div class="item">
                        <input bind:value={instruction} />
                        <button on:click={() => removeInstruction(index)}>
                            x
                        </button>
                    </div>
                {/each}
            </div>
        </div>
        <div>
            <textarea bind:value={input} />

            <button on:click={sendPropmt}> Send </button>

            <p>
                {output}
            </p>
        </div>
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .item {
        display: flex;
        justify-content: space-between;
        gap: 10;
    }
</style>
