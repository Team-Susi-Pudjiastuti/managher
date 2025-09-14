// Initialize data - simulating user's badges
const userBadges = ["Dreamer", "Researcher", "Creator", "Boss Lady", "Strategist"];

// DOM Elements
const globalBar = document.getElementById('globalBar');
const globalPct = document.getElementById('globalPct');

// Set global progress
document.addEventListener('DOMContentLoaded', function() {
  globalBar.style.width = '100%';
  globalPct.textContent = '100%';
  
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  mobileMenuBtn.addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    if(sidebar.classList.contains('hidden')) {
      sidebar.classList.remove('hidden');
      sidebar.classList.add('fixed', 'top-16', 'left-0', 'right-0', 'bottom-0', 'z-40', 'shadow-lg');
    } else {
      sidebar.classList.add('hidden');
      sidebar.classList.remove('fixed', 'top-16', 'left-0', 'right-0', 'bottom-0', 'z-40', 'shadow-lg');
    }
  });
});

// Navigation functions
function showDashboard() {
  window.location.href = 'dashboard.html'; // In a real app, this would navigate to dashboard
}

function openLevel(levelId) {
  alert(`Membuka Level ${levelId}`); // In a real app, this would navigate to the specific level
}

function toggleHomepageSubmenu() {
  const submenu = document.getElementById('homepageSubmenu');
  submenu.classList.toggle('hidden');
  const arrow = document.getElementById('homeArrow');
  arrow.classList.toggle('rotate-180');
}

function logout() {
  if(confirm('Apakah Anda yakin ingin logout?')) {
    alert('Logout berhasil');
    // In a real application, this would handle actual logout
  }
}