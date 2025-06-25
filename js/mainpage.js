
  function handleClick(url) {
    document.body.classList.add('fade-out');
    setTimeout(() => {
      window.location.href = url;
    }, 500); // Wait for fade-out animation
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.body.style.opacity = 1;
  });
