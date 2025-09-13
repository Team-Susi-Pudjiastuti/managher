// Initialize data
let currentBusinessIdea = {
  l1_idea: "",
  l1_target: "",
  l1_product: "",
  l1_promo: "",
  l1_modal: ""
};

// DOM Elements
const ideaSelect = document.getElementById('l1_idea');
const targetSelect = document.getElementById('l1_target');
const productInput = document.getElementById('l1_product');
const promoSelect = document.getElementById('l1_promo');
const modalInput = document.getElementById('l1_modal');

const previewIdea = document.getElementById('previewIdea');
const previewTarget = document.getElementById('previewTarget');
const previewProduct = document.getElementById('previewProduct');
const previewPromo = document.getElementById('previewPromo');
const previewModal = document.getElementById('previewModal');

const btnReset = document.getElementById('btnReset');
const btnEdit = document.getElementById('btnEdit');
const btnSave = document.getElementById('btnSave');
const btnEditPreview = document.getElementById('btnEditPreview');
const btnDeletePreview = document.getElementById('btnDeletePreview');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');

// Update preview function
function updatePreview() {
  previewIdea.textContent = currentBusinessIdea.l1_idea || "-";
  previewTarget.textContent = currentBusinessIdea.l1_target || "-";
  previewProduct.textContent = currentBusinessIdea.l1_product || "-";
  previewPromo.textContent = currentBusinessIdea.l1_promo || "-";
  previewModal.textContent = currentBusinessIdea.l1_modal ? `Rp ${Number(currentBusinessIdea.l1_modal).toLocaleString()}` : "Rp -";
}

// Event listeners for form inputs
ideaSelect.addEventListener('change', function() {
  currentBusinessIdea.l1_idea = this.value;
  updatePreview();
});

targetSelect.addEventListener('change', function() {
  currentBusinessIdea.l1_target = this.value;
  updatePreview();
});

productInput.addEventListener('input', function() {
  currentBusinessIdea.l1_product = this.value;
  updatePreview();
});

promoSelect.addEventListener('change', function() {
  currentBusinessIdea.l1_promo = this.value;
  updatePreview();
});

modalInput.addEventListener('input', function() {
  currentBusinessIdea.l1_modal = this.value;
  updatePreview();
});

// Button event listeners
btnReset.addEventListener('click', function() {
  if(confirm("Apakah Anda yakin ingin mereset semua data?")) {
    ideaSelect.selectedIndex = 0;
    targetSelect.selectedIndex = 0;
    productInput.value = "";
    promoSelect.selectedIndex = 0;
    modalInput.value = "";
    
    currentBusinessIdea = {
      l1_idea: "",
      l1_target: "",
      l1_product: "",
      l1_promo: "",
      l1_modal: ""
    };
    
    updatePreview();
    alert("Form telah direset!");
  }
});

btnEdit.addEventListener('click', function() {
  // Enable all form fields for editing
  ideaSelect.disabled = false;
  targetSelect.disabled = false;
  productInput.disabled = false;
  promoSelect.disabled = false;
  modalInput.disabled = false;
  
  alert("Mode edit diaktifkan. Anda dapat mengubah data dan kemudian menyimpannya.");
});

btnSave.addEventListener('click', function() {
  // Validate required fields
  if(!currentBusinessIdea.l1_idea || !currentBusinessIdea.l1_target || !currentBusinessIdea.l1_product || !currentBusinessIdea.l1_promo || !currentBusinessIdea.l1_modal) {
    showAlert("Mohon lengkapi semua field sebelum menyimpan!");
    return;
  }
  
  // Save to localStorage (simulated)
  localStorage.setItem('businessIdea', JSON.stringify(currentBusinessIdea));
  
  // Disable form fields after saving
  ideaSelect.disabled = true;
  targetSelect.disabled = true;
  productInput.disabled = true;
  promoSelect.disabled = true;
  modalInput.disabled = true;
  
  showAlert('Kerja bagus! Data ide bisnismu telah berhasil disimpan. Validasikan idemu di level selanjutnya!', 'success', {
              title: 'Data Tersimpan!',
              subtitle: 'Ide bisnis berhasil disimpan',
              confirmText: 'Lanjut ke Level 2',
              onConfirm: () => goToLevel(2)
          });

  // Naikkan progress setelah berhasil simpan
  increaseProgress(20); // misalnya +20% setiap save
});

btnEditPreview.addEventListener('click', function() {
  // Enable editing
  ideaSelect.disabled = false;
  targetSelect.disabled = false;
  productInput.disabled = false;
  promoSelect.disabled = false;
  modalInput.disabled = false;
  
  ideaSelect.focus();
  alert("Anda dapat mengedit data pada form di sebelah kiri.");
});

btnDeletePreview.addEventListener('click', function() {
  if(confirm("Apakah Anda yakin ingin menghapus data ide bisnis ini?")) {
    ideaSelect.selectedIndex = 0;
    targetSelect.selectedIndex = 0;
    productInput.value = "";
    promoSelect.selectedIndex = 0;
    modalInput.value = "";
    
    currentBusinessIdea = {
      l1_idea: "",
      l1_target: "",
      l1_product: "",
      l1_promo: "",
      l1_modal: ""
    };
    
    updatePreview();
    alert("Data ide bisnis berhasil dihapus!");
  }
});

// Mobile menu toggle
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

// Initialize with sample data (optional)
setTimeout(() => {
  ideaSelect.value = "Fashion kecil-kecilan";
  targetSelect.value = "Anak muda";
  productInput.value = "Rok A-line";
  promoSelect.value = "Instagram";
  modalInput.value = "2000000";
  
  currentBusinessIdea = {
    l1_idea: "Fashion kecil-kecilan",
    l1_target: "Anak muda",
    l1_product: "Rok A-line",
    l1_promo: "Instagram",
    l1_modal: "2000000"
  };
  
  updatePreview();
}, 500);

let currentProgress = 0;

function animateProgress(target) {
  const globalBar = document.getElementById('globalBar');
  const globalPct = document.getElementById('globalPct');

  let start = parseInt(globalPct.textContent.replace('%', '')) || 0;
  let end = target;
  let current = start;

  globalBar.style.width = end + '%';

  const step = end > start ? 1 : -1;
  const interval = setInterval(() => {
    current += step;
    globalPct.textContent = current + '%';
    if (current === end) clearInterval(interval);
  }, 20);
}

function increaseProgress(step) {
  currentProgress = Math.min(100, currentProgress + step);
  animateProgress(currentProgress);
}

