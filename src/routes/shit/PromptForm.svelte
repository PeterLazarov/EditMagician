<script lang="ts">
  import { onMount } from "svelte";
  import { Textarea, Radio } from 'flowbite-svelte';

  import { sendContextPrompt } from "../../services/openAI";
  import Button from "../../components/Button.svelte";
  import Label from "../../components/Label.svelte";
  import { setCookie, getCookie } from "../../services/cookies";

  let prompt = "";
  let context = "";
  let queue = "";
  let returnType: 'raw' | 'html' = "html";
  let submitButton: Button; 
  const returnTypeInstructions = {
    raw: '',
    html: 'Return the result as an html with a paragraph formatting'
  } as const
  export let onOutputShow: (value: string) => void;
  export let loading = false;

  $: setCookie("context", context, 7); // storing for 7 days
  $: fullContext = `${context} ${returnTypeInstructions[returnType]}`
  
  onMount(() => {
    const savedContext = getCookie("context");
    if (savedContext) {
      context = savedContext;
    }
  });

  function handleSend(event: Event) {
    event.preventDefault();
    console.log("submit");

    loading = true;
    console.log({returnType,fullContext})
    sendContextPrompt(fullContext, prompt).then((val) => {
      loading = false;
      onOutputShow(val || '')
    });

    if (submitButton) {
      submitButton.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function handleQueue(event: Event) {
    event.preventDefault();
    console.log("queue");

    loading = true;
    console.log({returnType, fullContext})
    sendContextPrompt(fullContext, prompt).then((val) => {
      loading = false;
      queue = val || ''
    });
  }

  function showQueued(event: Event) {
    event.preventDefault();

    onOutputShow(queue)
    queue = ''
  }

  function handleKeydown(event: KeyboardEvent) {
    console.log(event)
    if ((event.ctrlKey || event.metaKey || event.altKey) && event.key === "Enter") {
      handleSend(event);
    }
    else if ((event.ctrlKey || event.metaKey || event.altKey) && event.key === "q") {
      handleQueue(event);
    }
  }
</script>

<div class="builder">
  <div class="column">
    <Textarea 
      bind:value={context} 
      placeholder="Enter instructions"
      class='flex-1' 
    />
    <div class="return-type-group"> 
      <Label>Return Format</Label>
      <Radio class="text-text" name="returnType" value="html" bind:group={returnType}>HTML</Radio>
      <Radio class="text-text" name="returnType" value="raw" bind:group={returnType}>Raw</Radio>
    </div>
  </div>
  <div class="column">
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

    {#if queue !== ''}
      <Button on:click={showQueued} disabled={loading}>
        Show queued
      </Button>
    {:else}
      <Button on:click={handleQueue} disabled={loading}>
        {#if loading}
          Waiting for response ...
        {:else}
          Queue
        {/if}
      </Button>
    {/if}
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

  .return-type-group{
    display: flex;
    gap: 10px
  }
  .flex-1 {
    flex: 1
  }

  .column {
    flex: 1;
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
