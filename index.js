const searchUserForm = document.querySelector("#searchUserForm");
const usernameInput = document.querySelector("#userNameInput");
const userInfo = document.querySelector("#userInfo");

const loadContainer = document.querySelector("#containerLoad");
const errorUser = document.querySelector("#errorUser");

const imageUser = document.querySelector("#imageUser");
const nameUser = document.querySelector("#nameUser");
const loginUser = document.querySelector("#loginUser");
const followers = document.querySelector("#followers");
const following = document.querySelector("#following");
const repositorios = document.querySelector("#repositorios");
const locationUser = document.querySelector("#location");
const linkRepositorios = document.querySelector("#linkRepositorios");
const statusUser = document.querySelector("#StatusPerfil img")

searchUserForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  userInfo.style.display = "none";
  errorUser.style.display = "none";
  loadContainer.style.display = "flex";

  const username = usernameInput.value;
  usernameInput.value = "";

  await searchInfo(username);

  loadContainer.style.display = "none";
});
async function searchInfo(username) {
  const response = await fetch(`https://api.github.com/users/${username}`);

  if (response.ok) {
    const data = await response.json();

    userInfo.style.display = "flex";
    adicionarInfo(data,username);
    console.log(data);
  } else {
    errorUser.style.display = "flex";
  }
}

function adicionarInfo(userData,username) {
  imageUser.src = userData.avatar_url;
  nameUser.innerHTML = userData.name;
  loginUser.innerHTML = userData.login;
  followers.innerHTML = userData.followers;
  following.innerHTML = userData.following;
  locationUser.innerHTML = userData.location;
  repositorios.innerHTML = userData.public_repos;
  linkRepositorios.setAttribute('href',`repositorios.html?user=${username}`)
  statusUser.src = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&locale=pt-br&bg_color=00000000&title_color=9A84DB&text_color=9A84DB&icon_color=9A84DB`
  
}

function recuperarDarkMode() {
  const storageDark = localStorage.getItem("dark");
  if (storageDark) darkMode();
}
recuperarDarkMode();

function darkMode() {
  const body = document.querySelector("body");
  const buttonDarkMode = document.querySelector("#buttonDarkMode");

  localStorage.clear();

  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    buttonDarkMode.innerHTML = "light_mode";
  } else {
    body.classList.add("dark");
    buttonDarkMode.innerHTML = "dark_mode";
    localStorage.setItem("dark", 1);
  }
}
