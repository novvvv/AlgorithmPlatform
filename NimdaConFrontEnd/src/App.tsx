import Layout from "@/components/Layout/Layout";
import styled from "styled-components";

function App() {
  return (
    <Layout>
      <AppContainer />
    </Layout>
  );
}

export default App;

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
`;
