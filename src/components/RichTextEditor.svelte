<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { Editor } from "@tiptap/core";
    import StarterKit from "@tiptap/starter-kit";
    import { writable } from "svelte/store";

    export let content = writable("<p>Hello World! 🌍️ </p>"); // Exported writable store for content

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

{#if editor}
    <div class="buttonsPanel">
        <button
            on:click={() => editor.chain().focus().toggleBulletList().run()}
            class:active={editor.isActive("bulletList")}
        >
            Bullet list
        </button>
    </div>
{/if}

<div class="editor" bind:this={element} />

<style>
    .buttonsPanel {
        display: flex;
        gap: 4px;
    }
    .editor {
        & .tiptap {
            background-color: white;
            padding: 0px 10px;
            border: 1px solid black;

            /* & .tiptap > p {
            margin: 0;
            padding: 5px 10px;
        } */
        }
    }

    button.active {
        background: black;
        color: white;
    }
</style>
