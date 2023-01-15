import React from 'react';

interface Itest {
  name: string;
  surname: string;
}

function App(x: Itest) {
  return (
    <div className="App">
      <header className="App-header">
        <p>{x.name}</p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
