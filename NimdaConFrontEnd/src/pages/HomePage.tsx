import React from 'react';
import styled from "styled-components";

const HomePage: React.FC = () => {
  return (
    <PageContainer>
      <h1>Home Page</h1>
    </PageContainer>
  )
}

export default HomePage

const PageContainer = styled.div`
  background-color: #cb8484ff;
`;