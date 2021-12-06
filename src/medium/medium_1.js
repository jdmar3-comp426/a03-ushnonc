import {variance} from "./data/stats_helpers.js";

/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    var num = 0;
    array.forEach(element => {
        num += element;
    });
    return num;
}


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
    var sortedArray = array;
    for (var i = 0; i < sortedArray.length; i++) {
        for (var j = 0; j < sortedArray.length; j++) {
            if (parseInt(sortedArray[j]) > parseInt(sortedArray[i])) {
                var temp = sortedArray[i];
                sortedArray[i] = sortedArray[j];
                sortedArray[j] = temp;
            }
        }
    }
    var mid = Math.floor(sortedArray.length / 2);
    return sortedArray.length % 2 !== 0 ? sortedArray[mid] : (sortedArray[mid - 1] + sortedArray[mid]) / 2;
}

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {
    var data = {
        length: 0,
        sum: 0,
        mean: 0,
        median: 0,
        min: 0,
        max: 0,
        variance: 0,
        standard_deviation: 0,
    };
    data.length = array.length;
    data.sum = getSum(array);
    data.mean = data.sum / data.length;
    data.median = getMedian(array);
    var numMax = array[0];
    var numMin = array[0];
    for (var i = 1; i < array.length; i++) {
        if (array[i] < numMin) {
            numMin = array[i];
        }
        if (array[i] > numMax) {
            numMax = array[i]
        }
    }
    data.min = numMin;
    data.max = numMax;
    data.variance = variance(array, data.mean);
    data.standard_deviation = Math.sqrt(data.variance);
    return data;
}

