import { Canvas } from "@react-three/fiber";
import {
  Shiba_Basic_1,
  Shiba_Spot_2,
  Shiba_Robo_3,
  Shiba_Komainu_4,
  Shiba_Constellation_5,
  Shiba_Pyjama_6,
  Shiba_Blue_7,
  Shiba_Deadpool_8,
  Shiba_Bodyguard_9,
  Shiba_Paint_10,
  Shiba_Black_11,
  Shiba_Hippie_12,
  Shiba_Mars_13,
  Shiba_HarryPotter_14,
  Shiba_House_15,
} from "../user/index";

function ThreeScene({ name, level }: any) {
  return (
    <Canvas camera={{ zoom: 15, position: [0, 0, 2] }}>
      <ambientLight />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-3, -3, 2]} />
      {level === 1 && <Shiba_Basic_1 position={[0, 0, 0]} />}
      {level === 2 && <Shiba_Spot_2 position={[0, 0, 0]} />}
      {level === 3 && <Shiba_Robo_3 position={[0, 0, 0]} />}
      {level === 4 && <Shiba_Komainu_4 position={[0, 0, 0]} />}
      {level === 5 && <Shiba_Constellation_5 position={[0, 0, 0]} />}
      {level === 6 && <Shiba_Pyjama_6 position={[0, 0, 0]} />}
      {level === 7 && <Shiba_Blue_7 position={[0, 0, 0]} />}
      {level === 8 && <Shiba_Deadpool_8 position={[0, 0, 0]} />}
      {level === 9 && <Shiba_Bodyguard_9 position={[0, 0, 0]} />}
      {level === 10 && <Shiba_Paint_10 position={[0, 0, 0]} />}
      {level === 11 && <Shiba_Black_11 position={[0, 0, 0]} />}
      {level === 12 && <Shiba_Hippie_12 position={[0, 0, 0]} />}
      {level === 13 && <Shiba_Mars_13 position={[0, 0, 0]} />}
      {level === 14 && <Shiba_HarryPotter_14 position={[0, 0, 0]} />}
      {level === 15 && <Shiba_House_15 position={[0, 0, 0]} />}

      {/* <ContactShadows position={[0, -0.3, 0]} blur={2.5} scale={20} far={20} /> */}
    </Canvas>
  );
}

function Threejs({ name, level }: any) {
  console.log(name, level);
  return (
    <div>
      <ThreeScene name={name} level={level} />
    </div>
  );
}

export default Threejs;
