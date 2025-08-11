function home(){
  window.location.href = "index.html"
}

function formatarAlturaInput(event) {
  let valor = event.target.value;

  // Remove tudo que não for dígito ou vírgula
  valor = valor.replace(/[^\d,]/g, '');

  // Se não tiver vírgula e tiver 3 ou mais dígitos, insere a vírgula após o primeiro dígito
  if (!valor.includes(',') && valor.length > 2) {
    valor = valor.slice(0, 1) + ',' + valor.slice(1);
  }

  // Limita para máximo 4 caracteres (ex: 1,72)
  if (valor.length > 4) {
    valor = valor.slice(0, 4);
  }

  event.target.value = valor;
}

function calcularResultados() {
  const idade = parseInt(document.getElementById("idade").value);

  // Pega valor formatado da altura
  let valorAltura = document.getElementById("altura").value.trim();

  // Separa parte inteira e decimal
  let partes = valorAltura.split(',');

  let alturaCm = 0;

  if (partes.length === 2) {
    // Exemplo: partes[0] = "1", partes[1] = "72"
    const metros = parseInt(partes[0]);
    const centimetros = parseInt(partes[1]);

    if (!isNaN(metros) && !isNaN(centimetros)) {
      alturaCm = metros * 100 + centimetros;
    }
  } else {
    // Se só digitou número inteiro, tenta converter direto em cm
    alturaCm = parseInt(valorAltura);
  }

  const peso = parseFloat(document.getElementById("peso").value.replace(',', '.'));
  const sexo = document.getElementById("sexo").value;
  const atividade = parseFloat(document.getElementById("atividade").value);

  if (!idade || !alturaCm || !peso || !sexo || !atividade) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }

  let tmb;
  if (sexo === "masculino") {
    tmb = 10 * peso + 6.25 * alturaCm - 5 * idade + 5;
  } else {
    tmb = 10 * peso + 6.25 * alturaCm - 5 * idade - 161;
  }

  const caloriasPorDia = Math.round(tmb * atividade);
  const caloriasPorSemana = caloriasPorDia * 7;
  const ganhoPeso = caloriasPorDia + 500;
  const perdaPeso = caloriasPorDia - 500;

  // IMC precisa da altura em metros, converte
  const alturaMetros = alturaCm / 100;
  const imc = peso / (alturaMetros * alturaMetros);
  let classificacaoIMC = "";

  if (imc < 18.5) classificacaoIMC = "Abaixo do peso";
  else if (imc < 25) classificacaoIMC = "Peso normal";
  else if (imc < 30) classificacaoIMC = "Sobrepeso";
  else if (imc < 35) classificacaoIMC = "Obesidade grau 1";
  else if (imc < 40) classificacaoIMC = "Obesidade grau 2";
  else classificacaoIMC = "Obesidade grau 3";

  document.getElementById("trazerSexo").textContent = sexo;
  document.getElementById("trazerIdade").textContent = idade;
  // Exibe altura com vírgula novamente (ex: 1,72)
  document.getElementById("trazerAltura").textContent = (alturaCm / 100).toFixed(2).replace('.', ',');
  document.getElementById("trazerPeso").textContent = peso.toFixed(3).replace('.', ',');

  document.getElementById("trazerResultado2").textContent = caloriasPorDia;
  document.getElementById("trazerResultadoSemana").textContent = caloriasPorSemana;
  document.getElementById("trazerTaxaBasal").textContent = Math.round(tmb);
  document.getElementById("trazerResultadoMais").textContent = ganhoPeso;
  document.getElementById("trazerResultadoMenos").textContent = perdaPeso;

  document.getElementById("trazerIMC").textContent = imc.toFixed(1).replace('.', ',');
  document.getElementById("trazerClassificacaoIMC").textContent = classificacaoIMC;

  const elemento = document.getElementById('container-resultado');
  elemento.style.display = 'flex'; 
}

// Adiciona o evento no input altura para aplicar máscara enquanto digita
document.getElementById("altura").addEventListener("input", formatarAlturaInput);

