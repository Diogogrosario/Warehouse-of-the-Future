import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import React, { Component } from "react";

import Cube from "./Cube";
import WarehouseStructure from "./WarehouseStructure";

interface WarehouseRendererProps {
    title: string;
    subtitle?: string;
}
  
  class WarehouseRenderer extends Component<WarehouseRendererProps> {
    render(): JSX.Element {
        const { title, subtitle } = this.props;
        return (
            <Canvas
                style={{ height: "90vh" }}
                camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 5] }}
                resize={{ scroll: true, debounce: { scroll: 50, resize: 0 } }}
            >
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />

                <WarehouseStructure w={20} l={20} h={10} />

                {/* <Cube /> */}
            </Canvas>
        );
    }
}
  
export default WarehouseRenderer;