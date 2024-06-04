import { OrbitControls, Float } from "@react-three/drei"
import { Perf } from "r3f-perf"
import { useLoader, useThree } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { useRef, useEffect, Suspense } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/all"
gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const model = useLoader(GLTFLoader, "./rubber_duck/scene.gltf")
  const modelRef = useRef()

  useGSAP(() => {
    if (model) {
      gsap.to(modelRef.current.rotation, {
        scrollTrigger: {
          trigger: "#s1",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
        y: modelRef.current.rotation.y + Math.PI * 2,
        x: 6,
      })
      gsap.to(modelRef.current.position, {
        scrollTrigger: {
          trigger: "#s1",
          start: "top top",
          endTrigger: "#s2",
          end: "bottom center",
          scrub: 1,
        },
        z: 2,
        y: -2,
      })
      gsap.to(modelRef.current.position, {
        scrollTrigger: {
          trigger: "#s3",
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
        },
        x: window.innerWidth / 500,
      })
      gsap.to(modelRef.current.rotation, {
        scrollTrigger: {
          trigger: "#s3",
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
        },
        y: 5.5,
      })
    }
  }, [])

  return (
    <>
      {/* <Perf position="top-left" /> */}
      {/* <OrbitControls makeDefault /> */}
      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Float speed={1} floatIntensity={-1}>
          <mesh ref={modelRef}>
            <primitive object={model.scene} scale={0.01} position-y={-1} />
          </mesh>
        </Float>
      </Suspense>
    </>
  )
}
