import './styles/style.css'
import view from './script/view/view.js';
import './script/component/index.js'
import showArchivedNotes from './script/view/archiveNotes.js'


function hideLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.add('loader-hidden');
}

window.addEventListener('load', () => {
  setTimeout(() => {
    hideLoader();
  }, 2000);
});

document.addEventListener('DOMContentLoaded', () => {
  view();
  showArchivedNotes();
});

