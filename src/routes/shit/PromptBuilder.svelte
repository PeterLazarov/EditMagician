<script lang="ts">
    import { onMount } from "svelte";
    import { Textarea } from 'flowbite-svelte';

    import Button from "../../components/Button.svelte";
    import { setCookie, getCookie } from "../../services/cookies";

    let prompt = "";
    let context = "";
    let submitButton: Button; // Reference to the submit button

    export let sendPropmt: (prompt: string, context: string) => void;
    export let loading = false;

    $: setCookie("context", context, 7); // storing for 7 days

    onMount(() => {
        const savedContext = getCookie("context");
        if (savedContext) {
            context = savedContext;
        }
    });

    function handleSend(event: Event) {
        event.preventDefault();
        console.log("submit");
        sendPropmt(prompt, context);

        if (submitButton) {
            submitButton.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
            handleSend(event);
        }
    }
</script>

<div class="builder">
    <div class="flex-1 instructionList">
        <Textarea 
            bind:value={context} 
            placeholder="Enter instructions"
            class='h-full' 
        />
    </div>
    <div class="flex-1 inputPanel">
        <Textarea
            class="promptInput"
            bind:value={prompt}
            on:keydown={handleKeydown}
            placeholder="Enter text"
        />

        <Button on:click={handleSend} disabled={loading}>
            {#if loading}
                Waiting for response ...
            {:else}
                Send
            {/if}
        </Button>
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
        outline: none;
    }
</style>
