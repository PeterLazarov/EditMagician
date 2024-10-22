<script lang="ts">
    import RichTextEditor from "../../components/RichTextEditor.svelte";
    import { writable } from "svelte/store";

    let prompt = "How many test items did I send?";
    let context = writable("");
    export let sendPropmt: (prompt: string, context: string) => void;
</script>

<div class="builder">
    <div class="flex-1 instructionList">
        <RichTextEditor bind:content={context} />
    </div>
    <div class="flex-1 inputPanel">
        <textarea
            class="promptInput"
            bind:value={prompt}
            placeholder="Enter content"
        />

        <button on:click={() => sendPropmt(prompt, $context)}> Send </button>
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
