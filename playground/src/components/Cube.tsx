import * as THREE from "three";
import { invalidate, useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";

function Cube(): React.ReactElement {
	const mesh = useRef<THREE.Mesh>();

	const [hovered, hover] = useState<boolean>(false);
	const [clicked, click] = useState<boolean>(false);

	useFrame(() => {
		// if (mesh.current) {
		// 	mesh.current.rotation.x += 0.01;
		// 	mesh.current.rotation.y -= 0.01;
		// }
	});

	return (
		<mesh
			ref={mesh}
			scale={clicked ? 2 : 1}
			onClick={(): void => click(!clicked)}
			onPointerOver={(): void => hover(true)}
			onPointerOut={(): void => hover(false)}
		>
			<boxGeometry args={[1, 2, 1]} />
			<meshStandardMaterial color={hovered ? "pink" : "blue"} />
		</mesh>
	);
}

export default Cube;
