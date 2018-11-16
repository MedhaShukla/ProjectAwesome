import _ from 'lodash';
import moment from 'moment';
import { Platform, Dimensions, Alert, AsyncStorage } from 'react-native';
import { CURRENCY } from '../Constants/global.constants';

let fireToken = null;

/**
 * Returns firebase token for users
 * first checks in local variable, if its undefined, returns from Asyncstorage
 */
export const GetFireToken = async () => {
    if (fireToken) {
        return fireToken;
    }
    fireToken = await AsyncStorage.getItem('FIREBASE_TOKEN');
    return fireToken;
};

/**
 * Calculate Distance Between Two Lat lngg Points
 * @param  {int} lat1
 * @param  {int} lng1
 * @param  {int} lat2
 * @param  {int} lng2
 * @param  {string} unit - either k, or m. where k stands for kilometer and m for miles
 */
export function GetDistanceFromLatLonInKm(lat1, lng1, lat2, lng2, unit) {
    if (!(lat1 && lng1 && lat2 && lng2)) {
        return 0;
    }
    const deg2rad = (degrees) => degrees * (Math.PI / 180);
    const rad2deg = (radians) => radians * (180 / Math.PI);

    theta = lng1 - lng2;
    dist = (Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2))) + (Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta)));
    dist = Math.acos(dist);
    dist = rad2deg(dist);
    miles = dist * 60 * 1.1515;
    Unit = unit.toUpperCase();

    if (Unit == 'K') {
        return (miles * 1.609344);
    } else if (Unit == 'M') {
        return (miles * 1.609344 * 1000);
    }
    return miles;
}

/**
 * function to determine the Fuel Type
 */
export function FuelType(fuelType) {
    return fuelType === 331 ? 'Petrol' : 'Diesel';
}

// /**
//  * function to calculate price from Pricing object
//  */
// export function GetActualPrice(price) {
//     if (price) {
//         if ('weekend' in price && 'weekday' in price && 'caution' in price) {
//             return price.weekend + price.weekday + price.caution;
//         }
//     }
//     return '';
// }


/**
 * helper function to chekc if String contains Number or Not
 */
export function IsNumeric(n) {
    const regex = /^[1-9][0-9]*$/;
    return n.match(regex) !== null;
}

/**
 * to check if first character of String is Capital
 * used in fare breakup 
 */
export function IsFirstCharacterCapital(word) {
    const regex = /^[A-Z]/;
    return regex.test(word);
}

/**
 * to check if first character of String is Small
 * used in fare breakup 
 */
export function IsFirstCharacterSmall(word) {
    const regex = /^[a-z]/;
    return regex.test(word);
}

/**
 * Function to convert date time to readable format eg. 23 May, 10:23 AM
 * @param  {String} date
 */
export function GetDateTimeInReadableFormat(date, ifNoDateMessage) {
    let response = '';
    if (moment(date, 'YYY-MM-DD HH:mm:ss')) {
        response = moment(date, 'YYY-MM-DD HH:mm:ss').format('DD MMM, h:mm A');
    }
    if (response === 'Invalid date') {
        response = ifNoDateMessage;
    }
    return response;
}

/**
 * Function to convert date time to day date time format eg. Mon, Apr 23, 10:23 AM
 * @param  {String} date
 */
export function GetDateTimeInDayDateTimeFormat(date, ifNoDateMessage) {
    let response = '';
    if (moment(date, 'YYY-MM-DD HH:mm:ss')) {
        response = moment(date, 'YYY-MM-DD HH:mm:ss').format('ddd, MMM DD, hh:mm A');
    }
    if (response === 'Invalid date') {
        response = ifNoDateMessage;
    }
    return response;
}



/**
 * Function to Remove attributes in object having null or undefined value
 * @param {Object} params
 */
export function RemoveNullAttributes(params) {
    const result = {};
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            if (params[key] !== null) {
                result[key] = params[key];
            }
        }
    }
    return result;
}

/**
 * Function to convert object to url string
 * @param  {object} obj
 */
