document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы модального окна
    const reviewModal = {
        overlay: document.getElementById('reviewModalOverlay'),
        closeBtn: document.getElementById('reviewModalClose'),
        form: document.getElementById('reviewForm'),
        openBtn: document.getElementById('leaveReviewBtn'),
        fields: {
            name: document.getElementById('reviewName'),
            service: document.getElementById('reviewService'),
            date: document.getElementById('reviewDate'),
            text: document.getElementById('reviewText')
        }
    };

    // Устанавливаем ограничения для поля даты
    function setupDateRestrictions() {
        const today = new Date();
        // Форматируем дату в формат YYYY-MM-DD
        const todayFormatted = today.toISOString().split('T')[0];
        // Устанавливаем максимальную допустимую дату (сегодня)
        reviewModal.fields.date.setAttribute('max', todayFormatted);
        
        // Добавляем валидацию при изменении даты
        reviewModal.fields.date.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Убираем время для сравнения
            
        });
    }

    // Функции для управления модальным окном
    const modalMethods = {
        open: function() {
            setupDateRestrictions(); // Инициализируем ограничения даты при открытии
            reviewModal.overlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        },
        
        close: function() {
            reviewModal.overlay.style.display = 'none';
            modalMethods.reset();
            document.body.style.overflow = '';
        },
        
        reset: function() {
            reviewModal.form.reset();
        },
        
        validate: function() {
            const values = {
                name: reviewModal.fields.name.value.trim(),
                service: reviewModal.fields.service.value,
                date: reviewModal.fields.date.value,
                text: reviewModal.fields.text.value.trim()
            };
            
            // Дополнительная проверка даты
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const selectedDate = new Date(values.date);
            
            if (selectedDate > today) {
                alert('Пожалуйста, выберите корректную дату (сегодня или ранее)');
                return false;
            }
            
            return Object.values(values).every(value => value !== '');
        }
    };

    // Обработчики событий
    reviewModal.openBtn.addEventListener('click', modalMethods.open);
    reviewModal.closeBtn.addEventListener('click', modalMethods.close);

    
    // Обработка отправки формы
    reviewModal.form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!modalMethods.validate()) {
            return;
        }
        
        // Здесь можно добавить отправку данных на сервер
        alert("Ваш отзыв отправлен! Перед публикацией его проверит модератор.");
        
        modalMethods.reset();
        modalMethods.close();
    });

    // Инициализация ограничений даты при загрузке страницы
    setupDateRestrictions();
});