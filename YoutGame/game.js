document.addEventListener('DOMContentLoaded',()=>{
  const front = document.querySelector('.front');
  const opcoes = document.querySelector('.opcoes');
  const frontMap = document.querySelector('.frontMap');

  front.addEventListener('click',()=>{
    opcoes.classList.add('hidden');
    frontMap.classList.remove('hidden')
})
});

