module.exports = function check(str, bracketsConfig) {

    const OPEN_BRACKETS = [];
    const BRACKETS_PAIR = {};

    for (let i = 0; i < bracketsConfig.length; i++) {
        OPEN_BRACKETS.push(bracketsConfig[i][0]);
        BRACKETS_PAIR[bracketsConfig[i][1]] = bracketsConfig[i][0];
    }
    /*
    console.log('\n\n-----------------------------------\n');
    console.log('открывающие символы bracketsConfig:');
    console.log(OPEN_BRACKETS);
    console.log('закрывающие символы bracketsConfig: ');
    console.log(BRACKETS_PAIR);
    console.log('проверяемая строка: ' + str + '\n');
    */
    let stack = [];
    for (let i = 0; i < str.length; i++) {
        let currentSymbol = str[i];
        let strOpenClose;
        if (OPEN_BRACKETS.includes(currentSymbol) && BRACKETS_PAIR[currentSymbol] === undefined) {
            strOpenClose = (OPEN_BRACKETS.includes(currentSymbol) && BRACKETS_PAIR[currentSymbol] === undefined);
            /*
            console.log('i = ' + i + ',  currentSymbol = ' + str[i] + ' , символ открывающий: ' + strOpenClose);
            console.log('Работает условие 1\nЗаписываем в stack:');
            */
            stack.push(currentSymbol);
            //console.log(stack, stack.length, '\n');
        } else if (OPEN_BRACKETS.includes(currentSymbol) && BRACKETS_PAIR[currentSymbol] === currentSymbol && !stack.includes(currentSymbol)) {
            strOpenClose = (OPEN_BRACKETS.includes(currentSymbol) && BRACKETS_PAIR[currentSymbol] === currentSymbol && !stack.includes(currentSymbol));
            /*
            console.log('i = ' + i + ',  currentSymbol = ' + str[i] + ' , символ открывающий: ' + strOpenClose);
            console.log('Работает условие 2\nЗаписываем в stack:');
            */
            stack.push(currentSymbol);
            //console.log(stack, stack.length, '\n');
        } else {
            strOpenClose = false;
            /*
            console.log('i = ' + i + ',  currentSymbol = ' + str[i] + ' , символ открывающий: ' + strOpenClose);
            console.log('Работает else\nПробуем закрыть последний символ в стеке.');
            console.log(stack, stack.length);
            */
            if (stack.length === 0) {
                //console.log('\nВыход: Стек пуст. Закрывающий символ появился до открывающего');
                return false;
            }
            let topElement = stack[stack.length - 1];
            if (BRACKETS_PAIR[currentSymbol] === topElement) {
                stack.pop();
                /*
                console.log(stack, stack.length);
                console.log('Закрытие верное. ' + topElement + currentSymbol + ' Уменьшаем стек.');
                console.log(stack, stack.length, '\n');
                */
            } else {
                //console.log('\nВыход: Закрытие не верное. ' + topElement + currentSymbol + '\n');
                return false;
            }
        }
    }
    //console.log(stack.length === 0 ? "\nвсе скобки верно закрыты" : "\nне все скобки закрыты");
    return stack.length === 0;
};