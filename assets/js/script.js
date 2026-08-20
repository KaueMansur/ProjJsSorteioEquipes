const nomeParticipanteInput = document.getElementById("nome_participante");
const quantidadeEquipes = document.getElementById("quantidade_equipes");
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

const participantes = [];
const idsParticipantes = [];

let quantidadeParticipantesPorEquipe = 0;
let limiteParticipantes = null;

let contagemParticipantes = 0;

function definirConfiguracoesDeEquipe() {
    definirQuantidadeEquipes();
    quantidadeParticipantesPorEquipe = quantidadeParticipantesPorEquipeInput.value;
}

function adicionarParticipante(){
    if(limiteParticipanteCheckbox.checked){
        limiteParticipantes = limiteParticipantesInput.value;
    }
    if(participantes.length < limiteParticipantes || limiteParticipantes == null){
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
        console.log("Participante adicionado!");
        console.log(participantes);
        console.log(idsParticipantes);
    } else{
        console.log("Limite de participantes atingido!");
    }
}

function excluirParticipante(idParticipante){
    // console.log(idParticipante)

    const i = idsParticipantes.indexOf(Number(idParticipante))
    idsParticipantes.splice(i, 1);
    participantes.splice(i, 1);

    document.getElementById("participante_" + idParticipante).remove();
 
    // console.log(participantes);
    // console.log(idsParticipantes);
}

function definirQuantidadeEquipes() {
    for (let i = 1; quantidadeEquipes.value >= i; i++) {
        const liEquipe = document.createElement("li");
        liEquipe.classList.add("li_equipe");
        liEquipe.id = "li_equipe_" + i;
        containerEquipes.appendChild(liEquipe);

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

function abrirMenuEdicaoEquipe(idEquipe){
    menuEdicaoEquipe.classList.remove("desativado");
    menuEdicaoEquipe.name = "menu_edicao_" + idEquipe;

    nomeEquipeEdicao.value = document.getElementById("nome_equipe_" + idEquipe).innerText;
}

function excluirEquipe(idEquipe){
    document.getElementById("li_equipe_" + idEquipe).remove();
}

function mudarCorDaEquipe() {
    menuEdicaoEquipe.style.backgroundColor = corEquipeEdicaoInput.value;
}

function salvarEdicao(){
    const idEquipe = menuEdicaoEquipe.name.substring(12);

    document.getElementById("nome_equipe_" + idEquipe).innerText = nomeEquipeEdicao.value;
    document.getElementById("li_equipe_" + idEquipe).style.backgroundColor = corEquipeEdicaoInput.value;

    menuEdicaoEquipe.classList.add("desativado");
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

containerEquipes.addEventListener("click", (event)=>{
    if(event.target && event.target.classList.contains("btn_editar_equipe")){
        const idBtn = event.target.id;
        abrirMenuEdicaoEquipe(idBtn.substring(18));
    }
});

containerEquipes.addEventListener("click", (event)=>{
    if(event.target && event.target.classList.contains("btn_excluir_equipe")){
        const idBtn = event.target.id;
        excluirEquipe(idBtn.substring(19));
    }
});

listaParticipante.addEventListener("click", (event)=>{
    if(event.target && event.target.classList.contains("btn_excluir_participante")){
        const idBtn = event.target.id;
        // console.log(idBtn.substring(25))
        excluirParticipante(idBtn.substring(25));
    }
});

corEquipeEdicaoInput.addEventListener("change", mudarCorDaEquipe);

btnSalvarEdicao.addEventListener("click", salvarEdicao);