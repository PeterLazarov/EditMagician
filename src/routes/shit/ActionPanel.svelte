<script lang="ts">
  import Button from "../../components/Button.svelte";
  import { callChatAPI, callImageAPI } from "../../services/openAI";
  import ImageGeneratorModal from "./ImageGeneratorModal.svelte";
  import LookupModal from "./LookupModal.svelte";

  type Coords = {
    left: number
    top: number
  }
  export let coords:Coords

  let generatedUrl = ''
  let lookupResult = ''
  let showVisualizeModal = false
  let showLookupModal = false
  const selection = window.getSelection()!.toString()

  function handleVisualize() {
    showVisualizeModal = true
    generatedUrl = ''
    callImageAPI(selection).then((url) => {
      if (url) {
        generatedUrl = url
      }
    })
  }

  function handleLookup() {
    showLookupModal = true
    lookupResult = ''
    const instructions = `Describe the following in plain and easy to understand English: ${selection}`
    callChatAPI(instructions).then((res) => {
      if (res) {
        lookupResult = res
      }
    })
  }
</script>

<div
  class="absolute flex flex-row gap-2 p-1 bg-contrast bg-opacity-70 rounded-lg"
  style={`top: ${coords.top}px; left: ${coords.left}px;`}
>
  <Button
    on:click={handleVisualize}
    {...$$restProps}
  >
    Visualize
  </Button>
  <Button
    on:click={handleLookup}
    {...$$restProps}
  >
    Look up meaning
  </Button>
</div>

<ImageGeneratorModal 
  bind:showModal={showVisualizeModal}
  imageUrl={generatedUrl} 
  generateImage={handleVisualize}
/>

<LookupModal 
  bind:showModal={showLookupModal}
  original={selection} 
  meaning={lookupResult}
/>