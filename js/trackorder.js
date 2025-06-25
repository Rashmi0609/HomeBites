(function () {
      const form = document.getElementById('track-form');
      const resultSection = document.getElementById('tracking-result');
      const orderIdSpan = document.getElementById('result-order-id');
      const statusSpan = document.getElementById('result-status');
      const deliveryNameSpan = document.getElementById('delivery-name');
      const deliveryContactSpan = document.getElementById('delivery-contact');
      const steps = ['received', 'processing', 'shipped', 'delivered'];

      function resetStepper() {
        steps.forEach(s => {
          const stepEl = document.getElementById('step-' + s);
          stepEl.classList.remove('active', 'completed');
        });
      }

      function updateStepper(currentStatus) {
        const statusIndex = steps.indexOf(currentStatus);
        steps.forEach((s, index) => {
          const stepEl = document.getElementById('step-' + s);
          if (index < statusIndex) {
            stepEl.classList.add('completed');
          } else if (index === statusIndex) {
            stepEl.classList.add('active');
          }
        });
      }

      function maskPhoneNumber(phone) {
        if (!phone || phone.length < 4) return phone;
        return phone.slice(0, 4) + 'xxxxxx';
      }

      function fetchOrderInfo(orderId) {
        const statuses = ['received', 'processing', 'shipped', 'delivered'];
        const deliveryBoys = [
          { name: 'Ravi Kumar', contact: '7869123456' },
          { name: 'Arjun Singh', contact: '7869988777' },
          { name: 'Suresh Patel', contact: '7869001122' },
          { name: 'Vikram Joshi', contact: '7869345678' }
        ];
        const index = orderId.length % statuses.length;
        return {
          status: statuses[index],
          deliveryBoy: deliveryBoys[index]
        };
      }

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const orderId = form['order-id'].value.trim();
        if (!orderId) {
          alert('Please enter a valid Order ID.');
          return;
        }
        const orderInfo = fetchOrderInfo(orderId);
        orderIdSpan.textContent = orderId;
        statusSpan.textContent = orderInfo.status.charAt(0).toUpperCase() + orderInfo.status.slice(1);
        deliveryNameSpan.textContent = orderInfo.deliveryBoy.name;
        deliveryContactSpan.textContent = maskPhoneNumber(orderInfo.deliveryBoy.contact);
        resetStepper();
        updateStepper(orderInfo.status);
        resultSection.classList.remove('hidden');
      });
    })();