<script lang="ts">
  import { Modal } from "flowbite-svelte";
  import type { ModalProps } from "flowbite-svelte/Modal.svelte";
  
  export let className: string = "";
  export let classHeader: string = "";
  export let classFooter: string = "";
  export let open = false;

  const typedRestProps: Partial<ModalProps> = $$restProps
</script>

<Modal 
  {...typedRestProps}
  bind:open={open}
  class={`bg-background-500 text-text ${className}`} 
  classHeader={`bg-background-500 text-text ${classHeader}`}
  classFooter={`bg-background-500 justify-end ${classFooter}`} 
>
  <slot />

  <svelte:fragment slot="footer">
    <slot name="footer" />
  </svelte:fragment>
</Modal>
