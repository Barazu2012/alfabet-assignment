import { Button as Btn } from '@mui/joy';
import { useState } from 'react';
import { ChromePicker, ColorChangeHandler } from 'react-color';
import styled from 'styled-components';

interface Props {
  defaultColor: string;
  onChange(color: string): void;
}

export default function ColorPicker({
  defaultColor,
  onChange,
}: Readonly<Props>) {
  const [color, setColor] = useState(defaultColor);
  const [showPicker, setShowPicker] = useState(false);

  const togglePickColor = () => setShowPicker((s) => !s);
  const updateColor: ColorChangeHandler = (c) => setColor(c.hex);
  const handleChange: ColorChangeHandler = (selectedColor) => {
    onChange(selectedColor.hex);
  };

  return (
    <Root>
      <Button onClick={togglePickColor} variant="plain">
        {showPicker ? 'DONE!' : 'PICK COLOR'}
      </Button>
      {showPicker && (
        <PickerComponent
          color={color}
          onChange={updateColor}
          onChangeComplete={handleChange}
        />
      )}
    </Root>
  );
}

const Root = styled.div``;

const Button = styled(Btn)`
  position: absolute !important;
  right: 0;
  top: 0;
  white-space: nowrap;
`;

const PickerComponent = styled(ChromePicker)`
  margin-top: 40px;
`;

ColorPicker.styled = Root;
