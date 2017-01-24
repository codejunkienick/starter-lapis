export phone from './phone';
export nameInitials from './nameInitials';
export userCompanyToDadata from './userCompanyToDadata';

export const phoneCode = (value: string): string => {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\d]/g, '');
  return `${onlyNums.slice(0, 4)}`;
};

export const toTitleCase = function (value) {
  let i,
    j,
    str,
    lowers,
    uppers;
  if (!value) return '';
  str = value.replace(/[\wА-ЯЁ]+/g, (txt) => {
    if (!txt) return '';
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

  // Certain minor words should be left lowercase unless
  // they are the first or last words in the string
  lowers = ['Улица', 'Дом', 'Город', 'Ул.', 'Д.', 'Г.', 'Гор.', 'Строение', 'Комната', 'Помещение'];
  for (i = 0, j = lowers.length; i < j; i++) {
    str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'), (txt) => txt.toLowerCase());
  }
  const punctuation = lowers.map(val => val.toLowerCase());

  for (i = 0, j = punctuation.length; i < j; i++) {
    str = str.replace(new RegExp('(?!\\,\\s' + punctuation[i] + '\\s)' + '([\\w|А-ЯЁа-яё])(\\s' + punctuation[i] + '\\s)', 'g'), (a, letter, word) => {
      console.log(a, letter, word);
      return letter + ',' + word;
    });
  }

  // Certain words such as initialisms or acronyms should be left uppercase
  uppers = ['Id', 'Tv'];
  for (i = 0, j = uppers.length; i < j; i++) {
    str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'),
      uppers[i].toUpperCase());
  }

  return str;
};

export const bankAccount = function (value: string) {
  return value.replace(/(.{4})/g, '$1 ');
};

export replaceQuotes from './replaceQuotes';
