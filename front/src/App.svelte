<script>

  let notes = [];

  async function loadNotes() {
    try {
      const res = await fetch("http://localhost:5001/api/notes/", {method: "GET"});

      notes = await res.json();
    } catch (err) {
      console.error("Failed to load notes:", err);
    }
  }
  loadNotes();
</script>

<main>
  <h2>Your Notes</h2>

  {#if notes.length === 0}
    <p>No notes found or still loading...</p>
  {/if}

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
</style>
