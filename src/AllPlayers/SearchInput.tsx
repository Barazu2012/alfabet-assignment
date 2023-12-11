import Input from '@mui/joy/Input';
import styled from 'styled-components';

interface Props {
  value: string;
  onChange(text: string): void;
  placeholder: string;
}

export default function SearchInput({
  onChange,
  value,
  placeholder,
}: Readonly<Props>) {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.target.value);
  };
  return (
    <Root
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      variant="outlined"
      color="primary"
    />
  );
}

const Root = styled(Input)``;

SearchInput.styled = Root;
