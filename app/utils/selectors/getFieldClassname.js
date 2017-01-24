type InputClassNames = { error: ?string, disabled: ?string, normal: ?string };

export default function getFieldClass(
  classNames: InputClassNames,
  error,
  touched,
  disabled,
): string {
  if (error && touched && classNames.error) return classNames.error;
  if (disabled && classNames.disabled) return classNames.disabled;
  return classNames.normal ? classNames.normal : '';
}
