function _createModal(options) {
	const modal = document.createElement('div');
	modal.classList.add('vmodal');
	modal.insertAdjacentHTML(
		'afterbegin',
		`
    
        <div class="modal-overlay">
            <div class="modal-window">
                <div class="modal-header">
                    <span class="modal-title">Modal title</span>
                    <span class="modal-close">&times;</span>
                </div>
                <div class="modal-body">
                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                </div>
                <div class="modal-footer">
                    <button>Ok</button>
                    <button>Cancel</button>
                </div>
            </div>
        </div>
    
    `
	);
	document.body.appendChild(modal);
	return modal;
}

// функция с параметром внутри для настройки окна, работаем в замыкании
$.modal = function (options) {
	const ANIMATION_SPEED = 200;
	const $modal = _createModal(options);
	let closing = false;
	// возврат методов
	return {
		open() {
			!closing && $modal.classList.add('open'); // Добавляем класс для открытия
		},
		close() {
			closing = true;
			$modal.classList.remove('open'); // удаление класса открытия
			$modal.classList.add('hide');
			setTimeout(() => {
				$modal.classList.remove('hide');
				closing = false;
			}, ANIMATION_SPEED);
		},
		destroy() {},
	};
};
