import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBCptjoTkBoZ4epUw2hYqu2i6IYi4C7cfE",
  authDomain: "portfolio-mayoni-2026.firebaseapp.com",
  databaseURL:
    "https://portfolio-mayoni-2026-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "portfolio-mayoni-2026",
  storageBucket: "portfolio-mayoni-2026.firebasestorage.app",
  messagingSenderId: "989687636236",
  appId: "1:989687636236:web:fc428f0c5639657fb7e929",
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Ambil elemen form
const commentForm = document.getElementById("commentForm");
const nameInput = document.getElementById("nameInput");
const messageInput = document.getElementById("messageInput");
const messageStatus = document.getElementById("messageStatus");
const commentsList = document.getElementById("commentsList");
const sendBtn = document.getElementById("sendBtn");

// Format waktu untuk komentar
function formatTime(timestamp) {
  try {
    const date = timestamp ? new Date(timestamp) : new Date();
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    return "Baru saja";
  }
}

// Fungsi untuk menampilkan komentar
function displayComment(comment, id) {
  const commentItem = document.createElement("div");
  commentItem.className = "comment-item";
  commentItem.id = `comment-${id}`;

  // Handle jika data tidak lengkap
  const name = comment.name || "Anonymous";
  const message = comment.message || "";
  const time = comment.time || Date.now();

  commentItem.innerHTML = `
    <div class="comment-header">
      <div class="comment-name">${name}</div>
      <div class="comment-time">${formatTime(time)}</div>
    </div>
    <p class="comment-text">${message}</p>
  `;
  return commentItem;
}

// Fungsi untuk menampilkan status
function showStatus(message, type) {
  messageStatus.textContent = message;
  messageStatus.className = `status-message ${type}`;
  messageStatus.style.display = "block";

  // Hilangkan status setelah 3 detik
  setTimeout(() => {
    messageStatus.style.display = "none";
  }, 3000);
}

// Fungsi untuk memuat komentar dari Firebase
function loadComments() {
  // Tampilkan loading state
  commentsList.innerHTML = `
    <div class="loading-comments">
      <i class='bx bx-loader-circle bx-spin'></i>
      <span>Memuat komentar...</span>
    </div>
  `;

  const commentsRef = ref(database, "comments");

  onValue(
    commentsRef,
    (snapshot) => {
      const data = snapshot.val();
      commentsList.innerHTML = "";

      if (!data) {
        // Tidak ada komentar
        commentsList.innerHTML = `
        <div class="empty-comments">
          <i class='bx bx-comment-dots'></i>
          <p>Belum ada komentar. Jadilah yang pertama!</p>
        </div>
      `;
        return;
      }

      // Konversi object ke array
      const commentsArray = [];
      Object.keys(data).forEach((key) => {
        commentsArray.push({
          id: key,
          ...data[key],
        });
      });

      // Urutkan berdasarkan waktu terbaru
      commentsArray.sort((a, b) => {
        const timeA = a.time ? new Date(a.time).getTime() : 0;
        const timeB = b.time ? new Date(b.time).getTime() : 0;
        return timeB - timeA;
      });

      // Tampilkan maksimal 10 komentar terbaru
      const recentComments = commentsArray.slice(0, 10);

      if (recentComments.length === 0) {
        commentsList.innerHTML = `
        <div class="empty-comments">
          <i class='bx bx-comment-dots'></i>
          <p>Belum ada komentar. Jadilah yang pertama!</p>
        </div>
      `;
        return;
      }

      recentComments.forEach((comment) => {
        commentsList.appendChild(displayComment(comment, comment.id));
      });
    },
    (error) => {
      console.error("Error loading comments:", error);
      commentsList.innerHTML = `
      <div class="empty-comments error">
        <i class='bx bx-error-circle'></i>
        <p>Gagal memuat komentar.</p>
      </div>
    `;
    },
  );
}

// Event listener untuk form komentar
commentForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const message = messageInput.value.trim();

  if (!name || !message) {
    showStatus("⚠️ Nama dan pesan tidak boleh kosong.", "error");
    return;
  }

  if (name.length > 50) {
    showStatus("⚠️ Nama terlalu panjang (maks 50 karakter).", "error");
    return;
  }

  if (message.length > 500) {
    showStatus("⚠️ Pesan terlalu panjang (maks 500 karakter).", "error");
    return;
  }

  // Disable button saat mengirim
  const originalText = sendBtn.innerHTML;
  sendBtn.disabled = true;
  sendBtn.innerHTML = '<i class="bx bx-loader bx-spin"></i> Mengirim...';

  try {
    const commentsRef = ref(database, "comments");

    await push(commentsRef, {
      name: name,
      message: message,
      time: new Date().toISOString(),
    });

    // Reset form
    commentForm.reset();
    showStatus("✅ Pesan berhasil dikirim!", "success");
  } catch (error) {
    console.error("Error sending comment:", error);
    showStatus("❌ Gagal mengirim pesan. Coba lagi.", "error");
  } finally {
    // Enable button kembali
    sendBtn.disabled = false;
    sendBtn.innerHTML = originalText;
  }
});

// Muat komentar saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  // Tunggu sebentar agar DOM benar-benar siap
  setTimeout(() => {
    loadComments();
  }, 500);
});
