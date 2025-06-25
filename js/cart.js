document.addEventListener('DOMContentLoaded', function () {
    const decreaseBtn = document.getElementById('decrease');
    const increaseBtn = document.getElementById('increase');
    const quantityElement = document.getElementById('quantity');
    const addToCartBtn = document.getElementById('addToCart');
    const buyNowBtn = document.getElementById('buyNow');
    const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-09.mp3');

    let quantity = 1;
    if (quantityElement) quantityElement.textContent = quantity;

    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', function () {
            if (quantity > 1) {
                quantity--;
                quantityElement.textContent = quantity;
            }
        });
    }

    if (increaseBtn) {
        increaseBtn.addEventListener('click', function () {
            quantity++;
            quantityElement.textContent = quantity;
        });
    }

    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function () {
            audio.play();
            addToCartBtn.innerHTML = '<i class="fas fa-check mr-2"></i> Added to Cart!';
            addToCartBtn.classList.remove('bg-orange-500', 'hover:bg-orange-600');
            addToCartBtn.classList.add('bg-green-500', 'hover:bg-green-600');

            setTimeout(function () {
                addToCartBtn.innerHTML = '<i class="fas fa-cart-plus mr-2"></i> Add to Cart';
                addToCartBtn.classList.remove('bg-green-500', 'hover:bg-green-600');
                addToCartBtn.classList.add('bg-orange-500', 'hover:bg-orange-600');

                // ✅ Redirect to dish.html after animation
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = 'dish.html';
                }, 400);
            }, 1500);
        });
    }

    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', function () {
            audio.play();
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = 'payment.html'; // ✅ Go to payment page
            }, 400);
        });
    }
});
