const audioPlayer = document.getElementById('audio-player');
const message = document.querySelector('.message');
const effectContainer = document.querySelector('.effect-container');
const muteButton = document.getElementById('mute-button');
const lyricsContainer = document.querySelector('.lyrics-container');
const overlay = document.getElementById('overlay');

let isMuted = false; // حالة الصوت
let viewerCount = 0; // عدد المشاهدين

// كلمات الأغنية مع توقيتاتها
const lyrics = [
    { time: 1, text: "طيبها قسوة جفاها" },
    { time: 4, text: "ضحكها هيبة بكاها" },
    { time: 8, text: "روحها حدة ذكاها" },
    { time: 10, text: "تبلأك بالاسئله" },
];

// إظهار الرسالة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    overlay.style.opacity = '1'; // جعل الخلفية سوداء
    viewerCount++; // زيادة عدد المشاهدين
    document.getElementById('viewer-count').textContent = `عدد المشاهدين: ${viewerCount}`; // تحديث عدد المشاهدين
});

// تشغيل الصوت عند الضغط على الشاشة
document.body.addEventListener('click', (e) => {
    if (audioPlayer.paused) {
        audioPlayer.play();
    }
    
    overlay.style.opacity = '0'; // إخفاء الرسالة عند الضغط
    createEffect(e.pageX, e.pageY); // إضافة التأثير عند الضغط

    // إظهار جميع العناصر المخفية
    document.querySelectorAll('.hidden').forEach(function(element) {
        element.classList.remove('hidden');
    });
});

// إضافة تأثير في مكان الضغط
function createEffect(x, y) {
    const effect = document.createElement('div');
    effect.classList.add('effect');
    effect.textContent = '';

    effect.style.left = `${x}px`;
    effect.style.top = `${y}px`;

    effectContainer.appendChild(effect);

    // إزالة التأثير بعد 1.5 ثانية
    setTimeout(() => {
        effect.remove();
    }, 1500);
}

// كتم الصوت أو فك الكتم
muteButton.addEventListener('click', () => {
    isMuted = !isMuted; // عكس حالة الصوت
    audioPlayer.muted = isMuted; // كتم الصوت

    // تغيير الأيقونة حسب الحالة
    muteButton.textContent = isMuted ? '🔇' : '🔊';
});

// تحديث عرض الكلمات
let lastDisplayedTime = 0;

audioPlayer.addEventListener('timeupdate', () => {
    const currentTime = audioPlayer.currentTime;

    // البحث عن الكلمة المناسبة
    const currentLyric = lyrics.find(lyric => lyric.time <= currentTime && currentTime < (lyric.time + 3));

    if (currentLyric && currentLyric.time !== lastDisplayedTime) {
        lastDisplayedTime = currentLyric.time; // تحديث وقت الكلمة المعروضة
        lyricsContainer.textContent = currentLyric.text; // عرض الكلمة الحالية

        // تحديد موضع عشوائي على الشاشة
        const randomX = Math.random() * (window.innerWidth - lyricsContainer.offsetWidth);
        const randomY = Math.random() * (window.innerHeight - lyricsContainer.offsetHeight);

        lyricsContainer.style.left = `${randomX}px`;
        lyricsContainer.style.top = `${randomY}px`;

        lyricsContainer.classList.add('zoom');
        lyricsContainer.style.opacity = 1;

        // إخفاء الكلمات بعد 2 ثانية
        setTimeout(() => {
            lyricsContainer.classList.remove('zoom');
            lyricsContainer.style.opacity = 0;
        }, 2000);
    }
});

// حدث نهاية الأغنية
audioPlayer.addEventListener('ended', onSongEnd);

function onSongEnd() {
    overlay.style.opacity = 1;
    overlay.textContent = "End 🤍";

    // إعادة التوجيه إلى رابط الديسكورد بعد 1 ثانية
    setTimeout(() => {
        window.location.href = "https://discord.gg/jh4Qtzp8rd"; // إعادة التوجيه بعد 1 ثانية
    }, 1000);
}
