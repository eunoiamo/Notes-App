import ApiNotes from "../data/apiNotes";

const showArchivedNotes = () => {
  const archivedNotesList = document.querySelector(".archived-list");

  ApiNotes.getArchivedNotes()
    .then((response) => {
      if (response.data.length === 0) {
        archivedNotesList.innerHTML = "<p>Arsip Kosong...</p>";
      } else {
        displayArchivedNotes(response.data);
      }
    })
    .catch((error) => {
      console.error(error);
    });

  const displayArchivedNotes = (notes) => {
    const notesHTML = notes.map((note) => {
      return `
        <div class="card">
          <h2 class="note__title">${note.title}</h2>
          <p class="note__body">${note.body}</p>
          <small class="timestamp">${new Date(
            note.createdAt
          ).toLocaleString()}</small>
          <button class="restore-button" data-note-id="${
            note.id
          }">Restore</button>
        </div>
      `;
    });
    archivedNotesList.innerHTML = notesHTML.join("");
  };

  archivedNotesList.addEventListener("click", (event) => {
    const clickedButton = event.target.closest(".restore-button");
    if (clickedButton) {
      const noteId = clickedButton.dataset.noteId;
      ApiNotes.restoreArchivedNote(noteId)
        .then((message) => {
          console.log(message);
          showArchivedNotes();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });
};

export default showArchivedNotes;
