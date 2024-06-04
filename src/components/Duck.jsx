import { ScrollTrigger } from "gsap/all"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { OrbitControls } from "@react-three/drei"
import { Perf } from "r3f-perf"
import { Canvas, useLoader, useThree } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { useRef, useEffect, Suspense } from "react"
gsap.registerPlugin(ScrollTrigger)

export default function Duck() {
  const model = useLoader(GLTFLoader, "./rubber_duck/scene.gltf")
  const { camera } = useThree()
  const modelRef = useRef()
  const scrollRef = useRef()

  console.log(camera, "camera")
  useEffect(() => {
    if (model) {
      modelRef.current = model.scene

      gsap.to(modelRef.current.rotation, {
        scrollTrigger: {
          trigger: scrollRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
        y: modelRef.current.rotation.y + Math.PI * 2,
      })

      gsap.to(modelRef.current.position, {
        scrollTrigger: {
          trigger: scrollRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
        z: 2,
      })
    }
  }, [model])

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />
      <Suspense fallback={<h1>loading...</h1>}>
        <primitive
          ref={modelRef}
          object={model.scene}
          scale={0.01}
          position-y={-1}
          rotation-y={0}
        />
      </Suspense>
    </>
  )
}
