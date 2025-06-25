document.addEventListener("DOMContentLoaded", () => {
  const chefCards = document.querySelectorAll(".profile-card");

  // Fade-in when page loads
  document.body.classList.add("fade-in");

  chefCards.forEach(card => {
    card.addEventListener("click", () => {
      const chefName = card.querySelector(".profile-name").textContent.trim();
      const encodedName = encodeURIComponent(chefName);

      // Trigger fade-out animation
      document.body.classList.remove("fade-in");
      document.body.classList.add("fade-out");

      // Navigate after animation completes
      setTimeout(() => {
        window.location.href = `cart.html?chef=${encodedName}`;
      }, 400); // Match your CSS transition duration
    });
  });

  // Prevent default <a> behavior inside the card
  const links = document.querySelectorAll(".profile-card .profile-name");
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
    });
  });
});
