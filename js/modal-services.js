document.addEventListener('DOMContentLoaded', () => {
  // --- Элементы второго модального окна ---
  const modalOverlay = document.getElementById('modalOverlayService');
  const modalClose = document.getElementById('modalCloseService');
  const modalForm = document.getElementById('modalFormService');
  const serviceNameElem = document.getElementById('modalServiceName');

  if (!modalOverlay || !modalClose || !modalForm || !serviceNameElem) {
    console.error('Один или несколько элементов второго модального окна не найдены.');
    return;
  }

  // Кнопки "Записаться", открывающие второе модальное окно
  document.querySelectorAll('.signup').forEach(button => {
    button.addEventListener('click', () => {
      // Ищем карточку услуги, чтобы получить название услуги
      const card = button.closest('.card');
      const serviceName = card?.querySelector('.block-value')?.innerText || 'Название услуги';
      serviceNameElem.innerText = serviceName;

      // Показываем модалку
      modalOverlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  modalClose.addEventListener('click', () => {
    modalForm.reset();
    selects.forEach(select => select.style.color = '#808080');
    if (dateInput) dateInput.style.color = '#808080';
    modalOverlay.style.display = 'none';
    document.body.style.overflow = '';
  });

  // Работа с полем даты
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

  // Работа с select (кроме поля услуги, его нет)
  const selects = modalForm.querySelectorAll('select');
  selects.forEach(select => {
    if (!select.value) {
      select.style.color = '#808080';
    }
    select.addEventListener('change', () => {
      select.style.color = select.value ? '#333333' : '#808080';
    });
  });

  // Обработка отправки формы
  modalForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    // Проверяем встроенную валидность
    if (!modalForm.checkValidity()) {
      modalForm.reportValidity();
      return;
    }
  
    // Дополнительно можно проверить email вручную (опционально)
    const email = modalForm.elements["email"].value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Введите корректный email.");
      return;
    }
  
    // Всё валидно — показываем сообщение
    alert('Заявка успешно отправлена! Наш менеджер свяжется с вами в течение 10-15 минут.');
  
    modalForm.reset();
    document.body.style.overflow = ''; 
    modalOverlay.style.display = "none";
  });  
});
