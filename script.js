const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const volumeSlider = player.querySelector('.player__slider[name="volume"]');
const playbackRateSlider = player.querySelector('.player__slider[name="playbackRate"]');

function togglePlay() {
  video.paused ? video.play() : video.pause();
}

function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function handleVolumeChange() {
  video.volume = parseFloat(volumeSlider.value);
}

function handlePlaybackRateChange() {
  video.playbackRate = parseFloat(playbackRateSlider.value);
}

function handleSkip() {
  const skipValue = parseFloat(this.dataset.skip);
  video.currentTime += skipValue;
}

toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
volumeSlider.addEventListener('input', handleVolumeChange);
playbackRateSlider.addEventListener('input', handlePlaybackRateChange);

skipButtons.forEach(button => {
  button.addEventListener('click', handleSkip);
});

let mousedown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));

video.addEventListener('error', () => {
  alert('Error loading video. Please check the source file.');
});