import { useRef, useEffect } from 'react';
import {
  sRGBEncoding,
  NearestFilter,
  TextureLoader,
  MeshBasicMaterial,
} from 'three';

function Block({ faces, ...props }) {
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
    <mesh ref={mesh} scale={1} {...props}>
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
}

export default Block;
