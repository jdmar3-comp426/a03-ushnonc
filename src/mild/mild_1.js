/**
 *
 * @param {number} a
 * @param {number} b
 * @returns {string} 'a + b = (a + b)'
 *
 * example: sumToString(3, 4)
 * returns: '3 + 4 = 7'
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 */
export function sumToString(a, b) {
    return a + ' + ' + b + ' = ' +  (a + b);
}


/**
 *
 * @param {number} startNumber
 * @param {number} endNumber
 * @returns {number[]}
 *
 * example: getIncreasingArray(3, 7)
 * returns: [ 3, 4, 5, 6, 7 ]
 *
 */
export function getIncreasingArray(startNumber, endNumber) {
    var arr = [];
    var counter = 0;
    for (var i = startNumber; i <= endNumber; i++) {
        arr[counter] = i;
        counter++;
    }
    return arr;
}

/**
 *
 * @param {number[]} numbers
 * @return {{min: number, max: number}}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
 * and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
 */
export function maxAndMin(numbers) {
    const data = {
        max: 0,
        min: 0,
    };
    var min = min(numbers);
    var max = max(numbers);
    data.min = parseInt(min);
    data.max = parseInt(max);
    return data;
}

/**
 *
 * @param array - An array of any primitive type
 * @returns {object} Object where the keys are the values that were passed in
 * and the value was the number of times it occurred.
 *
 * example: countArray([3, 6, 3, 2, 2, 3, 'some', 'hello', 'some', [1, 2]])
 * returns: {'2': 2, '3': 3, '6': 1, some: 2, hello: 1, '1,2': 1}
 *
 */
export function countArray(array) {
    var data = {};
    while (array.length != 0) {
        var key = array[0];
        var count = 1;
        for (var i = 0; i < array.length; i++) {
            if (array[i] === key) {
                count++;
            }
        }
        for (var i = 0; i < count; i++) {
            var index = array.indexOf(key);
            array.splice(index, 1);
        }
        data[key] = count;
    }
    return data;
}
