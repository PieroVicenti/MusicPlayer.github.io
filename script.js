const image = document.querySelector("img"); // needed to chnage pic then
const title = document.getElementById("title"); // needed to change title as per pic
const artist = document.getElementById("artist"); // needed to change artist as per pic & title
const music = document.querySelector("audio");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

//MUSIC
const songs = [
  // creating an array with an object to store songs details, on buttons' click it will be important to target the name, title, and artist as they have to change too.
  {
    name: "coldplay-1",
    displayName: "Yellow",
    artist: "Coldplay",
  },
  {
    name: "coldplay-2",
    displayName: "Every Teardrop is a Waterfall",
    artist: "Coldplay",
  },
  {
    name: "coldplay-3",
    displayName: "Paradise",
    artist: "Coldplay",
  },
  {
    name: "coldplay-4",
    displayName: "Green eyes",
    artist: "Coldplay",
  },
];

//Check if playing
let isPlaying = false; //IMPORTANT! When the page is loaded there is not music, its value will change based on buttons
//ON LOAD

// PLAY
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause"); //change the icon when you press play
  playBtn.setAttribute("title", "Pause"); //Change the title of the icon too
  music.play();
}
// PAUSE
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play"); // change icon when you press pause
  playBtn.setAttribute("title", "Play");
  music.pause();
}

// PLAY OR PAUSE EVENT LISTENER
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

//UPDATE DOM
function loadSong(song) {
  title.textContent = song.displayName; // when I decide to go next or back to the previous one the title has to change and take the value of the chosen one
  artist.textContent = song.artist; // as per title, the same has to happen for the artist
  music.src = `${song.name}.mp3`; // I am putting a template string which will take the name of the object and the system wll do the rest as we are changing the name
  image.src = `${song.name}.jpg`; // Here I ve done the same and the name is song.name becasue the name of both songs and pics is the same (done it on purporse to help)
}

// CURRENT SONG
let songIndex = 0; //on load the system will start from this song, the first one and then clicking the buttons, it wil lgo to the next one or to the previous one

// PREVIOUS SONG
function prevSong() {
  songIndex--; // rhis will take the index stored and increment it to go to the next song
  if (songIndex < 0) {
    // I needed to do so because by default if I kept clicking the PREVIOUS BUTTON once arrived at the first song it did not do anything. In this way once arrived at the first song, it will restart
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]); // this will take the current index that by default will start from 0
  playSong(); // calling the function to let the song play, function created above
}

// NEXT SONG
function nextSong() {
  songIndex++; // rhis will take the index stored and increment it to go to the next song
if (songIndex > songs.length - 1) {
    // as per above description, a similar situation happened clicking the NEXT BUTTON. Doing so, once arrived at the last song, the system will restart from the first one, as I put to start from index 0
    songIndex = 0;
}
  loadSong(songs[songIndex]); // this will take the current index that by default will start from 0
  playSong(); // calling the function to let the song play, function created above
}

// ON LOAD SELECT FIRST SONG
loadSong(songs[songIndex]);

// UPDATE PROGRESS BAR & TIME
function updateProgressBar(e) {
  // important values to take are duration  and currentTime, this method is called OBJECT DESTRUCTURING
    if (isPlaying) {
    //if isPlaying is true than the system can update the progressBar
    const { duration, currentTime } = e.srcElement;
    // console.log(duration, currentTime);


    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    // console.log(progressPercent); shows me the duration, currentTime and the Percentage that then I have to convert into a string in order to let the css change
    progress.style.width = `${progressPercent}%`;

    // CALCULATE DISPLAY FOR DURATION
    const durationMinutes = Math.floor(duration / 60);
    //console.log("minutes", durationMinutes);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`; //to put the 0 before the last number
    }
    // DELAY SWITCHING DURATION ELEMENT TO AVOID NAN
    if (durationSeconds) {
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // CALCULATE DISPLAY FOR CURRENT TIME
    const currentMinutes = Math.floor(currentTime / 60);
    //console.log("minutes", currentMinutes);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`; //to put the 0 before the last number
    }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}
// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// EVENT LISTENERS FOR NEXT AND PREVIOUS BUTTONS
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);

