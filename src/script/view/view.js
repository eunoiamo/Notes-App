import AllNotes from "../data/notesData.js";

const view = () => {
  const list = document.querySelector(".list");
  const searchBar = document.querySelector("search-bar");
  const formInput = document.querySelector("form-input");
  const titleField = formInput.shadowRoot.querySelector(".input-title");
  const bodyField = formInput.shadowRoot.querySelector("#body-input");

  const searchBarField = searchBar.shadowRoot.querySelector(".search__field");

  let filteredNotes = [];


  formInput.shadowRoot.addEventListener("submit", (e) => {
    e.preventDefault();
    const titleValue = titleField.value;
    const bodyValue = bodyField.value;
    const newNote = {
      id: `notes-${Date.now()}`,
      title: titleValue,
      body: bodyValue,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    if (!newNote.title || !newNote.body) {
      console.error("Title and body are required");
      return;
    }

    AllNotes.insertNote(newNote); 
    clearField();
    showAllNotes();
  });

  searchBarField.addEventListener("input", () => {
    const query = searchBarField.value.toLowerCase();
    filteredNotes = AllNotes.searchNote(query);
    displayResult(filteredNotes);
  });

  const clearField = ()=>{
    titleField.value = ''
    bodyField.value = ''
  }

  const showAllNotes = () => {
    const allNotes = AllNotes.getAll();
    const nonArchivedNotes = allNotes.filter(note => !note.archived);
    displayResult(nonArchivedNotes);
  };

  const displayResult = (notes) => {
    const notesHTML = notes.map((note) => {
      return `
        <div class="card">
          <h2 class="note__title">${note.title}</h2>
          <p class="note__body">${note.body}</p>
          <small class="timestamp">${new Date(
            note.createdAt
          ).toLocaleString()}</small>
          <button class="archive-button" data-note-id="${note.id}"><ion-icon name="archive-outline"></ion-icon>archive</button>
        </div>
      `;
    });
    list.innerHTML = notesHTML.join("");
  };
  
  list.addEventListener("click", (event) => {
    const clickedButton = event.target.closest(".archive-button");
    if (clickedButton) {
      const noteId = clickedButton.dataset.noteId;
      const success = AllNotes.toggleArchiveNote(noteId); // Mengubah status arsip
      if (success) {
        showAllNotes(); // Merender ulang setelah perubahan
      } else {
        console.error("Failed to toggle archive status for note:", noteId);
      }
    }
  });

  showAllNotes();
};

export default view;
