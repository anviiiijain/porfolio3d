import { Canvas } from '@react-three/fiber'


const Particles = () => {
  return (
    <Canvas
    camera={{aspect:window.innerWidth / window.innerHeight, fov:75, near:0.1,far:1000}}
    gl={{alpha:true,antialias:true}}
    >
      <color attach={'background'} args={['#000000']}/>
    </Canvas>
  )
}

export default Particles