import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: averageMpg(mpg_data),
    allYearStats: yearStats(mpg_data),
    ratioHybrids: ratioHybrids(mpg_data),
};

function averageMpg(array) {
    var data = {
        city: 0,
        highway: 0,
    };
    var city_total = 0;
    var highway_total = 0;
    for (var i = 0; i < array.length; i++) {
        city_total += array[i].city_mpg;
        highway_total += array[i].highway_mpg;
    }
    data.city = city_total / array.length;
    data.highway = highway_total / array.length;
    return data;
}

function yearStats(array) {
    var arr = [];
    for (var i = 0; i < array.length; i++) {
        arr[i] = array[i].year;
    }
    var data = getStatistics(arr);
    return data;
}

function ratioHybrids(array) {
    var total = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i].hybrid) {
            total++;
        }
    }
    return total / array.length;
}

/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: undefined,
    avgMpgByYearAndHybrid: undefined
};

function getMakerHybrids(array) {
    var hybridArray = [];
    var loc = 0;
    for (let i=0; i < array.length; i++) {
        if (array[i].hybrid) {
            hybridArray[loc] = {
                make: array[i].make,
                id: array[i].id,
            };
            loc++;
        }
    }
    var hybridsAvail = [];
    var len = hybridArray.length
    loc = 0;
    while (len > 0) {
        var make = hybridArray[0].make;
        hybridsAvail[loc] = {
            make: make,
            hybrids: [],
            total: 0,
        };
        var location = 0;
        for (let i =0; i < len; i++) {
            if (hybridArray[i].make === make) {
                hybridsAvail[loc].hybrids[location] = hybridArray[i].id;
                location++;
                hybridArray.splice(i, 1);
                i--;
                len--;
            }
        }
        hybridsAvail[loc].total = hybridsAvail[loc].hybrids.length;
        loc++;
    }
    var final = [];
    var length = hybridsAvail.length;
    loc = 0;
    while (length > 0) {
        var max = 0;
        var index = -1;
        for (let i = 0; i < length; i++) {
            if (hybridsAvail[i].total > max) {
                max = hybridsAvail[i].total;
                index = i;
            }
        }
        final[loc] = {
            make: hybridsAvail[index].make,
            hybrids: hybridsAvail[index].hybrids,
        };
        length--;
        loc++;
        hybridsAvail.splice(index, 1);
    }
    return final;
}
