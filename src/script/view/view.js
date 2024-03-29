import ApiNotes from "../data/apiNotes";
import { showSuccessAlert, showErrorAlert } from "./alerts";
import showArchivedNotes from "./archiveNotes";

const view = () => {
  const list = document.querySelector(".list");
  const searchBar = document.querySelector("search-bar");
  const formInput = document.querySelector("form-input");
  const titleField = formInput.shadowRoot.querySelector(".input-title");
  const bodyField = formInput.shadowRoot.querySelector("#body-input");
  const customHeader = document.querySelector('custom-header')
  const buttonOpenDialog = customHeader.shadowRoot.querySelector('.open-dialog')
  const customDialog = document.querySelector('#archivedNotesDialog')
  const buttonCloseDialog = customDialog.querySelector('.close-dialog')
  const searchBarField = searchBar.shadowRoot.querySelector(".search__field");
  let filteredNotes = [];

  buttonOpenDialog.addEventListener('click', ()=>{
    customDialog.showModal();
  })
  buttonCloseDialog.addEventListener('click', ()=>{
    customDialog.close();
  })

  formInput.shadowRoot.addEventListener("submit", (e) => {
    e.preventDefault();
    const titleValue = titleField.value;
    const bodyValue = bodyField.value;
    const newNote = {
      title: titleValue,
      body: bodyValue,
    };

    if (!newNote.title || !newNote.body) {
      console.error("Title and body are required");
      return;
    }

    ApiNotes.insertNote(newNote)
      .then((message) => {
        showSuccessAlert(message);
        showAllNotes();
        clearField();
      })
      .catch((error) => {
        showErrorAlert(error);
      });
    });

  searchBarField.addEventListener("input", () => {
    const query = searchBarField.value.toLowerCase();
    filteredNotes = AllNotes.searchNote(query);
    displayResult(filteredNotes);
  });
  
  const clearField = () => {
    titleField.value = "";
    bodyField.value = "";
  };

  const showAllNotes = () => {
    ApiNotes.getNotes()
      .then((response) => {
        displayResult(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
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
          <button class="archive-button" data-note-id="${
            note.id
          }"><ion-icon name="archive-outline"></ion-icon>archive</button>
          <button class="delete-button" data-note-id="${
            note.id
          }"><ion-icon name="close-outline"></ion-icon></button>
        </div>
      `;
    });
    list.innerHTML = notesHTML.join("");
  };

  list.addEventListener("click", (event) => {
    const clickedArchiveButton = event.target.closest(".archive-button");
    const clickedDeleteButton = event.target.closest(".delete-button");
  
    if (clickedArchiveButton) {
      const noteId = clickedArchiveButton.dataset.noteId;
      ApiNotes.archiveNote(noteId)
        .then((message) => {
          showSuccessAlert(message);
          showAllNotes();
          showArchivedNotes()
        })
        .catch((error) => {
          showErrorAlert(error);
        });
    }
  
    if (clickedDeleteButton) {
      const noteId = clickedDeleteButton.dataset.noteId;
      ApiNotes.deleteNote(noteId)
        .then((message) => {
          showSuccessAlert(message);
          showAllNotes();
        })
        .catch((error) => {
          showErrorAlert(error);
        });
    }
  });

  showAllNotes();
};

export default view;
