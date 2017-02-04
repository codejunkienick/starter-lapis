import isURL from 'validator/lib/isURL';

const isEmpty = value => value === undefined || value === null || value === '';

export function email(value): string {
  // Let's not start a debate on email regex. This is just for an example app!
  if (
    !isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ) {
    return 'Not valid email';
  }
  return null;
}
export function required(value) {
  if (isEmpty(value)) {
    return 'is required';
  }
  return null;
}
export function minLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`;
    }
    return null;
  };
}
export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
    return null;
  };
}
export function integer(value) {
  if (!Number.isInteger(Number(value))) {
    return 'Must be an integer';
  }
  return null;
}
export function oneOf(enumeration) {
  return value => {
    if (!enumeration.indexOf(value)) {
      return `Must be one of: ${enumeration.join(', ')}`;
    }
    return null;
  };
}
export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'Do not match';
      }
    }
    return null;
  };
}
export function url(link) {
  if (!isURL(link + '')) {
    return 'is not valid URL';
  }
  return null;
}
