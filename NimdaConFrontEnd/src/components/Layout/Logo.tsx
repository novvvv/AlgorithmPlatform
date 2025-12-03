import { Link } from "react-router-dom";
import styled from "styled-components";

const Logo: React.FC = () => {
  return (
    <LogoContainer>
      <LogoText to="/">NIMDA CON</LogoText>
    </LogoContainer>
  );
};

export default Logo;

const LogoContainer = styled.div`
  height: 100%;
  width: var(--sidebar-width);
  background-color: #4b5563;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  flex-shrink: 0;
`;

const LogoText = styled(Link)`
  color: #ffffff;
  font-weight: 700;
  font-size: 1.25rem;
  text-decoration: none;

  &:hover {
    opacity: 0.9;
  }
`;
