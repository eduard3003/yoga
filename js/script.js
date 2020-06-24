window.addEventListener('DOMContentLoaded', function () {

	'use strict'; //Переводим весь наш код в строгий режим

	// Табы:
	let tab = document.querySelectorAll('.info-header-tab'),
		info = document.querySelector('.info-header'),
		tabContent = document.querySelectorAll('.info-tabcontent'),
		btn = document.querySelectorAll('.description-btn');


	btn.forEach((element, i) => { // Используем метод forEach для перебора кнопок "Подробнее"

		btn[i].addEventListener('click', () => {
			overlay.style.display = 'block';
			more.classList.add('more-splash');
			document.body.style.overflow = 'hidden';
		});
	});


	function hideTabContent(a) {
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');
		}
	}
	hideTabContent(1);

	function showtabContent(b) {
		if (tabContent[b].classList.contains('hide')) {
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('show');
		}
	}
	info.addEventListener('click', (event) => {
		let target = event.target;
		if (target && target.classList.contains('info-header-tab')) {
			for (let i = 0; i < tab.length; i++) {
				if (target == tab[i]) {
					hideTabContent(0);
					showtabContent(i);
					break; //останавливаем цикл
				}
			}
		}
	});

	// Timer:

	let deadline = '2020-07-1'; // задаем конечную дату
	function getTimeRemaning(endtime) {
		let t = Date.parse(endtime) - Date.parse(new Date()), //узнаем промежуток времени между сейчас и дедлайном(конечной датой)
			seconds = Math.floor((t / 1000) % 60), // получаем секунды,
			// где t - полученные милисекунды,
			// (t/1000) - получаем секунды,
			// % 60 - получаем остаток от деления(вычленяем колличество целых минут и оставляем секунды)
			minutes = Math.floor((t / 1000 / 60) % 60),
			//где /60 - получаем  целые минуты
			// % 60 - вычленяем колличество целых часов и оставляем минуты
			hours = Math.floor((t / (1000 * 60 * 60))); //вычленяем колличество целых цасов
		// если в таймере есть дни,то bспользуем такое выражение:

		//hours = Math.floor((t/(1000/60/60) % 24),
		// days = Math.floor((t/(1000*60*60*24)));
		return { // вызываем функцию возврата и создаем объект с парой('ключ' : значение)
			'total': t,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};

	}

	//Пишем функцию которая превращает нашу статическую верстку в динмическую:
	function setClock(id, endtime) {
		//где аргумент id -индетификатор элемента который нужно найти
		//аргумент endtime- время дедлайн;
		//Получаем элементы и верстки:
		let timer = document.getElementById(id),
			hours = timer.querySelector('.hours'),
			minutes = timer.querySelector('.minutes'),
			seconds = timer.querySelector('.seconds'),
			timeInterval = setInterval(updateClock, 1000);
		// Пишем функцию,которая будет обновлять наши часы каждую секунду:
		function updateClock() {
			let t = getTimeRemaning(endtime);

			function addZero(num) { // Пишем функцию для добавления нуля  перед одиночной цифрой(4 стало 04)
				if (num <= 9) {
					return '0' + num;
				} else return num;
			}
			hours.textContent = addZero(t.hours);
			minutes.textContent = addZero(t.minutes);
			seconds.textContent = addZero(t.seconds);
			if (t.total <= 0) {
				clearInterval(timeInterval); //останавливаем таймер
				hours.textContent = '00';
				minutes.textContent = '00';
				seconds.textContent = '00';
			}

		}

	}
	setClock('timer', deadline); // Вызываем функцию setClock, 
	//где 'timer'- индетификатор элемента,
	//deadline - переменная,которую назначили в самом начале; 


	// Модальное окно

	let more = document.querySelector('.more'),
		overlay = document.querySelector('.overlay'),
		close = document.querySelector('.popup-close');


	more.addEventListener('click', function () {
		overlay.style.display = 'block';
		this.classList.add('more-splash');
		document.body.style.overflow = 'hidden'; //Запрещаем прокрутку страницы как только открывается модальное окно
	});
	close.addEventListener('click', () => {
		overlay.style.display = 'none';
		more.classList.remove('more-splash');
		document.body.style.overflow = ''; //Разрешаем прокрутку страницы как только закрывается модальное окно
	});

	// Form  - cтандартная форма

	//let message = {
	//loading: 'Загрузка...',
	//success: 'Спасибо! Скоро мы с вами свяжемся!',
	//failure: 'Что то пошло не так...'
	//};
	//let form = document.querySelector('.main-form'),
	//input = form.getElementsByTagName('input'),
	//statusMessage = document.createElement('div'); // создаем новый  div  на странице	
	//statusMessage.classList.add('status'); // добавляем класс к переменной


	//form.addEventListener('submit', function (event) { // обязательно вешаем обработчик событий на форму,а не на кнопку 'Оставить заявку'	
	//event.preventDefault(); // отменяем стандартное поведение браузера
	//form.appendChild(statusMessage); // в форму добавляем новый div, который лежит в переменной statusMessage

	//let request = new XMLHttpRequest();
	//request.open('POST', 'server.php');
	//request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

	//let formData = new FormData(form);
	//request.send(formData);


	//request.addEventListener('readystatechange', function () {
	//if (request.readyState < 4) {
	//statusMessage.innerHTML = message.loading;
	//} else if (request.readyState === 4 && request.status == 200) {
	//statusMessage.innerHTML = message.success;
	//} else {
	//statusMessage.innerHTML = message.failure;
	//}
	//});

	//for (let i=0; i < input.length; i++){
	//input[i].value = '';
	//}


	//});


	// Form - JSON


	let message = {
		loading: 'Загрузка...',
		success: 'Спасибо! Скоро мы с вами свяжемся!',
		failure: 'Что-то пошло не так...'
	};

	let form = document.querySelector('.main-form'),
		input = form.getElementsByTagName('input'),
		statusMessage = document.createElement('div');

	statusMessage.classList.add('status');

	form.addEventListener('submit', function (event) {
		event.preventDefault();
		form.appendChild(statusMessage);

		let request = new XMLHttpRequest();
		request.open('POST', 'server.php');
		request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

		let formData = new FormData(form);

		let obj = {};
		formData.forEach(function (value, key) { // превращаем обычную форму в JSON
			obj[key] = value;
		});
		let json = JSON.stringify(obj);

		request.send(json);

		request.addEventListener('readystatechange', function () {
			if (request.readyState < 4) {
				statusMessage.innerHTML = message.loading;
			} else if (request.readyState === 4 && request.status == 200) {
				statusMessage.innerHTML = message.success;
			} else {
				statusMessage.innerHTML = message.failure;
			}
		});

		for (let i = 0; i < input.length; i++) { // этим циклом очищаем поле ввода input
			input[i].value = '';
		}
	});

	// Slider

	let slideIndex = 1, // параметр текущего слайда
		slides = document.querySelectorAll('.slider-item'),
		prev = document.querySelector('.prev'),
		next = document.querySelector('.next'),
		dotsWrap = document.querySelector('.slider-dots'),
		dots = document.querySelectorAll('.dot');

	showSlides(slideIndex);

	function showSlides(n) {
		if (n > slides.length) {
			slideIndex = 1;
		}
		if (n < 1) {
			slideIndex = slides.length;
		}

		slides.forEach((item) => item.style.display = 'none');
		// for (let i = 0; i < slides.length; i++) { // То же самое что метод forEach приведунный выше
		//     slides[i].style.display = 'none';
		// }
		dots.forEach((item) => item.classList.remove('dot-active')); // удаляем класс

		slides[slideIndex - 1].style.display = 'block';
		dots[slideIndex - 1].classList.add('dot-active');
	}

	function plusSlides(n) {
		showSlides(slideIndex += n);
	}

	function currentSlide(n) { // определяет текущий слайд и устанавливает его
		showSlides(slideIndex = n);
	}

	prev.addEventListener('click', function () {
		plusSlides(-1);
	});
	next.addEventListener('click', function () {
		plusSlides(1);
	});

	dotsWrap.addEventListener('click', function (event) { // делегирование событий
		for (let i = 0; i < dots.length + 1; i++) { // не привязываемся к стилям только к элементам

			if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
				// проверяем элемент на который кликнули есть ли у него класс dot
				currentSlide(i);
			}
		}
	});

	// Calc

	let persons = document.querySelectorAll('.counter-block-input')[0],
		restDays = document.querySelectorAll('.counter-block-input')[1],
		place = document.getElementById('select'),
		totalValue = document.getElementById('total'),
		personsSum = 0,
		daySum = 0,
		total = 0;

	totalValue.innerHTML = 0; //totalValue.textContent = 0;- можно и так записать

	persons.addEventListener('change', function () {
		personsSum = +this.value; // получаем value на input на котором происходит событие с помощью this
		total = (daySum + personsSum) * 4000;
		if (restDays.value == '' || persons.value == '') {
			totalValue.innerHTML = 0;
		} else {
			totalValue.innerHTML = total;
		}
	});

	restDays.addEventListener('change', function () {
		daySum  = +this.value; // получаем value на input на котором происходит событие с помощью this
		total = (daySum + personsSum) * 4000;
		if (persons.value == '' || restDays.value =='') {
			totalValue.innerHTML = 0;
		} else {
			totalValue.innerHTML = total;
		}
	});

	place.addEventListener('change',function(){
		if (restDays.value == '' || persons.value == '') {
			totalValue.innerHTML = 0;
		}else {
			let a = total; //создаем промежуточную переменную a
			totalValue.innerHTML = a * this.options[this.selectedIndex].value;
		}

	});


});