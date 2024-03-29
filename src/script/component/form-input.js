class FormInput extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }
  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
        * {
            padding: 0;
            margin: 0;
        
            box-sizing: border-box;
        }
        .form-create-notes {
            max-width: 1000px;
            display: flex;
            flex-direction: column;
            gap: 30px;
            padding: 26px;
            background-color: #F9FBFF  ;
            border-radius: 12px;
            margin: 50px auto;
            border: 1px solid #3333;

            box-shadow:  5px 2px 18px #c7c7c7,
             -4px -2px 10px #f9f9f9;
            width: 80%;
            justify-content: center;
          }
          
          .form-control {
            position: relative;
            width: 100%;
          }
          .form-control input,
          .form-control textarea {
            width: 100%;
          
            background-color: #F9FBFF  ;
            border: 1px solid #3333;
            border-radius: 12px;
            outline: none;
            padding: 10px 20px;
            font-size: 1.1em;
            font-family: Quicksand;
            font-weight: normal;
          }
          .form-control textarea {
            resize: vertical;
            height: 250px;
          }
          
          .form-control label {
            position: absolute;
            left: 0;
            margin: 10px 10px;
            pointer-events: none;
            padding: 1px 8px;
            font-size: 1.1rem;
            font-weight: bold;
            text-transform: capitalize;
            background-color: #F9FBFF  ;
          
            color: #333;
            transition: 0.2s all ease-in-out;
          }
          .form-control input:focus ~ label,
          .form-control textarea:focus ~ label,
          .form-control input:valid ~ label,
          .form-control textarea:valid ~ label
           {
            transform: translate(0px, -20px);
            font-size: 1rem;
            background-color: #F9FBFF  ;
          }
          
          .pesan-validasi{
            color:red;
            text-align:left;
            font-size:.69rem;
            font-weight: bold;
            margin-inline: 15px;
          }
          .submit-button {
            max-width: 10rem;
            padding: 5px 40px;
            cursor:pointer;
            border: 3px solid transparent;
            border-radius: 10px;
            font-weight: bold;
            align-self: flex-end;
            font-size:1.8rem;
            font-weight:bold;
            display:flex;
            gap:12px;
            align-items:center;
            background-color: #133955;
            color: #f6f6f6;
          }
          
          
          .submit-button:hover {
            border: 3px solid #133955;
            border-radius: 15px;
            font-weight: bold;
            align-self: flex-end;
            background-color: #f6f6f6;
            color: #133955;
          }
          
          
          @media (max-width: 760px) {
            .form-control textarea {
              resize: vertical;
              height: 200px;
            }
            
          }
        `;
  }

  render() {
    this.updateStyle();

    const form = document.createElement("form");
    form.classList.add("form-create-notes");

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.name = "input-title";
    titleInput.id = "input-title";
    titleInput.classList.add("input-title");
    titleInput.required = true;
    titleInput.pattern = "^(?![_. ])(?!.*[_. ]{2})[a-zA-Z0-9._ ]+(?<![_. ])$";
    titleInput.minLength = "2";
    titleInput.autocomplete = "off";
    titleInput.ariaDescribedby = "validasijudul";

    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "input-title");
    titleLabel.classList.add("label-input");
    titleLabel.textContent = "Judul catatan";

    const deskripsi = document.createElement("p");
    deskripsi.setAttribute("id", "validasijudul");
    deskripsi.classList.add("pesan-validasi");
    deskripsi.ariaLive = "polite";

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("form-control");
    titleDiv.appendChild(titleInput);
    titleDiv.appendChild(titleLabel);
    titleDiv.appendChild(deskripsi);

    titleInput.addEventListener("input", (event) => {
      const inputValue = event.target.value;
      const validity = event.target.validity;

      if (validity.tooShort) {
        deskripsi.textContent = "Minimal panjang judul adalah dua karakter.";
        return;
      }

      if (validity.patternMismatch) {
        deskripsi.textContent =
          "Format judul tidak valid, jangan gunakan spasi atau spesial karakter seperti ($)";
        return;
      }
      deskripsi.textContent = "";
    });
    const bodyTextarea = document.createElement("textarea");
    bodyTextarea.name = "body-input";
    bodyTextarea.id = "body-input";
    bodyTextarea.required = true;
    const bodyLabel = document.createElement("label");
    bodyLabel.setAttribute("for", "body-input");
    bodyLabel.textContent = "Masukkan catatan";
    const bodyDiv = document.createElement("div");
    bodyDiv.classList.add("form-control");
    bodyDiv.appendChild(bodyTextarea);
    bodyDiv.appendChild(bodyLabel);

    const submitButton = document.createElement("button");
    submitButton.classList.add("submit-button");
    submitButton.type = "submit";
    submitButton.innerHTML = '<ion-icon name="add-outline"></ion-icon> ';
    
    form.appendChild(titleDiv);
    form.appendChild(bodyDiv);
    form.appendChild(submitButton);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(this._style);
    this.shadowRoot.appendChild(form);
  }
}

customElements.define("form-input", FormInput);
