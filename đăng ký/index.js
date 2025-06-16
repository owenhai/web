// Password toggle
document.querySelectorAll(".toggle-password").forEach((toggle) => {
  toggle.addEventListener("click", (e) => {
    const input = toggle.previousElementSibling;
    if (input.type === "password") {
      input.type = "text";
      toggle.textContent = "visibility_off";
    } else {
      input.type = "password";
      toggle.textContent = "visibility";
    }
  });
});

// Simple form validation and demo submit handling
const registerError = document.getElementById("registerError");
const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = registerForm.registerUsername.value.trim();
  const name = registerForm.registerName.value.trim();
  const email = registerForm.registerEmail.value.trim();
  const password = registerForm.registerPassword.value.trim();
  const confirmPassword = registerForm.registerConfirmPassword.value.trim();

  if (!username || !name || !email || !password || !confirmPassword) {
    registerError.textContent = "Vui lòng nhập đầy đủ thông tin.";
    registerError.style.display = "block";
    return;
  }
  if (password !== confirmPassword) {
    registerError.textContent = "Mật khẩu xác nhận không khớp.";
    registerError.style.display = "block";
    return;
  }
  alert(`Đăng ký thành công cho tài khoản: ${name} (${email})`);
  registerForm.reset();
});

function closeDialog() {
  // Điều hướng về trang chủ
  window.location.href = "../HOME/home.html"; // Thay đổi đường dẫn này nếu cần
}
