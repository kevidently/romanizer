document.getElementById('num_input').onfocus = function () {
    var numIn = document.getElementById('num_input');
    numIn.setAttribute("placeholder", '');
};

document.getElementById('num_input').oninput = function () {
    build_num_output = '';
    var input_val = document.getElementById('num_input').value;
    var converted = main_convert_num(input_val);
    document.getElementById('output').innerHTML = converted;
};


function single_digit(num) {

    var zero_to_nine = {
        0: '',
        1: 'I',
        2: 'II',
        3: 'III',
        4: 'IV',
        5: 'V',
        6: 'VI',
        7: 'VII',
        8: 'VIII',
        9: 'IX'
    };

    return zero_to_nine[num];
}

//NUMS 10 TO 49
function ten_to_49(num) {
    var tmp_array = /[0-9]$/.exec(num);
    var secondDigit = tmp_array[0]; // 2nd digit
    var build_output = '';

    if (num >= 10 && num < 20) {
        build_output += "X";
        build_output += single_digit(secondDigit);
        return build_output;
    } else if (num >= 20 && num < 30) {
        build_output += "XX";
        build_output += single_digit(secondDigit);
        return build_output;
    } else if (num >= 30 && num < 40) {
        build_output += "XXX";
        build_output += single_digit(secondDigit);
        return build_output;
    } else if (num >= 40 && num < 50) {
        build_output += "XL";
        build_output += single_digit(secondDigit);
        return build_output;
    }
}

//NUMS 50 TO 99
function fifty_to_100(num) {
    var tmp_array = /[0-9]$/.exec(num);
    var secondDigit = tmp_array[0]; // 2nd digit
    console.log("second dig is " + secondDigit);
    var build_output = '';
    if (num >= 50 && num < 90) {
        build_output += "L";
        subtracted_50 = num - 50;
        if (subtracted_50 < 10) { // if val less than 10 after subtracting 50
            build_output += single_digit(subtracted_50);
            return build_output;
        } else if (subtracted_50 >= 10 && subtracted_50 < 50) {
            build_output += ten_to_49(subtracted_50);
            return build_output;
        }
    } else if (num >= 90 && num < 100) {
        build_output += "XC";
        build_output += single_digit(secondDigit);
        return build_output;
    }
}

//NUMS 100 to 500
function oneHundred_to_500(num) {
    var tmp_array = /[0-9]{2}$/.exec(num);
    var lastTwoDig = tmp_array[0]; // 2nd digit
//    console.log("lastTwoDig is " + lastTwoDig);
    var build_output = '';

    if (lastTwoDig >= 50) {
        var run_this_func = fifty_to_100;
    } else if (lastTwoDig < 50 && lastTwoDig >= 10) {
        var run_this_func = ten_to_49;
    } else if (lastTwoDig < 10) {
        lastTwoDig = /[0-9]$/.exec(lastTwoDig);
        var run_this_func = single_digit;
    }

    if (num >= 100 && num < 200) {
        build_output += "C";
//        console.log(lastTwoDig);
        build_output += run_this_func(lastTwoDig);
        return build_output;
    } else if (num >= 200 && num < 300) {
        build_output += "CC";
        build_output += run_this_func(lastTwoDig);
        return build_output;
    } else if (num >= 300 && num < 400) {
        build_output += "CCC";
        build_output += run_this_func(lastTwoDig);
        return build_output;
    } else if (num >= 400 && num < 500) {
        build_output += "CD";
        build_output += run_this_func(lastTwoDig);
        return build_output;
    }
    console.log("build_output is " + build_output);
    return build_output;

}



//NUMS 500 to 999
function fiveHundred_to_900(num) {
    var tmp_array = /[0-9]{2}$/.exec(num);
    var lastTwoDig = tmp_array[0]; // 2nd digit
    console.log("lastTwoDig is " + lastTwoDig);
    var build_output = '';

    if (lastTwoDig >= 50) {
        var run_this_func = fifty_to_100;
    } else if (lastTwoDig < 50 && lastTwoDig >= 10) {
        var run_this_func = ten_to_49;
    } else if (lastTwoDig < 10) {
        var run_this_func = single_digit;
    }

    if (num >= 500 && num < 900) {
        build_output += "D";
        subtracted_500 = num - 500;

        if (subtracted_500 < 100) { // subtracted_500 is less than 100
            build_output += run_this_func(subtracted_500);
            return build_output;
        } else if (subtracted_500 >= 100 && subtracted_500 < 500) {
            build_output += oneHundred_to_500(subtracted_500);
            return build_output;
        }
    } else if (num >= 900 && num < 1000) {
        build_output += "CM";
        build_output += run_this_func(lastTwoDig);
        return build_output;
    } 

}



function main_convert_num(num) {
    if (num == '') {
        return "&nbsp;";
    } else if (isNaN(num)) {
        return '<span id="error">error</span>';
    } else {
        if (/^[0-9]$/.test(num)) { // If one digit
            return single_digit(num);
        } else if (/^[0-9]{2}$/.test(num)) { // If two digits
            if (num >= 10 && num < 50) {
                return ten_to_49(num);
            } else if (num >= 50 && num < 100) {
                return fifty_to_100(num);
            }
        } else if (/^[0-9]{3}$/.test(num)) {
            if (num >= 100 && num < 500) { // If three digits
                return oneHundred_to_500(num);
            } else if (num >= 500 && num < 1000) {
                return fiveHundred_to_900(num);
            }
        } else if (/^[0-9]{4,}$/.test(num)) {
            return '<span id="error">error</span>';
        }
    }
}