export function UrlStringifyObject(obj) {
    if (!obj) {
        return '';
    }
    let returnString = '?';
    for (key in obj) {
        returnString = returnString.concat(`&${key}=${obj[key]}`);
    }
    return returnString;
}

/**
 * Flatd down object
 * @param  {Object} object
 */
export function FlattenObject(object) {
    const toReturn = {};

    for (const i in object) {
        if (!object.hasOwnProperty(i)) {
            continue;
        }

        if ((typeof object[i]) == 'object') {
            const flatObject = FlattenObject(object[i]);
            for (const x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) {
                    continue;
                }
                toReturn[x] = flatObject[x];
            }
        } else {
            toReturn[i] = object[i];
        }
    }
    return toReturn;
}

// /**
//  * Function checks if x is between min and max 
//  * @param  {Number} x
//  * @param  {Number} min
//  * @param  {Number} max
//  */
// export function Between(x, min, max) {
//     return Math.ceil(x) >= Math.ceil(min) && Math.ceil(x) <= Math.ceil(max);
// }

// /**
//  * Function to remove object from Array of Object
//  * @param  {Array} arr array from which we want to remove object
//  * @param  {String} attr name of attribute from which we will distinct objects
//  * @param  {} value value of attribute which we want to remove
//  */
// export function RemoveByAttr(arr, attr, value) {
//     const Arry = Object.assign([], arr);
//     let i = Arry.length;
//     while (i--) {
//         if (Arry[i]
//             && Arry[i].hasOwnProperty(attr)
//             && (arguments.length > 2 && Arry[i][attr] === value)) {
//             Arry.splice(i, 1);
//         }
//     }
//     return Arry;
// }

// /**
//  * Utility function to remove first element of array
//  * @param  {Array} arr
//  */
// export function shift(arr) {
//     if (arr && arr.length > 0) {
//         const len = arr.length;
//         if (len === 1) {
//             return [];
//         }
//         return arr.splice(1, len);
//     }
//     return [];
// }

/**
 * Function uppercases the first characted and appends the rest 
 * @param {*} string 
 */
export function jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Function returns an object with key value pairs using the array
 * @param {*} arr 
 * @param {*} key 
 * @param {*} value 
 */
export function getObject(arr, key, value) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][key] == value) {
            return arr[i];
        }
    }
    return null;
}

/**
 * @param  {} styleObj Object containing style elements
 * Function that takes in style object in various structures
 * and returns a suitable object
 */
export function StyleObjectFilter(styleObj) {
    if (!Array.isArray(styleObj) && styleObj && typeof styleObj == 'object') {
        newStylesObj = { ...{}, ...styleObj };
    } else {
        newStylesObj = styleObj;
    }
    return newStylesObj;
}

/**
 * returns matched option from array against mentioned attribute value(in case of array of objects)
 * or element(in case of plain array)
 * @param  {array} hayStack - array
 * @param  {} needle - value
 * @param  {string} element - attribute name
 * @param  {int} defaultElement - if element not found, returns element of default index
 */
export function SelectFromOptions(hayStack, needle, element, defaultElement) {
    /* eslint-disable */
    defaultElement = defaultElement || 0;
    const isArray = IsUndefinedOrNull(element);
    for (let i in hayStack) {
        if (isArray) {
            if (hayStack[i] == needle)
                return hayStack[i];
        } else {
            if (hayStack[i][element] == needle)
                return hayStack[i];
        }
    }
    const finalElement = hayStack[defaultElement];

    return finalElement || hayStack[0];
    /* eslint-enable */
}

/**
 * return boolean if given variable is undefined or null
 * @param  {} value
 */
export function IsUndefinedOrNull(value) {
    return value == null || value == '';
}

/**
 * return boolean if given variable is undefined only
 * @param  {} value
 */
export function IsUndefined(value) {
    return value == null || value === '';
}

/**
 * Converts object to array
 * @param  {object} obj
 */
