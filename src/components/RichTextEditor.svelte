<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { Editor } from "@tiptap/core";
    import StarterKit from "@tiptap/starter-kit";
    import { writable } from "svelte/store";

    import Button from "./Button.svelte";

    export let content = writable("");
    export let className = "";

    let element: HTMLElement;
    let editor: Editor;

    // Function to update the store based on the editor's content
    function updateContent() {
        content.set(editor.getHTML());
    }

    onMount(() => {
        editor = new Editor({
            element: element,
            extensions: [StarterKit],
            content: "<p>Hello World! 🌍️ </p>",
            onTransaction: () => {
                updateContent(); // Update store whenever the editor changes
            },
        });

        // Update editor content if the store changes
        const unsubscribe = content.subscribe((value) => {
            if (editor.getHTML() !== value) {
                editor.commands.setContent(value);
            }
        });

        return unsubscribe; // Ensure subscription cleanup on component destroy
    });

    onDestroy(() => {
        if (editor) {
            editor.destroy();
        }
    });
</script>

<div class={`editor ${className}`} bind:this={element} {...$$restProps}>
    {#if editor}
        <div class="buttonsPanel">
            <Button
                on:click={() => {
                    console.log("bullet");
                    editor.chain().focus().toggleBulletList().run();
                }}
            >
                Bullet list
            </Button>

            <button
                on:click={() => {
                    console.log("order");

                    editor.chain().focus().toggleOrderedList().run();
                }}
            >
                Ordered list
            </button>
        </div>
    {/if}
</div>

<style>
    .editor {
        position: relative;

        & .buttonsPanel {
            position: absolute;
            left: 1px;
            right: 1px;
            top: 1px;
            padding: 4px;
            background-color: lightgray;
            display: flex;
            gap: 4px;
        }
        & .tiptap {
            height: 100%;
            background-color: white;
            padding: 0px 10px;
            border: 1px solid black;
            padding-top: 50px;
        }
        & .tiptap.ProseMirror-focused {
            outline: none;
        }
    }
</style>
