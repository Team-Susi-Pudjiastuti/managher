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
