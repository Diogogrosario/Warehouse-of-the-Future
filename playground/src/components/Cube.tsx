import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import React, { MouseEvent, useRef, useState } from "react";

function Cube(props : any) : React.ReactElement {
    const mesh = useRef<THREE.Mesh>();

    const [hovered, hover] = useState<boolean>(false);
    const [clicked, click] = useState<boolean>(false);

    useFrame((state, delta) => {
        if (mesh.current) {
            mesh.current.rotation.x += 0.01;
            mesh.current.rotation.y -= 0.01;
        }
    });

    return (
        <mesh
        {...props}
        ref={mesh}
        scale={clicked ? 2 : 1}
        onClick={() : void => click(!clicked)}
        onPointerOver={() : void => hover(true)}
        onPointerOut={() : void => hover(false)}>
        
        <boxGeometry args={[1, 2, 1]} />
        <meshStandardMaterial color={hovered ? "pink" : "blue"} />
        </mesh>
    );
}

export default Cube;