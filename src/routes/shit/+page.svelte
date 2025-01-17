<script lang="ts">
  import Button from "../../components/Button.svelte";
  import { sanitiseOutput } from "../../services/outputSanitiser";
  import ImageGenerator from "./ImageGenerator.svelte";

  import PromptForm from "./PromptForm.svelte";
  import SettingsModal from "./SettingsModal.svelte";

  let builderVisible = true;
  let settingsVisible = false;
  let settings = {
    fontSize: 22,
    paragraphSpacing: 20
  };
  let imageGeneratorCoords = null
  $: output = "";

  function onOutputShow(val: string) {
    output = sanitiseOutput(val)
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function togglePromptBuilder() {
    console.log("togglePromptBuilder");
    builderVisible = !builderVisible;
  }

  function onOutputMouseUp () {
    const selection = window.getSelection();

    if (selection && selection.toString().trim().length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      imageGeneratorCoords = {
        left: rect.left + window.scrollX,
        top: rect.bottom + window.scrollY
      }
    } else {
      imageGeneratorCoords = null
    }
  }


</script>

<svelte:head>
    <title>Text Editor</title>
    <meta name="description" content="Magic text editor" />
</svelte:head>

<div class="container flex-1">
  <div class="buttonsPanel">
    <Button on:click={togglePromptBuilder}>
      Toggle prompt builder
    </Button>
    <Button on:click={() => (settingsVisible = true)}>
      Settings
    </Button>
  </div>
  {#if builderVisible}
    <h1 class="text-text">Build Prompt</h1>
    <PromptForm {onOutputShow} />
  {/if}

  {#if imageGeneratorCoords}
    <ImageGenerator coords={imageGeneratorCoords} />
  {/if}
  <div 
    class="outputPanel text-text border-border border bg-white bg-opacity-10 flex-1"
    role="textbox"
    tabindex="-1"
    on:mouseup={onOutputMouseUp}
    style="
      font-size: {settings.fontSize}px;
      --paragraph-spacing: {settings.paragraphSpacing}px;
    "
  >
    {@html output}
  </div>
</div>

{#if output}
  <Button class="sticky bottom-2.5 right-2.5 self-end" on:click={scrollToTop}>
    Scroll to Top
  </Button>
{/if}

<SettingsModal bind:showModal={settingsVisible} bind:settings />

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .buttonsPanel {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }
  .outputPanel {
    border-radius: 8px;
    padding: 20px;
    max-width: 1024px;
    width: 100%;
    margin: 20px 100px;
    box-sizing: border-box;

    & > p {
      margin-top: var(--paragraph-spacing);
      margin-bottom: var(--paragraph-spacing);
    }
  }
</style>
