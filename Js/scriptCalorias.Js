
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
  // 1. Primeiro verifique se todos os elementos existem
  const idadeElement = document.getElementById("idade");
  const alturaElement = document.getElementById("altura");
  const pesoElement = document.getElementById("peso");
  const sexoElement = document.getElementById("sexo");
  const atividadeElement = document.getElementById("atividade");
  const resultadoContainer = document.getElementById('container-resultado');

  // Verifique se todos os elementos existem
  if (!idadeElement || !alturaElement || !pesoElement || !sexoElement || !atividadeElement || !resultadoContainer) {
    console.error("Um ou mais elementos não foram encontrados no DOM");
    return;
  }

  // 2. Agora obtenha os valores
  const idade = parseInt(idadeElement.value);
  let valorAltura = alturaElement.value.trim();
  const pesoValor = pesoElement.value;
  const sexo = sexoElement.value;
  const atividadeValor = atividadeElement.value;

  // 3. Validação dos campos
  if (!idadeElement.value || !valorAltura || !pesoValor || sexo === "" || atividadeValor === "") {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }

  // Processamento da altura
  let partes = valorAltura.split(',');
  let alturaCm = 0;

  if (partes.length === 2) {
    const metros = parseInt(partes[0]);
    const centimetros = parseInt(partes[1]);
    if (!isNaN(metros) && !isNaN(centimetros)) {
      alturaCm = metros * 100 + centimetros;
    }
  } else {
    alturaCm = parseInt(valorAltura);
  }

  // Processamento do peso
  const peso = parseFloat(pesoValor.replace(',', '.'));

  // Validação numérica
  if (isNaN(idade) || isNaN(alturaCm) || isNaN(peso)) {
    alert("Por favor, insira valores numéricos válidos.");
    return;
  }

  // Cálculos
  let tmb;
  const atividade = parseFloat(atividadeValor);
  
  if (sexo === "masculino") {
    tmb = 10 * peso + 6.25 * alturaCm - 5 * idade + 5;
  } else {
    tmb = 10 * peso + 6.25 * alturaCm - 5 * idade - 161;
  }

  const caloriasPorDia = Math.round(tmb * atividade);
  const caloriasPorSemana = caloriasPorDia * 7;
  const ganhoPeso = caloriasPorDia + 500;
  const perdaPeso = Math.max(caloriasPorDia - 500, 800); // Mínimo de 800 calorias/dia

  // Cálculo do IMC
  const alturaMetros = alturaCm / 100;
  const imc = peso / (alturaMetros * alturaMetros);
  let classificacaoIMC = "";

  if (imc < 18.5) classificacaoIMC = "Abaixo do peso";
  else if (imc < 25) classificacaoIMC = "Peso normal";
  else if (imc < 30) classificacaoIMC = "Sobrepeso";
  else if (imc < 35) classificacaoIMC = "Obesidade grau 1";
  else if (imc < 40) classificacaoIMC = "Obesidade grau 2";
  else classificacaoIMC = "Obesidade grau 3";

  // Função auxiliar para atualizar elementos com verificação
  function atualizarElemento(id, valor) {
    const elemento = document.getElementById(id);
    if (elemento) {
      elemento.textContent = valor;
    }
  }

  // Atualizar todos os elementos de resultado
  atualizarElemento("trazerSexo", sexo);
  atualizarElemento("trazerIdade", idade);
  atualizarElemento("trazerAltura", (alturaCm / 100).toFixed(2).replace('.', ','));
  atualizarElemento("trazerPeso", peso.toFixed(1).replace('.', ','));
  atualizarElemento("trazerResultado2", caloriasPorDia);
  atualizarElemento("trazerResultadoSemana", caloriasPorSemana);
  atualizarElemento("trazerTaxaBasal", Math.round(tmb));
  atualizarElemento("trazerResultadoMais", ganhoPeso);
  atualizarElemento("trazerResultadoMenos", perdaPeso);
  atualizarElemento("trazerIMC", imc.toFixed(1).replace('.', ','));
  atualizarElemento("trazerClassificacaoIMC", classificacaoIMC);

  // Mostrar resultados
  resultadoContainer.style.display = 'flex';
}