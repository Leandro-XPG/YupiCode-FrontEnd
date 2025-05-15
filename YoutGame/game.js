const limiteDiario = 5;
let perguntasHoje = [];
let indiceAtual = 0;

async function carregarPerguntas(){
  const resposta = await fetch('yupiQuiz.json');
  const todas = await resposta.json();

  const hoje = new Date().toLocaleDateString();
  const progresso = JSON.parse(localStorage.getItem('quizDiario') ||'{}');

  if (progresso.data !== hoje){
    const sorteadas = [];
    while (sorteadas.lenght < limiteDiario){
      const rand = todas[Math.floor(Math.random() * todas.lenght)];
      if (!sorteadas.find(p => p.pergunta === rand.pergunta)){
        sorteadas.push(rand);
      }
    }

    perguntasHoje = sorteadas;
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
    container.innerHTML = "<h3>Você ja respondeu as 5 perguntas de hoje!</h3>"
    botaoProxima.style.display = "none";
    return;
  }

  const p = perguntasHoje[indiceAtual];
  let html = `<h3>${p.pergunta}</h3>`

  p.opcoes.forEach((op,i) =>{
    html += `<li><button onclick = 'responder(${i})'>${op}</button></li>`;
  });

  html += '</ul><div> id="feedback"></div>';
  container.innerHTML = html;
  botaoProxima.style.display = 'none';
};

function responder(i){
  const p = perguntasHoje[indiceAtual];
  const feedback = document.getElementById('feedback');

  if(i == p.respostaCorreta){
    feedback.textContent = 'Parabéns, você acertou!!!';
    feedback.style.color = 'green';
  }else{
    feedback.textContent = 'Resposta errada!'
    feedback.style.color = 'red';
  }

  document.querySelectorAll('#quiz-container button').forEach(b => b.disabled - true);
  document.getElementById('proxima').style.display = 'inline'
}

document.getElementById('proxima').addEventListener('click',() =>{
  indiceAtual++;
  const progresso = JSON.parse(localStorage.getItem('quizDiario'));
  progresso.respondidas = indiceAtual;
  localStorage.setItem('quizDiario', JSON.stringify(progresso));
  mostrarPergunta();
});

carregarPerguntas();
