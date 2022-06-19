import { Canvas } from '@react-three/fiber';
import Controller from './3d-components/Controller';
import GeneratedWorld from './3d-components/GeneratedWorld';
import Cross from './ui-components/Cross';

import './App.scss';

function App() {
  return (
    <>
      <Cross />
      <Canvas
        camera={{ position: [5, 4, 5] }}
        style={{ position: 'absolute', height: '100%', width: '100%' }}
      >
        <Controller />
        <ambientLight />
        <GeneratedWorld />
      </Canvas>
    </>
  );
}

export default App;
