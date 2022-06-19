import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Raycaster, Vector3 } from 'three';

import useGenerateWorld from '../hooks/useGenerateWorld';
import Block from '../3d-components/Block';
import { grassBlock } from '../contants/blocks';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';

const GeneratedWorld = () => {
  const groupRef = useRef();
  const world = useGenerateWorld();

  useEffect(() => {
    new BufferGeometryUtils.mergeBufferGeometries(
      groupRef.current.children.map((mesh) => mesh.geometry)
    );
  }, [groupRef]);

  useFrame(({ camera }) => {
    const raycaster = new Raycaster();
    raycaster.set(camera.position, new Vector3(0, -1, 0));
    const hitBlock = raycaster.intersectObjects(groupRef.current.children);
    if (
      camera.position.y !== hitBlock[0]?.object?.position.y + 3 &&
      hitBlock[0]
    ) {
      camera.position.setY(hitBlock[0]?.object?.position?.y + 3);
    }
  }, []);

  return (
    <group ref={groupRef}>
      {world.map((_rows, x) =>
        _rows.map((z, y) => {
          return (
            <Block
              key={`${x}${y}${z}`}
              faces={grassBlock}
              position={[x, z, y]}
            />
          );
        })
      )}
    </group>
  );
};

export default GeneratedWorld;
