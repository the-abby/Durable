var isOpen = false;

const menuBar = document.getElementById("menu-bar");
const asideBar = document.getElementById("aside-bar");
const hamburger = document.getElementById("hamburger");

menuBar.addEventListener("click" , () => {
    if(!isOpen){
        asideBar.style.width = "100vw";
        isOpen = true;
        hamburger.setAttribute("d", "M6 18L18 6M6 6l12 12")
        return
    }

    asideBar.style.width = "0vw";
    isOpen = false;
    hamburger.setAttribute("d", "M4 6h16M4 12h16M4 18h16")

});