class CustomHeader extends HTMLElement {
  constructor() {
    super();

    this._shadow = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  updateStyle() {
    this._style.textContent = `
      :host{
      }
      nav {
        width: 100%;
        background-color: transparent;
        border-radius: 3px;
        box-shadow:  20px 20px 60px #c4c38b,
             -20px -20px 60px #ffffbb;


      }
      .navbar-container {
        width: 80%;
        margin: 0 auto;
        text-align: center;
        padding-block: 10px;

    }
      h2{
          margin : 10px;
          font-family: Quicksand;

          font-size: 1.7em;
          font-family: sans-serif;
      }
      
      `;
  }

  connectedCallback() {
    this.render();
  }
  render() {
    this.updateStyle();

    this._shadow.append(this._style);
    this._shadow.innerHTML += `
      <nav>
        <div class="navbar-container">
          <h2>Notes App</h2>
        </div>
      </nav>
      `;
  }
}

customElements.define("custom-header", CustomHeader);
