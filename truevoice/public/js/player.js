const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const playPauseBtn = document.getElementById('playPause');
const waveformContainer = document.getElementById('waveform');
let wavesurfer;

function getWaveformHeight() {
    return waveformContainer.getBoundingClientRect().height;
}

function getBarSettings() {
    return window.innerWidth >= 768 ? { barWidth: 2.2, barGap: 6 } : { barWidth: 1.5, barGap: 4 };
}

pauseBtn.classList.add('hidden');

function initWaveSurfer() {
    if (wavesurfer) {
    wavesurfer.destroy();
    }

    const { barWidth, barGap } = getBarSettings();
    
    wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: '#D9D9D9',
        progressColor: '#014751',
        barWidth: barWidth,
        height: getWaveformHeight(),
        responsive: true,
        barGap: barGap,
        cursorWidth: 0
    });
    
    wavesurfer.load('../../test-music.mp3');

    wavesurfer.on('ready', () => {
        document.getElementById('total-duration').innerText = formatDuration(wavesurfer.getDuration());
    });

    wavesurfer.on('audioprocess', () => {
        let currentTime = wavesurfer.getCurrentTime();
        let duration = wavesurfer.getDuration();
        document.getElementById('current-time').innerText = formatTime(currentTime);
        document.getElementById('remaining-time').innerText = formatTime(duration - currentTime);
    });

    wavesurfer.on('finish', () => {
        playBtn.classList.remove('hidden');
        pauseBtn.classList.add('hidden');
        wavesurfer.stop();
    });

    playPauseBtn.addEventListener('click', () => {
        if (wavesurfer.isPlaying()) {
            wavesurfer.pause();
            playBtn.classList.remove('hidden');
            pauseBtn.classList.add('hidden');
        } else {
            wavesurfer.play();
            playBtn.classList.add('hidden');
            pauseBtn.classList.remove('hidden');
        }
    });

    document.getElementById('rewind').addEventListener('click', () => {
        wavesurfer.seekTo(Math.max(0, (wavesurfer.getCurrentTime() - 15) / wavesurfer.getDuration()));
    });

    document.getElementById('forward').addEventListener('click', () => {
        wavesurfer.seekTo(Math.min(1, (wavesurfer.getCurrentTime() + 30) / wavesurfer.getDuration()));
    });
}

function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    return min + ":" + (sec < 10 ? "0" : "") + sec;
}

function formatDuration(seconds) {
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds % 3600) / 60);
    let secs = Math.floor(seconds % 60);

    let result = "";
    if (hrs > 0) result += `${hrs}hr `;
    if (mins > 0) result += `${mins}m `;
    if (secs > 0 || result === "") result += `${secs}s`; // Always show seconds

    return result.trim();
}

window.addEventListener('resize', initWaveSurfer);
initWaveSurfer();