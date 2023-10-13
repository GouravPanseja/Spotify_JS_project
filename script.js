console.log("Welcome to Spotify");

// initialise the variables
let songIndex = 0;

let audio = new Audio(`songs/${songIndex + 1}.mp3`); // to run a random song after script load when masterPlay button is clicked

let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");

let songNameDisplay = document.getElementById("songInfo");

let songItems = Array.from(document.getElementsByClassName("songItem")); // Array.from() to convert the HTMLcollection, an array-like object to array.

let prev = document.getElementById("previous");
let next = document.getElementById("forward");
let theme = document.getElementById("theme");


// myProgressBar.value=0;     instead put in the value attribute in its html
audio.pause(); // to pause the audio when script is loaded

var songs = [
  { songName: "Bones", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
  { songName: "Closer", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
  { songName: "Faded", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
  { songName: "Lily", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
  { songName: "Warriyo ", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
  { songName: "Cielo ", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
  { songName: "DEAF KEV ", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
  { songName: "Different", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
  { songName: "Janji", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
  { songName: "DEAF KEV ", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
];

// To add detials in the song rows
songItems.forEach((element, idx) => {
  // the global variable created at the top is used by changing its value in local scope, globallu

  element.getElementsByTagName("img")[0].src = songs[idx].coverPath; // to add cover image
  element.getElementsByClassName("songName")[0].innerHTML = songs[idx].songName; // to add songName
});

// to make all the other logos to stop state ie play icon displayed
const makeAllPlay = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-circle-pause");
      element.classList.add("fa-circle-play");
    }
  );
};

//selecting all play icons on the song row and making it interactive
Array.from(songItems).forEach(
  (element, idx) => {
    // to make this event called for all icons

    element.addEventListener("click", () => {
      makeAllPlay();

      if (audio.paused) {
        //song paused/not running

        element.getElementsByClassName('songItemPlay')[0].classList.remove("fa-circle-play");
        element.getElementsByClassName('songItemPlay')[0].classList.add("fa-circle-pause");
        audio.src = `songs/${idx + 1}.mp3`; // idx of i in its array is equal to idx of a song in its array
        audio.play();
        console.log("there was nothing running, a new song started");

        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");

        songIndex = idx;

        songNameDisplay.innerHTML = songs[idx].songName;
      }
       else {
        //song is playing

        src = [...audio.src].reverse().slice(0, 11).reverse().join("");
        console.log(src);

          //song clicked upon is not same as song playing
        if (src != `songs/${idx + 1}.mp3`) {

          audio.src = `songs/${idx + 1}.mp3`;
          element.getElementsByClassName('songItemPlay')[0].classList.remove("fa-circle-play");
          element.getElementsByClassName('songItemPlay')[0].classList.add("fa-circle-pause");
          audio.play();

          gif.style.opacity = 1;
          masterPlay.classList.remove("fa-play-circle");
          masterPlay.classList.add("fa-pause-circle");
          console.log("earlier song toped and another song is playe now");

          songNameDisplay.innerHTML = songs[idx].songName;
          songIndex = idx;
        } 
        else {
          audio.pause();
          element.getElementsByClassName('songItemPlay')[0].classList.remove("fa-circle-pause");
          element.getElementsByClassName('songItemPlay')[0].classList.add("fa-circle-play");
          console.log("clicked on same button,so song is turned off");

          gif.style.opacity = 0;
          masterPlay.classList.remove("fa-pause-circle");
          masterPlay.classList.add("fa-play-circle");

          songNameDisplay.innerHTML = "";
        }
      }
    });
  }
);

//updating the detials of song

//Handle play/pause click
masterPlay.addEventListener("click", () => {
  if (audio.paused || audio.currentTime <= 0) {
    console.log("playing");
    audio.play();
    gif.style.opacity = 1;

    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
  } else {
    audio.pause();
    console.log("audio paused");
    gif.style.opacity = 0;

    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
  }
});

//
audio.addEventListener("timeupdate", () => {
  let progress = parseInt((audio.currentTime / audio.duration) * 1000); //'1000' here must be equal to the division on progress bar
  myProgressBar.value = progress; // can be thought of as if the bar was divided into 100 parts then we would have given here 100 instead so as the make the 1 percent of progressBar division equal to 1 percent of the song length
  // similar for 1000 here, 1000 given to add more division so as to smooth the flow of bar
});

//listen ot events

myProgressBar.addEventListener("input", () => {
  audio.currentTime = (myProgressBar.value * audio.duration) / 1000; // from above formula
});

prev.addEventListener("click", () => {
  console.log(songIndex);

  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex = songIndex - 1;
  }
  console.log(songIndex);
  audio.src = `songs/${songIndex + 1}.mp3`; // idx of i in its array is equal to idx of a song in its array
  audio.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");

  songNameDisplay.innerHTML = songs[songIndex].songName;
});
next.addEventListener("click", () => {
  console.log(songIndex);

  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex = songIndex + 1;
  }
  console.log(songIndex);
  audio.src = `songs/${songIndex + 1}.mp3`; // idx of i in its array is equal to idx of a song in its array
  audio.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");

  songNameDisplay.innerHTML = songs[songIndex].songName;
});

theme.addEventListener('click',()=>{

  document.body.classList.toggle('dark-theme')
  
  if(document.body.classList.contains('dark-theme')){
    theme.src='images/sun.png'
    theme.style.background='black';
  }
  else{
    theme.src='images/moon.png';
  }
})