// Calculo do Percentual
function calcularPercentualResultados {
    // Obter valores dos campos
    const idade = parseInt(document.getElementById('idade').value);
    const sexo = document.getElementById('sexo').value;
    const modoCalculo = document.getElementById('dobra').value;
    
    // Obter medidas das dobras cutâneas
    const peitoral = parseFloat(document.getElementById('peitoral').value) || 0;
    const abdominal = parseFloat(document.getElementById('abdominal').value) || 0;
    const coxa = parseFloat(document.getElementById('coxa').value) || 0;
    const triceps = parseFloat(document.getElementById('triceps').value) || 0;
    const subescapular = parseFloat(document.getElementById('subescapular').value) || 0;
    const axilarMedia = parseFloat(document.getElementById('axilarMedia').value) || 0;
    const supraIliaca = parseFloat(document.getElementById('supraIliaca').value) || 0;

    // Validar campos obrigatórios
    if (!idade || !sexo || !modoCalculo) {
        alert("Por favor, preencha todos os campos!!!");
        return;
    }

    let somaDobras, densidadeCorporal, percentualGordura;

    if (modoCalculo === "tresDobras") {
        // Cálculo com 3 dobras
        if (sexo === "masculino") {
            somaDobras = peitoral + abdominal + coxa;
            densidadeCorporal = 1.10938 - (0.0008267 * somaDobras) + (0.0000016 * Math.pow(somaDobras, 2)) - (0.0002574 * idade);
        } else {
            somaDobras = triceps + supraIliaca + coxa;
            densidadeCorporal = 1.0994921 - (0.0009929 * somaDobras) + (0.0000023 * Math.pow(somaDobras, 2)) - (0.0001392 * idade);
        }
    } else if (modoCalculo === "seteDobras") {
        // Cálculo com 7 dobras
        somaDobras = peitoral + abdominal + coxa + triceps + subescapular + axilarMedia + supraIliaca;
        
        if (sexo === "masculino") {
            densidadeCorporal = 1.112 - (0.00043499 * somaDobras) + (0.00000055 * Math.pow(somaDobras, 2)) - (0.00028826 * idade);
        } else {
            densidadeCorporal = 1.097 - (0.00046971 * somaDobras) + (0.00000056 * Math.pow(somaDobras, 2)) - (0.00012828 * idade);
        }
    }

    // Calcular percentual de gordura
    percentualGordura = ((4.95 / densidadeCorporal) - 4.50) * 100;
    
    // Arredondar para 2 casas decimais
    percentualGordura = Math.round(percentualGordura * 100) / 100;

    // Classificar o resultado
    const classificacao = classificarPercentualGordura(percentualGordura, sexo, idade);

    // Exibir resultados
    exibirResultados(percentualGordura, classificacao);
}

function classificarPercentualGordura(percentual, sexo, idade) {
    // Determinar faixa etária
    let faixaEtaria;
    if (idade >= 20 && idade <= 29) faixaEtaria = "20-29";
    else if (idade >= 30 && idade <= 39) faixaEtaria = "30-39";
    else if (idade >= 40 && idade <= 49) faixaEtaria = "40-49";
    else if (idade >= 50 && idade <= 59) faixaEtaria = "50-59";
    else return "Fora da faixa etária de classificação";

    // Tabelas de classificação
    const tabelaMulheres = {
        "20-29": { atleta: [0, 16], bom: [16, 19], normal: [20, 28], elevado: [29, 31], muitoElevado: [31, 100] },
        "30-39": { atleta: [0, 17], bom: [17, 20], normal: [21, 29], elevado: [30, 32], muitoElevado: [32, 100] },
        "40-49": { atleta: [0, 18], bom: [18, 21], normal: [22, 30], elevado: [31, 33], muitoElevado: [33, 100] },
        "50-59": { atleta: [0, 19], bom: [19, 22], normal: [23, 31], elevado: [32, 34], muitoElevado: [34, 100] }
    };

    const tabelaHomens = {
        "20-29": { atleta: [0, 11], bom: [11, 13], normal: [14, 20], elevado: [21, 23], muitoElevado: [23, 100] },
        "30-39": { atleta: [0, 12], bom: [12, 14], normal: [15, 21], elevado: [22, 24], muitoElevado: [24, 100] },
        "40-49": { atleta: [0, 14], bom: [14, 16], normal: [17, 23], elevado: [24, 26], muitoElevado: [26, 100] },
        "50-59": { atleta: [0, 15], bom: [15, 17], normal: [18, 24], elevado: [25, 27], muitoElevado: [27, 100] }
    };

    const tabela = sexo === "feminino" ? tabelaMulheres : tabelaHomens;
    const faixa = tabela[faixaEtaria];

    // Verificar classificação
    if (percentual < faixa.atleta[1]) return "Atleta";
    if (percentual >= faixa.bom[0] && percentual < faixa.bom[1]) return "Bom";
    if (percentual >= faixa.normal[0] && percentual < faixa.normal[1]) return "Normal";
    if (percentual >= faixa.elevado[0] && percentual < faixa.elevado[1]) return "Elevado";
    if (percentual >= faixa.muitoElevado[0]) return "Muito Elevado";

    return "Não classificado";
}

