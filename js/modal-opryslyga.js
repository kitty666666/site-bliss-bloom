document.addEventListener('DOMContentLoaded', () => {
  const modalOverlay = document.getElementById('modalOverlayService');
  const modalCloseBtn = document.getElementById('modalCloseService');
  const modalServiceName = document.getElementById('modalServiceName');
  const modalForm = document.getElementById('modalFormService');
  const dateInput = document.getElementById('dateInputService');
  const contactSelect = modalForm.querySelector('select[name="contact-method"]');

  // Минимальная дата для date input
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const minDate = `${year}-${month}-${day}`;
  dateInput.min = minDate;

  // Функция смены цвета select
  function updateSelectColor() {
    if (contactSelect.value) {
      contactSelect.style.color = '#333333'; // выбрано — темный цвет
    } else {
      contactSelect.style.color = '#808080'; // не выбрано — серый
    }
  }

  // Вызываем при изменении селекта
  contactSelect.addEventListener('change', updateSelectColor);

  // Вызываем сразу, чтобы цвет был правильным, если значение есть
  updateSelectColor();

  // Открытие модалки
  const bookButtons = document.querySelectorAll('.service-book-btn');
  bookButtons.forEach(button => {
    button.addEventListener('click', () => {
      const serviceCard = button.closest('.service-card');
      const serviceTitle = serviceCard.querySelector('.service-card-subtitle').textContent;
      modalServiceName.textContent = serviceTitle;
      modalOverlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';

      // Обновляем цвет при открытии модалки
      updateSelectColor();
    });
  });

  // Закрытие модалки
  modalCloseBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
    document.body.style.overflow = '';
    modalForm.reset();
  });

  // Отправка формы
  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!modalForm.checkValidity()) {
      modalForm.reportValidity();
      return;
    }

    alert('Заявка успешно отправлена! Наш менеджер свяжется с вами в течение 10-15 минут.');

    modalOverlay.style.display = 'none';
    document.body.style.overflow = '';

    modalForm.reset();

    // После сброса формы возвращаем цвет селекта к серому
    updateSelectColor();
  });
});
