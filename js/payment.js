
const decreaseBtn = document.getElementById("decrease");
const increaseBtn = document.getElementById("increase");
const qtyValue = document.getElementById("qty-value");
const totalPrice = document.getElementById("total-price");
const unitPrice = 299;

let quantity = 1;

function updateCart() {
  qtyValue.textContent = quantity;
  totalPrice.textContent = `₹${quantity * unitPrice}`;
}

decreaseBtn.addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;
    updateCart();
  }
});

increaseBtn.addEventListener("click", () => {
  quantity++;
  updateCart();
});

updateCart();

// 
const options = document.querySelectorAll('.payment-option');
const confirmBtn = document.querySelector('button[type="submit"]');
let selectedMethod = null;

options.forEach(option => {
  option.addEventListener('click', () => {
    options.forEach(opt => opt.classList.remove('selected'));
    option.classList.add('selected');
    selectedMethod = option.dataset.method;
    confirmBtn.disabled = false;
    confirmBtn.setAttribute('aria-disabled', 'false');
  });
});

document.getElementById('payment-form').addEventListener('submit', function (e) {
  e.preventDefault();

  if (!selectedMethod) return;

  const methodText = {
    phonepay: "PhonePe",
    gpay: "Google Pay (GPay)",
    cod: "Cash on Delivery"
  };

  alert(`✅ You have selected: ${methodText[selectedMethod]}\nThank you for choosing Home Bites!`);


  document.querySelector('.container').classList.add('fade-out');

  setTimeout(() => {
    window.location.href = 'trackorder.html';
  }, 400);
});
