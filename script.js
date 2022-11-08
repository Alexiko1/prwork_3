// Игра с числами.
document.querySelector('#btnTobegin').addEventListener('click', function () {   
    document.querySelector('.title').classList.add('hidden'); 
    document.querySelector('.titlep').classList.add('hidden');             
    document.querySelector('.range').classList.remove('hidden');          
    document.querySelector('.valueRange').classList.remove('hidden');           
    document.querySelector('.form-inline').classList.remove('hidden');          
    document.querySelector('#btnTobegin').classList.add('hidden');              
    document.querySelector('#btnProceed').classList.remove('hidden');           
})
//Код для кнопки "ПРОДОЛЖИТЬ".
document.querySelector('#btnProceed').addEventListener('click', function () {   
    document.querySelector('.range').classList.add('hidden');             
    document.querySelector('.terms').classList.remove('hidden');                
    document.querySelector('.valueRange').classList.add('hidden');              
    document.querySelector('.form-inline').classList.add('hidden');             
    document.querySelector('.guessNumber').classList.remove('hidden');          
    document.querySelector('#btnProceed').classList.add('hidden');              
    document.querySelector('#btnPlay').classList.remove('hidden');              
    minValue = parseInt(document.querySelector('#formInputMin').value);
    maxValue = parseInt(document.querySelector('#formInputMax').value);
    minValue = (minValue < -999) ? minValue = -999 : (minValue > 999) ? minValue = 999 : minValue;
    maxValue = (maxValue > 999) ? maxValue = 999 : (maxValue < -999) ? maxValue = -999 : maxValue;
    if (maxValue < minValue) {
        [maxValue, minValue] = [minValue, maxValue]; 
    }
    if (Number.isNaN(maxValue) || Number.isNaN(minValue)) {
        minValue = 0;
        maxValue = 100;
    }
    guessNumber.innerText = `Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`;
})
//Код для кнопки "ИГРАТЬ".
document.querySelector('#btnPlay').addEventListener('click', function () {      
    document.querySelector('.terms').classList.add('hidden');                   
    document.querySelector('.question').classList.remove('hidden');             
    document.querySelector('.guessNumber').classList.add('hidden');             
    document.querySelector('.no-gutters').classList.remove('hidden');           
    document.querySelector('#btnPlay').classList.add('hidden');                 
    document.querySelector('#btnLess').classList.remove('hidden');              
    document.querySelector('#btnEqual').classList.remove('hidden');             
    document.querySelector('#btnOver').classList.remove('hidden');              
    document.querySelector('.btn-link').classList.remove('hidden');             
    let answerNumber = Math.floor((minValue + maxValue) / 2);
    let orderNumber = 1; 
    let gameRun = true;
    const orderNumberField = document.getElementById('orderNumberField');
    const answerField = document.getElementById('answerField');
    let units = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
    let teens = ['', 'десять', 'одинадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
    let dozens = ['', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
    let hundreds = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];
 // Ссылки 
    let questions = [`Да это легко,`, `Скорее всего `, `Наверное, `, `По ходу, `, 'Уверен, '];
    let answers = [`Вы загадали неправильное число!\n\u{1F914}`, `Я сдаюсь.\n\u{1F92F}`, `Вы по ходу забыли?\n\u{1F9D0}`, `Вам стоит еще разок подумать.\n\u{1F92A}`, `Слишком много кликов\n\u{1F92F}`];
    let сongratulations = [`Я всегда угадываю\n\u{1F60E}`, `Все верно! \n\u{1F929}`, `Прекрасно!\n\u{1F973}`, `Наконец-то угадали!\n\u{1F60E}`, `Отлично!\n\u{1F60E}`];
 // Функция преобразования числа из цифр в слова (числа от -999 до 999).
    function numberToText() { 
        let number = Math.abs(answerNumber);
        let text = '';
        if (number == 0) {
            text = 'ноль';
            return text;
        }
        if (number <= 9) {
            return units[Math.floor(Math.abs(number) / 1)];
        }
        if (number > 9 && number < 20) {
            return teens[Math.floor(number / 10 + number % 10)];
        }
        if (number >= 20 && number <= 99) {
            return dozens[(Math.floor(number / 10)) - 1] + " " + units[Math.floor(number % 10)];
        }
        if (number >= 100 && number <= 999) {
            return hundreds[Math.floor(number / 100)] + " " + numberToTextHundreds();
        }
    }
    function numberToTextHundreds() {
        let unitsTeensDozens = Math.abs(answerNumber) % 100;
        if (unitsTeensDozens <= 9) {
            return units[Math.floor(unitsTeensDozens / 1)];
        }
        if (unitsTeensDozens > 9 && unitsTeensDozens < 20) {
            return teens[(Math.floor(unitsTeensDozens / 10)) + (unitsTeensDozens % 10)];
        }
        if (unitsTeensDozens >= 20 && unitsTeensDozens <= 99) {
            return dozens[(Math.floor(unitsTeensDozens / 10)) - 1] + " " + units[Math.floor(unitsTeensDozens % 10)];
        }
    }
    orderNumberField.innerText = orderNumber; 
    answerField.innerText = answerNumber >= 0 ? numberToText().length < 20 && answerNumber >= 0 ? `Вы загадали число ${numberToText()}?` : `Вы загадали число ${answerNumber}?` : numberToText().length < 20 ? `Вы загадали число минус ${numberToText()}?` : `Вы загадали число ${answerNumber}?`;
// Код для кнопки «Меньше».
    document.getElementById('btnLess').addEventListener('click', function () {
        if (gameRun) {
            if (minValue === maxValue || minValue == answerNumber) {
                const phraseRandom = Math.round(Math.random() * 4);
                answerField.innerText =  answers[Math.round(Math.random()*4)];
                gameRun = false;
            } else {
                maxValue = answerNumber - 1;
                answerNumber = Math.floor((minValue + maxValue) / 2);
                orderNumber++;
                orderNumberField.innerText = orderNumber;
                const phraseRandom = Math.round(Math.random() * 4);
                answerField.innerText = `${questions[Math.round(Math.random()*4)]} ${answerNumber >= 0 ? numberToText().length < 20 && answerNumber >= 0 ? `вы загадали число ${numberToText()}?` : `вы загадали число ${answerNumber}?` : numberToText().length < 20 ? `вы загадали число минус ${numberToText()}?` : `вы загадали число ${answerNumber}?`} `;
            }
        }
    })
// Код для кнопки «Больше».
    document.getElementById('btnOver').addEventListener('click', function () {
        if (gameRun) {
            if (minValue === maxValue) {
                const phraseRandom = Math.round(Math.random() * 4);
                answerField.innerText =  answers[Math.round(Math.random()*4)];
                gameRun = false;
            } else {
                minValue = answerNumber + 1;
                answerNumber = Math.floor((minValue + maxValue) / 2);
                orderNumber++;
                orderNumberField.innerText = orderNumber;
                const phraseRandom = Math.round(Math.random() * 4);
                answerField.innerText = `${questions[Math.round(Math.random()*4)]} ${answerNumber >= 0 ? numberToText().length < 20 && answerNumber >= 0 ? `вы загадали число ${numberToText()}?` : `вы загадали число ${answerNumber}?` : numberToText().length < 20 ? `вы загадали число минус ${numberToText()}?` : `вы загадали число ${answerNumber}?`} `;
            }
        }
    })
// Код для кнопки "Верно".
    document.getElementById('btnEqual').addEventListener('click', function () { 
        if (gameRun) {
            const phraseRandom = Math.round(Math.random() * 4);
            answerField.innerText = сongratulations[Math.round(Math.random()*4)];
            gameRun = false;
        }
    })
})
// Код для кнопки "Заново".
document.querySelector('#btnRetry').addEventListener('click', function () {     
    document.querySelector('.question').classList.toggle('hidden');             
    document.querySelector('.range').classList.toggle('hidden');          
    document.querySelector('.no-gutters').classList.toggle('hidden');           
    document.querySelector('.valueRange').classList.toggle('hidden');           
    document.querySelector('.form-inline').classList.toggle('hidden');          
    document.querySelector('#btnLess').classList.toggle('hidden');              
    document.querySelector('#btnEqual').classList.toggle('hidden');             
    document.querySelector('#btnOver').classList.toggle('hidden');              
    document.querySelector('.btn-link').classList.toggle('hidden');             
    document.querySelector('#btnProceed').classList.toggle('hidden');           
    document.querySelector('#formInputMin').value = '';
    document.querySelector('#formInputMax').value = '';
    minValue = (minValue < -999) ? minValue = -999 : (minValue > 999) ? minValue = 999 : minValue;
    maxValue = (maxValue > 999) ? maxValue = 999 : (maxValue < -999) ? maxValue = -999 : maxValue;
    if (maxValue < minValue) {
        [maxValue, minValue] = [minValue, maxValue];
    }
    if (Number.isNaN(maxValue) || Number.isNaN(minValue)) {
        minValue = 0;
        maxValue = 100;
    }
    guessNumber.innerText = `Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`;
})