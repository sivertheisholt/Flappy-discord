import { useGLTF } from "@react-three/drei/core/Gltf";
import { useAnimations } from "@react-three/drei/core/useAnimations";
import { useGraph } from "@react-three/fiber";
import { FC, useEffect, useMemo, useRef } from "react";
import { Group, SkinnedMesh } from "three";
import { SkeletonUtils } from "three-stdlib";

interface IPlayerProps {
  animation: string;
  color: string;
  name: string;
  scale: number;
  positionY: number;
}

const Player: FC<IPlayerProps> = ({
  animation,
  color,
  name,
  scale,
  positionY,
}) => {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF("/models/character.glb", "draco/gltf/");

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);

  useEffect((): any => {
    actions[animation]?.reset().fadeIn(0.1).play();
    return () => actions[animation]?.fadeOut(0.1);
  }, [animation, actions]);

  return (
    <group
      position={[0, positionY, 0]}
      scale={scale}
      ref={group}
      dispose={null}
    >
      <group name="Scene">
        <group name="fall_guys">
          <primitive object={nodes._rootJoint} />
          <skinnedMesh
            name="body"
            geometry={(nodes.body as SkinnedMesh).geometry}
            skeleton={(nodes.body as SkinnedMesh).skeleton}
          >
            <meshStandardMaterial {...materials.Material_0} color={color} />
          </skinnedMesh>
          <skinnedMesh
            name="eye"
            geometry={(nodes.eye as SkinnedMesh).geometry}
            skeleton={(nodes.eye as SkinnedMesh).skeleton}
          >
            <meshStandardMaterial {...materials.Material_2} color="white" />
          </skinnedMesh>
          <skinnedMesh
            name="hand-"
            geometry={(nodes["hand-"] as SkinnedMesh).geometry}
            skeleton={(nodes["hand-"] as SkinnedMesh).skeleton}
          >
            <meshStandardMaterial {...materials.Material_0} color={color} />
          </skinnedMesh>
          <skinnedMesh
            name="leg"
            geometry={(nodes.leg as SkinnedMesh).geometry}
            skeleton={(nodes.leg as SkinnedMesh).skeleton}
          >
            <meshStandardMaterial {...materials.Material_0} color={color} />
          </skinnedMesh>
        </group>
      </group>
    </group>
  );
};

export default Player;
