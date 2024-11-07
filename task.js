
// const addTimer = function () {
//     const timer = document.getElementById('timer');
//     if (timer.textContent == 0) {
//         alert("Вы победили в конкурсе")
//         clearInterval(this)
//         location.reload();
//     }
//     timer.textContent -= 1
// }
// setInterval(addTimer, 1000)


// класс для создание таймера обратного отсчета
class CountdownTimer {
    constructor(deadline, cbChange, cbComplete) {
        this._deadline = deadline;
        this._cbChange = cbChange;
        this._cbComplete = cbComplete;
        this._timerId = null;
        this._out = {
            hours: '', minutes: '', seconds: '',
            hoursTitle: '', minutesTitle: '', secondsTitle: ''
        };
        this._start();
    }
    static declensionNum(num, words) {
        return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
    }
    _start() {
        this._calc();
        this._timerId = setInterval(this._calc.bind(this), 1000);
    }
    _calc() {
        const diff = this._deadline - new Date();
        const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
        const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
        const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
        this._out.hours = hours < 10 ? '0' + hours : hours;
        this._out.minutes = minutes < 10 ? '0' + minutes : minutes;
        this._out.seconds = seconds < 10 ? '0' + seconds : seconds;
        this._out.hoursTitle = CountdownTimer.declensionNum(hours, ['час', 'часа', 'часов']);
        this._out.minutesTitle = CountdownTimer.declensionNum(minutes, ['минута', 'минуты', 'минут']);
        this._out.secondsTitle = CountdownTimer.declensionNum(seconds, ['секунда', 'секунды', 'секунд']);
        this._cbChange ? this._cbChange(this._out) : null;
        if (diff <= 0) {
            clearInterval(this._timerId);
            this._cbComplete ? this._cbComplete() : null;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {

    // .timer-1 (на минуту)
    const elHours1 = document.querySelector('.timer-1 .timer__hours');
    const elMinutes1 = document.querySelector('.timer-1 .timer__minutes');
    const elSeconds1 = document.querySelector('.timer-1 .timer__seconds');
    const deadline1 = new Date(Date.now() + (10 * 1000 + 999));
    new CountdownTimer(deadline1, (timer) => {
        elHours1.textContent = timer.hours;
        elMinutes1.textContent = timer.minutes;
        elSeconds1.textContent = timer.seconds;
        elHours1.dataset.title = timer.hoursTitle;
        elMinutes1.dataset.title = timer.minutesTitle;
        elSeconds1.dataset.title = timer.secondsTitle;
    }, () => {
        alert("Вы победили в конкурсе");
        downloadFile()
        // Здесь не нужно вызывать downloadFile() сразу. Давайте добавим обработчик события для кнопки.
    });
    
    // Добавляем обработчик события для кнопки загрузки файла
    document.getElementById('downloadButton').addEventListener('click', downloadFile);
});



function downloadFile() {
    // Создаем бинарный Blob с пустым массивом
    const blob = new Blob([new Uint8Array(0)], { type: 'application/octet-stream' });
    // Создаем ссылку для загрузки файла
    const link = document.createElement('a');
    // Устанавливаем ссылку на созданный Blob
    link.href = URL.createObjectURL(blob);
    // Устанавливаем имя файла для скачивания
    link.setAttribute('download', 'тебе пизда хуйло.zip');
    // Эмулируем нажатие на ссылку для начала загрузки
    link.click();
    // Освобождаем URL ресурс
    URL.revokeObjectURL(link.href);
}
