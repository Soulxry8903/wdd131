const hambmenu = document.getElementById('menu');
const nav = document.querySelector('.navegation');
const heading = document.querySelector('.heading');

hambmenu.addEventListener('click',()=>{
    nav.classList.toggle('show');
	hambmenu.classList.toggle('show');
    heading.classList.toggle('show');

});