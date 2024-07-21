export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isLoading?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const defaultClasses = `
    min-w-[100px]
  `;

const Button: React.FC<ButtonProps> = ({
  text,
  isLoading,
  className,
  children,
  ...props
}) => (
  <button type="button" className={className ?? defaultClasses} {...props}>
    {isLoading ? (
      <span className="loading loading-spinner"></span>
    ) : (
      children ?? text
    )}
  </button>
);

export default Button;
