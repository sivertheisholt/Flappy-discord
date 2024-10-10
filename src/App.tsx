import "./App.css";
import { Canvas } from "@react-three/fiber";
import GameArena from "./components/GameArena";
import { Environment, KeyboardControls } from "@react-three/drei";
import { Suspense } from "react";
import { Physics } from "@react-three/rapier";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "run", keys: ["ArrowUp", "Shift"] },
];

function App() {
  return (
    <KeyboardControls map={keyboardMap}>
      <Canvas
        shadows
        camera={{ position: [0, 16, 10], fov: 42 }}
        style={{
          touchAction: "none",
        }}
      >
        <Environment files={"hdrs/medieval_cafe_1k.hdr"} />
        <ambientLight intensity={0.1} />

        <Suspense>
          <Physics debug>
            <GameArena />
          </Physics>
        </Suspense>
      </Canvas>
    </KeyboardControls>
  );
}

export default App;
