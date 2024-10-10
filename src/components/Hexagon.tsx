import { FC } from "react";
import { useGLTF } from "@react-three/drei";
import { Color, Vector3 } from "@react-three/fiber";
import { RigidBody, TrimeshCollider } from "@react-three/rapier";
import { Mesh } from "three";

interface IHexagonProps {
  color: Color;
  positionY: number;
  positionX: number;
}

const Hexagon: FC<IHexagonProps> = ({ color, positionY, positionX }) => {
  const { nodes, materials } = useGLTF("/models/hexagon.glb", "draco/gltf/");
  const hexagonMesh = nodes.Hexagon as Mesh;
  return (
    <RigidBody type="fixed" colliders={"trimesh"}>
      <mesh
        position={[positionX, positionY, 0]}
        geometry={hexagonMesh.geometry}
        material={materials.hexagon}
      >
        <meshStandardMaterial
          {...materials.hexagon}
          color={color}
          transparent
        />
      </mesh>
    </RigidBody>
  );
};

export default Hexagon;
