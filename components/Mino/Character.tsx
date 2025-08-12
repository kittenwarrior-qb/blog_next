// components/Mino/Character.tsx
import Image from "next/image";
import React from "react";

interface Props {
  isAwake: boolean;
  isTalking: boolean;
  currentImage: string;
}

export default function MinoCharacter({ isAwake, isTalking, currentImage }: Props) {
  if (!isAwake) return null;

  return (
    <div className="fixed bottom-[180px] left-0 md:left-[80px] lg:left-[100px] z-30">
      <Image
        src={`/static/images/Mino/happy/${currentImage}`}
        alt="Mino"
        width={400}
        height={400}
        priority
      />
    </div>
  );
}
