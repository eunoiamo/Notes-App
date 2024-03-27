class SearchBar extends HTMLElement {
  static observedAttributes = ["data-placeholder"];
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
    this._customPlaceholder = this.getAttribute("data-placeholder");
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
          
          .search__wrapper {
            width: 80%;
            max-width: 1000px;
            display: flex;
            align-items: center;
            gap: 20px;
            margin: 20px auto;
            padding: 14px;
            border-radius: 50px;
            background-color: #f6f6f6;
          }
          
          .search__icon {
            border: transparent;
            background: transparent;
            padding: 0;
            align-items: center;
            display: flex;
            color: #333;
            cursor: pointer;
            font-size: 1.7em;
          }
          
          .search__field {
            font-weight: bolder;
            font-size: 1.3em;
            font-family: Quicksand;
            outline: none;
            border: none;
            background: transparent;
            width: 100%;
          }
          .search__field::placeholder{
            text-transform: capitalize;
          }
          .search__field::placeholder,
          .search__icon {
            color: rgba(0, 0, 0, .6);
          }
          
        `;
  }

  render() {
    this.updateStyle();
    this._shadowRoot.appendChild(this._style);

    const form = document.createElement("form");
    form.className = "search";
    form.innerHTML = `
            <div class="search__wrapper">
              <button class="search__icon"><ion-icon name="search-outline"></ion-icon></button>
              <input type="search" name="input" id="search" placeholder="${this._customPlaceholder}" class="search__field">
            </div>
        `;
    this._shadowRoot.appendChild(form);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[`_${name}`] = newValue;
  }
}

customElements.define("search-bar", SearchBar);