export function ObjectToArray(obj) {
    if (!(obj && typeof obj == 'object')) {
        return obj;
    }
    const arr = _.values(obj);
    return arr;
}

/**
 * Moves particular element to last position
 * usage - ride detail page discount is moved to last using this method
 * @param  {Array} arr
 * @param  {string} key
 */
export function MoveToLastPosition(arr, key, keyValue) {
    /* eslint-disable */
    for (let index in arr) {
        if (Object.hasOwnProperty.call(arr[index], key)) {
            arr[index][key] == keyValue ? arr.push(arr.splice(index, 1)[0]) : 0;
        }
    }
    /* eslint-enble */
    return arr;
}

/**
 * Converts array to object
 * @param  {Array} array
 */
export function ArrayToObject(array, key) {
    const obj = {};
    if (!Array.isArray(array)) {
        return {};
    }
    array.forEach((element, index) => {
        if ((element && typeof element == 'object' && element[key])) {
            obj[element[key]] = element;
        }
    });
    return obj;
}

/**
 * Capitalize first letter of the string 
 * ex- aaaaaa is converted to Aaaaaa
 * @param  {string} string
 */
export function CapitalizeFirstLetter(string) {
    if (!(string && typeof string == 'string')) {
        return string;
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// function fixLength(data) {
//     const d = data.length === 1 ? data : `0${data}`;
//     return d;
// }

/**
 * Function to convert price into indian numbering system
 * like 10000 will be 10,000
 * @param  {number} price can be float or integer
 */
export function DisplayPrice(price) {
    let number = price;
    if (IsUndefined(price)) {
        return price;
    }
    if (!isNaN(number)) {
        number = Number(number).toFixed(2);
        if (parseFloat(number) == Math.ceil(number)) {
            number = parseFloat(number);
        }
    }
    if (typeof number == 'number') {
        number = number.toString();
    }
    let afterPoint = '';

    if (number.indexOf('.') > 0) {
        afterPoint = number.substring(number.indexOf('.'), number.length);
    }
    number = Math.floor(number);
    number = number.toString();
    let lastThree = number.substring(number.length - 3);
    const otherNumbers = number.substring(0, number.length - 3);
    if (otherNumbers != '') {
        lastThree = ',' + lastThree;
    }
    if (otherNumbers == undefined || otherNumbers == null) {
        return '';
    }
    let res = String(otherNumbers).replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree + afterPoint;
    return `${CURRENCY} ${res}`;
}
/**
 * @param  {Object} contactDetailObject Contacts object obtained from react-native-contacts
 * Function that checks whether the number exists in the contact object and fetches it
 */
export function ExtractPhoneNumber(contactDetailObject) {
    const phoneNumbers = (contactDetailObject && Array.isArray(contactDetailObject.phoneNumbers) && contactDetailObject.phoneNumbers.length) ? contactDetailObject.phoneNumbers[0] : {};
    return phoneNumbers.number || null;
}

/**
 * Convert Array to Object
 * @param  {array} arr
 */
export function ToObject(arr) {
    let rv = {};
    for (let i = 0; i < arr.length; ++i)
        rv[i] = arr[i];
    return rv;
}

/**
 * Function to detect iphone x
 */
export function IsIphonex() {
    return Platform.OS == 'ios' && Dimensions.get('window').height == 812;
}

/**
 * Skips frame drop and provide smooth ui
 * @param  {function} callback
 */
export function SmoothNavigation(callback) {
    requestAnimationFrame(callback);
}

export function IsProduction() {
    return !__DEV__;
}

/**
 * Function to generate random string of [a-z]
 * @param  {string} length
 */
export function GenerateRandomString(length) {
    let text = "";
    const possible = "abcdefghijklmnopqrstuvwxyz";
    length = length || 0;

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

/**
 * function to convert query string to json
 */
export function QueryStringToJSON(queryString) {
    if (queryString && typeof queryString == 'string') {
        var pairs = queryString.split('&');

        var result = {};
        pairs.forEach(function (pair) {
            pair = pair.split('=');
            result[pair[0]] = decodeURIComponent(pair[1] || '');
        });

        return JSON.parse(JSON.stringify(result));
    }
    return {};
}

/**
 * Compares two version numbers (e.g. "1.7.1" or "1.2b").
 *
 * @param {string} v1 The first version to be compared.
 * @param {string} v2 The second version to be compared.
 * @param {object} [options] Optional flags that affect comparison behavior: {lexicographical, zeroExtend}
 *         lexicographical: true - compares each part of the version strings lexicographically instead of
 *         naturally; this allows suffixes such as "b" or "dev" but will cause "1.10" to be considered smaller than
 *         "1.2".

 *         zeroExtend: true - changes the result if one version string has less parts than the other. In
 *         this case the shorter string will be padded with "zero" parts instead of being considered smaller.

 * @returns {number|NaN}
 *    0 if the versions are equal
 *    a negative integer if v1 < v2
 *    a positive integer if v1 > v2
 *    NaN if either version string is in the wrong format
 */
export function VersionCompare(v1, v2, options) {
    var lexicographical = options && options.lexicographical,
        zeroExtend = options && options.zeroExtend,
        v1parts = v1.split('.'),
        v2parts = v2.split('.');

    function isValidPart(x) {
        return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
    }

    if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
        return NaN;
    }

    if (zeroExtend) {
        while (v1parts.length < v2parts.length) v1parts.push("0");
        while (v2parts.length < v1parts.length) v2parts.push("0");
    }

    if (!lexicographical) {
        v1parts = v1parts.map(Number);
        v2parts = v2parts.map(Number);
    }

    for (var i = 0; i < v1parts.length; ++i) {
        if (v2parts.length == i) {
            return 1;
        }

        if (v1parts[i] == v2parts[i]) {
            continue;
        }
        else if (v1parts[i] > v2parts[i]) {
            return 1;
        }
        else {
            return -1;
        }
    }

    if (v1parts.length != v2parts.length) {
        return -1;
    }

    return 0;
}

/**
 * Function to round off the 'number' to multiple of 'limit'
 * @param  {number} number
 * @param  {number} limit
 */
export function RoundOffToNumber(number, limit) {
    return Math.floor(number / limit) * limit;
}

/**
 * Function to filter mobile number
 * Remove +91, space, and - from mobile number
 * @param  {stirng} mobile
 */
export function FilterMobileNumber(mobile) {
    if (!(mobile && typeof mobile == 'string')) {
        return mobile;
    }

    let newNum = mobile;
    if (newNum == undefined || newNum == null) {
        return '';
    }

    if (!newNum || typeof newNum != 'string') {
        return newNum;
    }
    newNum = newNum.replace(/\s/g, '');
    newNum = newNum.replace(/-/g, '');
    newNum = newNum.replace('+91', '');
    while (newNum.charAt(0) === '0') {
        newNum = newNum.substr(1);
    }
    return newNum;
}

/**
 * Function to extract comma seprated values
 * @param  {Array} arr
 * @param  {String} key
 */
export function ExtractCommaSepratedValues(arr, key = 'id') {
    if (arr && typeof arr == 'object') {
        arr = ObjectToArray(arr);
    }
    if (!(Array.isArray(arr) && typeof key == 'string')) {
        return '';
    }

    const valuesArray = [];
    arr.forEach((item) => {
        valuesArray.push(item[key]);
    })

    return valuesArray.join(',');
}

/**
 * Function to calculate time passed 
 * @param  {String} date
 */
export function TimePassedInReadableFormat(date, ifNoDateMessage) {
    let response = '';
    if (moment(date, 'YYYY-MM-DD HH:mm:ss')) {
        const now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        const totalDurationInMinutes = moment.duration(moment(now).diff(date)).asMinutes().toFixed(0);
        if (totalDurationInMinutes < 1) {
            response = 'less than one min ago';
        } else if (totalDurationInMinutes >= 1 && totalDurationInMinutes < 60) {
            response = totalDurationInMinutes + ' min ago';
        } else if (totalDurationInMinutes >= 60 && totalDurationInMinutes < 1440) {
            response = parseInt(totalDurationInMinutes / 60) + ' hr ago';
        } else if (totalDurationInMinutes >= 1440 && totalDurationInMinutes < 10080) {
            const days = parseInt(totalDurationInMinutes / 1440);
            if (days == 1) {
                response = days + ' day ago';
            } else {
                response = days + ' days ago';
            }
        } else {
            response = moment(date, 'YYY-MM-DD HH:mm:ss').format('DD MMM YY, h:mm A');
        }
    }
    if (response === 'Invalid date') {
        response = ifNoDateMessage;
    }
    return response;
}

/*
 * find a nested object property inside of an object.
 * @param  {array} path
 * @param  {object} obj
 */
export function AccessNestedObject(obj, path, valueNotFound = undefined) {
    if (!((Array.isArray(path) || (typeof path == 'string')) && obj && typeof obj == 'object')) {
        return valueNotFound;
    }

    if (typeof path == 'string') {
        path = path.split('.');
    }

    return path.reduce((xs, x) => (xs && xs[x]) ? xs[x] : valueNotFound, obj)
}

/**
 * Convert JSON to querysting
 * @param  {object} paramsObject
 */
export function JSONToQueryString(paramsObject, encode = true) {
    if (!(paramsObject && typeof paramsObject == 'object')) {
        return;
    }

    let queryStringParts = [];

    Object.keys(paramsObject).forEach((paramKey) => {
        queryStringParts.push(`${paramKey}=${paramsObject[paramKey]}`);
    });

    queryStringParts = queryStringParts.join('&');

    if (encode) {
        queryStringParts = unescape(encodeURIComponent(queryStringParts));
    }

    return queryStringParts;
}

export function TruncateString(string, limit = 25) {
    if (!(string && typeof string == 'string')) {
        return;
    }

    return _.truncate(string, { length: limit });
}

/**
 * Filter object keys
 * @param  {object} obj
 * @param  {string} filter - comma seprated keys
 */
export function FilterObjectKeys(obj, filter) {
    if (!(obj && typeof obj == 'object' && filter && typeof filter == DATA_TYPES.STRING)) {
        return obj;
    }

    const filteredObject = {};
    const keys = filter.split(',');

    keys.forEach((key) => {
        filteredObject[key] = obj[key];
    })

    return filteredObject;
}

/**
 * Filter array of objects by keys
 * @param  {array} array
 * @param  {string} filter - comma seprated keys
 */
export function FilterArrayOfObjectKeys(array, filter) {
    if (!(Array.isArray(array) && filter && typeof filter == DATA_TYPES.STRING)) {
        return array;
    }
    const filteredArray = [];

    array.forEach((item) => {
        filteredArray.push(FilterObjectKeys(item, filter));
    })

    return filteredArray;
}


/*
 * This function returns a filtered array based on key and value parameters
 * @param {array} arr 
 * @param {string} key 
 * @param {*} value 
 */
export function FilterArray(arr, key, value) {
    // Check for valid input
    if (!(Array.isArray(arr) && typeof key == 'string')) {
        return [];
    }
    let filteredArray = [];
    arr.forEach((item) => {
        if (AccessNestedObject(item, key) == value) {
            filteredArray.push(item);
        }
    })
    return filteredArray;
}

/**
 * This function sorts an array of objects based on a key
 * @param {array} arr array of objects
 * @param {string} key the key that is used for sorting
 * @param {boolean} order default true for ascending order and false for descending order 
 */
export function SortArrayOfObjects(arr, key, order = true) {
    compare = (obj1, obj2) => {
        return order ? (obj1[key] < obj2[key] ? -1 : obj1[key] > obj2[key] ? 1 : 0)
            :
            (obj1[key] < obj2[key] ? 1 : obj1[key] > obj2[key] ? -1 : 0)
    }
    const sortedArray = arr.sort(this.compare);
    return sortedArray;
}

