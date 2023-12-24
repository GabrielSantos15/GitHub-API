const urlSearchParams = new URLSearchParams(window.location.search);
const username = urlSearchParams.get("user");

const repositoriosContainer = document.querySelector("#repositoriosContainer");
const loadContainer = document.querySelector("#containerLoad");
const errorUser = document.querySelector("#errorUser");

async function searchInfo() {
  loadContainer.style.display = "flex";
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`
  );

  if (response.ok) {
    const data = await response.json();
    adicionarInfo(data);
    console.log(data);
  } else {
    errorUser.style.display = "flex";
  }
  loadContainer.style.display = "none";
}
searchInfo();

async function adicionarInfo(data) {
  repositoriosContainer.style.display = "flex";
  
  for (let i = 0; i < data.length; i++) {
    repositoriosContainer.innerHTML += `
        <article class="repositorio">
            <h3>${data[i].name}</h3>
            <h4><i class="fa-solid fa-code"></i>${data[i].language}</h4>
            <div class="repositorioInfo">
                <span>
                    <label for="stars"><i class="fa-regular fa-star"></i></label>
                    <output id="stars">${data[i].stargazers_count}</output>
                </span>
                <span class="repositorioInfo">
                    <label for="commit"><i class="fa-solid fa-code-branch"></i></label>
                    <output id="commit">${data[i].forks_count}</output>
                </span>
            </div>
            <a href="${data[i].svn_url}" target="_blank">Ver código</a>
        </article>
        `;
  }
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
