document.addEventListener("DOMContentLoaded", () => {
  const openButton = document.querySelector('button[data-type="paper"]');
  const modal = document.getElementById("orderModalPaper");
  const closeButton = document.getElementById("modalClosePaper");
  const form = document.getElementById("orderFormPaper");

  // Открытие модального окна
  openButton.addEventListener("click", () => {
    modal.style.display = "flex";
    document.body.style.overflow = 'hidden';
  });

  // Закрытие по крестику
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
    form.reset(); // сбрасываем форму при закрытии
    document.body.style.overflow = '';
  });

  // Проверка формы
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // предотвращаем перезагрузку страницы
    // Если форма невалидна — показываем подсказки и не отправляем
    if (!form.checkValidity()) {
      form.reportValidity(); // браузер покажет встроенные подсказки
      e.preventDefault();
      return;
    }

    // Если валидно — дальше можно делать дополнительные проверки, например email
    const email = form.elements["emailInput"].value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Введите корректный email.");
      e.preventDefault();
      return;
    }

    alert("Бумажный сертификат оформлен! Для дальнейшей оплаты выслали Вам письмо на почту.");
    modal.style.display = "none";
    document.body.style.overflow = ''; 
    form.reset();
  });
});
