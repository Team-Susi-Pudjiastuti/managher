
// Initialize data
let prototypeData = {
  brandName: "",
  brandColor: "#ff6fa2",
  brandTagline: "",
  prototypeImage: null
};

let feedbackData = [
  { id: 1, jk: "Perempuan", usia: 28, aktivitas: "Freelancer", skala: 4, penjelasan: "Warna menarik", savedAt: new Date().toISOString() },
  { id: 2, jk: "Laki-laki", usia: 24, aktivitas: "Mahasiswa", skala: 3, penjelasan: "Desainnya biasa saja", savedAt: new Date().toISOString() },
  { id: 3, jk: "Perempuan", usia: 32, aktivitas: "Ibu Rumah Tangga", skala: 5, penjelasan: "Sangat suka dengan konsepnya", savedAt: new Date().toISOString() }
];

// Chart objects
const chartPool = {};

// DOM Elements
const brandNameInput = document.getElementById('brandName');
const brandColorInput = document.getElementById('brandColor');
const brandTaglineInput = document.getElementById('brandTagline');
const prototypeImageInput = document.getElementById('prototypeImage');
const colorPreview = document.getElementById('colorPreview');
const colorValue = document.getElementById('colorValue');
const generatedLogo = document.getElementById('generatedLogo');
const previewBrandName = document.getElementById('previewBrandName');
const previewTagline = document.getElementById('previewTagline');
const productLogo = document.getElementById('productLogo');
const productName = document.getElementById('productName');
const productTarget = document.getElementById('productTarget');
const productDescription = document.getElementById('productDescription');
const productCategory = document.getElementById('productCategory');
const productPrice = document.getElementById('productPrice');
const prototypeImageContainer = document.getElementById('prototypeImageContainer');
const previewImage = document.getElementById('previewImage');

const feedbackJk = document.getElementById('feedbackJk');
const feedbackUsia = document.getElementById('feedbackUsia');
const feedbackAktivitas = document.getElementById('feedbackAktivitas');
const feedbackSkala = document.getElementById('feedbackSkala');
const feedbackPenjelasan = document.getElementById('feedbackPenjelasan');
const skalaDescription = document.getElementById('skalaDescription');
const feedbackTableBody = document.getElementById('feedbackTableBody');
const totalFeedbackCount = document.getElementById('totalFeedbackCount');

const btnResetPrototype = document.getElementById('btnResetPrototype');
const btnEditPrototype = document.getElementById('btnEditPrototype');
const btnSavePrototype = document.getElementById('btnSavePrototype');
const btnResetFeedback = document.getElementById('btnResetFeedback');
const btnSaveFeedback = document.getElementById('btnSaveFeedback');
const btnAddFeedback = document.getElementById('btnAddFeedback');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');

// Scale dots
const scaleDots = document.querySelectorAll('.scale-dot');
scaleDots.forEach(dot => {
  dot.addEventListener('click', function() {
    // Remove active class from all dots
    scaleDots.forEach(d => d.classList.remove('active'));
    // Add active class to clicked dot
    this.classList.add('active');
    // Update hidden input value
    feedbackSkala.value = this.dataset.value;
    // Update description
    updateSkalaDescription(this.dataset.value);
  });
});

// Update skala description
function updateSkalaDescription(value) {
  switch(value) {
    case '1':
      skalaDescription.textContent = "Sangat Tidak Puas - Tidak menarik sama sekali";
      break;
    case '2':
      skalaDescription.textContent = "Tidak Puas - Kurang menarik";
      break;
    case '3':
      skalaDescription.textContent = "Netral - Biasa saja";
      break;
    case '4':
      skalaDescription.textContent = "Puas - Cukup menarik";
      break;
    case '5':
      skalaDescription.textContent = "Sangat Puas - Sangat menarik";
      break;
    default:
      skalaDescription.textContent = "Pilih skala feedback";
  }
}

// Update color preview
brandColorInput.addEventListener('input', function() {
  colorPreview.style.backgroundColor = this.value;
  colorValue.textContent = this.value;
  updatePrototypePreview();
});

