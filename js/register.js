const container = document.getElementById('page');


document.getElementById("signup-form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Signup successful! Redirecting to login...");
  container.classList.add('fade-out');
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 400);
});


document.getElementById('loginLink').addEventListener('click', function (e) {
  e.preventDefault();
  container.classList.add('fade-out');
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 400);
});

document.getElementById('loginBtn').addEventListener('click', function (e) {
  e.preventDefault();
  container.classList.add('fade-out');
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 400);
});
