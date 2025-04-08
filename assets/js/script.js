const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const seekBar = document.getElementById('seekBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const songTitle = document.getElementById('songTitle');
const songArtist = document.getElementById('songArtist');
const songImage = document.getElementById('songImage');

const playlist = [
    'assets/music/Mikee Mykanic-Szövegó.mp3',
    'assets/music/Azahriah-Figyelj.mp3',
    'assets/music/Bëlga-Az a baj.mp3',
];

let currentSongIndex = 0;

audioPlayer.src = playlist[currentSongIndex];
updateSongDetails();

playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.textContent = '⏸';
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = '▶';
    }
});

audioPlayer.addEventListener('timeupdate', () => {
    seekBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    durationEl.textContent = formatTime(audioPlayer.duration);
});

seekBar.addEventListener('input', () => {
    audioPlayer.currentTime = (seekBar.value / 100) * audioPlayer.duration;
});

prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong();
});


nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong();
});

function loadSong() {
    audioPlayer.src = playlist[currentSongIndex];
    audioPlayer.play();
    playPauseBtn.textContent ='⏸';
    updateSongDetails();
}

function updateSongDetails() {
    const fileName = playlist[currentSongIndex].split('/').pop();
    const [artist, title] = fileName.replace('.mp3', '').split('-');
    songArtist.textContent = artist;
    songTitle.textContent = title;

    const imagePath = `assets/images/${fileName.replace('.mp3', '.jpg')}`;
    songImage.src = imagePath;
    songImage.alt = `${artist} - ${title}`;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}