function exibirResultados(percentual, classificacao) {
    // Preencher os elementos existentes
    document.getElementById('percentual-valor').textContent = `${percentual}%`;
    document.getElementById('classificacao-valor').textContent = classificacao;
    document.getElementById('interpretacao-valor').textContent = obterInterpretacao(classificacao);
    document.getElementById('recomendacoes-valor').textContent = obterRecomendacoes(classificacao);
    
    // Mostrar o container de resultados
    document.getElementById('container-resultado').style.display = 'flex';
}

// Mantenha as funções auxiliares existentes:
function obterInterpretacao(classificacao) {
    const interpretacoes = {
        "Atleta": "Percentual muito baixo, comum em atletas de alto rendimento. Cuidado com níveis extremamente baixos que podem afetar a saúde hormonal.",
        "Bom": "Percentual excelente para saúde e desempenho físico. Mantenha seus hábitos saudáveis!",
        "Normal": "Dentro da faixa considerada saudável para a população em geral.",
        "Elevado": "Acima do ideal. Considere ajustes na alimentação e aumento da atividade física.",
        "Muito Elevado": "Nível associado a maiores riscos de saúde. Recomenda-se acompanhamento profissional."
    };
    return interpretacoes[classificacao] || "Consulte um profissional de saúde para orientação personalizada.";
}

function obterRecomendacoes(classificacao) {
    const recomendacoes = {
        "Atleta": "Mantenha sua rotina de exercícios e dieta balanceada. Considere acompanhamento profissional para otimizar performance.",
        "Bom": "Continue com seus hábitos saudáveis. Foque em manter a consistência nos treinos e alimentação.",
        "Normal": "Pratique exercícios regularmente e mantenha uma dieta equilibrada para melhorar sua composição corporal.",
        "Elevado": "Aumente a atividade física e ajuste a alimentação. Considere reduzir calorias e aumentar proteínas.",
        "Muito Elevado": "Procure um nutricionista e educador físico para um plano personalizado. Foque em exercícios aeróbicos e musculação."
    };
    return recomendacoes[classificacao] || "Consulte um profissional de saúde para orientações personalizadas.";
}

function obterInterpretacao(classificacao) {
    const interpretacoes = {
        "Atleta": "Percentual muito baixo, comum em atletas de alto rendimento. Cuidado com níveis extremamente baixos que podem afetar a saúde hormonal.",
        "Bom": "Percentual excelente para saúde e desempenho físico. Mantenha seus hábitos saudáveis!",
        "Normal": "Dentro da faixa considerada saudável para a população em geral.",
        "Elevado": "Acima do ideal. Considere ajustes na alimentação e aumento da atividade física.",
        "Muito Elevado": "Nível associado a maiores riscos de saúde. Recomenda-se acompanhamento profissional."
    };
    
    return interpretacoes[classificacao] || "Consulte um profissional de saúde para orientação personalizada.";
}

