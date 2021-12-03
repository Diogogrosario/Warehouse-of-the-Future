import { Camera, EventDispatcher, Quaternion, Vector3 } from 'three'

const enum Input {
    Forward,
    Backward,
    Left,
    Right
}

class CameraControlsImpl extends EventDispatcher {
    
    public object: Camera
    public domElement: HTMLElement | Document

    private moveVector = new Vector3(0, 0, 0);
    private rotationVector = new Vector3(0, 0, 0);

    constructor(object: Camera, domElement: HTMLElement | Document) {
        super()

        this.object = object;
        this.domElement = domElement;
    
        window.addEventListener('keydown', this.keyDown);
        window.addEventListener('keyup', this.keyUp);
    }

    private inputState = {
        forward: 0,
        backward: 0,
        left: 0,
        right: 0,
    };
    
    private keyDown = (event: KeyboardEvent): void => {
        switch (event.code) {
            case "ArrowUp":
            case "KeyW":
                this.inputState.forward = 1;
                break;
            case "ArrowDown":
            case "KeyS":
                this.inputState.backward = 1;
                break;
            case "ArrowLeft":
            case "KeyA":
                this.inputState.left = 1;
                break;
            case "ArrowRight":
            case "KeyD":
                this.inputState.right = 1;
                break;
        }
    };
    
    private keyUp = (event: KeyboardEvent): void => {
        switch (event.code) {
            case "ArrowUp":
            case "KeyW":
                this.inputState.forward = 0;
                break;
            case "ArrowDown":
            case "KeyS":
                this.inputState.backward = 0;
                break;
            case "ArrowLeft":
            case "KeyA":
                this.inputState.left = 0;
                break;
            case "ArrowRight":
            case "KeyD":
                this.inputState.right = 0;
                break;
        }
    };

    
    private lastQuaternion = new Quaternion()
    private lastPosition = new Vector3()
    
    update() {
    }


    public dispose = (): void => {
        window.removeEventListener('keydown', this.keyDown);
        window.removeEventListener('keyup', this.keyUp);
    }

}

export default CameraControlsImpl;
