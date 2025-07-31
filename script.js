
document.addEventListener('DOMContentLoaded',()=>{
  const savedTheme = localStorage.getItem("theme");
  if(savedTheme){
    document.body.className = savedTheme
  }
})




const menu = document.querySelector('.btn-menu');
const sair = document.querySelector('.btn-sair')

menu.addEventListener('click',(e)=>{
  e.stopPropagation();
  document.body.classList.toggle('mobile-aberto')
 
});
sair.addEventListener('click',()=>{
   document.body.classList.remove('mobile-aberto')
})

document.addEventListener('click',(e)=>{
  const isClickMenu = menu.contains(e.target) || e.target.closest('.menu')

  if(!isClickMenu){
    document.body.classList.remove('mobile-aberto');
  }
});

