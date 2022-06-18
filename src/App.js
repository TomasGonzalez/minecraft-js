import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

import Block from './3d-components/Block';

import './App.scss';
import { grassBlock } from './contants/blocks';

const floor = new Array(10).fill(grassBlock);

function App() {
  return (
    <Canvas style={{ position: 'absolute', height: '100%', width: '100%' }}>
      <PerspectiveCamera />
      <OrbitControls />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {floor.map((blockType, x) => (
        <group key={`${x}`}>
          {floor.map((blockType1, y) => (
            <Block key={`${x}-${y}`} faces={blockType} position={[x, 0, y]} />
          ))}
        </group>
      ))}
    </Canvas>
  );
}

export default App;
