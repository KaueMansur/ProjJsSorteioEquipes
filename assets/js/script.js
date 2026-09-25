const nomeParticipanteInput = document.getElementById("nome_participante");
const quantidadeEquipesInput = document.getElementById("quantidade_equipes");
const quantidadeEquipesSpan = document.getElementById("quantidade_equipes_span");
const quantidadeParticipantesPorEquipeInput = document.getElementById("quantidade_participantes_por_equipe");
const quantidadeParticipantes = document.getElementById("quantidade_participantes");

const limiteParticipanteCheckbox = document.getElementById("limite_participantes_checkbox");
const limiteParticipantesInput = document.getElementById("limite_participantes");

const containerEquipes = document.getElementById("container_equipes");

const btnDefinirConfiguracoesDeEquipe = document.getElementById("btn_definir_configuracoes_equipe");

const btnAdicionarParticipante = document.getElementById("btn_adicionar_participante");
const listaParticipante = document.getElementById("lista_participantes");
const btnExcluirParticipante = document.querySelectorAll(".btn_excluir_participante");

const menuEdicaoEquipe = document.getElementById("menu_edicao_equipe");
const nomeEquipeEdicao = document.getElementById("nome_equipe_em_edicao");
const corEquipeEdicaoInput = document.getElementById("input_cor_equipe_em_edicao");
const btnSalvarEdicao = document.getElementById("btn_salvar_edicao");
const btnCancelarEdicao = document.getElementById("btn_cancelar_edicao");

const olParticipantesEquipeEdicao = document.getElementById("ol_partcipantes_equipe_edicao");

const btnSortear = document.getElementById("btn_sortear");

// const participantes = ["Kauê", "Bruno", "Son", "Luiz", "Shark", "Nemex", "Begalo", "bibi", "Rodrigo", "Jay", "Nya", "Kai", "Lloyd", "wu"];
const participantes = [];
const idsParticipantes = [];
let participantesParaSorteio = [];

let limiteParticipantes = null;

let quantidadeEquipes = 0;

let contagemParticipantes = 0;
let idAtual = 0;

function definirConfiguracoesDeEquipe() {
    definirQuantidadeEquipes();
}

function adicionarParticipante() {
    if (limiteParticipanteCheckbox.checked) {
        limiteParticipantes = limiteParticipantesInput.value;
    } else {
        limiteParticipantes = null;
    }
    if (participantes.length < limiteParticipantes || limiteParticipantes == null) {
        idAtual++;
        contagemParticipantes++;
        const nomeParticipante = nomeParticipanteInput.value
        participantes.push(nomeParticipante);
        idsParticipantes.push(idAtual);
        // console.log(participantes)

        const liParticipante = document.createElement("li");
        liParticipante.innerText = nomeParticipante;
        liParticipante.id = "participante_" + idAtual;
        liParticipante.classList.add("participante_li")
        listaParticipante.appendChild(liParticipante);

        const btnExcluirParticipante = document.createElement("button");
        const lixoImg = document.createElement("img");
        lixoImg.src = "../assets/img/icons/lata-de-lixo.png";
        btnExcluirParticipante.appendChild(lixoImg);
        btnExcluirParticipante.classList.add("btn_excluir_participante");
        btnExcluirParticipante.id = "btn_excluir_participante_" + idAtual;
        liParticipante.appendChild(btnExcluirParticipante);

        quantidadeParticipantes.innerText = contagemParticipantes;

        nomeParticipanteInput.value = "";
        nomeParticipanteInput.focus();
        // console.log("Participante adicionado!");
        // console.log(participantes);
        // console.log(idsParticipantes);
    } else {
        alert("Limite de participantes atingido!");
        nomeParticipanteInput.value = "";
        nomeParticipanteInput.focus();

    }
}

function excluirParticipante(idParticipante) {
    const i = idsParticipantes.indexOf(Number(idParticipante))
    idsParticipantes.splice(i, 1);
    participantes.splice(i, 1);

    contagemParticipantes--;

    quantidadeParticipantes.innerText = contagemParticipantes;

    document.getElementById("participante_" + idParticipante).remove();

    // console.log(participantes);
    // console.log(idsParticipantes);
}

