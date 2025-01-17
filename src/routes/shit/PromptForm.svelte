<script lang="ts">
  import { onMount } from "svelte";
  import { Textarea, Radio } from 'flowbite-svelte';

  import { sendChatContextPrompt } from "../../services/openAI";
  import Button from "../../components/Button.svelte";
  import Label from "../../components/Label.svelte";
  import { setCookie, getCookie } from "../../services/cookies";

  let prompt = "";
  let context = "";
  let queue = "";
  let returnType: 'raw' | 'text' = "text";
  const returnTypeInstructions = {
    raw: '',
    text: 'Return the result as an html with a paragraph formatting'
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
    queue = ''
    sendChatContextPrompt(fullContext, prompt).then((val) => {
      loading = false;
      onOutputShow(val || '')
    });
  }

  function handleQueue(event: Event) {
    event.preventDefault();
    console.log("queue");

    loading = true;
    sendChatContextPrompt(fullContext, prompt).then((val) => {
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
    if ((event.ctrlKey || event.metaKey || event.altKey) && event.key === "s") {
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
      on:keydown={handleKeydown}
      placeholder="Enter instructions"
      class='flex-1' 
    />
    <div class="return-type-group"> 
      <Label>Return Format</Label>
      <Radio class="text-text" name="returnType" value="text" bind:group={returnType}>Text</Radio>
      <Radio class="text-text" name="returnType" value="raw" bind:group={returnType}>Raw</Radio>
    </div>
  </div>
  <div class="column">
    <Textarea
      bind:value={prompt}
      on:keydown={handleKeydown}
      placeholder="Enter text"
    />

    <Button on:click={handleSend} disabled={loading}>
      {#if loading}
        Waiting for response ...
      {:else}
        <u>S</u>end
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
          <u>Q</u>ueue
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

  .column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  @media (width < 30rem) {
    .builder {
      flex-direction: column;
    }
  }
</style>