// Update prototype preview
function updatePrototypePreview() {
  // Update brand identity preview
  const brandName = brandNameInput.value || "Nama Brand";
  const brandColor = brandColorInput.value || "#ff6fa2";
  const brandTagline = brandTaglineInput.value || "Tagline brand Anda";
  
  // Generate logo from initials
  let initials = "MH";
  if(brandName) {
    const words = brandName.split(' ');
    if(words.length >= 2) {
      initials = words[0].charAt(0) + words[1].charAt(0);
    } else if(words.length === 1) {
      initials = words[0].substring(0, 2);
    }
  }
  initials = initials.toUpperCase();
  
  // Update logo
  generatedLogo.textContent = initials;
  generatedLogo.style.background = `linear-gradient(135deg, ${brandColor}, ${adjustColor(brandColor, 30)})`;
  productLogo.textContent = initials;
  productLogo.style.background = `linear-gradient(135deg, ${brandColor}, ${adjustColor(brandColor, 30)})`;
  
  // Update brand name and tagline
  previewBrandName.textContent = brandName;
  previewTagline.textContent = brandTagline;
  
  // Update product card (using sample data from Level 1)
  productName.textContent = "Fashion kecil-kecilan"; // Sample from Level 1
  productTarget.textContent = "Anak muda"; // Sample from Level 1
  productDescription.textContent = "Produk fashion dengan desain modern dan harga terjangkau untuk anak muda.";
  productCategory.textContent = "Fashion";
  productPrice.textContent = "Rp 150.000";
}

