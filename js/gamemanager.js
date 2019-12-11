//Getting the Canvas & Context Menu
const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//Getting the Menu & Container & List
const menu = document.getElementById("menu");
const container = document.getElementById("main");
const ul = document.getElementById("list-btns");

//Setting the Paragraph - invokes when paused / dead
let paragraph = document.createElement("H2");
let text = document.createTextNode("Paused, to resume, press Escape");
paragraph.appendChild(text);
paragraph.setAttribute("style", "width: 450px; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); color: #343434; visibility: hidden;");
menu.appendChild(paragraph);

//Getting all the nav buttons
const start_button = document.getElementById("start");
const difficulty_button = document.getElementById("difficulty");
const info_button = document.getElementById("info");

//Setting the Reset button after being dead
let restart_button = document.createElement("button");
restart_button.innerHTML = "Click to restart";
restart_button.setAttribute("style", "position: absolute; top: 35%; left: 50%; transform: translate(-50%,-50%); visibility: hidden;");
restart_button.style.visibility = "hidden";
menu.appendChild(restart_button);

restart_button.addEventListener("click", (() => {
  location.reload();
}))

//Setting the Instructions button
info_button.addEventListener("click", info);

function info(event) {

  if (info_button.textContent == "Instructions") {
    start_button.style.visibility = "hidden";
    difficulty_button.style.visibility = "hidden";
    info_button.innerHTML = "Return";
    paragraph.style.top = "50%";
    paragraph.innerHTML = "Press the arrow keys in order to move<br>Press Escape to pause";
    paragraph.style.visibility = "visible";
  } else {
    start_button.style.visibility = "visible";
    difficulty_button.style.visibility = "visible";
    info_button.innerHTML = "Instructions";

    //Reset to pause mode
    paragraph.style.top = "25%";
    paragraph.innerHTML = "Paused, to resume, press Escape";
    paragraph.style.visibility = "hidden";
  }
}

//


//Setting the Difficulty ul & btns
let nav = document.getElementById("nav-buttons");
let difficulty_ul = document.createElement("ul");
let level = 80;

function returnToMenu () {
  difficulty_ul.style.visibility = "hidden";
  ul.setAttribute("style", "display: flex, direction: column;");
  paragraph.style.visibility = "hidden";
  }

function difficultyButtons () {
  const easy_button = document.createElement("button");
  const medium_button = document.createElement("button");
  const hard_button = document.createElement("button");
  const return_button = document.createElement("button");
  return_button.setAttribute("style", "position: absolute; top: 120px; left: 50%; transform: translate(-50%,-50%);")

  easy_button.innerHTML = "Easy";
  medium_button.innerHTML = "Medium";
  hard_button.innerHTML = "Hard";
  return_button.innerHTML = "Return";

  easy_button.addEventListener("click", (() => {
    returnToMenu();
    level = 150;
  }))
  medium_button.addEventListener("click", (() => {
    returnToMenu();
    level = 100;
  }))
  hard_button.addEventListener("click", (() => {
    returnToMenu();
    level = 50;
  }))
  return_button.addEventListener("click", (() => {
    returnToMenu();
  }))


  difficulty_ul.setAttribute("style", "width: 608px; display: flex; flex-direction: row; justify-content: space-around; position: absolute; top: 420px, left: 304px; transform: translate(-50%,-50%);")
  difficulty_ul.appendChild(easy_button);
  difficulty_ul.appendChild(medium_button);
  difficulty_ul.appendChild(hard_button);
  difficulty_ul.appendChild(return_button);


  paragraph.style.top = "50%";
  paragraph.innerHTML = "Choose the difficulty";
  paragraph.setAttribute("style", "width: 450px; position: absolute; top: 42%; left: 50%; transform: translate(-50%,-50%); color: #343434; text-align: center; visibility: visible;");

}


//Setting the Difficulty button
difficulty_button.addEventListener("click", difficulty);

function difficulty(event) {
  //I only run difficultyButons once, to Initialize it. I won't recall the function
  if(nav.childElementCount == 1){
    difficultyButtons();
    }
  ul.style.display = "none";
  nav.appendChild(difficulty_ul);
  difficulty_ul.style.visibility = "visible";
  paragraph.style.visibility = "visible";
}

//Start the game
start_button.addEventListener("click", start_game);

  function start_game(event) {
    theme_song.pause();
    menu.setAttribute("style", "display: none;");
    cvs.setAttribute("style", "display: block;");

    //Settings the divs to dead mode
    paragraph.setAttribute("style", "position: absolute; top: 25%; left: 50%; transform: translate(-50%,-50%); color: #343434; visibility: hidden;");
    container.appendChild(paragraph);
    container.appendChild(restart_button);

    snake(paragraph, restart_button, level);
    }

//TODO:
// Create a navigation with 3 options: Start, Difficulty(easy, normal, hard), Instrucitons
// create a Pause option - add a text label
// Once dead, indication and moving button to the menu
// mute btn on the menu
