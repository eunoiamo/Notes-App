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
        background: #e0e0e0;
        box-shadow:  5px 5px 10px #c7c7c7,
                     -5px -5px 10px #f9f9f9;


      }
      .navbar-container {
        display: flex;
        justify-content: space-between;
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
      .open-dialog{
        position:relative;
        justify-self: flex-end;
        display: flex;
        gap: 10px;
        font-weight: bold;
        font-size: 1em;
        padding: 0 8px;
        color:#333;
        
        align-items : center;
        background-color: transparent;
        border: 1px solid #333;
        border-radius:10px;
        cursor: pointer;
      
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
          <button class="open-dialog"><ion-icon name="archive"></ion-icon>Archived</button>
        </div>
      </nav>
      `;
  }
}

customElements.define("custom-header", CustomHeader);
