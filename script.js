let cont = 0;

document.getElementById("limpar").addEventListener("click", () => {

    document.getElementById("nome").value = "";
    document.getElementById("cep").value = "";
    document.getElementById("numero").value = "";
    document.getElementById("complemento").value = "";
    document.getElementById("tele").value = "";
    document.getElementById("url").value = "";
});

document.getElementById("form").addEventListener("submit", (e) => {

    e.preventDefault();

    let infos = document.getElementById("infos");

    let nome = document.getElementById("nome").value;
    let cep = document.getElementById("cep").value;
    let numero = document.getElementById("numero").value;
    let complemento = document.getElementById("complemento").value;
    let tele = document.getElementById("tele").value;
    let url = document.getElementById("foto").value;

    if (cont % 3 === 0) {
        let divRow = document.createElement("div");
        divRow.classList.add("row", "g-3");
        infos.appendChild(divRow);
    }

    let lastRow = infos.lastElementChild;
    lastRow.classList.add("mb-3");

    let card = document.createElement("div");
    let divSec = document.createElement("div");

    let url1 = document.createElement("img");
    let nome1 = document.createElement("h3");
    let tele1 = document.createElement("p");
    let cep1 = document.createElement("p");
    let numero1 = document.createElement("p");
    let complemento1 = document.createElement("p");

    let editar = document.createElement("button");
    let excluir = document.createElement("button");

    editar.classList.add("btn", "btn-primary", "mb-2");
    excluir.classList.add("btn", "btn-danger");

    card.classList.add("card", "rounded", "shadow-sm", "p-3", "mb-3", "bg-body");
    divSec.classList.add("col");

    url1.src = url;
    url1.alt = "Imagem";
    url1.classList.add("img-fluid", "mb-3", "imagens");
    nome1.textContent = "Nome: " + nome;
    nome1.classList.add("mb-3")
    tele1.textContent = "Telefone: " + tele;
    cep1.textContent = "CEP: " + cep;
    numero1.textContent = "Numero: " + numero;
    complemento1.textContent = "Complemento: " + complemento;

    editar.textContent = "Editar";
    excluir.textContent = "Excluir";

    card.appendChild(url1);
    card.appendChild(nome1);
    card.appendChild(tele1);
    card.appendChild(cep1);
    card.appendChild(numero1);
    card.appendChild(complemento1);
    card.appendChild(editar);
    card.appendChild(excluir);

    let col = document.createElement("div");
    col.classList.add("col-md-4");
    col.appendChild(card);
    lastRow.appendChild(col);

    cont++;

    excluir.addEventListener("click", () => {
        col.remove();
        cont--;
    });

    editar.addEventListener("click", () => {
        let modal = document.getElementById("editarModal");
        modal.style.display = "block";

        document.getElementById("nome-e").value = nome1.textContent.replace("Nome: ", "");
        document.getElementById("cep-e").value = cep1.textContent.replace("CEP: ", "");
        document.getElementById("numero-e").value = numero1.textContent.replace("Numero: ", "");
        document.getElementById("complemento-e").value = complemento1.textContent.replace("Complemento: ", "");
        document.getElementById("tele-e").value = tele1.textContent.replace("Telefone: ", "");
        document.getElementById("url-e").value = url1.src;

        document.getElementById("form-e").onsubmit = (e) => {
            e.preventDefault();

            url1.src = document.getElementById("url-e").value;
            nome1.textContent = document.getElementById("nome-e").value;
            tele1.textContent = document.getElementById("tele-e").value;
            cep1.textContent = document.getElementById("cep-e").value;
            numero1.textContent = document.getElementById("numero-e").value;
            complemento1.textContent = document.getElementById("complemento-e").value;

            modal.style.display = "none";
        };
    });
});

document.getElementById("nome").addEventListener("input", () => validarNome("nome"));
document.getElementById("cep").addEventListener("input", () => validarCEP("cep"));
document.getElementById("numero").addEventListener("input", () => validarNumero("numero"));
document.getElementById("tele").addEventListener("input", () => validarTelefone("tele"));
document.getElementById("foto").addEventListener("input", () => validarURL("foto"));

function validarNome(nome) {

    let texto = document.getElementById(nome).value;
    let textoF = "";

    for (let index = 0; index < texto.length; index++) {

        if (isNaN(texto[index]) || texto[index] === " ") {
            textoF += texto[index];
        }
    }

    document.getElementById(nome).value = textoF;
};

function validarCEP(cep) {

    let texto = document.getElementById(cep).value;
    let textoF = "";

    for (let i = 0; i < texto.length; i++) {
        if (textoF.length <= 8) {
            if (!isNaN(texto[i]) && texto[i] !== " ") {
                textoF += texto[i];
            }
        }
    }

    if (textoF.length > 5 && textoF[6] != "-") {
        textoF = textoF.slice(0, 5) + "-" + textoF.slice(5, 8);
    }


    document.getElementById(cep).value = textoF;

};

function validarNumero(numero) {

    let texto = document.getElementById(numero).value;
    let textoF = "";

    for (let i = 0; i < texto.length; i++) {
        if (textoF.length < 3 && !isNaN(texto[i]) && texto[i] !== " ") {
            textoF += texto[i];
        }
    }

    document.getElementById(numero).value = textoF;
};


function validarTelefone(tele) {
    let texto = document.getElementById(tele).value;
    let textoF = "";

    for (let i = 0; i < texto.length; i++) {
        if (!isNaN(texto[i]) && texto[i] !== " ") {
            textoF += texto[i];
        }
        if (textoF.length >= 11) {
            break;
        }
    }

    let textoFF = "";

    if (textoF.length > 0) {
        textoFF = "(" + textoF.slice(0, 2);
    }
    if (textoF.length > 2) {
        textoFF += ") " + textoF.slice(2, 7);
    }
    if (textoF.length > 7) {
        textoFF += "-" + textoF.slice(7);
    }

    document.getElementById(tele).value = textoFF;
};

function validarURL(foto) {

    let texto = document.getElementById(foto).value;
    let textoF = "";
    let start = "https://";

    if (texto.startsWith(start.slice(0, texto.length))) {
        textoF += texto;
    }
    else textoF = texto.slice(0, texto.length - 1);

    document.getElementById(foto).value = textoF;

};

