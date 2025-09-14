// Custom Alert System
const alertModal = document.getElementById("alertModal");
const alertContent = document.getElementById("alertContent");
const alertIcon = document.getElementById("alertIcon");
const alertTitle = document.getElementById("alertTitle");
const alertSubtitle = document.getElementById("alertSubtitle");
const alertMessage = document.getElementById("alertMessage");
const alertConfirm = document.getElementById("alertConfirm");
const alertCancel = document.getElementById("alertCancel");

// Alert types configuration
const alertTypes = {
  success: {
    icon: "✅",
    iconBg: " text-white",
    title: "Berhasil!",
    subtitle: "Operasi berhasil dilakukan",
    confirmBtn: "grad-accent text-white hover:opacity-90",
  },
  warning: {
    icon: "⚠️",
    iconBg: "bg-yellow-100 text-yellow-600",
    title: "Peringatan",
    subtitle: "Harap perhatikan informasi berikut",
    confirmBtn: "bg-yellow-500 hover:bg-yellow-600 text-white",
  },
  danger: {
    icon: "❌",
    iconBg: "bg-red-100 text-red-600",
    title: "Error",
    subtitle: "Terjadi kesalahan",
    confirmBtn: "bg-red-500 hover:bg-red-600 text-white",
  },
  info: {
    icon: "ℹ️",
    iconBg: "bg-blue-100 text-blue-600",
    title: "Informasi",
    subtitle: "Informasi penting",
    confirmBtn: "bg-blue-500 hover:bg-blue-600 text-white",
  },
};

// Custom alert function
function showAlert(message, type = "info", options = {}) {
  const config = alertTypes[type];

  // Set icon and styling
  alertIcon.textContent = config.icon;
  alertIcon.className = `w-12 h-12 rounded-full flex items-center justify-center text-2xl ${config.iconBg}`;

  // Set title and subtitle
  alertTitle.textContent = options.title || config.title;
  alertSubtitle.textContent = options.subtitle || config.subtitle;

  // Set message
  alertMessage.textContent = message;

  // Set confirm button styling
  alertConfirm.className = `px-6 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${config.confirmBtn}`;
  alertConfirm.textContent = options.confirmText || "OK";


  // Handle cancel button
  if (options.showCancel) {
    alertCancel.classList.remove("hidden");
    alertCancel.textContent = options.cancelText || "Batal";
  } else {
    alertCancel.classList.add("hidden");
  }

  // Show modal
  alertModal.classList.remove("hidden");
  alertContent.classList.remove("modal-exit");
  alertContent.classList.add("modal-enter");

  // Return promise for handling user response
  return new Promise((resolve) => {
    const handleConfirm = () => {
      closeAlert();
      resolve(true);

      // Tambahan: jalankan callback custom kalau ada
        if (typeof options.onConfirm === "function") {
            options.onConfirm();
        }
    };

    const handleCancel = () => {
      closeAlert();
      resolve(false);
    };

    // Remove existing listeners
    alertConfirm.replaceWith(alertConfirm.cloneNode(true));
    alertCancel.replaceWith(alertCancel.cloneNode(true));

    // Get new references after cloning
    const newConfirm = document.getElementById("alertConfirm");
    const newCancel = document.getElementById("alertCancel");

    // Add new listeners
    newConfirm.addEventListener("click", handleConfirm);
    newCancel.addEventListener("click", handleCancel);

    // Close on overlay click
    const overlay = alertModal.querySelector(".modal-overlay");
    const handleOverlayClick = (e) => {
      if (e.target === overlay) {
        closeAlert();
        resolve(false);
      }
    };
    overlay.addEventListener("click", handleOverlayClick);

    // Close on escape key
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeAlert();
        resolve(false);
        document.removeEventListener("keydown", handleEscape);
      }
    };
    document.addEventListener("keydown", handleEscape);
  });
}

function closeAlert() {
  alertContent.classList.remove("modal-enter");
  alertContent.classList.add("modal-exit");

  setTimeout(() => {
    alertModal.classList.add("hidden");
    alertContent.classList.remove("modal-exit");
  }, 200);
}
