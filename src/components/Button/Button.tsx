// Button.tsx
import { forwardRef } from "react";

interface ButtonOptions {}

type Ref = HTMLButtonElement;

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  ButtonOptions;

const Button = forwardRef<Ref, ButtonProps>((props, ref) => {
  const { type = "button", children, ...rest } = props;
  return (
    <button
      ref={ref}
      className="bg-blue-300 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
      // onClick={handleClickAddAnimal}
      {...rest}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-plus-circle"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
      {children}
    </button>
  );
});

Button.displayName = "Button";
export default Button;
