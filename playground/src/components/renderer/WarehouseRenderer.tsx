import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import React, { Component } from "react";

import Cube from "./Cube";
import WarehouseStructure from "./WarehouseStructure";
import { CameraControls } from "./CameraControls";

interface WarehouseRendererProps {
    title: string;
    subtitle?: string;
}

const enum Input {
    Forward,
    Backward,
    Left,
    Right
}
  
class WarehouseRenderer extends Component<WarehouseRendererProps> {

    map: Map<Input, boolean> = new Map([
        [ Input.Forward, false ],
        [ Input.Backward, false ],
        [ Input.Left, false ],
        [ Input.Right, false ]
    ]);

    processOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        switch (event.key) {
            case "ArrowUp":
            case "w":
            case "W":
                this.map.set(Input.Forward, true);
                break;
            case "ArrowDown":
            case "s":
            case "S":
                this.map.set(Input.Backward, true);
                break;
            case "ArrowLeft":
            case "a":
            case "A":
                this.map.set(Input.Left, true);
                break;
            case "ArrowRight":
            case "d":
            case "D":
                this.map.set(Input.Right, true);
                break;
        }
    };

    processOnKeyUp = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        switch (event.key) {
            case "ArrowUp":
            case "w":
            case "W":
                this.map.set(Input.Forward, false);
                break;
            case "ArrowDown":
            case "s":
            case "S":
                this.map.set(Input.Backward, false);
                break;
            case "ArrowLeft":
            case "a":
            case "A":
                this.map.set(Input.Left, false);
                break;
            case "ArrowRight":
            case "d":
            case "D":
                this.map.set(Input.Right, false);
                break;
        }
    };

    render(): JSX.Element {
        const { title, subtitle } = this.props;
        return (
            <Canvas
                frameloop="demand"

                style={{ height: "90vh" }}
                camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 5] }}
                resize={{ scroll: true, debounce: { scroll: 50, resize: 0 } }}

                onKeyDown={this.processOnKeyDown}
                onKeyUp={this.processOnKeyUp}
            >
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />

                <CameraControls />

                <WarehouseStructure w={20} l={20} h={10} />

                <Cube />
            </Canvas>
        );
    }
}
  
export default WarehouseRenderer;