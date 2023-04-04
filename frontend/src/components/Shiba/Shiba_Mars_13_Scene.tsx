/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 scene.gltf -t
Author: lulu9green (https://sketchfab.com/lulu9green)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/mars-mission-specialist-nugget-d65c0d7241fb4315ba15de17a84f8b36
Title: Mars Mission Specialist Nugget
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
    Object_6: THREE.Mesh;
    Object_9: THREE.Mesh;
    Object_12: THREE.Mesh;
  };
  materials: {
    ["Material.001"]: THREE.MeshStandardMaterial;
    ["default"]: THREE.MeshPhysicalMaterial;
  };
};

export function Shiba_Mars_13(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/ec2/model/Shiba_Mars_13/scene.gltf"
  ) as GLTFResult;
  return (
    <group {...props} dispose={null} scale={0.25}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.36}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <mesh
              geometry={nodes.Object_6.geometry}
              material={materials["Material.001"]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
            <mesh
              geometry={nodes.Object_9.geometry}
              material={materials["default"]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
            <mesh
              geometry={nodes.Object_12.geometry}
              material={materials["default"]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
            <Controls />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/ec2/model/Shiba_Mars_13/scene.gltf");
