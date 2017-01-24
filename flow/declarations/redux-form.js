declare module 'redux-form' {
  declare export type InputProps = {
    checked?: boolean,
    name: string,
    value: any,
    onBlur: Function,
    onChange: Function,
    onDragStart: Function,
    onDrop: Function,
  }

  declare export type MetaProps = {
    active: boolean,
    autofilled: boolean,
    asyncValidating: boolean,
    dirty: boolean,
    dispatch: Function,
    error?: string,
    invalid: boolean,
    pristine: boolean,
    submitting: boolean,
    touched: boolean,
    valid: boolean,
    visited: boolean,
  }

  declare type FieldInputProps = {
    input: InputProps,
    meta: MetaProps,
  }

  declare type FunctionComponent<P> = (props: P) => ?React$Element<any>;
  declare type ClassComponent<D, P, S> = Class<React$Component<D, P, S>>;
  declare type Component<P> = FunctionComponent<P> | ClassComponent<void, P, any>

  declare type FieldProps<P> = {
    name: string,
		placeholder?: ?string,
		label?: string,
    value?: ?(string | boolean),
    component: ClassComponent<void, P, void> | FunctionComponent<P> | string
  } & $Diff<P, FieldInputProps>

  declare type RegisteredField<T> = {
    name: $Keys<T>,
    type: string,
  }

  declare export type FormState<T> = {
    values: T,
    initial: T,
    registeredFields: Array<RegisteredField<T>>,
  }

  declare type FormConfig = {
    form?: string,
    alwaysAsyncValidate?: boolean,
    asyncBlurFields?: Array<string>,
    asyncValidate?: (values: Object, dispatch: Function, props: Object) => Promise<void>,
    destroyOnUnmount?: boolean,
    formKey?: string,
    getFormState?: (state: Object, reduxMountPoint: string) => mixed,
    initialValues?: { [field: string]: mixed },
    onSubmit?: Function,
    onSubmitFail?: Function,
    onSubmitSuccess?: Function,
    verwriteOnInitialValuesChange?: boolean,
    propNamespace?: string,
    readonly?: boolean,
    reduxMountPoint?: String,
    returnRejectedSubmitPromise?: boolean,
    touchOnBlur?: boolean,
    touchOnChange?: boolean,
    validate?: (values:Object, props:Object) => Object,
  }

  declare type FormComponentProps = {
    // State:
    asyncValidating: boolean,   // true if async validation is running
    dirty: boolean,             // true if any values are different from initialValues
    error: any,                 // form-wide error from '_error' key in validation result
    warning: any,               // form-wide warning from '_warning' key in validation result
    invalid: boolean,           // true if there are any validation errors
    initialized: boolean,       // true if the form has been initialized
    pristine: boolean,          // true if the values are the same as initialValues
    submitting: boolean,        // true if the form is in the process of being submitted
    submitFailed: boolean,      // true if the form was submitted and failed for any reason
    submitSucceeded: boolean,   // true if the form was successfully submitted
    valid: boolean,             // true if there are no validation errors
    // Actions:
    array: {
      insert: Function,          // function to insert a value into an array field
      move: Function,            // function to move a value within an array field
      pop: Function,             // function to pop a value off of an array field
      push: Function,            // function to push a value onto an array field
      remove: Function,          // function to remove a value from an array field
      removeAll: Function,       // function to remove all the values from an array field
      shift: Function,           // function to shift a value out of an array field
      splice: Function,          // function to splice a value into an array field
      swap: Function,            // function to swap values in an array field
    },
    asyncValidate: Function,     // function to trigger async validation
    blur: Function,              // action to mark a field as blurred
    change: Function,            // action to change the value of a field
    destroy: Function,           // action to destroy the form's data in Redux
    dispatch: Function,          // the Redux dispatch action
    handleSubmit: Function,      // function to submit the form
    initialize: Function,        // action to initialize form data
    reset: Function,             // action to reset the form data to previously initialized values
    touch: Function,             // action to mark fields as touched
    untouch: Function,           // action to mark fields as untouched
  };

  declare export class Field<P> extends React$Component<void, FieldProps<P>, void> {}
  declare export function reducer(state: any, action: Object): any;
  declare export function reduxForm<P>(config: FormConfig):
    (component: Component<P>) => FunctionComponent<$Diff<P, FormComponentProps>>
}
