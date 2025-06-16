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
const loginError = document.getElementById("loginError");
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = loginForm.loginUsername.value.trim();
  const password = loginForm.loginPassword.value.trim();

  if (!username || !password) {
    loginError.textContent = "Vui lòng nhập đầy đủ thông tin.";
    loginError.style.display = "block";
    return;
  }
  alert(`Đăng nhập thành công với tên đăng nhập: ${username}`);
  loginForm.reset();
});

function closeDialog() {
  // Điều hướng về trang chủ
  window.location.href = "../HOME/home.html"; // Thay đổi đường dẫn này nếu cần
}
