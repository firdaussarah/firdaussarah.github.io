document.addEventListener('DOMContentLoaded', function() {
    const audioButton = document.getElementById('audioButton');
    const bgMusic = document.getElementById('bgMusic');

    // Initialize audio settings
    bgMusic.loop = true;
    bgMusic.volume = 1.0;

    // Function to play music (continues from current position)
    function playMusic() {
        bgMusic.play()
            .then(() => {
                audioButton.classList.add('playing');
                localStorage.setItem('musicPlaying', 'true');
            })
            .catch(err => console.log('Play failed:', err));
    }

    // Function to pause music
    function pauseMusic() {
        bgMusic.pause();
        audioButton.classList.remove('playing');
        localStorage.setItem('musicPlaying', 'false');
    }

    // Store current time periodically
    bgMusic.addEventListener('timeupdate', function() {
        if (!bgMusic.paused) {
            localStorage.setItem('musicTime', bgMusic.currentTime);
        }
    });

    // Restore time position if stored
    const savedTime = localStorage.getItem('musicTime');
    if (savedTime) {
        bgMusic.currentTime = parseFloat(savedTime);
    }

    // Check if we should be playing music (not on main_pembuka since it handles its own start)
    if (!window.location.pathname.includes('main_pembuka.html') && 
        localStorage.getItem('musicPlaying') === 'true') {
        playMusic();
    }

    // Toggle music on button click
    audioButton.addEventListener('click', function() {
        if (bgMusic.paused) {
            playMusic();
        } else {
            pauseMusic();
        }
    });

    // Handle page visibility
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Only pause if it was playing
            if (!bgMusic.paused) {
                bgMusic.pause();
            }
        } else {
            // Resume only if we were playing before
            if (localStorage.getItem('musicPlaying') === 'true') {
                playMusic();
            }
        }
    });
});
