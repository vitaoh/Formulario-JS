let itensExibidos = 0;
let registros = [];

let toast = document.getElementById("toast");
let bstoast = new bootstrap.Toast(toast);

document.getElementById("limpar").addEventListener("click", () => limparForm());

document.getElementById("nome").addEventListener("input", () => validarNome("nome"));
document.getElementById("cep").addEventListener("input", () => validarCEP("cep"));
document.getElementById("numero").addEventListener("input", () => validarNumero("numero"));
document.getElementById("tele").addEventListener("input", () => validarTelefone("tele"));
document.getElementById("foto").addEventListener("input", () => validarURL("foto"));

document.getElementById("fechar1").addEventListener("click", fecharModal);
document.getElementById("fechar2").addEventListener("click", fecharModal);

document.getElementById("form").addEventListener("submit", (e) => subirForm(e));

function renderizarGrid() {
    let infos = document.getElementById("infos");
    infos.innerHTML = ""; 

    registros.slice(0, itensExibidos).forEach((registro, index) => {
        let col = document.createElement("div");
        col.classList.add("col-md-4");

        let card = document.createElement("div");
        card.classList.add("card", "p-3", "mb-3", "shadow-sm");

        let urlImg = document.createElement("img");
        urlImg.src = registro.foto;
        urlImg.alt = "Imagem";
        urlImg.classList.add("img-fluid", "mb-3", "imagens");

        let nome = document.createElement("h3");
        nome.textContent = "Nome: " + registro.nome;
        nome.classList.add("mb-2");

        let tele = document.createElement("p");
        tele.textContent = "Telefone: " + registro.tele;

        let cep = document.createElement("p");
        cep.textContent = "CEP: " + registro.cep;

        let numero = document.createElement("p");
        numero.textContent = "Número: " + registro.numero;

        let complemento = document.createElement("p");
        complemento.textContent = "Complemento: " + registro.complemento;

        let editar = document.createElement("button");
        editar.textContent = "Editar";
        editar.classList.add("btn", "btn-primary");
        editar.addEventListener("click", () => abrirModal(registro, index));

        let excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.classList.add("btn", "btn-danger", "me-2");
        excluir.addEventListener("click", () => excluirRegistro(index));

        let divBtn = document.createElement("div");
        divBtn.classList.add("col", "text-end");

        card.appendChild(urlImg);
        card.appendChild(nome);
        card.appendChild(tele);
        card.appendChild(cep);
        card.appendChild(numero);
        card.appendChild(complemento);
        divBtn.appendChild(excluir);
        divBtn.appendChild(editar);
        card.appendChild(divBtn);

        col.appendChild(card);
        infos.appendChild(col);
    });

    atualizarBotaoMostrarMais();
}

function atualizarBotaoMostrarMais() {
    let btnMostrarMais = document.getElementById("btnMostrarMais");

    if (itensExibidos < registros.length) {
        btnMostrarMais.style.display = "block";
    } else {
        btnMostrarMais.style.display = "none";
    }
}

function mostrarMais() {
    itensExibidos += 6; 
    renderizarGrid(); 
}


document.addEventListener("DOMContentLoaded", () => {
    itensExibidos = 6; 
    renderizarGrid();

    let btnMostrarMais = document.getElementById("btnMostrarMais");
    btnMostrarMais.addEventListener("click", mostrarMais);
});

function subirForm(e) {

    e.preventDefault();

    let nome = document.getElementById("nome").value;
    let cep = document.getElementById("cep").value;
    let numero = document.getElementById("numero").value;
    let complemento = document.getElementById("complemento").value;
    let tele = document.getElementById("tele").value;
    let foto = document.getElementById("foto").value;

    let registro = { nome, cep, numero, complemento, tele, foto };
    registros.push(registro);

    mostrarToast("Informacoes registradas!");

    renderizarGrid();
};

function abrirModal(registro, index) {
    let modal = document.getElementById("editarModal");
    modal.style.display = "block";

    document.getElementById("nome-e").value = registro.nome;
    document.getElementById("cep-e").value = registro.cep;
    document.getElementById("numero-e").value = registro.numero;
    document.getElementById("complemento-e").value = registro.complemento;
    document.getElementById("tele-e").value = registro.tele;
    document.getElementById("foto-e").value = registro.foto;

    document.getElementById("nome-e").addEventListener("input", () => validarNome("nome-e"));
    document.getElementById("cep-e").addEventListener("input", () => validarCEP("cep-e"));
    document.getElementById("numero-e").addEventListener("input", () => validarNumero("numero-e"));
    document.getElementById("tele-e").addEventListener("input", () => validarTelefone("tele-e"));
    document.getElementById("foto-e").addEventListener("input", () => validarURL("foto-e"));

    document.getElementById("form-e").onsubmit = (e) => {
        e.preventDefault();

        registros[index] = {
            nome: document.getElementById("nome-e").value,
            cep: document.getElementById("cep-e").value,
            numero: document.getElementById("numero-e").value,
            complemento: document.getElementById("complemento-e").value,
            tele: document.getElementById("tele-e").value,
            foto: document.getElementById("foto-e").value,
        };

        modal.style.display = "none";
        renderizarGrid();
    };
};

function fecharModal() {
    let modal = document.getElementById("editarModal");
    modal.style.display = "none";
};

function excluirRegistro(index) {
    registros.splice(index, 1);
    renderizarGrid();
};

function limparForm() {
    document.getElementById("nome").value = "";
    document.getElementById("cep").value = "";
    document.getElementById("numero").value = "";
    document.getElementById("complemento").value = "";
    document.getElementById("tele").value = "";
    document.getElementById("foto").value = "";
};

function mostrarToast(mensagem) {

    let toast = document.getElementById("toast");
    document.getElementById("textoToast").textContent = mensagem;

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

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

