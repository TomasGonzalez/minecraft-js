import { useState } from 'react';
import NoiseMap from 'noise-map';

const WORLD_DIMENSIONS = 30;
const WORLD_HEIGHT = 2;

const generateWorld = () => {
  const canvas = document.createElement('CANVAS');
  canvas.width = WORLD_DIMENSIONS;
  canvas.height = WORLD_DIMENSIONS;
  const generator = new NoiseMap.MapGenerator();
  const heightMap = generator.createMap(WORLD_DIMENSIONS, WORLD_DIMENSIONS, {
    type: 'perlin',
  });

  heightMap.stepValues(WORLD_HEIGHT);
  heightMap.draw(
    canvas.getContext('2d'),
    WORLD_DIMENSIONS,
    WORLD_DIMENSIONS,
    NoiseMap.STYLE.GRAY
  );

  const emptyGeneratedWorld = new Array(WORLD_DIMENSIONS).fill(
    new Array(WORLD_DIMENSIONS).fill(0)
  );

  const generatedWorld = emptyGeneratedWorld.map((_rows, x) =>
    _rows.map((_, y) => {
      return heightMap.get(x, y) * WORLD_HEIGHT;
    })
  );

  return generatedWorld;
};

const useGenerateWorld = () => {
  const [world] = useState(generateWorld());
  return world;
};

export default useGenerateWorld;
