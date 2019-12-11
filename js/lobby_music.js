//Load volume buttons
const volume = new Image();
volume.src = "img/volume.png";
const volume_muted = new Image();
volume_muted.src = "img/volume-mute.png";

//Load audio files
const theme_song = new Audio();
theme_song.src = "audio/CarefreeMelody.mp3";



//Mute button functionallity
let mute_btn = document.createElement("img");
mute_btn.setAttribute("src", volume_muted.getAttribute("src"));
mute_btn.setAttribute("style", "position: absolute; top: 25%; left: 20px; cursor: pointer;");
menu.appendChild(mute_btn);

mute_btn.addEventListener("click", music);

function music() {
  if ((mute_btn.getAttribute("src") == volume_muted.getAttribute("src"))) {
    theme_song.play();
    mute_btn.setAttribute("src", volume.getAttribute("src"));
    mute_btn.style.left = "10px";

  } else {
    theme_song.pause();
    theme_song.currentTime = 0;
    mute_btn.setAttribute("src", volume_muted.getAttribute("src"));
    mute_btn.style.left = "20px";

  }

}
