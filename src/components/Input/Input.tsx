import { type InputHTMLAttributes } from 'react';
import {
  type FieldError,
  type FieldErrors,
  type FieldValues,
  type Path,
  type UseFormRegister,
} from 'react-hook-form';

export interface Props<T extends FieldValues = FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
  wrapperClassName?: string;
  disabled?: boolean;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
}

const Input = <T extends FieldValues>({
  disabled = false,
  placeholder,
  errors,
  label,
  name,
  register,
  labelClassName = 'text-white/70',
  inputClassName = '',
  wrapperClassName = 'w-full form-control',
  ...rest
}: Props<T>) => {
  const error = errors?.[name];

  return (
    <div className={wrapperClassName}>
      {label && (
        <label className="label" htmlFor={name}>
          <span className={`label-text ${labelClassName}`}>{label}</span>
        </label>
      )}
      <input
        id={name}
        className={`input w-full input-bordered border-gray-500 input-ghost text-white focus:bg-transparent focus:text-white ${inputClassName} ${
          error ? 'input-error border-error' : 'focus:outline-white'
        }`}
        placeholder={placeholder}
        disabled={disabled}
        {...register(name)}
        {...rest}
      />
      {error && (
        <div className="label">
          <span className="text-xs text-error">
            {(error as FieldError).message}
          </span>
        </div>
      )}
    </div>
  );
};

export default Input;
