/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 scene.gltf -t
Author: Michal (https://sketchfab.com/Michal_K)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/black-shiba-fde824c094ee4620ab482a6f4a6a3afc
Title: Black shiba
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
    Group18985_Material003_0: THREE.Mesh;
    Box002_Material004_0: THREE.Mesh;
    Object001_default_0: THREE.Mesh;
    Box002001_Material002_0: THREE.Mesh;
  };
  materials: {
    ["Material.003"]: THREE.MeshStandardMaterial;
    ["Material.004"]: THREE.MeshStandardMaterial;
    ["default"]: THREE.MeshStandardMaterial;
    ["Material.002"]: THREE.MeshStandardMaterial;
  };
};

export function Shiba_Spot_2(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/model/Shiba_Spot_2/scene.gltf"
  ) as GLTFResult;
  return (
    <group {...props} dispose={null} scale={0.001}>
      <mesh
        geometry={nodes.Group18985_Material003_0.geometry}
        material={materials["Material.003"]}
        position={[0, 91.45, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={87.79}
      />
      <mesh
        geometry={nodes.Box002_Material004_0.geometry}
        material={materials["Material.004"]}
        position={[0, 91.45, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={87.79}
      />
      <mesh
        geometry={nodes.Object001_default_0.geometry}
        material={materials["default"]}
        position={[0, 91.45, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={87.79}
      />
      <mesh
        geometry={nodes.Box002001_Material002_0.geometry}
        material={materials["Material.002"]}
        position={[0, 91.45, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={87.79}
      />
      <Controls />
    </group>
  );
}

useGLTF.preload("/model/Shiba_Spot_2/scene.gltf");
