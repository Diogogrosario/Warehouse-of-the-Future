import { ReactThreeFiber, useFrame, useThree } from '@react-three/fiber'
import * as React from 'react'
import * as THREE from 'three'
import CameraControlsImpl from './CameraControlsImpl'

export type CameraControlsProps = ReactThreeFiber.Object3DNode<CameraControlsImpl, typeof CameraControlsImpl> & {
  onChange?: (e?: THREE.Event) => void
}

export const CameraControls = React.forwardRef<CameraControlsImpl, CameraControlsProps>((props, ref) => {
  const { onChange, ...rest } = props;
  const invalidate = useThree(({ invalidate }) => invalidate);
  const camera = useThree(({ camera }) => camera);
  const gl = useThree(({ gl }) => gl);
  const [controls] = React.useState(() => new CameraControlsImpl(camera, gl.domElement));

  React.useEffect(() => {
    const callback = (e: THREE.Event) => {
      invalidate();
      if (onChange) onChange(e);
    }

    console.log('EFFECT uwu');

    controls?.addEventListener?.('change', callback);
    return () => controls?.removeEventListener?.('change', callback);
  }, [onChange, controls, invalidate]);

//   For 'always' rendering mode
//   useFrame((_, delta) => controls?.update(delta))

    setInterval(() => {
        controls.update();
    }, 100);

  return controls ? <primitive ref={ref} dispose={undefined} object={controls} {...rest} /> : null
})
