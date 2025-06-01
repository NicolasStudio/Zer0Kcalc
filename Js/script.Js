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
}

// Adiciona o evento no input altura para aplicar máscara enquanto digita
document.getElementById("altura").addEventListener("input", formatarAlturaInput);
