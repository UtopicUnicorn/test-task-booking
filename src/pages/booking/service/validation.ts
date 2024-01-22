import React from 'react';

export default {
  emailValidation(value: string) {
    return /\S+@\S+\.\S+/.test(value);
  },
  phoneNumberValidation(value: string) {
    return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(value);
  },
  nameValidation(value: string) {
    return value !== '';
  },
  phoneInput(e: React.ChangeEvent<HTMLInputElement>) {
    let inputNumber = getInputNumberValue(e.target.value);
    const selectionStart = e.target.selectionStart;

    let formattedValue = '';
    if (!inputNumber) return '';
    if (e.target.value.length != selectionStart) {
      if (e.target.value && /\D/g.test(e.target.value)) {
        e.target.value = inputNumber;
      }
      return;
    }
    if (['7', '8', '9'].indexOf(inputNumber[0]) > -1) {
      if (inputNumber[0] == '9') inputNumber = '7' + inputNumber;
      const firstSymbols = inputNumber[0] == '8' ? '8' : '+7';
      formattedValue = e.target.value = firstSymbols + ' ';
      if (inputNumber.length > 1) {
        formattedValue += '(' + inputNumber.substring(1, 4);
      }
      if (inputNumber.length >= 5) {
        formattedValue += ') ' + inputNumber.substring(4, 7);
      }
      if (inputNumber.length >= 8) {
        formattedValue += '-' + inputNumber.substring(7, 9);
      }
      if (inputNumber.length >= 10) {
        formattedValue += '-' + inputNumber.substring(9, 11);
      }
    } else {
      formattedValue = '+' + inputNumber.substring(0, 16);
    }
    return formattedValue;
  }
};

function getInputNumberValue(input: string) {
  return input.replace(/\D/g, '');
}
