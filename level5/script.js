// Initialize data
let businessModelCanvas = {
  customerSegments: "",
  valueProposition: "",
  channels: "",
  customerRelationships: "",
  revenueStreams: "",
  keyResources: "",
  keyActivities: "",
  keyPartnerships: "",
  costStructure: "",
  notes: ""
};

// DOM Elements
const customerSegments = document.getElementById('customerSegments');
const valueProposition = document.getElementById('valueProposition');
const channels = document.getElementById('channels');
const customerRelationships = document.getElementById('customerRelationships');
const revenueStreams = document.getElementById('revenueStreams');
const keyResources = document.getElementById('keyResources');
const keyActivities = document.getElementById('keyActivities');
const keyPartnerships = document.getElementById('keyPartnerships');
const costStructure = document.getElementById('costStructure');
const notes = document.getElementById('notes');

const previewCustomerSegments = document.getElementById('previewCustomerSegments');
const previewValueProposition = document.getElementById('previewValueProposition');
const previewChannels = document.getElementById('previewChannels');
const previewCustomerRelationships = document.getElementById('previewCustomerRelationships');
const previewRevenueStreams = document.getElementById('previewRevenueStreams');
const previewKeyResources = document.getElementById('previewKeyResources');
const previewKeyActivities = document.getElementById('previewKeyActivities');
const previewKeyPartnerships = document.getElementById('previewKeyPartnerships');
const previewCostStructure = document.getElementById('previewCostStructure');
const previewProfitZone = document.getElementById('previewProfitZone');

const btnReset = document.getElementById('btnReset');
const btnEdit = document.getElementById('btnEdit');
const btnSave = document.getElementById('btnSave');
const btnDownloadPDF = document.getElementById('btnDownloadPDF');
const btnShare = document.getElementById('btnShare');
const btnPrint = document.getElementById('btnPrint');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');

// Update preview function
function updatePreview() {
  previewCustomerSegments.textContent = customerSegments.value || "Belum ada data";
  previewValueProposition.textContent = valueProposition.value || "Belum ada data";
  previewChannels.textContent = channels.value || "Belum ada data";
  previewCustomerRelationships.textContent = customerRelationships.value || "Belum ada data";
  previewRevenueStreams.textContent = revenueStreams.value || "Belum ada data";
  previewKeyResources.textContent = keyResources.value || "Belum ada data";
  previewKeyActivities.textContent = keyActivities.value || "Belum ada data";
  previewKeyPartnerships.textContent = keyPartnerships.value || "Belum ada data";
  previewCostStructure.textContent = costStructure.value || "Belum ada data";
  
  // Calculate profit zone (simplified - just showing the concept)
  if(revenueStreams.value && costStructure.value) {
    previewProfitZone.textContent = "Revenue - Cost = Profit";
  } else {
    previewProfitZone.textContent = "-";
  }
}

// Real-time update preview
customerSegments.addEventListener('input', updatePreview);
valueProposition.addEventListener('input', updatePreview);
channels.addEventListener('input', updatePreview);
customerRelationships.addEventListener('input', updatePreview);
revenueStreams.addEventListener('input', updatePreview);
keyResources.addEventListener('input', updatePreview);
keyActivities.addEventListener('input', updatePreview);
keyPartnerships.addEventListener('input', updatePreview);
costStructure.addEventListener('input', updatePreview);

// Button event listeners
btnReset.addEventListener('click', function() {
  if(confirm("Apakah Anda yakin ingin mereset form ini?")) {
    customerSegments.value = "";
    valueProposition.value = "";
    channels.value = "";
    customerRelationships.value = "";
    revenueStreams.value = "";
    keyResources.value = "";
    keyActivities.value = "";
    keyPartnerships.value = "";
    costStructure.value = "";
    notes.value = "";
    
    updatePreview();
    alert("Form telah direset!");
  }
});

btnEdit.addEventListener('click', function() {
  // Enable all form fields for editing
  customerSegments.disabled = false;
  valueProposition.disabled = false;
  channels.disabled = false;
  customerRelationships.disabled = false;
  revenueStreams.disabled = false;
  keyResources.disabled = false;
  keyActivities.disabled = false;
  keyPartnerships.disabled = false;
  costStructure.disabled = false;
  notes.disabled = false;
  
  alert("Mode edit diaktifkan. Anda dapat mengubah data dan kemudian menyimpannya.");
});

