import { gsap } from "gsap";

class Anim { 
    static animateButtonClick(button) {
        gsap.to(button, {
          duration: 0.14,
          scale: 0.85,
          ease: "power1.inOut",
          onComplete: () => {
            gsap.to(button, { duration: 0.14, scale: 1, ease: "power1.inOut" });
          }
        });
      }
      static deleteButton(card){
        gsap.to(card, {
            duration: 1,
            scale: 0,
            opacity:0,
            ease: 'power4.inOut',
            onComplete: () => {
                gsap.to(card, { duration: 0.14, scale: .1, ease: "power2.inOut" });
              }
        })
      }
}

export default Anim