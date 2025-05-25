document.addEventListener('DOMContentLoaded', () => {
  const registerBtn = document.querySelector('.register-btn');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalForm = document.getElementById('modalForm');

  if (!registerBtn || !modalOverlay || !modalClose || !modalForm) {
    console.error('Один или несколько элементов модального окна не найдены.');
    return;
  }

  const dateInput = modalForm.querySelector('input[type="date"]');
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
    dateInput.style.color = '#808080';

    dateInput.addEventListener('change', () => {
      dateInput.style.color = dateInput.value ? '#333333' : '#808080';
    });
  }

  const selects = modalForm.querySelectorAll('select');
  selects.forEach(select => {
    if (!select.value) {
      select.style.color = '#808080';
    }

    select.addEventListener('change', () => {
      select.style.color = select.value ? '#333333' : '#808080';
    });
  });

  registerBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });

  modalClose.addEventListener('click', () => {
    modalForm.reset();
    selects.forEach(select => select.style.color = '#808080');
    if (dateInput) dateInput.style.color = '#808080';
    modalOverlay.style.display = 'none';
    document.body.style.overflow = '';
  });

  function isValidPhoneNumber(phone) {
    const phoneRegex = /^(?:\+7|8)\s?\(?\d{3}\)?\s?\d{3}-?\d{2}-?\d{2}$/;
    return phoneRegex.test(phone);
  }

  modalForm.addEventListener('submit', (e) => {
    // Очистим кастомные ошибки (если были)
    const phoneInput = modalForm.querySelector('input[type="tel"]');
    if (phoneInput) {
      if (!isValidPhoneNumber(phoneInput.value.trim())) {
        phoneInput.setCustomValidity('Введите корректный номер телефона (например, 8 XXX XXX-XX-XX).');
      } else {
        phoneInput.setCustomValidity('');
      }
    }

    // Проверяем валидность всей формы
    if (!modalForm.checkValidity()) {
      e.preventDefault(); // Не отправляем форму, если невалидна
      modalForm.reportValidity(); // Показываем нативные сообщения браузера
      return;
    }

    // Если форма валидна, отправляем и закрываем
    e.preventDefault(); // если нужна отправка через AJAX или без перезагрузки

    alert('Заявка успешно отправлена! Наш менеджер свяжется с вами в течение 10-15 минут.');

    modalOverlay.style.display = 'none';
    document.body.style.overflow = ''; 
    modalForm.reset();
    selects.forEach(select => select.style.color = '#808080');
    if (dateInput) dateInput.style.color = '#808080';
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const dateInput = document.getElementById("dateInput");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);
  }
});
