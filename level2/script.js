// Initialize data
let validationData = [
  { id: 1, jk: "Perempuan", usia: 23, aktivitas: "Mahasiswa", skala: 5, penjelasan: "Suka modelnya", savedAt: new Date().toISOString() },
  { id: 2, jk: "Perempuan", usia: 29, aktivitas: "Pekerja kantoran", skala: 4, penjelasan: "Harga agak tinggi", savedAt: new Date().toISOString() },
  { id: 3, jk: "Laki-laki", usia: 21, aktivitas: "Pelajar", skala: 3, penjelasan: "Kurang variasi warna", savedAt: new Date().toISOString() }
];

// Chart objects
const chartPool = {};

// DOM Elements
const jkSelect = document.getElementById('jk');
const usiaInput = document.getElementById('usia');
const aktivitasInput = document.getElementById('aktivitas');
const skalaSelect = document.getElementById('skala');
const penjelasanTextarea = document.getElementById('penjelasan');
const skalaEmoji = document.getElementById('skalaEmoji');
const validationTableBody = document.getElementById('validationTableBody');
const totalValidationCount = document.getElementById('totalValidationCount');

const btnReset = document.getElementById('btnReset');
const btnEdit = document.getElementById('btnEdit');
const btnSave = document.getElementById('btnSave');
const btnAddTable = document.getElementById('btnAddTable');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');

// Update emoji based on skala selection
skalaSelect.addEventListener('change', function() {
  const skalaValue = this.value;
  switch(skalaValue) {
    case '1':
      skalaEmoji.textContent = '😞';
      break;
    case '2':
      skalaEmoji.textContent = '😕';
      break;
    case '3':
      skalaEmoji.textContent = '😐';
      break;
    case '4':
      skalaEmoji.textContent = '🙂';
      break;
    case '5':
      skalaEmoji.textContent = '😍';
      break;
    default:
      skalaEmoji.textContent = '💭';
  }
});

