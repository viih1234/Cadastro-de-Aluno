// Carrega dados do localStorage (opcional)
window.onload = () => {
    if (localStorage.getItem("alunos")) {
        JSON.parse(localStorage.getItem("alunos")).forEach(a => {
            adicionarNaTabela(a.nome, a.n1, a.n2, a.n3, a.media, a.situacao);
        });
    }
};

document.getElementById("btnAdicionar").addEventListener("click", () => {
    
    // Coletando valores
    const nome = document.getElementById("nome").value.trim();
    const n1 = parseFloat(document.getElementById("nota1").value);
    const n2 = parseFloat(document.getElementById("nota2").value);
    const n3 = parseFloat(document.getElementById("nota3").value);

    // Validação
    if (nome === "" || isNaN(n1) || isNaN(n2) || isNaN(n3)) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Cálculo da média
    const media = ((n1 + n2 + n3) / 3).toFixed(1);
    const situacao = media >= 6 ? "Aprovado" : "Reprovado";

    // Adiciona à tabela
    adicionarNaTabela(nome, n1, n2, n3, media, situacao);

    // Salvar no localStorage
    salvarLocalStorage(nome, n1, n2, n3, media, situacao);

    // Limpar campos
    document.getElementById("formNotas").reset();
});

// Função para inserir dados na tabela
function adicionarNaTabela(nome, n1, n2, n3, media, situacao) {
    const tabela = document.querySelector("#tabelaAlunos tbody");
    const linha = document.createElement("tr");

    linha.classList.add(situacao === "Aprovado" ? "aprovado" : "reprovado");

    linha.innerHTML = `
        <td>${nome}</td>
        <td>${n1}</td>
        <td>${n2}</td>
        <td>${n3}</td>
        <td>${media}</td>
        <td>${situacao}</td>
    `;

    tabela.appendChild(linha);
}

// Função para salvar no localStorage
function salvarLocalStorage(nome, n1, n2, n3,  media, situacao) {
    let alunos = [];

    if (localStorage.getItem("alunos")) {
        alunos = JSON.parse(localStorage.getItem("alunos"));
    }

    alunos.push({ nome, n1, n2, media, situacao });
    localStorage.setItem("alunos", JSON.stringify(alunos));
}
