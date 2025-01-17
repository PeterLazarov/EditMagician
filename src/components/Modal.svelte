<script lang="ts">
  import { Modal } from "flowbite-svelte";
  
  export let className: string = "";
  export let classHeader: string = "";
  export let classFooter: string = "";
</script>

<Modal 
  {...$$restProps}
  class={`bg-background-500 ${className}`} 
  classHeader={`bg-background-500 text-text ${classHeader}`}
  classFooter={`bg-background-500 justify-end ${classFooter}`} 
>
  <svelte:fragment slot="header">
    <slot name="header" />
  </svelte:fragment>

  <slot />

  <svelte:fragment slot="footer">
    <slot name="footer" />
  </svelte:fragment>
</Modal>
