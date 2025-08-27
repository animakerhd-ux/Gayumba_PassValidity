const form = document.getElementById("registerForm");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const usernameErrors = document.getElementById("usernameErrors");
const emailErrors = document.getElementById("emailErrors");
const passwordErrors = document.getElementById("passwordErrors");
const confirmErrors = document.getElementById("confirmErrors");
const successMsg = document.getElementById("successMsg");

// Toggle password visibility
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

// Show error
function showError(container, message) {
  const p = document.createElement("p");
  p.classList.add("error");
  p.innerText = message;
  container.appendChild(p);
}

// Form validation
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Clear previous errors
  usernameErrors.innerHTML = "";
  emailErrors.innerHTML = "";
  passwordErrors.innerHTML = "";
  confirmErrors.innerHTML = "";
  successMsg.style.display = "none";

  let valid = true;

  const user = username.value.trim();
  const mail = email.value.trim();
  const pass = password.value;
  const confirm = confirmPassword.value;

  // Username validation
  if (user.length < 3) {
    showError(usernameErrors, "Username must be at least 3 characters.");
    valid = false;
  }

  // Email validation
  if (!/^\S+@\S+\.\S+$/.test(mail)) {
    showError(emailErrors, "Enter a valid email address.");
    valid = false;
  }

  // Password validation
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

  // Confirm password validation
  if (pass !== confirm) {
    showError(confirmErrors, "Passwords do not match.");
    valid = false;
  }

  // Success
  if (valid) {
    successMsg.style.display = "block";
    form.reset();
  }
});
