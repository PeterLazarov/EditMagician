<script lang="ts">
    import RichTextEditor from "../../components/RichTextEditor.svelte";
    import { setCookie, getCookie } from "../../services/cookies";

    import { writable } from "svelte/store";
    import { onMount } from "svelte";

    let prompt = "How many test items did I send?";
    let context = writable("");

    export let sendPropmt: (prompt: string, context: string) => void;
    export let loading = false;

    // Subscribe to changes in context and store them in a cookie
    context.subscribe((value) => {
        setCookie("context", value, 7); // storing for 7 days
    });

    // Initialize context from the cookie when the component mounts
    onMount(() => {
        const savedContext = getCookie("context");
        if (savedContext) {
            context.set(savedContext);
        }
    });
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

        <button
            disabled={loading}
            on:click={() => sendPropmt(prompt, $context)}
        >
            {#if loading}
                Waiting for response ...
            {:else}Send
            {/if}
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

    .inputPanel {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .promptInput {
        height: 100%;
        padding: 10px;
    }
</style>
