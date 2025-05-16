
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

menu.addEventListener('click',(e)=>{
  e.stopPropagation();
  document.body.classList.toggle('mobile-aberto')
});

document.addEventListener('click',(e)=>{
  const isCLickMenu = menu.contains(e.target) || e.target.closest('.menu')

  if(!isCLickMenu){
    document.body.classList.remove('mobile-aberto');
  }
});



