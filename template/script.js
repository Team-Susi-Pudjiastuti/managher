/* Sidebar & navigation helpers */
function toggleHomepageSubmenu(){
  const ul = document.getElementById("homepageSubmenu");
  const arrow = document.getElementById("homeArrow");

  // buka/tutup submenu
  ul.classList.toggle("hidden");
  arrow.classList.toggle("rotate-180");

  // simpan state di localStorage
  const isOpen = !ul.classList.contains("hidden");
  localStorage.setItem("homepageSubmenuOpen", isOpen);
}

// saat halaman baru dimuat
document.addEventListener("DOMContentLoaded", () => {
  const ul = document.getElementById("homepageSubmenu");
  const arrow = document.getElementById("homeArrow");
  const isOpen = localStorage.getItem("homepageSubmenuOpen") === "true";

  if (isOpen) {
    ul.classList.remove("hidden");
    arrow.classList.add("rotate-180");
  }
});

function toggleMobileSidebar(open){
  const sb = document.getElementById("sidebar");
  if(open) {
    sb.classList.add("open");
    // Add overlay to close sidebar when clicking outside
    const overlay = document.createElement("div");
    overlay.id = "sidebarOverlay";
    overlay.className = "fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden";
    overlay.onclick = () => toggleMobileSidebar(false);
    document.body.appendChild(overlay);
  } else {
    sb.classList.remove("open");
    const overlay = document.getElementById("sidebarOverlay");
    if(overlay) overlay.remove();
  }
}

function logout(){ 
  if(confirm("Apakah Anda yakin ingin logout?")) {
    localStorage.removeItem(STORE_KEY);
    alert("Anda telah logout. Data Anda akan tetap tersimpan di browser ini.");
    location.reload();
  }
}

function goToLevel(id) {
  window.location.href = `../level${id}/index.html`;
}

// Initialize Chart.js charts
document.addEventListener('DOMContentLoaded', function() {
  // Revenue Chart
  const revenueCtx = document.getElementById('revenueChart').getContext('2d');
  const revenueChart = new Chart(revenueCtx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Revenue (Rp)',
        data: [1200000, 1500000, 1800000, 2000000, 2100000, 2250000],
        backgroundColor: 'rgba(255, 111, 162, 0.2)',
        borderColor: '#ff6fa2',
        borderWidth: 3,
        pointBackgroundColor: '#ff6fa2',
        pointRadius: 4,
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return 'Rp ' + value.toLocaleString();
            }
          }
        }
      }
    }
  });
  
  // Set global progress
  const globalBar = document.getElementById('globalBar');
  const globalPct = document.getElementById('globalPct');
  globalBar.style.width = '80%';
  globalPct.textContent = '80%';
  
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
