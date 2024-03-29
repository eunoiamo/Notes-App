import './styles/style.css'
import view from './script/view/view.js';
import './script/component/index.js'
import showArchivedNotes from './script/view/archiveNotes.js'

document.addEventListener('DOMContentLoaded', () => {
  view();
  showArchivedNotes()
});
