document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtém a distância inserida pelo usuário e substitui a vírgula por ponto
    const distanciaInput = document.getElementById('distancia').value;
    let distancia = parseFloat(distanciaInput.replace(',', '.'));

    // Limpa mensagens de erro anteriores
    const erroContainer = document.getElementById('erro-container');
    erroContainer.innerHTML = '';

    // Verifica se a distância é válida
    if (isNaN(distancia) || distancia <= 0) {
        erroContainer.innerHTML = '<div class="erro"><i class="warning-icon"></i> Insira um valor válido. Os dois valores válidos mais próximos são 8 e 9.</div>';
        return;
    }

    const velocidades = {
        "Júpiter 2": 25,
        "Millenium Falcon": 75,
        "USS Enterprise": 50
    };

    const estrelas = {
        "Próxima Centauri": 4.24,
        "α Centauri A": 4.39,
        "α Centauri B": 4.39,
        "Estrela de Barnard": 5.96,
        "Wolf 359": 7.78,
        "Lalande 21185": 8.31,
        "Sírius": 8.58,
        "Luyten 726-8": 8.73,
        "Ross 154": 9.69,
        "Ross 248": 10.32,
        "ε Eridani": 10.50,
        "61 Cygni A": 11.40,
        "61 Cygni B": 11.40,
        "Procyon A": 11.50,
        "ε Indi": 11.80,
        "τ Ceti": 11.90,
        "Groombridge 1618": 15.90,
        "40 Eridani A": 16.50,
        "70 Ophiuchi A": 16.60,
        "70 Ophiuchi B": 16.60,
        "Altair": 16.70,
        "σ Draconis": 18.80,
        "Gliese 570": 19.00,
        "η Cassiopeiae": 19.40,
        "36 Ophiuchi A": 19.50,
        "36 Ophiuchi B": 19.50,
        "36 Ophiuchi C": 19.50,
        "HR 7703": 19.60,
        "82 Eridani": 19.80,
        "δ Pavonis": 19.90,
        "Gliese 892": 21.30,
        "ξ Bootis A": 21.9,
        "ξ Bootis B": 21.9,
        "Gliese 667 A": 22.70,
        "Gliese 667 B": 22.70,
        "HR 753 A": 23.50,
        "Gliese 33": 24.30,
        "β Hydri": 24.40,
        "107 Piscium": 24.40,
        "μ Cassiopeiae A": 24.60,
        "TW Piscis Austrini": 24.90,
        "Fomalhaut": 25.10,
        "Gliese 673": 25.20
    };

    // Encontra a estrela mais próxima com base na distância inserida
    let estrelaMaisProxima = null;
    let menorDiferenca = Infinity;

    for (const nome in estrelas) {
        const diferenca = Math.abs(distancia - estrelas[nome]);
        if (diferenca < menorDiferenca) {
            menorDiferenca = diferenca;
            estrelaMaisProxima = nome;
        }
    }

    // Se a distância for maior que a maior registrada, exibe mensagem especial
    if (distancia > Math.max(...Object.values(estrelas))) {
        estrelaMaisProxima =
            `O aumento do conhecimento é como uma esfera dilatando-se no espaço: quanto maior a nossa compreensão, maior o nosso contato com o desconhecido.\nAs naves alcançaram uma zona espacial desconhecida!`;
    }

    // Exibe os resultados na página
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `
        <p>Distância (anos-luz): ${distancia.toFixed(2)}</p>
        <p>🛸 Júpiter 2 chegou ao objetivo em: ${calcularTempo(distancia, velocidades["Júpiter 2"])} anos</p>
        <p>🛸 Millenium Falcon chegou ao objetivo em: ${calcularTempo(distancia, velocidades["Millenium Falcon"])} anos</p>
        <p>🛸 USS Enterprise chegou ao objetivo em: ${calcularTempo(distancia, velocidades["USS Enterprise"])} anos</p>
        <p>As naves alcançaram o Sistema da Estrela: ${estrelaMaisProxima}</p>
    `;
});

// Função para calcular o tempo de viagem baseado na distância e velocidade
function calcularTempo(distancia, velocidade) {
    const tempo = distancia / (velocidade / 100);
    return parseFloat(tempo.toFixed(2));
}

// Adiciona validação em tempo real para o campo de distância
document.getElementById('distancia').addEventListener('input', function(e) {
    const value = e.target.value;
    const erroContainer = document.getElementById('erro-container');
    
    // Limpa mensagens de erro anteriores
    erroContainer.innerHTML = '';
    
    // Verifica se o valor inserido é válido
    const distancia = parseFloat(value.replace(',', '.'));
    if (value !== '' && (isNaN(distancia) || distancia <= 0)) {
        erroContainer.innerHTML = '<div class="erro"><i class="warning-icon"></i> Insira um valor válido. Os dois valores válidos mais próximos são 8 e 9.</div>';
    }
});