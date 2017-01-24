import isURL from 'validator/lib/isURL';

const isEmpty = value => value === undefined || value === null || value === '';
const join = rules => (value, data) => rules
  .map(rule => rule(value, data))
  .filter(error => !!error)[0];

export function email(value) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (
    !isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ) {
    return '\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u0430\u0434\u0440\u0435\u0441';
  }
}
export function password(value) {
  if (isEmpty(value)) return;
  if (value.length < 6) {
    return '\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043A\u043E\u0440\u043E\u0442\u043A\u0438\u0439 \u043F\u0430\u0440\u043E\u043B\u044C';
  } else if (value.length > 50) {
    return '\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0434\u043B\u0438\u043D\u043D\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C';
  } else if (value.search(/\d/) == -1) {
    return '\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043F\u0440\u043E\u0441\u0442\u043E\u0439 \u043F\u0430\u0440\u043E\u043B\u044C';
  } else if (value.search(/[a-zA-Z]/) == -1) {
    return '\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043F\u0440\u043E\u0441\u0442\u043E\u0439 \u043F\u0430\u0440\u043E\u043B\u044C';
  } else if (value.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+\-]/) != -1) {
    return '\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0435 \u0441\u0438\u043C\u0432\u043E\u043B\u044B \u0432 \u043F\u0430\u0440\u043E\u043B\u0435';
  }
}
export function required(value) {
  if (isEmpty(value)) {
    return '\u041F\u043E\u043B\u0435 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E \u043A \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044E';
  }
}
export function phone(value, masked = true) {
  if (isEmpty(value))
    return '\u041F\u043E\u043B\u0435 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E \u043A \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044E';
  const onlyNums = value.replace(/[^\d]/g, '');
  if (isEmpty(onlyNums))
    return '\u041F\u043E\u043B\u0435 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E \u043A \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044E';
  if (onlyNums.length < 7) {
    return '\u0422\u0435\u043B\u0435\u0444\u043E\u043D \u0432\u0432\u0435\u0434\u0435\u043D \u043D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u043E';
  }
}
export function fio(value) {
  if (isEmpty(value)) return;
  const nameParts = value.trim().split(' ');
  if (nameParts.length < 2)
    return '\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0424\u0418\u041E';
}
export function minLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`;
    }
  };
}
export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
  };
}
export function integer(value) {
  if (!Number.isInteger(Number(value))) {
    return 'Must be an integer';
  }
}
export function oneOf(enumeration) {
  return value => {
    if (!~enumeration.indexOf(value)) {
      return `Must be one of: ${enumeration.join(', ')}`;
    }
  };
}
export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'Do not match';
      }
    }
  };
}
export function url(url) {
  if (!isURL(url + '')) {
    return '\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0439 URL';
  }
}
