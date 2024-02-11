import styled, { createGlobalStyle } from "styled-components";

export default function Home() {

    return (
        <>
            <GlobalStyle />
            <Main>
                <h3>For instructions visit <a href="https://github.com/hotsno/status-svg">https://github.com/hotsno/status-svg</a></h3>
            </Main>
        </>
    );
}

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgb(64 68 78);
    border-radius: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgb(24 28 39);
  }

  h3 {
    color: white;
    font-family: Helvetica, Sans-Serif;
  }
`;

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    max-width: 100vw;
    min-height: 100vh;
    background: #010103;
    background-size: cover;
`;
