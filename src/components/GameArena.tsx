import { FC } from "react";
import Hexagon from "./Hexagon";
import Player from "./Player";
import { CharacterController } from "./CharacterController";
import { Physics } from "@react-three/rapier";

export const HEX_X_SPACING = 2.25;
export const HEX_Z_SPACING = 1.95;

interface IGameArenaProps {}

const GameArena: FC<IGameArenaProps> = () => {
  return (
    <>
      <CharacterController />

      {[...Array(10)].map((_, columnIndex) => (
        <Hexagon
          key={columnIndex}
          positionX={columnIndex * HEX_X_SPACING}
          positionY={-2}
          color={"red"}
        />
      ))}
    </>
  );
};

export default GameArena;
