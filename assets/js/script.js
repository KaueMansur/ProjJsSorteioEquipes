const nomeParticipanteInput = document.getElementById("nome_participante");
const quantidadeEquipesInput = document.getElementById("quantidade_equipes");
const quantidadeParticipantesPorEquipeInput = document.getElementById("quantidade_participantes_por_equipe");

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

const btnSortear = document.getElementById("btn_sortear");

const participantes = ["Kauê", "Bruno", "Son", "Luiz", "Shark", "Nemex"];
const idsParticipantes = [];
let participantesParaSorteio = [];

let limiteParticipantes = null;

let quantidadeEquipes = 0;

let contagemParticipantes = 0;

function definirConfiguracoesDeEquipe() {
    definirQuantidadeEquipes();
}

function adicionarParticipante() {
    if (limiteParticipanteCheckbox.checked) {
        limiteParticipantes = limiteParticipantesInput.value;
    }
    if (participantes.length < limiteParticipantes || limiteParticipantes == null) {
        contagemParticipantes++;
        const nomeParticipante = nomeParticipanteInput.value
        participantes.push(nomeParticipante);
        idsParticipantes.push(contagemParticipantes);
        // console.log(participantes)

        const liParticipante = document.createElement("li");
        liParticipante.innerText = nomeParticipante;
        liParticipante.id = "participante_" + contagemParticipantes;
        listaParticipante.appendChild(liParticipante);

        const btnExcluirParticipante = document.createElement("button");
        btnExcluirParticipante.innerText = "Excluir";
        btnExcluirParticipante.classList.add("btn_excluir_participante");
        btnExcluirParticipante.id = "btn_excluir_participante_" + contagemParticipantes;
        liParticipante.appendChild(btnExcluirParticipante);

        nomeParticipanteInput.value = "";
        nomeParticipanteInput.focus();
        // console.log("Participante adicionado!");
        // console.log(participantes);
        // console.log(idsParticipantes);
    } else {
        // console.log("Limite de participantes atingido!");
    }
}

function excluirParticipante(idParticipante) {
    const i = idsParticipantes.indexOf(Number(idParticipante))
    idsParticipantes.splice(i, 1);
    participantes.splice(i, 1);

    document.getElementById("participante_" + idParticipante).remove();

    // console.log(participantes);
    // console.log(idsParticipantes);
}

function definirQuantidadeEquipes() {
    quantidadeEquipes = quantidadeEquipesInput.value;
    for (let i = 1; quantidadeEquipes >= i; i++) {
        const liEquipe = document.createElement("li");
        liEquipe.classList.add("li_equipe");
        liEquipe.id = "li_equipe_" + i;
        containerEquipes.appendChild(liEquipe);

        const ulEquipe = document.createElement("ul");
        ulEquipe.id = "ul_equipe_" + i;
        liEquipe.appendChild(ulEquipe);

        const nomeEquipe = document.createElement("h3");
        nomeEquipe.classList.add("nome_equipe");
        nomeEquipe.innerText = "Equipe " + i;
        nomeEquipe.id = "nome_equipe_" + i;
        liEquipe.appendChild(nomeEquipe);

        const btnEditarEquipe = document.createElement("button");
        btnEditarEquipe.innerText = "Editar";
        btnEditarEquipe.classList.add("btn_editar_equipe");
        btnEditarEquipe.id = "btn_editar_equipe_" + i;
        liEquipe.appendChild(btnEditarEquipe);

        const btnExcluirEquipe = document.createElement("button");
        btnExcluirEquipe.innerText = "Excluir";
        btnExcluirEquipe.classList.add("btn_excluir_equipe");
        btnExcluirEquipe.id = "btn_excluir_equipe_" + i;
        liEquipe.appendChild(btnExcluirEquipe);
    }
}

function abrirMenuEdicaoEquipe(idEquipe) {
    menuEdicaoEquipe.classList.remove("desativado");
    menuEdicaoEquipe.name = "menu_edicao_" + idEquipe;

    nomeEquipeEdicao.value = document.getElementById("nome_equipe_" + idEquipe).innerText;
}

function excluirEquipe(idEquipe) {
    document.getElementById("li_equipe_" + idEquipe).remove();
}

function mudarCorDaEquipe() {
    menuEdicaoEquipe.style.backgroundColor = corEquipeEdicaoInput.value;
}

function salvarEdicao() {
    const idEquipe = menuEdicaoEquipe.name.substring(12);

    document.getElementById("nome_equipe_" + idEquipe).innerText = nomeEquipeEdicao.value;
    document.getElementById("li_equipe_" + idEquipe).style.backgroundColor = corEquipeEdicaoInput.value;

    menuEdicaoEquipe.classList.add("desativado");
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

    const quantidadeParticipantesPorEquipe = quantidadeParticipantes / quantidadeEquipes;

    let indicesIniciais = quantidadeParticipantesPorEquipe;

    const participantesSorteados = [];

    for(i = 1; i <= quantidadeEquipes; i++){
        const ulEquipe = document.getElementById("ul_equipe_" + i);
        for(index = quantidadeParticipantesPorEquipe * (i - 1); index < indicesIniciais; index++){
            const liNome = document.createElement("li");
            const resultado = participantesParaSorteio[Math.round(index)];
            if(!participantesSorteados.includes(resultado) && resultado != undefined){
                liNome.innerText = resultado;
                ulEquipe.appendChild(liNome);                                                         
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
    if (event.target && event.target.classList.contains("btn_editar_equipe")) {
        const idBtn = event.target.id;
        abrirMenuEdicaoEquipe(idBtn.substring(18));
    }
});

containerEquipes.addEventListener("click", (event) => {
    if (event.target && event.target.classList.contains("btn_excluir_equipe")) {
        const idBtn = event.target.id;
        excluirEquipe(idBtn.substring(19));
    }
});

listaParticipante.addEventListener("click", (event) => {
    if (event.target && event.target.classList.contains("btn_excluir_participante")) {
        const idBtn = event.target.id;
        // console.log(idBtn.substring(25))
        excluirParticipante(idBtn.substring(25));
    }
});

corEquipeEdicaoInput.addEventListener("change", mudarCorDaEquipe);

btnSalvarEdicao.addEventListener("click", salvarEdicao);

btnSortear.addEventListener("click", sortearArray);