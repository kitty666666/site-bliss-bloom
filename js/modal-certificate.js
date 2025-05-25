document.addEventListener('DOMContentLoaded', () => {
  const certificateButton = document.querySelector('.certificate-button');
  const modalOrder = document.getElementById('modalCertificateOrder');
  const modalOrderClose = document.getElementById('modalCertificateClose');
  const certificateOptions = document.querySelectorAll('.certificate-option');
  const certificateTotal = document.getElementById('certificateTotal');
  const certificateOrderForm = document.getElementById('certificateOrderForm');

  let selectedSum = null;
  let activeOption = null;

  certificateOptions.forEach(option => {
    option.style.cursor = 'pointer';

    option.addEventListener('click', (e) => {
      e.stopPropagation();

      if (activeOption && activeOption !== option) {
        activeOption.classList.remove('active');
      }

      if (option.classList.contains('active')) {
        option.classList.remove('active');
        activeOption = null;
        selectedSum = null;
        certificateTotal.textContent = '0 ₽';
      } else {
        option.classList.add('active');
        activeOption = option;
        selectedSum = option.textContent.trim();
        certificateTotal.textContent = selectedSum;
      }
    });
  });

  document.addEventListener('click', (event) => {
    const clickInside = event.target.closest('.certificate-option') ||
                        event.target.closest('.certificate-button') ||
                        event.target.closest('#modalCertificateOrder');

    if (!clickInside && activeOption) {
      activeOption.classList.remove('active');
      activeOption = null;
      selectedSum = null;
      certificateTotal.textContent = '0 ₽';
    }
  });

  certificateButton.addEventListener('click', () => {
    if (!selectedSum) {
      alert('Пожалуйста, выберите сумму сертификата');
      return;
    }

    certificateTotal.textContent = selectedSum;
    modalOrder.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });

  modalOrderClose.addEventListener('click', () => {
    modalOrder.style.display = 'none';
    document.body.style.overflow = '';
    certificateOrderForm.reset();
    certificateTotal.textContent = selectedSum || '0 ₽';
  });

  certificateOrderForm.addEventListener('submit', (e) => {
    e.preventDefault(); // остановит перезагрузку страницы
  
    // Если все поля корректны, можно показывать сообщение
    alert('Заказ сертификата принят! Для дальнейшей оплаты и выбора оформления/отправки в зависимости от типа сертификата выслали Вам письмо на почту.');
    modalOrder.style.display = 'none';
    document.body.style.overflow = '';
    certificateOrderForm.reset();
    certificateTotal.textContent = selectedSum || '0 ₽';
  });
  
});
