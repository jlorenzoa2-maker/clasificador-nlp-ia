const dataset = [
  { text: "El sistema es muy estable", label: 1 },
  { text: "Excelente rendimiento", label: 1 },
  { text: "Muy rápido y eficiente", label: 1 },
  { text: "Funciona perfectamente", label: 1 },

  { text: "El sistema falla mucho", label: 0 },
  { text: "Muy lento y con errores", label: 0 },
  { text: "Falla en producción", label: 0 },
  { text: "Problemas graves de rendimiento", label: 0 }
];

function limpiarTexto(text) {
  return text.toLowerCase().replace(/[^\w\s]/gi, "").trim();
}

const vocab = {};
let index = 1;

function tokenize(text) {
  return limpiarTexto(text).split(" ");
}

function buildVocab() {
  dataset.forEach(d => {
    tokenize(d.text).forEach(word => {
      if (!vocab[word]) vocab[word] = index++;
    });
  });
}

function encode(text) {
  return tokenize(text).map(word => vocab[word] || 0);
}

function pad(seq) {
  while (seq.length < 10) seq.push(0);
  return seq.slice(0, 10);
}

let model;

async function crearModelo() {
  model = tf.sequential();

  model.add(tf.layers.embedding({
    inputDim: 100,
    outputDim: 16,
    inputLength: 10
  }));

  model.add(tf.layers.flatten());
  model.add(tf.layers.dense({ units: 16, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

  model.compile({
    optimizer: tf.train.adam(0.001),
    loss: 'binaryCrossentropy',
    metrics: ['accuracy']
  });
}

async function entrenar() {
  buildVocab();

  const xs = tf.tensor2d(dataset.map(d => pad(encode(d.text))));
  const ys = tf.tensor2d(dataset.map(d => [d.label]));

  await model.fit(xs, ys, {
    epochs: 100,
    shuffle: true,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        console.log(`Epoch ${epoch}: loss=${logs.loss}`);
      }
    }
  });

  console.log("Modelo entrenado");
}

async function analizar() {
  const texto = document.getElementById("inputText").value;

  const input = tf.tensor2d([pad(encode(texto))]);
  const pred = model.predict(input);

  const valor = (await pred.data())[0];
  const porcentaje = (valor * 100).toFixed(2);

  let resultado = "";

  if (valor > 0.7) {
    resultado = `Positivo (${porcentaje}%)`;
  } else if (valor < 0.3) {
    resultado = `Negativo (${(100 - porcentaje).toFixed(2)}%)`;
  } else {
    resultado = `Incierto (${porcentaje}%)`;
  }

  document.getElementById("resultado").innerText = resultado;
}

(async () => {
  await crearModelo();
  await entrenar();
})();
