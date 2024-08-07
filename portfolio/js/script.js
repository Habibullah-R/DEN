const bars = document.getElementById("navBar");
const navMenu = document.querySelector(".nav")
const navLinks = document.querySelectorAll(".nav-links")

bars.addEventListener('click',()=>{
    navMenu.classList.toggle("navShow");
})
navLinks.forEach((navLink)=>{
    navLink.addEventListener("click",()=>{
        navMenu.classList.remove("navShow")
    })
})