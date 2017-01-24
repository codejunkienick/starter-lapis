// @flow
import React, { Component } from 'react';
import {
  Autosuggest,
} from 'components';
import styles from './Fields.css';
import { getFieldClassname } from 'utils/selectors';

type FieldProps = {
  className: string;
  errorClassName: string;
  disabled?: boolean;
  input: Object,
  type: string;
  placeholder: string,
  meta: {
    error?: string;
    touched: boolean;
  };
  fieldsetProps: {
    leftLabel?: string;
    comment?: string;
    label?: string;
  }
}

type SelectFieldProps = FieldProps & {
  options: Array<Object>;
}

export DropzoneField from './DropzoneField';
export InputField from './InputField';

export class SuggestField extends Component {
  input: Object; // TODO: HTMLDOMNODE
  constructor(props: FieldProps) {
    super(props);
  }
  render() {
    const {
      multiline,
      onChange,
      isSlimSuggest,
      className,
      errorClassName,
      disabledClassName,
      fieldsetProps,
      disabled,
      input,
      placeholder,
      label,
      type,
      meta: { error, touched }
    } = this.props;
    const classNames: InputClassNames = {
      normal: (className) ? className : styles.input,
      error: (errorClassName) ? errorClassName : styles['input--error'],
      disabled: (disabledClassName) ? disabledClassName : styles['input--disabled']
    };
    const SuggestComponent = (multiline) ? Autosuggest.AsyncTextarea : Autosuggest.Async;
    const customOnChange = (event) => {
      input.onChange(event);
      if (this.props.onChange) onChange(event);
    }
    return (
      <SuggestComponent
        type={type} ref={c => this.input = c}
        input={{
          className: getFieldClassname(classNames, (error || verificationError), touched, disabled),
          placeholder,
          disabled,
          ...input,
          onChange: customOnChange,
        }}
        onChange={onChange}
        isSlim={isSlimSuggest}
      />
    );
  }
}


