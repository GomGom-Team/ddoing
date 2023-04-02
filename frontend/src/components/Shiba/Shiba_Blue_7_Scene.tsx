/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 scene.gltf -t
Author: angieb1970 (https://sketchfab.com/angieb1970)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/texture-challenge-shiba-inu-41b4a99df847460ca4bd6e7f06500113
Title: Texture Challenge Shiba Inu
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useThree } from "@react-three/fiber";

function Controls() {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  return <OrbitControls args={[camera, domElement]} />;
}

type GLTFResult = GLTF & {
  nodes: {
    ["3DGeom-1_lambert2_0"]: THREE.Mesh;
    ["3DGeom-2_lambert2_0"]: THREE.Mesh;
    ["3DGeom-3_lambert2_0"]: THREE.Mesh;
  };
  materials: {
    lambert2: THREE.MeshStandardMaterial;
  };
};

export function Shiba_Blue_7(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/model/Shiba_Blue_7/scene.gltf"
  ) as GLTFResult;
  return (
    <group {...props} dispose={null} scale={0.001}>
      <group scale={100}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <mesh
              geometry={nodes["3DGeom-1_lambert2_0"].geometry}
              material={materials.lambert2}
              rotation={[-Math.PI / 2, 0, 0]}
            />
            <mesh
              geometry={nodes["3DGeom-2_lambert2_0"].geometry}
              material={materials.lambert2}
              rotation={[-Math.PI / 2, 0, 0]}
            />
            <mesh
              geometry={nodes["3DGeom-3_lambert2_0"].geometry}
              material={materials.lambert2}
              rotation={[-Math.PI / 2, 0, 0]}
            />
            <Controls />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/model/Shiba_Blue_7/scene.gltf");
