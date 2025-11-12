import styled from "styled-components";

interface InputProps {
  placeholder?: string;
  name?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  placeholder,
  name,
  type = "text",
  value,
  onChange,
}: InputProps) => {
  return (
    <InputStyled
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

const InputStyled = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  background-color: #ffffff;
  border-radius: 0.375rem;
  outline: none;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;