function definirQuantidadeEquipes() {
    const liEquipe = document.querySelectorAll(".li_equipe");
    liEquipe.forEach((li) => {
        li.remove();
    })

    quantidadeEquipes = quantidadeEquipesInput.value;
    for (let i = 1; quantidadeEquipes >= i; i++) {
        const liEquipe = document.createElement("li");
        liEquipe.classList.add("li_equipe");
        liEquipe.id = "li_equipe_" + i;
        containerEquipes.appendChild(liEquipe);

        const nomeEquipe = document.createElement("h3");
        nomeEquipe.classList.add("nome_equipe");
        nomeEquipe.innerText = "Equipe " + i;
        nomeEquipe.id = "nome_equipe_" + i;
        liEquipe.appendChild(nomeEquipe);

        const olEquipe = document.createElement("ol");
        olEquipe.id = "ol_equipe_" + i;
        olEquipe.classList.add("ol_membros_equipe");
        liEquipe.appendChild(olEquipe);

        const btnActionsContainer = document.createElement("div");
        btnActionsContainer.classList.add("btn_actions_container");
        liEquipe.appendChild(btnActionsContainer);

        const btnEditarEquipe = document.createElement("button");
        // btnEditarEquipe.innerText = "Editar";
        const imgBtnEditar = document.createElement("img");
        imgBtnEditar.src = "../assets/img/icons/lapis-editar.png";
        btnEditarEquipe.appendChild(imgBtnEditar);
        btnEditarEquipe.classList.add("btn_editar_equipe");
        btnEditarEquipe.id = "btn_editar_equipe_" + i;
        btnActionsContainer.appendChild(btnEditarEquipe);

        const btnExcluirEquipe = document.createElement("button");
        const imgBtnExcluir = document.createElement("img");
        imgBtnExcluir.src = "../assets/img/icons/lata-de-lixo.png";
        btnExcluirEquipe.appendChild(imgBtnExcluir);
        // btnExcluirEquipe.innerText = "Excluir";
        btnExcluirEquipe.classList.add("btn_excluir_equipe");
        btnExcluirEquipe.id = "btn_excluir_equipe_" + i;
        btnActionsContainer.appendChild(btnExcluirEquipe);

        quantidadeEquipesSpan.innerText = quantidadeEquipes;
    }
}

function abrirMenuEdicaoEquipe(idEquipe) {
    menuEdicaoEquipe.classList.remove("desativado");
    menuEdicaoEquipe.name = "menu_edicao_" + idEquipe;
    // corEquipeEdicaoInput.value = menuEdicaoEquipe.style.backgroundColor;

    nomeEquipeEdicao.value = document.getElementById("nome_equipe_" + idEquipe).innerText;

    const lisParticipantesEquipes = document.getElementById("ol_equipe_" + idEquipe).children;

    for (const li of lisParticipantesEquipes) {
        const liParticipante = document.createElement("li");
        liParticipante.innerText = li.textContent;
        liParticipante.classList.add("li_membros_equipe");
        olParticipantesEquipeEdicao.appendChild(liParticipante);
    }
}

function excluirEquipe(idEquipe) {
    document.getElementById("li_equipe_" + idEquipe).remove();

    quantidadeEquipesSpan.innerText = quantidadeEquipesSpan.innerText - 1;

    document.querySelectorAll(".li_equipe").forEach((li, i) => {
        const index = i + 1;

        li.id = `li_equipe_${index}`;

        // Busca os elementos apenas DENTRO deste item da equipe
        li.querySelector(".btn_editar_equipe")?.setAttribute("id", `btn_editar_equipe_${index}`);
        li.querySelector(".btn_excluir_equipe")?.setAttribute("id", `btn_excluir_equipe_${index}`);
        li.querySelector(".ol_membros_equipe")?.setAttribute("id", `ol_equipe_${index}`);
        li.querySelector(".nome_equipe")?.setAttribute("id", `nome_equipe_${index}`);
    });
    quantidadeEquipes--;
}

