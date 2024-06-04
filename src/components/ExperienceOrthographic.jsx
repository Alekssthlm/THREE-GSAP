import { OrbitControls, Float, Html } from "@react-three/drei"
import { Perf } from "r3f-perf"
import { useLoader, useThree } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { useRef, useEffect, Suspense, useState } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/all"
gsap.registerPlugin(ScrollTrigger)

export default function ExperienceOrthographic() {
  const model = useLoader(GLTFLoader, "./rubber_duck_var4.glb")
  const modelRef = useRef()
  const colors = ["#FF0000", "#FFFF00", "#008000"] // Red, yellow, green
  const [colorIndex, setColorIndex] = useState(1) // Start with yellow

  useEffect(() => {
    if (model) {
      model.scene.traverse((object) => {
        if (object.isMesh && object.material.name === "body") {
          object.material.color.set(colors[colorIndex]) // Set the color of the material
        }
      })
    }
  }, [model, colors, colorIndex])

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
      })

      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: "#s1",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      })

      tl2
        .to(modelRef.current.rotation, { x: -0.5, z: -0.5 })
        .to(modelRef.current.rotation, {
          z: modelRef.current.rotation.z,
          x: modelRef.current.rotation.x,
        })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#s1",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          yoyo: true,
          repeat: 1,
        },
      })

      tl.to(modelRef.current.position, {
        x: modelRef.current.position.x + window.innerWidth * 0.08, // 10% of viewport width
        ease: "power1.inOut",
      })
        .to(modelRef.current.position, {
          x: modelRef.current.position.x - window.innerWidth * 0.1, // 15% of viewport width
          ease: "power1.inOut",
        })
        .to(modelRef.current.position, {
          x: modelRef.current.position.x,
          y: modelRef.current.position.y - window.innerHeight * 0.1, // 10% of viewport height
          ease: "power1.inOut",
        })

      gsap.to(modelRef.current.scale, {
        scrollTrigger: {
          trigger: "#s1",
          start: "top top",
          endTrigger: "#s2",
          end: "bottom center",
          scrub: 1,
        },
        x: 1.5,
        y: 1.5,
        z: 1.5,
      })
      gsap.to(modelRef.current.position, {
        scrollTrigger: {
          trigger: "#s3",
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
        },
        x: window.innerWidth / 20,
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
      <Perf position="top-left" />
      {/* <OrbitControls makeDefault /> */}
      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={5} />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Float speed={1} floatIntensity={-1}>
          <mesh ref={modelRef} position-y={-10} rotation-y={0}>
            <primitive object={model.scene} scale={8} />
          </mesh>

          <Html as="div" center>
            <div className="fixed top-0 flex justify-between ">
              <button
                className="px-4"
                onClick={() =>
                  setColorIndex(
                    (colorIndex - 1 + colors.length) % colors.length
                  )
                } // Go to previous color
              >
                {"<"}
              </button>
              <button
                className="px-4"
                onClick={() => setColorIndex((colorIndex + 1) % colors.length)} // Go to next color
              >
                {">"}
              </button>
            </div>
          </Html>
        </Float>
      </Suspense>
    </>
  )
}
