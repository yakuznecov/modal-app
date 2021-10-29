let fruits = [
	{ id: 1, title: 'Яблоки', price: 20, img: 'https://oonkologii.ru/wp-content/uploads/2018/12/yabloki-ot-raka2.jpg' },
	{ id: 2, title: 'Апельсины', price: 30, img: 'https://csn-tv.ru/uploads/images/2021/2021/4/21/1%20(11).jpg' },
	{ id: 3, title: 'Манго', price: 40, img: 'https://severdv.ru/wp-content/uploads/2019/11/mango-foto.jpg' },
];

// Динамически вывести список карточек в html

const toHtml = (fruit) => `
    <div class="col">
        <div class="card">
            <img src="${fruit.img}" class="card-img-top" style="height: 250px; object-fit: cover"/>
            <div class="card-body">
                <h5 class="card-title">${fruit.title}</h5>
                <a href="#" class="btn btn-success" data-btn='price' data-id='${fruit.id}'>Цена</a>
                <a href="#" class="btn btn-danger" data-btn='remove' data-id='${fruit.id}'>Удалить</a>
            </div>
        </div>
    </div>
`;

function render() {
	const html = fruits.map(toHtml).join('');
	document.querySelector('#fruits').innerHTML = html;
}

render();

// Показать цену в модалке

const priceModal = $.modal({
	title: 'Цена товара',
	closable: true,
	width: '400px',
	footerButtons: [
		{
			text: 'Закрыть',
			type: 'primary',
			handler() {
				priceModal.close();
			},
		},
	],
});

document.addEventListener('click', (event) => {
	event.preventDefault();
	const btnType = event.target.dataset.btn;
	const id = +event.target.dataset.id;
	const fruit = fruits.find((f) => f.id === id);

	if (btnType === 'price') {
		// найти по id конкретный фрукт
		priceModal.setContent(`
            <p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
        `);
		priceModal.open();
	} else if (btnType === 'remove') {
		$.confirm({
			title: 'Вы уверены?',
			content: `<p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>`,
		})
			.then(() => {
				fruits = fruits.filter((f) => f.id !== id);
				render();
			})
			.catch(() => {
				console.log('Cancel');
			});
	}
});
