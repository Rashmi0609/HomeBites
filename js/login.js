window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('page').classList.add('fade-in');
});

function transitionTo(url) {
  const page = document.getElementById('page');
  page.classList.remove('fade-in');
  page.classList.add('fade-out');
  setTimeout(() => {
    window.location.href = url;
  }, 400);
}

document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();
  transitionTo('dish.html');
});

document.getElementById('forgot-password-link').addEventListener('click', (e) => {
  e.preventDefault();
  transitionTo('register.html');
});

document.getElementById('create-account-link').addEventListener('click', (e) => {
  e.preventDefault();
  transitionTo('register.html');
});
