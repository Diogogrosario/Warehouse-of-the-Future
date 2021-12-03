import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useState, FC } from "react";


interface WarehouseStructureProps {
  w: number,
  l: number,
  h: number
}

const WarehouseStructure: FC<WarehouseStructureProps> = ({ w, l, h }) => {
  return (
    <mesh>
        <planeGeometry args={[w, l]} />
        {/* <meshStandardMaterial color={hovered ? "pink" : "blue"} /> */}
    </mesh>
  );
};

export default WarehouseStructure;
