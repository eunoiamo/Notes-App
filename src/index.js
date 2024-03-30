import "./styles/style.css";
import view from "./script/view/view.js";
import "./script/component/index.js";
import showArchivedNotes from "./script/view/archiveNotes.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function hideLoader() {
  const loader = document.querySelector(".loader");
  loader.classList.add("loader-hidden");
}

window.addEventListener("load", () => {
  setTimeout(() => {
    hideLoader();
  }, 450);
});

document.addEventListener("DOMContentLoaded", () => {
  gsap.from(".list", {
    opacity: 0,
    y: 50,
    duration: 0.5,
    ease: "back.in(1.7)",
    scrollTrigger: {
      start: "10px top",
      end: "bottom bottom",
      scrub: 1,
    },
  });
  view();
  showArchivedNotes();
});