btnSave.addEventListener('click', function() {
  // Validate required fields
  if(!customerSegments.value || !valueProposition.value || !revenueStreams.value) {
    alert("Mohon lengkapi minimal Customer Segments, Value Proposition, dan Revenue Streams!");
    return;
  }
  
  // Save to localStorage
  businessModelCanvas = {
    customerSegments: customerSegments.value,
    valueProposition: valueProposition.value,
    channels: channels.value,
    customerRelationships: customerRelationships.value,
    revenueStreams: revenueStreams.value,
    keyResources: keyResources.value,
    keyActivities: keyActivities.value,
    keyPartnerships: keyPartnerships.value,
    costStructure: costStructure.value,
    notes: notes.value,
    savedAt: new Date().toISOString()
  };
  
  localStorage.setItem('businessModelCanvas', JSON.stringify(businessModelCanvas));
  
  // Disable form fields after saving
  customerSegments.disabled = true;
  valueProposition.disabled = true;
  channels.disabled = true;
  customerRelationships.disabled = true;
  revenueStreams.disabled = true;
  keyResources.disabled = true;
  keyActivities.disabled = true;
  keyPartnerships.disabled = true;
  costStructure.disabled = true;
  notes.disabled = true;
  
  alert("Business Model Canvas berhasil disimpan! 🎉");
});

btnDownloadPDF.addEventListener('click', function() {
  alert("Fitur download PDF akan segera tersedia. Untuk saat ini, Anda bisa menggunakan fitur Print untuk menyimpan sebagai PDF.");
});

btnShare.addEventListener('click', function() {
  if(navigator.share) {
    navigator.share({
      title: 'Business Model Canvas Saya',
      text: 'Lihat Business Model Canvas saya di ManagHer!',
      url: window.location.href,
    })
    .then(() => console.log('Successful share'))
    .catch((error) => console.log('Error sharing', error));
  } else {
    // Fallback for browsers that don't support Web Share API
    const canvasText = `
Business Model Canvas

Customer Segments:
${customerSegments.value}

Value Proposition:
${valueProposition.value}

Channels:
${channels.value}

Customer Relationships:
${customerRelationships.value}

Revenue Streams:
${revenueStreams.value}

Key Resources:
${keyResources.value}

Key Activities:
${keyActivities.value}

Key Partnerships:
${keyPartnerships.value}

Cost Structure:
${costStructure.value}

Catatan:
${notes.value}
    `;
    
    navigator.clipboard.writeText(canvasText).then(function() {
      alert("Business Model Canvas telah disalin ke clipboard! Anda bisa paste dan share ke platform lain.");
    }, function() {
      alert("Gagal menyalin ke clipboard.");
    });
  }
});

btnPrint.addEventListener('click', function() {
  window.print();
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

// Load saved data if exists
document.addEventListener('DOMContentLoaded', function() {
  const savedData = localStorage.getItem('businessModelCanvas');
  if(savedData) {
    const parsedData = JSON.parse(savedData);
    businessModelCanvas = parsedData;
    
    customerSegments.value = parsedData.customerSegments || "";
    valueProposition.value = parsedData.valueProposition || "";
    channels.value = parsedData.channels || "";
    customerRelationships.value = parsedData.customerRelationships || "";
    revenueStreams.value = parsedData.revenueStreams || "";
    keyResources.value = parsedData.keyResources || "";
    keyActivities.value = parsedData.keyActivities || "";
    keyPartnerships.value = parsedData.keyPartnerships || "";
    costStructure.value = parsedData.costStructure || "";
    notes.value = parsedData.notes || "";
    
    updatePreview();
  } else {
    // Set sample data for demonstration
    customerSegments.value = "Wanita usia 18-35 tahun, mahasiswa, pekerja kantoran muda yang peduli fashion dan budget-friendly";
    valueProposition.value = "Produk fashion stylish dengan harga terjangkau, kualitas premium, dan pengiriman cepat";
    channels.value = "Instagram Shop, Tokopedia, WhatsApp Order, Pop-up Market";
    customerRelationships.value = "Layanan pelanggan 24 jam, program loyalitas, komunitas eksklusif, personalisasi produk";
    revenueStreams.value = "Penjualan produk, membership premium, jasa konsultasi, affiliate marketing";
    keyResources.value = "Tim desain, supplier bahan berkualitas, sistem manajemen inventori, brand awareness";
    keyActivities.value = "Desain produk, produksi, marketing digital, customer service, pengembangan produk";
    keyPartnerships.value = "Supplier bahan baku, jasa pengiriman, influencer, platform e-commerce";
    costStructure.value = "Biaya produksi, marketing, operasional, SDM, teknologi, logistik";
    notes.value = "Business Model Canvas ini akan terus dikembangkan seiring pertumbuhan bisnis.";
    
    updatePreview();
  }
  
  // Set initial progress
  const globalBar = document.getElementById('globalBar');
  const globalPct = document.getElementById('globalPct');
  globalBar.style.width = '100%';
  globalPct.textContent = '100%';
});

// Add CSS for print
const style = document.createElement('style');
style.innerHTML = `
@media print {
  body * {
    visibility: hidden;
  }
  #main, #main * {
    visibility: visible;
  }
  #main {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  .sidebar, .mobile-menu, .action-btns {
    display: none !important;
  }
}
`;
document.head.appendChild(style);
