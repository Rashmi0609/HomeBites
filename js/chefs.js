document.addEventListener("DOMContentLoaded", () => {
  const chefCards = document.querySelectorAll(".profile-card");


  document.body.classList.add("fade-in");

  chefCards.forEach(card => {
    card.addEventListener("click", () => {
      const chefName = card.querySelector(".profile-name").textContent.trim();
      const encodedName = encodeURIComponent(chefName);


      document.body.classList.remove("fade-in");
      document.body.classList.add("fade-out");


      setTimeout(() => {
        window.location.href = `cart.html?chef=${encodedName}`;
      }, 400);
    });
  });


  const links = document.querySelectorAll(".profile-card .profile-name");
  links.forEach(link => {
    link.addEventListener("click", e => e.preventDefault());
  });


  const locationBtn = document.getElementById("useLocationBtn");
  const pincodeBtn = document.getElementById("showPincodeBtn");
  const pincodeSection = document.getElementById("pincodeSection");
  const pincodeInput = document.getElementById("pincodeInput");
  const submitBtn = document.getElementById("submitPincode");


  locationBtn.addEventListener("click", () => {
    window.open("https://www.google.com/maps", "_blank");
  });


  pincodeBtn.addEventListener("click", () => {
    pincodeSection.style.display = "block";
    pincodeInput.focus();
  });


  submitBtn.addEventListener("click", () => {
    const pincode = pincodeInput.value.trim();
    if (pincode === "") {
      alert("Please enter a pincode.");
    } else if (!/^\d{6}$/.test(pincode)) {
      alert("Please enter a valid 6-digit Indian pincode.");
    } else {
      alert("Your pincode " + pincode + " has been submitted!");

    }
  });
});

