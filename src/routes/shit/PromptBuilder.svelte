<script lang="ts">
    import RichTextEditor from "../../components/RichTextEditor.svelte";
    import { setCookie, getCookie } from "../../services/cookies";

    import { writable } from "svelte/store";
    import { onMount } from "svelte";

    let prompt = "";
    let context = writable("");

    export let sendPropmt: (prompt: string, context: string) => void;
    export let loading = false;

    // Subscribe to changes in context and store them in a cookie
    context.subscribe((value) => {
        setCookie("context", value, 7); // storing for 7 days
    });

    onMount(() => {
        const savedContext = getCookie("context");
        if (savedContext) {
            context.set(savedContext);
        }
    });

    function handleSubmit(event: Event) {
        event.preventDefault();
        sendPropmt(prompt, $context);
    }

    function handleKeydown(event: KeyboardEvent) {
        if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
            handleSubmit(event);
        }
    }
</script>

<form on:submit={handleSubmit} class="builder">
    <div class="flex-1 instructionList">
        <RichTextEditor bind:content={context} />
    </div>
    <div class="flex-1 inputPanel">
        <textarea
            class="promptInput"
            bind:value={prompt}
            on:keydown={handleKeydown}
            placeholder="Enter text"
        />

        <button type="submit" disabled={loading}>
            {#if loading}
                Waiting for response ...
            {:else}
                Send
            {/if}
        </button>
    </div>
</form>

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
