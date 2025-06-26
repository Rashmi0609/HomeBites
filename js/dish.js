
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = 1;
});


const cards = document.querySelectorAll('.food-card');

cards.forEach(card => {
  card.addEventListener('click', () => {
    const label = card.querySelector('.food-label').textContent.trim();
    const href = `chefs.html?dish=${encodeURIComponent(label)}`;


    document.body.style.opacity = 0;
    setTimeout(() => {
      window.location.href = href;
    }, 500); // Match transition duration
  });


  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
});
