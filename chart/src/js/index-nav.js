//login & register

const loginNav = document.querySelector(".login-btn");
const registerNav = document.querySelector(".create-account-btn");
const loginBtns = document.querySelector(".login");
const registerBtns = document.querySelector(".register"); 
const profileImg = document.querySelector(".profile-photo");

let loginOn = true;

registerNav.addEventListener("click", ()=>{
    if(!loginOn) return
    else{
        loginOn = !loginOn
        loginNav.style.backgroundColor = "whitesmoke";
        loginNav.style.color = "black";
        registerNav.style.backgroundColor = "rgb(95, 90, 90)";
        registerNav.style.color = "white";

        loginBtns.style.display = "none";
        registerBtns.style.display = "block";
        profileImg.src = "/src/images/register-photo.jpg";
    }
})

loginNav.addEventListener("click", ()=>{
    if(loginOn) return
    else{
        loginOn = !loginOn
        registerNav.style.backgroundColor = "whitesmoke";
        registerNav.style.color = "black";
        loginNav.style.backgroundColor = "rgb(95, 90, 90)";
        loginNav.style.color = "white";
        
        registerBtns.style.display = "none";
        loginBtns.style.display = "block";
        profileImg.src = "/src/images/profile-photo.png";
    }
})

//password validation
