import { Canvas } from "@react-three/fiber"
import Experience from "./components/Experience"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/all"
import ExperienceOrthographic from "./components/ExperienceOrthographic"
gsap.registerPlugin(ScrollTrigger)

function App() {
  const canvasRef = useRef()
  const circleRef = useRef()
  const s1Ref = useRef()
  const s2Ref = useRef()
  const s3Ref = useRef()

  useGSAP(() => {
    gsap.to(canvasRef.current, {
      opacity: 1,
      duration: 3,
      ease: "power1.inOut",
    })
    gsap.to(s1Ref.current, {
      opacity: 1,
      duration: 3,
      ease: "power1.inOut",
    })
    gsap.to(s2Ref.current, {
      scrollTrigger: {
        trigger: "#s2",
        start: "top center",
        end: "bottom bottom",
        scrub: 1,
      },
      opacity: 1,
    })
    gsap.to(s3Ref.current, {
      scrollTrigger: {
        trigger: "#s3",
        start: "top center",
        end: "bottom bottom",
        scrub: 1,
      },
      opacity: 1,
    })
    gsap.to(circleRef.current, {
      scrollTrigger: {
        trigger: "#s4",
        start: "top center+=30%",
        end: "bottom bottom",
        scrub: 1,
      },
      y: "-100%",
      scale: 1.5,
    })
  }, [])

  return (
    <main className="overflow-x-hidden">
      <div
        className="h-[400vh] w-[100vw] border-[1rem] border-blue-200 bg-blue-200 flex justify-center pt-[2rem]"
        id="s1"
      >
        <div
          className="relative flex flex-col items-center opacity-0 z-[1]"
          ref={s1Ref}
        >
          <h1 className="text-[4rem] font-bold">FIRST SECTION</h1>
        </div>
      </div>

      <section
        className="h-lvh border flex-col bg-green-200 flex items-center pt-[2rem]"
        id="s2"
      >
        <div
          className="relative flex flex-col items-center opacity-0 z-[2]"
          ref={s2Ref}
        >
          <h1 className="text-[4rem] font-bold">SECOND SECTION</h1>
          <button
            className="p-4 bg-gray-300"
            onClick={() => {
              console.log("click")
            }}
          >
            CLICK
          </button>
        </div>
      </section>

      <section
        className="h-[100vh] border flex items-center flex-col bg-purple-200 pt-[2rem]"
        id="s3"
      >
        <div
          className="relative flex flex-col items-center opacity-0 z-[2]"
          ref={s3Ref}
        >
          <h1 className="text-[4rem] font-bold">THIRD SECTION</h1>
          <button
            className="p-4 bg-gray-300"
            onClick={() => {
              console.log("click")
            }}
          >
            CLICK
          </button>
        </div>
      </section>

      <div className="relative z-10 round-background">
        <svg
          ref={circleRef}
          width="110%"
          height="50%"
          viewBox="0 0 100 30"
          preserveAspectRatio="none"
          className="absolute bottom-[40%] left-[50%] translate-x-[-50%] z-[-1] scale-[2]"
        >
          <ellipse cx="50" cy="15" rx="50" ry="15" fill="#f87171" />
        </svg>
        <section
          className="h-lvh w-lvw flex  flex-col bg-[#f87171] z-[0] relative"
          id="s4"
        >
          <div className=" flex flex-col items-center">
            <h1 className="text-[4rem] font-bold">LAST SECTION</h1>
            <button
              className="p-4 bg-gray-300"
              onClick={() => {
                console.log("click")
              }}
            >
              CLICK
            </button>
          </div>
        </section>
      </div>

      <div
        ref={canvasRef}
        className="opacity-0 fixed top-0 left-0 h-full w-full z-[1] border-[0.5rem] border-orange-300"
      >
        <Canvas
          orthographic
          camera={{ zoom: 4, position: [0, 0, 200], near: 0.1, far: 1000 }}
        >
          {/* <Experience /> */}
          <ExperienceOrthographic />
        </Canvas>
      </div>
    </main>
  )
}

export default App
