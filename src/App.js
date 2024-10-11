import {useState} from "react";
import styled, {createGlobalStyle, css} from "styled-components";

const GlobalStyles = createGlobalStyle`
    html, body {
        margin: 0;
        padding: 0;
        background-color: #f1f1f1;
    }
    body {
        padding: 20px;
    }
    * {
        box-sizing: border-box;
        font-family: sans-serif;
    }
`;

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
`;

const Button = styled.button`
    background-color: rgba(166, 166, 166, 0.23);
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    border: 0;

    &:hover {
        background-color: rgba(166, 166, 166, 0.49);
    }
`;
const Executor = styled.div`
    min-height: 500px;
    min-width: 300px;
    border: 2px solid #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    @media screen and (max-width: 450px) {
        min-width: 0;
        width: 100%;
    }
`;
const Spinner = styled.div`
    ${props => props.spinning && css`
        animation: spin 2s linear infinite;
    `};

    @keyframes spin {
      from {transform:rotate(0deg);}
      to {transform:rotate(360deg);}
    }
`;

function App() {
  const [ actionA, setActionA ] = useState(null);
  const [ actionB, setActionB ] = useState(null);
  const [ active, setActive ] = useState(false);
  const [ text, setText ] = useState("");
  const [ spinning, setSpinning ] = useState(false);

  const exec = () => {
    setActive(true);
    if (actionA === 1 && actionB === 1) {
      setText("Ну хочет она и хочет, но она же не ищет");
    }
    if (actionA === 2 && actionB === 2) {
      setText("Функция ищет...");
      setTimeout(() => {
        setText("Ну она искала, но не хочет же, поэтому она устала и больше искать не будет");
      }, 3000)
    }
    if (actionA === 1 && actionB === 2) {
      setText("Функция ищет...");
      setTimeout(() => {
        setText("Функция нашла!");
        setTimeout(() => setSpinning(true), 1000);
      }, 3000)
    }
    if (actionB === 1 && actionA === 2) {
      setText("Функция ищет...");
      setTimeout(() => {
        setText("Функция устала");
      }, 3000);
    }
  };

  return (
    <div className="App">
      <GlobalStyles />
      <h2>Функция сначала{actionA === null ? ":" : ` ${actionA === 1 ? "хочет" : "ищет"}`}</h2>
      {actionA === null && (
        <Buttons>
          <Button onClick={() => setActionA(1)}>хочет</Button>
          <Button onClick={() => setActionA(2)}>ищет</Button>
        </Buttons>
      )}
      {actionA !== null && (
        <>
          <h2>Потом функция{actionB === null ? ":" : ` ${actionB === 1 ? "хочет" : "ищет"}`}</h2>
          {actionB === null && (
            <Buttons>
              <Button onClick={() => setActionB(1)}>хочет</Button>
              <Button onClick={() => setActionB(2)}>ищет</Button>
            </Buttons>
          )}
        </>
      )}
      {(actionA !== null && actionB !== null && !active) && (
        <Button onClick={exec}>Выполнить!</Button>
      )}

      {active && (
        <Executor>
          <Spinner spinning={spinning}>{text}</Spinner>
        </Executor>
      )}
    </div>
  );
}

export default App;
