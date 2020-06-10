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
    info.addEventListener('click', function (event) {
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

    let deadline = '2020-06-14'; // задаем конечную дату
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
    close.addEventListener('click', function () {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = ''; //Разрешаем прокрутку страницы как только закрывается модальное окно
    });
});