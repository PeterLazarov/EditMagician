<script lang="ts">
  import Button from "../../components/Button.svelte";
  import { callImageAPI } from "../../services/openAI";
  import ImageGeneratorModal from "./ImageGeneratorModal.svelte";

  type Coords = {
    left: number
    top: number
  }
  export let coords:Coords

  let generatedUrl = ''
  let showModal = false

  function handleClick() {
    const selection = window.getSelection()!.toString()

    showModal = true
    generatedUrl = ''
    callImageAPI(selection).then((url) => {
      if (url) {
        generatedUrl = url
      }
    })
  }
</script>

<Button
  class="absolute"
  style={`top: ${coords.top}px; left: ${coords.left}px;`}
  on:click={handleClick}
  {...$$restProps}
>
  Generate Image
</Button>

<ImageGeneratorModal 
  bind:showModal={showModal}
  imageUrl={generatedUrl} 
  generateImage={handleClick}
/>