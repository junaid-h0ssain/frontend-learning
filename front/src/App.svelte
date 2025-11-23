<script>
  import { onMount } from 'svelte';

  let notes = [];
  let newTitle = '';
  let newContent = '';
  let message = '';

  const API_URL = "http://localhost:5001/api/notes";

  async function loadNotes() {
    try {
      const res = await fetch("http://localhost:5001/api/notes/", {method: "GET"});

      notes = await res.json();
    } catch (err) {
      console.error("Failed to load notes:", err);
    }
  }
  onMount(loadNotes);

  async function createNote() {
    if (!newTitle.trim() || !newContent.trim()) {
      message = "Title and content cannot be empty.";
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: newTitle, content: newContent })
      });

      if (res.ok) {
        message = 'Note created successfully!';
        newTitle = '';
        newContent = '';
        await loadNotes(); // Reload notes to show the new one
      } else {
        message = `Failed to create note: ${res.statusText}`;
      }
    } catch (err) {
      console.error("Failed to create note:", err);
      message = "Error creating note.";
    }
  }


</script>

<main>
  <h2>Your Notes</h2>

  {#if message}
    <p class="status-message">{message}</p>
  {/if}

  {#if notes.length === 0}
    <p>No notes found or still loading...</p>
  {/if}

  <section class="form-container">
    <h2>Create New Note</h2>
    <form on:submit|preventDefault={createNote}>
      <input type="text" placeholder="Title" bind:value={newTitle} required />
      <textarea placeholder="Content" rows="4" bind:value={newContent} required></textarea>
      <button type="submit" class="create-btn">Add Note</button>
    </form>
  </section>

  {#each notes as note}
    <div class="note-card">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <p>Created: {new Date(note.createdAt).toLocaleDateString("en-GB")}</p>
      <p>Last Edited: {new Date(note.updatedAt).toLocaleDateString("en-GB")}</p>
      <hr>
    </div>
  {/each}
</main>

<style>
  .note-card {
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 8px;
    background: #070707;
  }

  .form-container {
    padding: 20px;
    background: #1e1e1e;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .create-btn {
    background: #4CAF50;
    color: white;
  }

  .create-btn:hover {
    background: #45a049;
  }
</style>