
const lista = document.getElementById("lista");
const resumo = document.getElementById("resumo");
const mensagem = document.getElementById("mensagem");

const formulario = document.querySelector("#form-aluno");
const campoNome = document.getElementById("nome");
const campoNota = document.getElementById("nota");

const alunos = [
    { nome: "Ana", nota: 8.5 },
    { nome: "Bruno", nota: 4.0 },
    { nome: "Carla", nota: 6.0 }
];

function mostrarAlunos() {
    lista.textContent = "";

    let aprovados = 0;

    for (let i = 0; i < alunos.length; i++) {
        const aluno = alunos[i];

        const linha = document.createElement("div");
        linha.classList.add("aluno");

        const informacoes = document.createElement("div");
        informacoes.classList.add("aluno-info");

        const nome = document.createElement("strong");
        nome.textContent = aluno.nome;

        const nota = document.createElement("span");
        nota.textContent = "Nota: " + aluno.nota.toFixed(1);

        const status = document.createElement("span");
        status.classList.add("status");

        if (aluno.nota >= 6) {
            linha.classList.add("aprovado");
            status.textContent = "Aprovado";
            aprovados++;
        } else {
            linha.classList.add("reprovado");
            status.textContent = "Reprovado";
        }

        informacoes.appendChild(nome);
        informacoes.appendChild(nota);

        linha.appendChild(informacoes);
        linha.appendChild(status);

        lista.appendChild(linha);
    }

    resumo.textContent =
        "Aprovados: " + aprovados + " de " + alunos.length;
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = campoNome.value.trim();
    const notaTexto = campoNota.value.trim();
    const nota = Number(notaTexto);

    mensagem.textContent = "";
    mensagem.classList.remove("erro", "sucesso");

    if (nome === "" || notaTexto === "") {
        mensagem.textContent = "Erro: preencha o nome e a nota.";
        mensagem.classList.add("erro");
        return;
    }

    if (!Number.isFinite(nota) || nota < 0 || nota > 10) {
        mensagem.textContent = "Erro: a nota deve estar entre 0 e 10.";
        mensagem.classList.add("erro");
        return;
    }

    alunos.push({
        nome: nome,
        nota: nota
    });

    mostrarAlunos();

    mensagem.textContent = nome + " foi adicionado(a)!";
    mensagem.classList.add("sucesso");

    campoNome.value = "";
    campoNota.value = "";
    campoNome.focus();
});

mostrarAlunos();