// Render table
function renderTable() {
  validationTableBody.innerHTML = '';
  
  validationData.forEach(item => {
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
          <button class="text-blue-600 hover:text-blue-800 text-xs p-1 edit-btn" data-id="${item.id}">✏️</button>
          <button class="text-red-600 hover:text-red-800 text-xs p-1 delete-btn" data-id="${item.id}">🗑️</button>
        </div>
      </td>
    `;
    validationTableBody.appendChild(row);
  });
  
  totalValidationCount.textContent = validationData.length;
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
function renderCharts() {
  // Chart 1: Distribusi Jenis Kelamin
  const genderCounts = {};
  validationData.forEach(item => {
    genderCounts[item.jk] = (genderCounts[item.jk] || 0) + 1;
  });
  
  const ctxGender = document.getElementById('chartGender').getContext('2d');
  if(chartPool.chartGender) chartPool.chartGender.destroy();
  chartPool.chartGender = new Chart(ctxGender, {
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
  validationData.forEach(item => {
    if(item.usia < 20) ageRanges['<20']++;
    else if(item.usia >= 20 && item.usia <= 29) ageRanges['20-29']++;
    else if(item.usia >= 30 && item.usia <= 39) ageRanges['30-39']++;
    else ageRanges['40+']++;
  });
  
  const ctxAge = document.getElementById('chartAge').getContext('2d');
  if(chartPool.chartAge) chartPool.chartAge.destroy();
  chartPool.chartAge = new Chart(ctxAge, {
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
  validationData.forEach(item => {
    activityCounts[item.aktivitas] = (activityCounts[item.aktivitas] || 0) + 1;
  });
  
  const ctxActivity = document.getElementById('chartActivity').getContext('2d');
  if(chartPool.chartActivity) chartPool.chartActivity.destroy();
  chartPool.chartActivity = new Chart(ctxActivity, {
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
  
  validationData.forEach(item => {
    if(scaleByGender[item.jk]) {
      scaleByGender[item.jk][item.skala]++;
    }
  });
  
  const ctxScaleByGender = document.getElementById('chartScaleByGender').getContext('2d');
  if(chartPool.chartScaleByGender) chartPool.chartScaleByGender.destroy();
  chartPool.chartScaleByGender = new Chart(ctxScaleByGender, {
    type: 'bar',
    data: {
      labels: ['Perempuan', 'Laki-laki', 'Lainnya'],
      datasets: [
        { label: 'Skala 1', data: ['Perempuan', 'Laki-laki', 'Lainnya'].map(g => scaleByGender[g][1]), backgroundColor: '#FF6384' },
        { label: 'Skala 2', data: ['Perempuan', 'Laki-laki', 'Lainnya'].map(g => scaleByGender[g][2]), backgroundColor: '#36A2EB' },
        { label: 'Skala 3', data: ['Perempuan', 'Laki-laki', 'Lainnya'].map(g => scaleByGender[g][3]), backgroundColor: '#FFCE56' },
        { label: 'Skala 4', data: ['Perempuan', 'Laki-laki', 'Lainnya'].map(g => scaleByGender[g][4]), backgroundColor: '#4BC0C0' },
        { label: 'Skala 5', data: ['Perempuan', 'Laki-laki', 'Lainnya'].map(g => scaleByGender[g][5]), backgroundColor: '#9966FF' }
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
  
  validationData.forEach(item => {
    let ageGroup = '40+';
    if(item.usia < 20) ageGroup = '<20';
    else if(item.usia >= 20 && item.usia <= 29) ageGroup = '20-29';
    else if(item.usia >= 30 && item.usia <= 39) ageGroup = '30-39';
    
    scaleByAge[ageGroup][item.skala]++;
  });
  
  const ctxScaleByAge = document.getElementById('chartScaleByAge').getContext('2d');
  if(chartPool.chartScaleByAge) chartPool.chartScaleByAge.destroy();
  chartPool.chartScaleByAge = new Chart(ctxScaleByAge, {
    type: 'bar',
    data: {
      labels: ['<20', '20-29', '30-39', '40+'],
      datasets: [
        { label: 'Skala 1', data: ['<20', '20-29', '30-39', '40+'].map(a => scaleByAge[a][1]), backgroundColor: '#FF6384' },
        { label: 'Skala 2', data: ['<20', '20-29', '30-39', '40+'].map(a => scaleByAge[a][2]), backgroundColor: '#36A2EB' },
        { label: 'Skala 3', data: ['<20', '20-29', '30-39', '40+'].map(a => scaleByAge[a][3]), backgroundColor: '#FFCE56' },
        { label: 'Skala 4', data: ['<20', '20-29', '30-39', '40+'].map(a => scaleByAge[a][4]), backgroundColor: '#4BC0C0' },
        { label: 'Skala 5', data: ['<20', '20-29', '30-39', '40+'].map(a => scaleByAge[a][5]), backgroundColor: '#9966FF' }
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
  const uniqueActivities = [...new Set(validationData.map(item => item.aktivitas))];
  const scaleByActivity = {};
  
  uniqueActivities.forEach(activity => {
    scaleByActivity[activity] = {1:0, 2:0, 3:0, 4:0, 5:0};
  });
  
  validationData.forEach(item => {
    if(scaleByActivity[item.aktivitas]) {
      scaleByActivity[item.aktivitas][item.skala]++;
    }
  });
  
  const ctxScaleByActivity = document.getElementById('chartScaleByActivity').getContext('2d');
  if(chartPool.chartScaleByActivity) chartPool.chartScaleByActivity.destroy();
  chartPool.chartScaleByActivity = new Chart(ctxScaleByActivity, {
    type: 'bar',
    data: {
      labels: uniqueActivities,
      datasets: [
        { label: 'Skala 1', data: uniqueActivities.map(a => scaleByActivity[a][1]), backgroundColor: '#FF6384' },
        { label: 'Skala 2', data: uniqueActivities.map(a => scaleByActivity[a][2]), backgroundColor: '#36A2EB' },
        { label: 'Skala 3', data: uniqueActivities.map(a => scaleByActivity[a][3]), backgroundColor: '#FFCE56' },
        { label: 'Skala 4', data: uniqueActivities.map(a => scaleByActivity[a][4]), backgroundColor: '#4BC0C0' },
        { label: 'Skala 5', data: uniqueActivities.map(a => scaleByActivity[a][5]), backgroundColor: '#9966FF' }
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
btnReset.addEventListener('click', function() {
  if(confirm("Apakah Anda yakin ingin mereset form ini?")) {
    jkSelect.selectedIndex = 0;
    usiaInput.value = "";
    aktivitasInput.value = "";
    skalaSelect.selectedIndex = 0;
    penjelasanTextarea.value = "";
    skalaEmoji.textContent = '💭';
  }
});

btnEdit.addEventListener('click', function() {
  alert("Mode edit diaktifkan. Anda dapat mengubah data pada form.");
});

btnSave.addEventListener('click', function() {
  // Validate required fields
  if(!jkSelect.value || !usiaInput.value || !aktivitasInput.value || !skalaSelect.value) {
    alert("Mohon lengkapi semua field yang wajib diisi!");
    return;
  }
  
  // Create new validation object
  const newValidation = {
    id: Date.now(), // Simple unique ID
    jk: jkSelect.value,
    usia: parseInt(usiaInput.value),
    aktivitas: aktivitasInput.value,
    skala: parseInt(skalaSelect.value),
    penjelasan: penjelasanTextarea.value || "-",
    savedAt: new Date().toISOString()
  };
  
  // Add to array
  validationData.push(newValidation);
  
  // Update UI
  renderTable();
  renderCharts();
  
  // Reset form
  jkSelect.selectedIndex = 0;
  usiaInput.value = "";
  aktivitasInput.value = "";
  skalaSelect.selectedIndex = 0;
  penjelasanTextarea.value = "";
  skalaEmoji.textContent = '💭';
  
  alert("Data validasi berhasil disimpan! 🎉");
});

btnAddTable.addEventListener('click', function() {
  // Trigger save button functionality
  btnSave.click();
});

// Event delegation for edit and delete buttons in table
validationTableBody.addEventListener('click', function(e) {
  if(e.target.classList.contains('edit-btn')) {
    const id = parseInt(e.target.dataset.id);
    const item = validationData.find(x => x.id === id);
    
    if(item) {
      jkSelect.value = item.jk;
      usiaInput.value = item.usia;
      aktivitasInput.value = item.aktivitas;
      skalaSelect.value = item.skala;
      penjelasanTextarea.value = item.penjelasan;
      skalaSelect.dispatchEvent(new Event('change')); // Trigger emoji update
      
      // Scroll to form
      document.querySelector('.bg-white.rounded-2xl.p-6.border.border-slate-100').scrollIntoView({ behavior: 'smooth' });
      
      alert("Data telah dimuat ke form. Silakan edit dan simpan kembali.");
    }
  }
  
  if(e.target.classList.contains('delete-btn')) {
    if(confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      const id = parseInt(e.target.dataset.id);
      validationData = validationData.filter(x => x.id !== id);
      
      renderTable();
      renderCharts();
      
      alert("Data berhasil dihapus!");
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
  renderTable();
  renderCharts();
  
  // Set initial progress
  const globalBar = document.getElementById('globalBar');
  const globalPct = document.getElementById('globalPct');
  globalBar.style.width = '50%';
  globalPct.textContent = '50%';
});
