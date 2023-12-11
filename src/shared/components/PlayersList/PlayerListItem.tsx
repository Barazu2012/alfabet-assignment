import styled from 'styled-components';
import Player from '../../entities/Player';
import Checkbox from '@mui/joy/Checkbox';

interface Props {
  player: Player;
  checked: boolean;
  onCheckboxChange(player: Player): void;
}

export default function PlayerListItem({
  player,
  checked,
  onCheckboxChange,
}: Readonly<Props>) {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = () => {
    onCheckboxChange(player);
  };

  return (
    <Root>
      <Checkbox checked={checked} onChange={onChange} />
      <Name>{player.fullName}</Name>
    </Root>
  );
}

const Name = styled.span``;

const Root = styled.div`
  display: flex;
  align-items: center;
  ${Name} {
    margin-left: 8px;
  }
`;

PlayerListItem.styled = Root;
