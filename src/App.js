import React from 'react';
import { ReactFlowProvider } from 'react-flow-renderer';
import Canvas from './components/canvas/Canvas';

function App() {
  return (
    <ReactFlowProvider>
      <div className="App">
        <Canvas/>
      </div>
    </ReactFlowProvider>
  );
}

export default App;
