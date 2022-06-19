import { useEffect, useState } from 'react';
import { PointerLockControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

const Controller = () => {
  const [moveFordward, setMoveFordward] = useState(false);

  useFrame(({ camera }) => {
    // calculate camera movement with arrows
    if (moveFordward) {
      const direction = new Vector3();
      camera.getWorldDirection(direction);
      camera.position.addScaledVector(
        new Vector3(direction.x, 0, direction.z),
        0.1
      );
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'w') {
        setMoveFordward(true);
      }
    };
    const handleKeyUp = (e) => {
      if (e.key === 'w') {
        setMoveFordward(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
  }, []);

  return <PointerLockControls />;
};

export default Controller;
