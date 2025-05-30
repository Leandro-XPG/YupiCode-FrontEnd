
document.addEventListener('DOMContentLoaded',()=>{
  const savedTheme = localStorage.getItem("theme");
  if(savedTheme){
    document.body.className = savedTheme
  }
})



const interruptor = document.querySelector('.interruptor');

interruptor.addEventListener('click',()=>{
   document.body.classList.toggle('light-mode')


   const currentTheme = document.body.className;
   localStorage.setItem("theme",currentTheme)
});


const menu = document.querySelector('.btn-menu');
const menuMobile = document.querySelector('.menu-aberto');
const sair = document.querySelector('.btn-sair')

menu.addEventListener('click',(e)=>{
  e.stopPropagation();
  document.body.classList.toggle('mobile-aberto')
 
});
sair.addEventListener('click',()=>{
   document.body.classList.remove('mobile-aberto')
})

document.addEventListener('click',(e)=>{
  const isCLickMenu = menu.contains(e.target) || e.target.closest('.menu')

  if(!isCLickMenu){
    document.body.classList.remove('mobile-aberto');
  }
});

const logica = document.querySelector('.logica');

logica.addEventListener('click',()=>{
    window.location.href = 'YoutGame/yout_game.html';
})