function salvarEdicao() {
    const idEquipe = menuEdicaoEquipe.name.substring(12);

    document.getElementById("nome_equipe_" + idEquipe).innerText = nomeEquipeEdicao.value;
    // document.getElementById("li_equipe_" + idEquipe).style.backgroundColor = corEquipeEdicaoInput.value;

    menuEdicaoEquipe.classList.add("desativado");

    const lisParticipantesEquipe = olParticipantesEquipeEdicao.children;

    for (const li of lisParticipantesEquipe) {
        li.remove();
    }
}

function cancelarEdicao() {
    menuEdicaoEquipe.classList.add("desativado");

    const lisParticipantesEquipe = olParticipantesEquipeEdicao.children;

    for (const li of lisParticipantesEquipe) {
        li.remove();
    }
}

function sortearArray() {
    participantesParaSorteio = [...participantes];
    // console.log(participantesParaSorteio);

    let indiceAtual = participantesParaSorteio.length;

    // // Enquanto houver elementos para sortear
    while (indiceAtual !== 0) {
        // Escolhe um índice aleatório restante
        let indiceAleatorio = Math.floor(Math.random() * indiceAtual);
        indiceAtual--;

        // Troca o elemento atual com o elemento aleatório
        [participantesParaSorteio[indiceAtual], participantesParaSorteio[indiceAleatorio]] = [
            participantesParaSorteio[indiceAleatorio], participantesParaSorteio[indiceAtual]
        ];
    }

    definirEquipes();
}

function definirEquipes() {
    const quantidadeParticipantes = participantesParaSorteio.length;

    // console.log(quantidadeEquipes)

    const quantidadeParticipantesPorEquipe = quantidadeParticipantes / quantidadeEquipes;

    let indicesIniciais = quantidadeParticipantesPorEquipe;

    const participantesSorteados = [];

    const liMembrosEquipe = document.querySelectorAll(".li_membros_equipe");

    liMembrosEquipe.forEach((li) => {
        li.remove();
    })

    for (i = 1; i <= quantidadeEquipes; i++) {
        const olEquipe = document.getElementById("ol_equipe_" + i);
        for (index = quantidadeParticipantesPorEquipe * (i - 1); index < indicesIniciais; index++) {
            const liNome = document.createElement("li");
            liNome.classList.add("li_membros_equipe");
            const resultado = participantesParaSorteio[Math.round(index)];
            if (!participantesSorteados.includes(resultado) && resultado != undefined) {
                liNome.innerText = resultado;
                console.log(olEquipe)
                olEquipe.appendChild(liNome);
            }
            participantesSorteados.push(resultado);
            // console.log(liNome);
            console.log(Math.round(index))
        }
        indicesIniciais += quantidadeParticipantesPorEquipe;
    }
}

btnDefinirConfiguracoesDeEquipe.addEventListener("click", definirConfiguracoesDeEquipe);
btnAdicionarParticipante.addEventListener("click", adicionarParticipante);

limiteParticipanteCheckbox.addEventListener("click", () => {
    if (limiteParticipanteCheckbox.checked) {
        limiteParticipantesInput.disabled = false;
    } else {
        limiteParticipantesInput.disabled = true;
    }
});

containerEquipes.addEventListener("click", (event) => {
    const btn = event.target.closest(".btn_editar_equipe");
    console.log(btn)
    if (event.target && btn) {
        const idBtn = btn.id;
        console.log(idBtn);
        abrirMenuEdicaoEquipe(idBtn.substring(18));
    }
});

containerEquipes.addEventListener("click", (event) => {
    const btn = event.target.closest(".btn_excluir_equipe");
    if (event.target && btn) {
        const idBtn = btn.id;
        excluirEquipe(idBtn.substring(19));
    }
});

listaParticipante.addEventListener("click", (event) => {
    const btn = event.target.closest(".btn_excluir_participante");
    if (event.target && btn) {
        const idBtn = btn.id;
        // console.log(idBtn.substring(25))
        excluirParticipante(idBtn.substring(25));
    }
});

// corEquipeEdicaoInput.addEventListener("change", mudarCorDaEquipe);

btnSalvarEdicao.addEventListener("click", salvarEdicao);
btnCancelarEdicao.addEventListener("click", cancelarEdicao);
btnSortear.addEventListener("click", sortearArray);