import { Suspense, useEffect, useRef } from "react"
import { useGLTF, Float } from "@react-three/drei"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useThree } from "@react-three/fiber"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const model = useGLTF("./rubber_duck/scene.gltf")
  const { camera } = useThree()
  const radius = 5 // The radius of the circular path

  useGSAP(() => {
    if (model) {
      gsap.to(camera.position, {
        scrollTrigger: {
          trigger: "#s1",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
        onUpdate: function () {
          const angle = this.progress() * Math.PI * 2
          camera.position.x = Math.sin(angle) * 2
          camera.position.z = Math.cos(angle) * 2
          camera.lookAt(0, 0, 0) // Make the camera always look at the center of the scene
        },
      })
    }
  }, [])

  return (
    <>
      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Float speed={1} floatIntensity={-1}>
          <mesh>
            <primitive object={model.scene} scale={0.01} position-y={-1} />
          </mesh>
        </Float>
      </Suspense>
    </>
  )
}
