import React, { Component } from 'react';
import styles from './Fields.css';
import { Fieldset } from 'components';
import { getFieldClassname } from 'utils/selectors';

export default class InputField extends Component {
  input: Object;
  // TODO: HTMLDOMNODE
  constructor(props: FieldProps) {
    super(props);
  }
  render() {
    const {
      iconLeft,
      iconRight,
      style,
      className,
      errorClassName,
      disabledClassName,
      handleUnlock,
      fieldsetProps,
      disabled,
      input,
      placeholder,
      wrapperClassName,
      label,
      type,
      meta = {},
    } = this.props;
    const { error, touched } = this.props;

    const classNames: Object = {
      normal: className ? className : styles.input,
      error: errorClassName ? errorClassName : styles['input--error'],
      disabled: disabledClassName
        ? disabledClassName
        : styles['input--disabled'],
    };

    const padding = {};
    if (iconLeft) padding.paddingLeft = 39;
    if (iconRight) padding.paddingRight = 39;
    return (
      <Fieldset {...fieldsetProps} error={error} touched={touched}>
        <div className={wrapperClassName}>
          {
            iconLeft &&
              <i className={styles[iconLeft + '-icon']} style={{ left: 12 }} />
          }
          <input
            className={getFieldClassname(classNames, error, touched, disabled)}
            style={{ ...style, ...padding }}
            {...input}
            ref={c => this.input = c}
            disabled={disabled}
            type={type}
            placeholder={placeholder}
          />
          {
            iconRight &&
              <i className={styles[iconRight + '-icon']} style={{ right: 5 }} />
          }
          {
            disabled &&
              handleUnlock &&
              (
                <button
                  onClick={handleUnlock}
                  className={styles['pencil-edit']}
                  type="button"
                />
              )
          }
        </div>
      </Fieldset>
    );
  }
}
