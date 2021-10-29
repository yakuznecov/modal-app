function _createModal(options) {
	const DEFAULT_WIDTH = '600px'; // значение по умолчанию, если ширина не передавалась
	const modal = document.createElement('div');
	modal.classList.add('vmodal');
	modal.insertAdjacentHTML(
		'afterbegin',
		`
    
        <div class="modal-overlay" data-close='true'>
            <div class="modal-window" style='width: ${options.width || DEFAULT_WIDTH}'>
                <div class="modal-header">
                    <span class="modal-title">${options.title || 'Окно'}</span>
                    ${options.closable ? `<span class="modal-close" data-close='true'>&times;</span>` : ''} 
                </div>
                <div class="modal-body">
                    ${options.content || ''}
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
	let destroyed = false;

	const modal = {
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
	};

	const listener = (event) => {
		if (event.target.dataset.close) {
			modal.close();
		}
	};

	$modal.addEventListener('click', listener);
	// возврат методов
	return Object.assign(modal, {
		destroy() {
			$modal.parentNode.removeChild($modal);
			$modal.removeEventListener('click', listener);
			destroyed = true;
		},
	});
};
