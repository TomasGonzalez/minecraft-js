import { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import {
  sRGBEncoding,
  NearestFilter,
  TextureLoader,
  MeshBasicMaterial,
} from 'three';

function Block({ faces, ...props }) {
  const { scene } = useThree();
  const mesh = useRef();

  useEffect(() => {
    const loader = new TextureLoader();

    const onLoad = (texture) => {
      texture.minFilter = NearestFilter;
      texture.magFilter = NearestFilter;
      texture.encoding = sRGBEncoding;
    };

    let materials = [
      ...faces.map((face) => {
        const texture = loader.load(require(`../assets/block/${face}`), onLoad);
        return new MeshBasicMaterial({
          map: texture,
        });
      }),
    ];

    mesh.current.material = materials;
  }, []);

  return (
    <mesh
      onClick={(event) => {
        switch (event.button) {
          case 0: // left
            mesh.current.removeFromParent();
            break;
          case 1: // middle
            break;
          case 2: // right
            //todo place block
            break;
          default:
            console.log('wtf');
            break;
        }
      }}
      ref={mesh}
      scale={1}
      {...props}
    >
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
}

export default Block;
