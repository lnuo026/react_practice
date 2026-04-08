// Summary: Create the dog animation component — the core of the whole app. A reusable animated dog piece.
//   Why: Encapsulate the animation logic into a single component. The main page only needs to call it,
//   passing in the image and frame count to play the animation. This is a core React idea — componentization.

import { useEffect, useRef, useState } from "react";
import { Image, View } from "react-native";

// fps  frames per second, optional
// scale  scale multiplier, optional
//  ? meaning: parameters marked with ? are optional and fall back to defaults. Parameters without ? are required — omitting them causes an error
// image path, any type
type Props = {
  imagePath: any;
  frameCount: number;
  frameWidth: number;
  frameHeight: number;
  fps?: number;
  scale?: number;
};

// Using destructuring syntax
export default function SpriteAnimation({
  imagePath,
  frameCount,
  frameWidth,
  frameHeight,
  fps = 8,
  scale = 3,
}: Props) {
  //  useState — remembers "which frame we're on", setFrame is the method to update the frame index
  const [frame, setFrame] = useState(0);

  // Angle brackets <any> — TypeScript-specific syntax, tells TypeScript "what type of value is stored in this ref"
  const intervalRel = useRef<any>(null);

  //  useEffect — starts the timer when the component mounts
  //  intervalRef.current ??
  //   .current is what useRef creates — think of it as a box with a slot called .current where you store a value.
  //   const intervalRef = useRef<any>(null);
  //  At this point intervalRef.current = null (empty)
  //   Why this design? Because useRef returns an object with a property called current.
  // This is React's fixed design — just remember: store values in .current, read values from .current.
  useEffect(() => {
    // Runs when the component mounts
    // At this point intervalRef.current = the timer ID (e.g. 42)
    intervalRel.current = setInterval(() => {
      //  % modulo operator — makes the frame index loop
      setFrame((prev) => (prev + 1) % frameCount);
    }, 1000 / fps);
    // Runs when the component unmounts (cleanup)
    return () => {
      clearInterval(intervalRel.current);
    };
  }, [frameCount, fps]);

  return (
    //  What is View: equivalent to <div> in web — it's a container.
    // Here it acts as a viewport sized to one frame; content outside is clipped by overflow: 'hidden'
    <View
      style={{
        width: frameWidth * scale,
        height: frameHeight * scale,
        overflow: "hidden",
      }}
    >
      {/* Image is equivalent to <img> in web — displays an image. Here it holds the full sprite sheet */}
      <Image
        source={imagePath}
        style={{
          width: frameWidth * frameCount * scale,
          height: frameHeight * scale,
          marginLeft: -frame * frameWidth * scale,
        }}
        resizeMode="stretch"
      />
    </View>
  );
}
