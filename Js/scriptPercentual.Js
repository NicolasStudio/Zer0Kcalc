// Calculo do Percentual
function calcularPercentualResultados() {
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
    // 1. Preencher os elementos com os resultados
    document.getElementById('percentual-valor').textContent = `${percentual}%`;
    document.getElementById('classificacao-valor').textContent = classificacao;
    document.getElementById('interpretacao-valor').textContent = obterInterpretacao(classificacao);
    document.getElementById('recomendacoes-valor').textContent = obterRecomendacoes(classificacao);
    
    // 2. Obter referência ao container de resultados
    const resultadoContainer = document.getElementById('container-resultado');
    
    // 3. Mostrar o container (mudei para 'block' que é mais adequado)
    resultadoContainer.style.display = 'block';
    
    // 4. Adicionar classe de scroll suave ao HTML
    document.documentElement.classList.add('smooth-scroll');
    
    // 5. Efeito de scroll com pequeno delay para garantir renderização
    setTimeout(() => {
        resultadoContainer.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // 6. Opcional: Remover a classe depois de 1 segundo
        setTimeout(() => {
            document.documentElement.classList.remove('smooth-scroll');
        }, 1000);
    }, 100);
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

// Mascára Peso
function formatarPesoInput(event) {
  let valor = event.target.value;

  // Remove tudo que não for dígito ou vírgula
  valor = valor.replace(/[^\d,]/g, '');

  // Remove vírgulas extras, mantendo apenas a primeira
  const partes = valor.split(',');
  if (partes.length > 1) {
    valor = partes[0] + ',' + partes.slice(1).join('');
  }

  // Se não tiver vírgula e tiver 3 ou mais dígitos, insere a vírgula após os 2 primeiros dígitos
  if (!valor.includes(',') && valor.length > 2) {
    valor = valor.slice(0, 2) + ',' + valor.slice(2);
  }

  // Limita a parte inteira a 3 dígitos e a decimal a 3 dígitos (formato: 999,999)
  if (valor.includes(',')) {
    const [inteira, decimal] = valor.split(',');
    valor = inteira.slice(0, 3) + ',' + (decimal ? decimal.slice(0, 3) : '');
  } else {
    valor = valor.slice(0, 3); // Limita a 3 dígitos se não tiver vírgula
  }

  // Atualiza o valor do campo
  event.target.value = valor;
}