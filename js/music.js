// 播放列表
    const playlist = [
      {
        title: "一块红布",
        artist: "崔健",
        src: "./music/一块红布.MP3",
        cover: "./img/music/一块红布.jpg",
      },
      {
        title: "一无所有",
        artist: "崔健",
        src: "./music/一无所有.flac",
        cover: "./img/music/新长征.jpg",
      },
      {
        title: "长城",
        artist: "beyond",
        src: "./music/长城.mp3",
        cover: "./img/music/继续革命.jpg",
      },
      {
        title: "オレンジ",
        artist: "初音未来/トーマ ",
        src: "./music/オレンジ.flac",
        cover: "./img/music/杜鹃花的心脏.jpg",
      }
    ];

    // 元素
    const audio = document.getElementById('play1');
    const musicBox = document.getElementById('musicBox');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.getElementById('progressBar');
    const progressContainer = document.getElementById('progressContainer');
    const currentTimeEl = document.getElementById('currentTime');
    const totalTimeEl = document.getElementById('totalTime');
    const musicTitle = document.getElementById('musicTitle');
    const musicArtist = document.getElementById('musicArtist');
    const volumeSlider = document.getElementById('volumeSlider');
    const playlistToggle = document.getElementById('playlistToggle');
    // const playlist = document.getElementById('playlist');
    const playlistCount = document.getElementById('playlistCount');

    // 当前索引
    let currentIndex = 0;
    let isPlaying = false;
    let animationId = null;

    // 初始化
    function initPlaylist() {
      playlistCount.textContent = `(${playlist.length})`;
      playlist.innerHTML = '';
      
      playlist.forEach((song, index) => {
        const item = document.createElement('div');
        item.className = `playlist-item ${index === currentIndex ? 'active' : ''}`;
        item.innerHTML = `
          <span>${song.title} - ${song.artist}</span>
          <span class="music-duration">${song.duration}</span>
        `;
        item.addEventListener('click', () => {
          if (currentIndex !== index) {
            currentIndex = index;
            loadSong();
            playSong();
          }
        });
        playlist.appendChild(item);
      });
    }

    // 加载
    function loadSong() {
      const song = playlist[currentIndex];
      audio.src = song.src;
      musicTitle.textContent = song.title;
      musicArtist.textContent = song.artist;
      musicBox.style.backgroundImage = `url(${song.cover})`;
      
      // 更新播放列表选中
      document.querySelectorAll('.playlist-item').forEach((item, index) => {
        item.classList.toggle('active', index === currentIndex);
      });
      
      // 加载完成后更新总时长
      audio.addEventListener('loadedmetadata', updateTotalTime);
    }

    // 播放歌曲
    function playSong() {
      audio.play();
      isPlaying = true;
      musicBox.classList.add('playing');
      playPauseBtn.innerHTML = `
        <svg t="1649230522772" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
          <path d="M320 224h128v576H320V224z m384 0h128v576H704V224z" fill="#fff" />
        </svg>  `;
      
      // 旋转动画
      if (animationId) cancelAnimationFrame(animationId);
      let rotation = 0;
      function rotate() {
        rotation += 1;
        musicBox.style.transform = `rotate(${rotation}deg)`;
        animationId = requestAnimationFrame(rotate);
      }
      rotate();
    }

    // 暂停歌曲
    function pauseSong() {
      audio.pause();
      isPlaying = false;
      musicBox.classList.remove('playing');
      playPauseBtn.innerHTML = `
        <svg t="1649146869552" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
          <path d="M657.92 535.04l-256-160v320z" fill="#fff" />
        </svg>
      `;
      
      // 停止旋转
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    }

    // 上一首
    function prevSong() {
      currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
      loadSong();
      if (isPlaying) playSong();
    }

    // 下一首
    function nextSong() {
      currentIndex = (currentIndex + 1) % playlist.length;
      loadSong();
      if (isPlaying) playSong();
    }

    // 更新进度
    function updateProgress(e) {
      const { duration, currentTime } = e.srcElement;
      const progressPercent = (currentTime / duration) * 100;
      progressBar.style.width = `${progressPercent}%`;
      
      // 更新当前时间显示
      currentTimeEl.textContent = formatTime(currentTime);
    }

    // 更新总时长
    function updateTotalTime() {
      totalTimeEl.textContent = formatTime(audio.duration);
    }

    // 格式化时间
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    // 进度条点击
    function setProgress(e) {
      const width = progressContainer.clientWidth;
      const clickX = e.offsetX;
      const duration = audio.duration;
      audio.currentTime = (clickX / width) * duration;
    }

    // 音量控制
    function setVolume() {
      audio.volume = volumeSlider.value;
    }

    // 切换播放列表显示
    function togglePlaylist() {
      playlist.classList.toggle('show');
    }

    // 事件监听
    playPauseBtn.addEventListener('click', () => {
      isPlaying ? pauseSong() : playSong();
    });
    
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    audio.addEventListener('timeupdate', updateProgress);
    progressContainer.addEventListener('click', setProgress);
    volumeSlider.addEventListener('input', setVolume);
    playlistToggle.addEventListener('click', togglePlaylist);
    audio.addEventListener('ended', nextSong);

    // 全纯初始化
    window.addEventListener('DOMContentLoaded', () => {
      initPlaylist();
      loadSong();
    });