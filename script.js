const form = document.getElementById("registerForm");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const passwordErrors = document.getElementById("passwordErrors");
const confirmErrors = document.getElementById("confirmErrors");
const successMsg = document.getElementById("successMsg");

// Toggle password visibility with animation
document.querySelectorAll(".toggle-password").forEach(icon => {
  icon.addEventListener("click", () => {
    const targetId = icon.getAttribute("data-target");
    const input = document.getElementById(targetId);
    if (input.type === "password") {
      input.type = "text";
      icon.textContent = "🙈";
    } else {
      input.type = "password";
      icon.textContent = "👁️";
    }
    icon.classList.toggle("rotate");
  });
});

// Form validation
form.addEventListener("submit", function (e) {
  e.preventDefault();
  passwordErrors.innerHTML = "";
  confirmErrors.innerHTML = "";
  successMsg.style.display = "none";

  const pass = password.value;
  const confirm = confirmPassword.value;
  let valid = true;

  // Validation rules
  if (pass.length < 8) {
    showError(passwordErrors, "Password must be at least 8 characters long.");
    valid = false;
  }
  if (pass.length > 15) {
    showError(passwordErrors, "Password must not exceed 15 characters.");
    valid = false;
  }
  if (!/[A-Z]/.test(pass)) {
    showError(passwordErrors, "Password must contain at least one uppercase letter.");
    valid = false;
  }
  if (!/[a-z]/.test(pass)) {
    showError(passwordErrors, "Password must contain at least one lowercase letter.");
    valid = false;
  }
  if (!/[0-9]/.test(pass)) {
    showError(passwordErrors, "Password must contain at least one number.");
    valid = false;
  }
  if (!/[@$!%*?&]/.test(pass)) {
    showError(passwordErrors, "Password must contain at least one special character (@$!%*?&).");
    valid = false;
  }
  if (pass !== confirm) {
    showError(confirmErrors, "Passwords do not match.");
    valid = false;
  }

  if (valid) {
    successMsg.style.display = "block";
    successMsg.style.animation = "slideDown 0.6s ease forwards";
    form.reset();
  }
});

function showError(container, message) {
  const p = document.createElement("p");
  p.classList.add("error");
  p.innerText = message;
  container.appendChild(p);
}
