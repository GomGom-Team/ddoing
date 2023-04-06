import React, { useState, useEffect } from "react";
import { ContactShadows, Float } from "@react-three/drei";
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
} from "./index";

function ThreeScene({ name, level }: any) {
  const [bgColor, setBgColor] = useState("white");

  useEffect(() => {
    if (level === 1) setBgColor("#cfb893");
    if (level === 2) setBgColor("#c5c5c5");
    if (level === 3) setBgColor("#2e2e2e");
    if (level === 4) setBgColor("#ddce77");
    if (level === 5) setBgColor("#260a41");
    if (level === 6) setBgColor("#63aff7");
    if (level === 7) setBgColor("#28b1e7");
    if (level === 8) setBgColor("#333333");
    if (level === 9) setBgColor("#57cc4c");
    if (level === 10) setBgColor("#eb90eb");
    if (level === 11) setBgColor("#6a8096");
    if (level === 12) setBgColor("#fff894");
    if (level === 13) setBgColor("#000000");
    if (level === 14) setBgColor("#641010");
    if (level === 15) setBgColor("#ffffff");
  }, []);
  return (
    <Canvas
      shadows
      camera={{ zoom: 15, position: [0, 0, 2] }}
      style={{ height: "71vh", background: bgColor }}
    >
      <ambientLight />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-3, -3, 2]} />
      {level === 1 && <Shiba_Basic_1 position={[0, 0.045, 0]} />}
      {level === 2 && <Shiba_Spot_2 position={[0, -0.06, 0]} />}
      {level === 3 && <Shiba_Robo_3 position={[0, -0.055, 0]} />}
      {level === 4 && <Shiba_Komainu_4 position={[0, 0.01, 0]} />}
      {level === 5 && <Shiba_Constellation_5 position={[0, 0.04, 0]} />}
      {level === 6 && <Shiba_Pyjama_6 position={[0, 0.04, 0]} />}
      {level === 7 && <Shiba_Blue_7 position={[0, 0.04, 0]} />}
      {level === 8 && <Shiba_Deadpool_8 position={[0, 0.04, 0]} />}
      {level === 9 && <Shiba_Bodyguard_9 position={[0, 0.04, 0]} />}
      {level === 10 && <Shiba_Paint_10 position={[0, 0.04, 0]} />}
      {level === 11 && <Shiba_Black_11 position={[0, -0.085, 0]} />}
      {level === 12 && <Shiba_Hippie_12 position={[0, -0.06, 0]} />}
      {level === 13 && <Shiba_Mars_13 position={[0, 0.04, 0]} />}
      {level === 14 && <Shiba_HarryPotter_14 position={[0, -0.055, 0]} />}
      {level === 15 && <Shiba_House_15 position={[0, -0.055, 0]} />}
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
