<script>
  import { onMount } from 'svelte';

  let notes = [];
  let newTitle = '';
  let newContent = '';
  let message = '';
  let isEditing = false;
  let editId = null;
  let editTitle = '';
  let editContent = '';

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
        await loadNotes(); 
      } else {
        message = `Failed to create note: ${res.statusText}`;
      }
    } catch (err) {
      console.error("Failed to create note:", err);
      message = "Error creating note.";
    }
  }

  async function deleteNote(id) {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        message = 'Note deleted successfully!';
        await loadNotes(); // Reload notes
      } else {
        message = `Failed to delete note: ${res.statusText}`;
      }
    } catch (err) {
      console.error("Failed to delete note:", err);
      message = "Error deleting note.";
    }
  }

  function startEdit(note) {
    isEditing = true;
    editId = note._id;
    editTitle = note.title;
    editContent = note.content;
    message = '';
  }

  async function updateNote() {
    if (!editTitle.trim() || !editContent.trim()) {
      message = "Title and content cannot be empty.";
      return;
    }

    try {
      const res = await fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: editTitle, content: editContent })
      });

      if (res.ok) {
        message = 'Note updated successfully!';
        cancelEdit(); 
        await loadNotes(); 
      } else {
        message = `Failed to update note: ${res.statusText}`;
      }
    } catch (err) {
      console.error("Failed to update note:", err);
      message = "Error updating note.";
    }
  }

  function cancelEdit() {
    isEditing = false;
    editId = null;
    editTitle = '';
    editContent = '';
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

  {#if isEditing}
    <section class="form-container">
      <h2>Edit Note</h2>
      <form on:submit|preventDefault={updateNote}>
        <input type="text" placeholder="Title" bind:value={editTitle} required />
        <textarea placeholder="Content" rows="4" bind:value={editContent} required></textarea>
        <div class="form-actions">
          <button type="submit" class="save-btn">Save Changes</button>
          <button type="button" on:click={cancelEdit} class="cancel-btn">Cancel</button>
        </div>
      </form>
    </section>
    <hr>
  {/if}

  <section class="form-container">
    <h2>Create New Note</h2>
    <form on:submit|preventDefault={createNote}>
      <input type="text" placeholder="Title" bind:value={newTitle} required />
      <textarea placeholder="Content" rows="4" bind:value={newContent} required></textarea>
      <button type="submit" class="create-btn">Add Note</button>
    </form>
  </section>

  {#if notes.length === 0}
    <p>No notes found. Create one above!</p>
  {:else}
    <div class="notes-grid">
      {#each notes as note (note._id)}
        <div class="note-card">
          <h3>{note.title}</h3>
          <p class="content-text">{note.content}</p>
          <div class="timestamp">
            <p>Created: {new Date(note.createdAt).toLocaleDateString("en-GB")}</p>
            <p>Last Edited: {new Date(note.updatedAt).toLocaleDateString("en-GB")}</p>
          </div>
          <div class="card-actions">
            <button class="edit-btn" on:click={() => startEdit(note)}>Edit</button>
            <button class="delete-btn" on:click={() => deleteNote(note._id)}>Delete</button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</main>

<style>
  :global(body) {
    font-family: sans-serif;
    background-color: #121212;
    color: #e0e0e0;
    margin: 0;
    padding: 20px;
  }

  main {
    max-width: 800px;
    margin: 0 auto;
  }

  h1, h2, h3 {
    color: #4CAF50; /* Green highlight */
  }

  .status-message {
    padding: 10px;
    background: #4CAF5020;
    border: 1px solid #4CAF50;
    border-radius: 4px;
    margin-bottom: 20px;
  }

  /* Form Styles */
  .form-container {
    padding: 20px;
    background: #1e1e1e;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  input[type="text"], textarea {
    padding: 10px;
    border: 1px solid #333;
    border-radius: 4px;
    background: #2c2c2c;
    color: #e0e0e0;
    width: 100%;
    box-sizing: border-box;
  }

  /* Button Styles */
  button {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.2s;
  }

  .create-btn {
    background: #4CAF50;
    color: white;
  }

  .create-btn:hover {
    background: #45a049;
  }

  .form-actions {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }

  .save-btn {
    background: #2196F3; /* Blue */
    color: white;
  }

  .save-btn:hover {
    background: #0b7dda;
  }

  .cancel-btn {
    background: #f44336; /* Red */
    color: white;
  }

  .cancel-btn:hover {
    background: #da190b;
  }

  /* Note Card Styles */
  .notes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  .note-card {
    padding: 15px;
    border-radius: 8px;
    background: #070707;
    border: 1px solid #333;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .content-text {
    flex-grow: 1;
    margin-top: 0;
  }

  .timestamp {
    font-size: 0.8em;
    color: #aaa;
    margin-top: 10px;
  }

  hr {
    border: 0;
    height: 1px;
    background: #333;
    margin: 20px 0;
  }

  .card-actions {
    display: flex;
    gap: 10px;
    margin-top: 15px;
  }

  .edit-btn {
    background: #FFC107; /* Amber */
    color: black;
  }

  .edit-btn:hover {
    background: #ffb300;
  }

  .delete-btn {
    background: #f44336; /* Red */
    color: white;
  }

  .delete-btn:hover {
    background: #da190b;
  }
</style>