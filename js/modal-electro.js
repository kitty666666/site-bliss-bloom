document.addEventListener("DOMContentLoaded", () => {
  const openButtonDigital = document.querySelector('button[data-type="digital"]');
  const modalDigital = document.getElementById("orderModalDigital");
  const closeButtonDigital = document.getElementById("modalCloseDigital");
  const formDigital = document.getElementById("orderFormDigital");

  openButtonDigital.addEventListener("click", () => {
    modalDigital.style.display = "flex";
    document.body.style.overflow = 'hidden';
  });

  closeButtonDigital.addEventListener("click", () => {
    modalDigital.style.display = "none";
    formDigital.reset();
    document.body.style.overflow = '';
  });

  formDigital.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!formDigital.checkValidity()) {
      formDigital.reportValidity();
      return;
    }
    const email = formDigital.elements["emailInput"].value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Введите корректный email.");
      return;
    }
    alert("Электронный сертификат оформлен! Для дальнейшей оплаты выслали Вам письмо на почту. Если вы выбрали отправку сертификата в Ватсап/Телеграм, в ответном письме нужно указать номер телефона/имя пользователя.");
    document.body.style.overflow = ''; 
    modalDigital.style.display = "none";
    formDigital.reset();
  });
});
