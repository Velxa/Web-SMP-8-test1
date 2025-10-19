// --- 1. DATA PENGGUNA DAN KUIS ---

// Data Pengguna yang Diizinkan

const authorizedUsers = [

    { user: "Exa", class: "IX.A", pass: "12345" },

    { user: "Budi", class: "VIII.B", pass: "rahasia" },

    { user: "Santi", class: "VII.A", pass: "sandi123" }

];

// Data Kuis (Dikelompokkan berdasarkan Kelas dan Mata Pelajaran)

const quizData = {

    'IX.A_ipa': [

        { q: "1. Organel sel yang berperan dalam respirasi sel adalah...", options: ["Nukleus", "Mitokondria", "Ribosom"], a: "Mitokondria" },

        { q: "2. Berapakah hasil dari \( (3x + 1)^2 \)?", options: ["\( 9x^2+1 \)", "\( 9x^2+6x+1 \)", "\( 3x^2+6x+1 \)" ], a: "9x^2+6x+1" }

    ],

    'VIII.B_math': [

        { q: "1. Tentukan nilai \( x \) dari persamaan \( 2x - 5 = 11 \).", options: ["6", "8", "16"], a: "8" }

    ],

    'VII.A_history': [

        { q: "1. Kerajaan Hindu-Buddha tertua di Indonesia adalah...", options: ["Sriwijaya", "Tarumanegara", "Kutai"], a: "Kutai" }

    ]

};

// --- 2. FUNGSI NAVIGASI (Menampilkan Kotak Konten) ---

// Fungsi untuk menyembunyikan semua section konten dan menampilkan yang dipilih

function showSection(sectionId) {

    document.querySelectorAll('.content-section').forEach(section => {

        section.classList.add('hidden');

    });

    document.getElementById(sectionId).classList.remove('hidden');

}

// --- 3. FUNGSI LOGIN ---

function handleLogin(event) {

    event.preventDefault(); 

    const usernameInput = document.getElementById('username').value.trim();

    const classCodeInput = document.getElementById('class-code').value.trim().toUpperCase();

    const passwordInput = document.getElementById('password').value.trim();

    const loginMessage = document.getElementById('login-message');

    const userFound = authorizedUsers.find(user => 

        user.user.toLowerCase() === usernameInput.toLowerCase() &&

        user.class === classCodeInput &&

        user.pass === passwordInput

    );

    if (userFound) {

        // Login Berhasil

        loginMessage.classList.add('hidden');

        document.getElementById('login-section').classList.add('hidden');

        document.getElementById('content-area').classList.remove('hidden');

        

        // Simpan status dan kelas ke local storage (agar tetap login saat refresh)

        localStorage.setItem('isLoggedIn', 'true');

        localStorage.setItem('currentUserClass', userFound.class);

        

        // Atur default kelas di selector kuis

        document.getElementById('class-selector').value = userFound.class;

        

        // Muat konten default (Blog Terbaru)

        loadDynamicContent();

        showSection('dynamic-posts'); 

    } else {

        // Login Gagal

        loginMessage.classList.remove('hidden');

    }

}

// Fungsi untuk memeriksa status login saat halaman dimuat

function checkLoginStatus() {

    if (localStorage.getItem('isLoggedIn') === 'true') {

        document.getElementById('login-section').classList.add('hidden');

        document.getElementById('content-area').classList.remove('hidden');

        

        // Atur default kelas dan muat konten

        const userClass = localStorage.getItem('currentUserClass');

        if (userClass) {

             document.getElementById('class-selector').value = userClass;

        }

        loadDynamicContent();

        showSection('dynamic-posts');

    }

}

// --- 4. FUNGSI KONTEN DINAMIS (Simulasi CMS) ---

