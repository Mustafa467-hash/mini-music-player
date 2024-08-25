const songsList = [
    {
        name: "Rahat Fatah Ali Khan",
        artist: "O re piya",
        src: "2.mp3",
        cover: "3.jpeg"
    },
    {
        name: "Rahat Fatah Ali Khan",
        artist: "Sajda",
        src: "3.mp3",
        cover: "2.jpeg"
    },
    {
        name : 'Talha Anjum ',
        artist: 'Downers at dusk',
        src : '4.mp3',
        cover: '4.jpeg',
    },
    {
        name : 'Imran Khan',
        artist : 'Amplifier',
        src : '5.mp3',
        cover : '5.png'
    },
    {
        name : 'Ogryzek',
        artist: 'AURA',
        src : '6.mp3',
        cover : '6.png'
    },
    {
        name : 'Billy X',
        artist : 'Juttni',
        src : '7.mp3',
        cover : '7.png'
    },
    {
        name : 'Roopkumar Rathod',
        artist : 'Maula mera',
        src : '8.mp3',
        cover : '8.png'
    },
    {
        name : 'Sowmya Raoh',
        artist : 'Dreamum Wakeupum',
        src : '9.mp3',
        cover : '9.png'
    },
    {
        name : 'PNB Rock',
        artist : 'Unforgettable freestyle',
        src : '10.mp3',
        cover : '10.png'
    },
    {
        name : 'Floyymenor, Cris MJ',
        artist : 'Gata Only',
        src : '11.mp3',
        cover : '11.png'
    },
    {
        name : 'Mohit Chauhan, Pritam',
        artist : 'Tum se hi',
        src : '12.mp3',
        cover : '12.png'
    }
    



];

const artistName = document.querySelector('.artist-name');
const musicName = document.querySelector('.song-name');
const fillBar = document.querySelector('.fill-bar');
const time = document.querySelector('.time');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const prog = document.querySelector('.progress-bar');

let song = new Audio();
let currentSong = 0;
let playing = false;

document.addEventListener('DOMContentLoaded', () => {
    loadSong(currentSong);
    song.addEventListener('timeupdate', updateProgress);
    song.addEventListener('ended', nextSong);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    playBtn.addEventListener('click', togglePlayPause);
    prog.addEventListener('click', seek);
});

function loadSong(index) {
    const { name, artist, src, cover: thumb } = songsList[index];
    artistName.innerText = artist;
    musicName.innerText = name;
    song.src = src;
    cover.style.backgroundImage = `url(${thumb})`;
}

function updateProgress() {
    if (song.duration) {
        const pos = (song.currentTime / song.duration) * 100;
        fillBar.style.width = `${pos}%`;

        const duration = formatTime(song.duration);
        const currentTime = formatTime(song.currentTime);
        time.innerText = `${currentTime} - ${duration}`;

    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function togglePlayPause() {
    if (playing) {
        song.pause();
    } else {
        song.play();
    }
    playing = !playing;
    playBtn.classList.toggle('fa-pause', playing);
    playBtn.classList.toggle('fa-play', !playing);
    cover.classList.toggle('active', playing);
}

function nextSong() {
    currentSong = (currentSong + 1) % songsList.length;
    playMusic();
}

function prevSong() {
    currentSong = (currentSong - 1 + songsList.length) % songsList.length;
    playMusic();
}

function playMusic() {
    loadSong(currentSong);
    song.play();
    playing = true;
    playBtn.classList.add('fa-pause');
    playBtn.classList.remove('fa-play');
    cover.classList.add('active');
}

function seek(e) {
    const pos = (e.offsetX / prog.clientWidth) * song.duration;
    song.currentTime = pos;
}