class CustomDialog extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
  
        <div class="dialog-container">
          <div class="dialog-box">
            <h2>Archived Notes</h2>
            <div class="archived-list"></div>
            <button class="close-dialog">Close</button>
          </div>
        </div>
      `;
  }
}

customElements.define("custom-dialog", CustomDialog);