// Adjust color brightness
function adjustColor(color, amount) {
  return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

// Handle image upload
prototypeImageInput.addEventListener('change', function(e) {
  const file = e.target.files[0];
  if(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      previewImage.src = e.target.result;
      prototypeImageContainer.innerHTML = '';
      prototypeImageContainer.appendChild(previewImage);
      prototypeImageContainer.classList.remove('bg-slate-100');
      previewImage.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  }
});

// Render feedback table
function renderFeedbackTable() {
  feedbackTableBody.innerHTML = '';
  
  feedbackData.forEach(item => {
    const row = document.createElement('tr');
    row.className = 'hover:bg-slate-50';
    row.innerHTML = `
      <td class="px-3 py-2 border">${item.jk}</td>
      <td class="px-3 py-2 border">${item.usia}</td>
      <td class="px-3 py-2 border">${item.aktivitas}</td>
      <td class="px-3 py-2 border">
        <div class="flex items-center gap-1">
          <span>${item.skala}</span>
          <span>${getEmojiForSkala(item.skala)}</span>
        </div>
      </td>
      <td class="px-3 py-2 border">${item.penjelasan}</td>
      <td class="px-3 py-2 border text-center">
        <div class="flex gap-1 justify-center">
          <button class="text-blue-600 hover:text-blue-800 text-xs p-1 edit-feedback-btn" data-id="${item.id}">✏️</button>
          <button class="text-red-600 hover:text-red-800 text-xs p-1 delete-feedback-btn" data-id="${item.id}">🗑️</button>
        </div>
      </td>
    `;
    feedbackTableBody.appendChild(row);
  });
  
  totalFeedbackCount.textContent = feedbackData.length;
}

// Get emoji for skala
function getEmojiForSkala(skala) {
  switch(skala) {
    case 1: return '😞';
    case 2: return '😕';
    case 3: return '😐';
    case 4: return '🙂';
    case 5: return '😍';
    default: return '💭';
  }
}

// Render charts
function renderFeedbackCharts() {
  // Chart 1: Distribusi Jenis Kelamin
  const genderCounts = {};
  feedbackData.forEach(item => {
    genderCounts[item.jk] = (genderCounts[item.jk] || 0) + 1;
  });
  
  const ctxGender = document.getElementById('chartFeedbackGender').getContext('2d');
  if(chartPool.chartFeedbackGender) chartPool.chartFeedbackGender.destroy();
  chartPool.chartFeedbackGender = new Chart(ctxGender, {
    type: 'pie',
    data: {
      labels: Object.keys(genderCounts),
      datasets: [{
        data: Object.values(genderCounts),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }]
    },
    options: {
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
  
  // Chart 2: Distribusi Usia (Grouped by age ranges)
  const ageRanges = {'<20': 0, '20-29': 0, '30-39': 0, '40+': 0};
  feedbackData.forEach(item => {
    if(item.usia < 20) ageRanges['<20']++;
    else if(item.usia >= 20 && item.usia <= 29) ageRanges['20-29']++;
    else if(item.usia >= 30 && item.usia <= 39) ageRanges['30-39']++;
    else ageRanges['40+']++;
  });
  
  const ctxAge = document.getElementById('chartFeedbackAge').getContext('2d');
  if(chartPool.chartFeedbackAge) chartPool.chartFeedbackAge.destroy();
  chartPool.chartFeedbackAge = new Chart(ctxAge, {
    type: 'bar',
    data: {
      labels: Object.keys(ageRanges),
      datasets: [{
        label: 'Jumlah Responden',
        data: Object.values(ageRanges),
        backgroundColor: '#4BC0C0'
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  
  // Chart 3: Distribusi Aktivitas
  const activityCounts = {};
  feedbackData.forEach(item => {
    activityCounts[item.aktivitas] = (activityCounts[item.aktivitas] || 0) + 1;
  });
  
  const ctxActivity = document.getElementById('chartFeedbackActivity').getContext('2d');
  if(chartPool.chartFeedbackActivity) chartPool.chartFeedbackActivity.destroy();
  chartPool.chartFeedbackActivity = new Chart(ctxActivity, {
    type: 'bar',
    data: {
      labels: Object.keys(activityCounts),
      datasets: [{
        label: 'Jumlah Responden',
        data: Object.values(activityCounts),
        backgroundColor: '#9966FF'
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  
  // Chart 4: Skala Feedback by Gender
  const scaleByGender = {};
  ['Perempuan', 'Laki-laki', 'Lainnya'].forEach(gender => {
    scaleByGender[gender] = {1:0, 2:0, 3:0, 4:0, 5:0};
  });
  
  feedbackData.forEach(item => {
    if(scaleByGender[item.jk]) {
      scaleByGender[item.jk][item.skala]++;
    }
  });
  
  const ctxScaleByGender = document.getElementById('chartFeedbackScaleByGender').getContext('2d');
  if(chartPool.chartFeedbackScaleByGender) chartPool.chartFeedbackScaleByGender.destroy();
  chartPool.chartFeedbackScaleByGender = new Chart(ctxScaleByGender, {
    type: 'bar',
    data: {
      labels: ['Perempuan', 'Laki-laki', 'Lainnya'],
      datasets: [
        { label: 'Skala 1',  data: ['Perempuan', 'Laki-laki', 'Lainnya'].map(g => scaleByGender[g][1]), backgroundColor: '#FF6384' },
        { label: 'Skala 2',  data: ['Perempuan', 'Laki-laki', 'Lainnya'].map(g => scaleByGender[g][2]), backgroundColor: '#36A2EB' },
        { label: 'Skala 3',  data: ['Perempuan', 'Laki-laki', 'Lainnya'].map(g => scaleByGender[g][3]), backgroundColor: '#FFCE56' },
        { label: 'Skala 4',  data: ['Perempuan', 'Laki-laki', 'Lainnya'].map(g => scaleByGender[g][4]), backgroundColor: '#4BC0C0' },
        { label: 'Skala 5',  data: ['Perempuan', 'Laki-laki', 'Lainnya'].map(g => scaleByGender[g][5]), backgroundColor: '#9966FF' }
      ]
    },
    options: {
      scales: {
        x: { stacked: true },
        y: { stacked: true, beginAtZero: true }
      }
    }
  });
  
  // Chart 5: Skala Feedback by Age
  const scaleByAge = {'<20': {1:0,2:0,3:0,4:0,5:0}, '20-29': {1:0,2:0,3:0,4:0,5:0}, '30-39': {1:0,2:0,3:0,4:0,5:0}, '40+': {1:0,2:0,3:0,4:0,5:0}};
  
  feedbackData.forEach(item => {
    let ageGroup = '40+';
    if(item.usia < 20) ageGroup = '<20';
    else if(item.usia >= 20 && item.usia <= 29) ageGroup = '20-29';
    else if(item.usia >= 30 && item.usia <= 39) ageGroup = '30-39';
    
    scaleByAge[ageGroup][item.skala]++;
  });
  
  const ctxScaleByAge = document.getElementById('chartFeedbackScaleByAge').getContext('2d');
  if(chartPool.chartFeedbackScaleByAge) chartPool.chartFeedbackScaleByAge.destroy();
  chartPool.chartFeedbackScaleByAge = new Chart(ctxScaleByAge, {
    type: 'bar',
    data: {
      labels: ['<20', '20-29', '30-39', '40+'],
      datasets: [
        { label: 'Skala 1',  data: ['<20', '20-29', '30-39', '40+'].map(a => scaleByAge[a][1]), backgroundColor: '#FF6384' },
        { label: 'Skala 2',  data: ['<20', '20-29', '30-39', '40+'].map(a => scaleByAge[a][2]), backgroundColor: '#36A2EB' },
        { label: 'Skala 3',  data: ['<20', '20-29', '30-39', '40+'].map(a => scaleByAge[a][3]), backgroundColor: '#FFCE56' },
        { label: 'Skala 4',  data: ['<20', '20-29', '30-39', '40+'].map(a => scaleByAge[a][4]), backgroundColor: '#4BC0C0' },
        { label: 'Skala 5',  data: ['<20', '20-29', '30-39', '40+'].map(a => scaleByAge[a][5]), backgroundColor: '#9966FF' }
      ]
    },
    options: {
      scales: {
        x: { stacked: true },
        y: { stacked: true, beginAtZero: true }
      }
    }
  });
  
  // Chart 6: Skala Feedback by Activity
  const uniqueActivities = [...new Set(feedbackData.map(item => item.aktivitas))];
  const scaleByActivity = {};
  
  uniqueActivities.forEach(activity => {
    scaleByActivity[activity] = {1:0, 2:0, 3:0, 4:0, 5:0};
  });
  
  feedbackData.forEach(item => {
    if(scaleByActivity[item.aktivitas]) {
      scaleByActivity[item.aktivitas][item.skala]++;
    }
  });
  
  const ctxScaleByActivity = document.getElementById('chartFeedbackScaleByActivity').getContext('2d');
  if(chartPool.chartFeedbackScaleByActivity) chartPool.chartFeedbackScaleByActivity.destroy();
  chartPool.chartFeedbackScaleByActivity = new Chart(ctxScaleByActivity, {
    type: 'bar',
    data: {
      labels: uniqueActivities,
      datasets: [
        { label: 'Skala 1',  data: uniqueActivities.map(a => scaleByActivity[a][1]), backgroundColor: '#FF6384' },
        { label: 'Skala 2',  data: uniqueActivities.map(a => scaleByActivity[a][2]), backgroundColor: '#36A2EB' },
        { label: 'Skala 3',  data: uniqueActivities.map(a => scaleByActivity[a][3]), backgroundColor: '#FFCE56' },
        { label: 'Skala 4',  data: uniqueActivities.map(a => scaleByActivity[a][4]), backgroundColor: '#4BC0C0' },
        { label: 'Skala 5',  data: uniqueActivities.map(a => scaleByActivity[a][5]), backgroundColor: '#9966FF' }
      ]
    },
    options: {
      scales: {
        x: { stacked: true },
        y: { stacked: true, beginAtZero: true }
      }
    }
  });
}

// Button event listeners
btnResetPrototype.addEventListener('click', function() {
  if(confirm("Apakah Anda yakin ingin mereset form prototype ini?")) {
    brandNameInput.value = "";
    brandColorInput.value = "#ff6fa2";
    brandTaglineInput.value = "";
    prototypeImageInput.value = "";
    prototypeImageContainer.innerHTML = '<div class="text-slate-500">Upload gambar prototype untuk melihat preview</div>';
    prototypeImageContainer.classList.add('bg-slate-100');
    updatePrototypePreview();
    colorPreview.style.backgroundColor = "#ff6fa2";
    colorValue.textContent = "#ff6fa2";
  }
});

btnEditPrototype.addEventListener('click', function() {
  alert("Mode edit diaktifkan. Anda dapat mengubah data pada form.");
});

btnSavePrototype.addEventListener('click', function() {
  // Validate required fields
  if(!brandNameInput.value || !brandTaglineInput.value) {
    alert("Mohon lengkapi nama brand dan tagline!");
    return;
  }
  
  // Save data
  prototypeData = {
    brandName: brandNameInput.value,
    brandColor: brandColorInput.value,
    brandTagline: brandTaglineInput.value,
    prototypeImage: prototypeImageInput.files[0] ? URL.createObjectURL(prototypeImageInput.files[0]) : null
  };
  
  // Update preview
  updatePrototypePreview();
  
  alert("Data prototype berhasil disimpan! 🎉");
});

btnResetFeedback.addEventListener('click', function() {
  if(confirm("Apakah Anda yakin ingin mereset form feedback ini?")) {
    feedbackJk.selectedIndex = 0;
    feedbackUsia.value = "";
    feedbackAktivitas.value = "";
    feedbackSkala.value = "3";
    feedbackPenjelasan.value = "";
    skalaDescription.textContent = "Netral - Biasa saja";
    
    // Reset scale dots
    scaleDots.forEach(d => d.classList.remove('active'));
    scaleDots[2].classList.add('active'); // Set default to 3
  }
});

btnSaveFeedback.addEventListener('click', function() {
  // Validate required fields
  if(!feedbackJk.value || !feedbackUsia.value || !feedbackAktivitas.value || !feedbackSkala.value) {
    alert("Mohon lengkapi semua field yang wajib diisi!");
    return;
  }
  
  // Create new feedback object
  const newFeedback = {
    id: Date.now(), // Simple unique ID
    jk: feedbackJk.value,
    usia: parseInt(feedbackUsia.value),
    aktivitas: feedbackAktivitas.value,
    skala: parseInt(feedbackSkala.value),
    penjelasan: feedbackPenjelasan.value || "-",
    savedAt: new Date().toISOString()
  };
  
  // Add to array
  feedbackData.push(newFeedback);
  
  // Update UI
  renderFeedbackTable();
  renderFeedbackCharts();
  
  // Reset form
  feedbackJk.selectedIndex = 0;
  feedbackUsia.value = "";
  feedbackAktivitas.value = "";
  feedbackSkala.value = "3";
  feedbackPenjelasan.value = "";
  skalaDescription.textContent = "Netral - Biasa saja";
  
  // Reset scale dots
  scaleDots.forEach(d => d.classList.remove('active'));
  scaleDots[2].classList.add('active'); // Set default to 3
  
  alert("Feedback berhasil disimpan! 🎉");
});

btnAddFeedback.addEventListener('click', function() {
  btnSaveFeedback.click();
});

// Event delegation for edit and delete buttons in feedback table
feedbackTableBody.addEventListener('click', function(e) {
  if(e.target.classList.contains('edit-feedback-btn')) {
    const id = parseInt(e.target.dataset.id);
    const item = feedbackData.find(x => x.id === id);
    
    if(item) {
      feedbackJk.value = item.jk;
      feedbackUsia.value = item.usia;
      feedbackAktivitas.value = item.aktivitas;
      feedbackSkala.value = item.skala;
      feedbackPenjelasan.value = item.penjelasan;
      
      // Update scale dots
      scaleDots.forEach(d => d.classList.remove('active'));
      const activeDot = document.querySelector(`.scale-dot[data-value="${item.skala}"]`);
      if(activeDot) activeDot.classList.add('active');
      
      updateSkalaDescription(item.skala);
      
      // Scroll to form
      document.querySelector('.bg-white.rounded-2xl.p-6.border.border-slate-100').scrollIntoView({ behavior: 'smooth' });
      
      alert("Data telah dimuat ke form. Silakan edit dan simpan kembali.");
    }
  }
  
  if(e.target.classList.contains('delete-feedback-btn')) {
    if(confirm("Apakah Anda yakin ingin menghapus feedback ini?")) {
      const id = parseInt(e.target.dataset.id);
      feedbackData = feedbackData.filter(x => x.id !== id);
      
      renderFeedbackTable();
      renderFeedbackCharts();
      
      alert("Feedback berhasil dihapus!");
    }
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

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  // Set initial active scale dot
  scaleDots[2].classList.add('active');
  
  // Initialize preview
  updatePrototypePreview();
  
  // Render feedback table and charts
  renderFeedbackTable();
  renderFeedbackCharts();
  
  // Set initial progress
  const globalBar = document.getElementById('globalBar');
  const globalPct = document.getElementById('globalPct');
  globalBar.style.width = '75%';
  globalPct.textContent = '75%';
});
