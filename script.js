// Dynamic content loader
function loadPage(page) {
  fetch(page)
    .then(response => response.text())
    .then(html => {
      document.getElementById('content-area').innerHTML = html;
    })
    .catch(() => {
      document.getElementById('content-area').innerHTML = "<p class='text-center text-red-500'>Failed to load content.</p>";
    });
}

// Load 'today.html' by default
document.addEventListener("DOMContentLoaded", () => {
  loadPage('today.html');
});


function openSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  sidebar.classList.remove('-translate-x-full');
  overlay.classList.remove('hidden');
}

function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  sidebar.classList.add('-translate-x-full');
  overlay.classList.add('hidden');
}

