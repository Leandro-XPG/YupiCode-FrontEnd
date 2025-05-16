const limiteDiario = 5;
let perguntasHoje = [];
let indiceAtual = 0;

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('botao-iniciar').addEventListener('click', () => {
  document.getElementById('botao-iniciar').style.display = "none";
  document.getElementById('quiz-container').style.display = "block";
  carregarPerguntas();



});
  document.getElementById('proxima').addEventListener('click',() =>{
    indiceAtual++;
    const progresso = JSON.parse(localStorage.getItem('quizDiario'));
    progresso.respondidas = indiceAtual;
    localStorage.setItem('quizDiario', JSON.stringify(progresso));
    mostrarPergunta();
  });
});



async function carregarPerguntas(){
  const resposta = await fetch('yupiQuiz.json');
  const todas = await resposta.json();

  const hoje = new Date().toLocaleDateString();
  const progresso = JSON.parse(localStorage.getItem('quizDiario') ||'{}');

  if (progresso.data !== hoje){
    const sorteadas = [];

    const indicesSorteados = new Set();

    while (indicesSorteados.size < limiteDiario){
      const randIndex = Math.floor(Math.random() * todas.length);
      indicesSorteados.add(randIndex);
    }

    perguntasHoje = Array.from(indicesSorteados).map(i => todas[i])
    localStorage.setItem('quizDiario', JSON.stringify({
      data: hoje,
      respondidas: 0,
      perguntas: perguntasHoje
    }));

  }else{
    perguntasHoje = progresso.perguntas;
    indiceAtual = progresso.respondidas;
  }

  mostrarPergunta();
}

function mostrarPergunta(){
  const container = document.getElementById('quiz-container')
  const botaoProxima = document.getElementById('proxima');

  if(indiceAtual >= perguntasHoje.length){
    container.innerHTML = "<h2>Você ja respondeu as 5 perguntas de hoje!</h2>"
    botaoProxima.style.display = "none";
    return;
  }

  const p = perguntasHoje[indiceAtual];
  let html = `<h3>${p.pergunta}</h3><ul>`

  p.opcoes.forEach((op,i) =>{

    const opcaoSegura = op
    .replace(/'/g, "&lt;")
    .replace(/"/g, "&qgt;")
    .replace(/</g, "&#39;")
    .replace(/>/g, "&quot;");


    html += `<li><button onclick = "responder(${i})">${opcaoSegura}</button></li>`;
  });

  html += '</ul><div id="feedback"></div>';
  container.innerHTML = html;
  botaoProxima.style.display = 'none';
};

function responder(i){
  const p = perguntasHoje[indiceAtual];
  const feedback = document.getElementById('feedback');

  if(i == p.respostaCorreta){
    feedback.textContent = 'Parabéns, você acertou!!!';
    feedback.style.color = 'green';
    feedback.style.fontFamily = 'Galindo'
  }else{
    feedback.textContent = 'Resposta errada!'
    feedback.style.color = 'red';
    feedback.style.fontFamily = 'Galindo'
  }

  document.querySelectorAll('#quiz-container button').forEach(b => b.disabled = true);
  document.getElementById('proxima').style.display = 'inline'
}

 




