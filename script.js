const perguntas = [
    {
        enunciado: "Você prefere trabalhar com:",
        alternativas: [
            { texto: "Pessoas e comunicação", pontuacao: "humanas" },
            { texto: "Números e cálculos", pontuacao: "exatas" },
            { texto: "Experimentos e descobertas", pontuacao: "biologicas" }
        ]
    },
    {
        enunciado: "Qual tipo de ambiente você prefere?",
        alternativas: [
            { texto: "Sala de aula ou escritório", pontuacao: "humanas" },
            { texto: "Laboratório ou oficina", pontuacao: "biologicas" },
            { texto: "Ambiente corporativo", pontuacao: "exatas" }
        ]
    },
    {
        enunciado: "O que mais te motiva?",
        alternativas: [
            { texto: "Ajudar outras pessoas", pontuacao: "humanas" },
            { texto: "Resolver problemas complexos", pontuacao: "exatas" },
            { texto: "Descobrir como as coisas funcionam", pontuacao: "biologicas" }
        ]
    },
    {
        enunciado: "Qual matéria você mais gosta?",
        alternativas: [
            { texto: "História ou Geografia", pontuacao: "humanas" },
            { texto: "Matemática ou Física", pontuacao: "exatas" },
            { texto: "Biologia ou Química", pontuacao: "biologicas" }
        ]
    },
    {
        enunciado: "Qual habilidade você mais se identifica?",
        alternativas: [
            { texto: "Comunicar ideias com clareza", pontuacao: "humanas" },
            { texto: "Pensar logicamente", pontuacao: "exatas" },
            { texto: "Observar e analisar", pontuacao: "biologicas" }
        ]
    },
    {
        enunciado: "Se pudesse escolher, seu trabalho ideal seria:",
        alternativas: [
            { texto: "Inspirar e ensinar pessoas", pontuacao: "humanas" },
            { texto: "Construir e projetar soluções", pontuacao: "exatas" },
            { texto: "Pesquisar e experimentar", pontuacao: "biologicas" }
        ]
    },
    {
        enunciado: "Qual dessas qualidades mais combina com você?",
        alternativas: [
            { texto: "Empatia e liderança", pontuacao: "humanas" },
            { texto: "Organização e precisão", pontuacao: "exatas" },
            { texto: "Curiosidade e paciência", pontuacao: "biologicas" }
        ]
    },
    {
        enunciado: "No tempo livre, você prefere:",
        alternativas: [
            { texto: "Ler sobre comportamento humano", pontuacao: "humanas" },
            { texto: "Resolver quebra-cabeças e enigmas", pontuacao: "exatas" },
            { texto: "Explorar a natureza", pontuacao: "biologicas" }
        ]
    }
];

const resultados = {
    humanas: {
        titulo: "Você tem perfil para Ciências Humanas",
        descricao: "Seu interesse por pessoas, culturas e comunicação mostra que você tem grande potencial para áreas como Psicologia, Jornalismo, Direito, História e Sociologia."
    },
    exatas: {
        titulo: "Você tem perfil para Ciências Exatas",
        descricao: "Sua habilidade lógica e raciocínio estruturado indicam afinidade com Engenharia, Matemática, Física, Análise de Sistemas e áreas relacionadas."
    },
    biologicas: {
        titulo: "Você tem perfil para Ciências Biológicas",
        descricao: "Seu interesse por descobertas e pela natureza mostra que você pode se destacar em Biologia, Química, Medicina, Biomedicina ou Veterinária."
    },
    misto: {
        titulo: "Você tem um perfil multidisciplinar",
        descricao: "Você apresenta interesses equilibrados entre diferentes áreas, podendo atuar em profissões que combinem mais de uma área do conhecimento."
    }
};

let pontuacoes = {
    humanas: 0,
    exatas: 0,
    biologicas: 0
};

let indicePergunta = 0;

function mostrarPergunta() {
    if (indicePergunta >= perguntas.length) {
        mostrarResultado();
        return;
    }

    const perguntaAtual = perguntas[indicePergunta];
    const container = document.getElementById("quiz");
    container.innerHTML = `
        <h2>${perguntaAtual.enunciado}</h2>
        <div class="opcoes">
            ${perguntaAtual.alternativas.map((alt, index) =>
                `<button onclick="responder('${alt.pontuacao}')">${alt.texto}</button>`
            ).join("")}
        </div>
    `;
}

function responder(area) {
    pontuacoes[area]++;
    indicePergunta++;
    mostrarPergunta();
}

function mostrarResultado() {
    const container = document.getElementById("quiz");

    const maiorPontuacao = Object.entries(pontuacoes).reduce((a, b) => a[1] > b[1] ? a : b);
    let chaveResultado = maiorPontuacao[0];

    // Se houver empate
    const valores = Object.values(pontuacoes);
    const maximo = Math.max(...valores);
    const empate = valores.filter(v => v === maximo).length > 1;

    if (empate) {
        chaveResultado = "misto";
    }

    const resultado = resultados[chaveResultado];
    container.innerHTML = `
        <h2>${resultado.titulo}</h2>
        <p>${resultado.descricao}</p>
    `;
}

mostrarPergunta();
