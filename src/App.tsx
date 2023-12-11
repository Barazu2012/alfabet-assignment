import styled from 'styled-components';
import AllPlayers from './AllPlayers';
import FavoritePlayers from './FavoritePlayers';

export default function App() {
  return (
    <Root>
      {/* <span>app</span> */}
      <AllPlayers />
      <FavoritePlayers />
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  height: 100%;
  width: 100%;

  > * {
    flex: 1;
  }
`;