function loadDynamicContent() {

    const postsContainer = document.getElementById('dynamic-posts');

    const videoElement = document.getElementById('main-video');

    // SIMULASI POSTINGAN (Edit di sini untuk menambah postingan baru)

    const simulatedPosts = [

        { title: "Postingan 1: Mengenal Aljabar", date: "22 Okt 2023", summary: "Dasar-dasar persamaan linear dan kuadrat.", link: "#" },

        { title: "Postingan 2: Sejarah Indonesia", date: "21 Okt 2023", summary: "Materi tentang masa pra-aksara.", link: "#" }

    ];

    

    let postHTML = '<h2 class="mb-4">Postingan Blog Terbaru</h2>';

    simulatedPosts.forEach(post => {

        postHTML += `<div class="card mb-3 shadow-sm">

            <div class="card-body">

                <h5 class="card-title"><a href="\({post.link}" class="text-decoration-none text-primary">\){post.title}</a></h5>

                <p class="card-subtitle mb-2 text-muted small">Dipublikasikan pada: \({post.date}</p>

                <p class="card-text">\){post.summary}</p>

            </div>

        </div>`;

    });

    postsContainer.innerHTML = postHTML;

    

    // GANTI ID VIDEO DI SINI UNTUK UPDATE VIDEO

    const newVideoID = "contoh_id_video"; // Ganti dengan ID video YouTube yang valid

    videoElement.src = `https://www.youtube.com/embed/\){newVideoID}`; 

}

// --- 5. FUNGSI KUIS ---

function loadQuizContent() {

    // Sembunyikan hasil kuis sebelumnya

    document.getElementById('quiz-result').classList.add('hidden');

    

    const classId = document.getElementById('class-selector').value;

    const subjectId = document.getElementById('subject-selector').value;

    const quizKey = `\({classId}_\){subjectId}`;

    const currentQuiz = quizData[quizKey];

    const quizForm = document.getElementById('dynamic-quiz-form');

    const quizTitle = document.getElementById('quiz-title');

    const quizContainer = document.getElementById('quiz-container');

    if (!currentQuiz) {

        quizForm.innerHTML = `<div class="alert alert-warning">Maaf, kuis untuk kombinasi ini belum tersedia.</div>`;

        quizContainer.classList.remove('hidden');

        return;

    }

    quizTitle.textContent = `\({subjectId.toUpperCase()} Kelas \){classId}`;

    quizContainer.classList.remove('hidden');

    

    let output = '';

    currentQuiz.forEach((q, index) => {

        output += `<div class="mb-3 p-3 border rounded">

            <p class="fw-bold">\){q.q}</p>`;

        

        q.options.forEach(option => {

            output += `

                <label class="form-check-label">

                    <input type="radio" class="form-check-input" name="q\){index}" value="\({option}">

                    \){option}

                </label>`;

        });

        output += `</div>`;

    });

    quizForm.innerHTML = output;

}

function submitQuiz() {

    const quizForm = document.getElementById('dynamic-quiz-form');

    const resultDiv = document.getElementById('quiz-result');

    const classId = document.getElementById('class-selector').value;

    const subjectId = document.getElementById('subject-selector').value;

    const quizKey = `\({classId}_\){subjectId}`;

    const currentQuiz = quizData[quizKey];

    if (!currentQuiz) return; 

    let score = 0;

    currentQuiz.forEach((q, index) => {

        const selector = `input[name=q\({index}]:checked`;

        const userAnswer = (quizForm.querySelector(selector) || {}).value;

        if (userAnswer === q.a) {

            score++;

        }

    });

    resultDiv.innerHTML = `Skor Anda: <strong>\){score}</strong> dari <strong>\){currentQuiz.length}</strong> pertanyaan.`;

    resultDiv.classList.remove('hidden');

    

    // Update styling hasil

    resultDiv.classList.remove('alert-info', 'alert-success', 'alert-warning');

    resultDiv.classList.add(score === currentQuiz.length ? 'alert-success' : (score > currentQuiz.length / 2 ? 'alert-info' : 'alert-warning'));

}

// --- 6. EVENT LISTENERS ---

document.addEventListener('DOMContentLoaded', () => {

    // 1. Cek status login saat halaman dimuat

    checkLoginStatus(); 

    // 2. Tambahkan listener ke form login

    const loginForm = document.getElementById('simple-login-form');

    if (loginForm) {

        loginForm.addEventListener('submit', handleLogin);

    }

});