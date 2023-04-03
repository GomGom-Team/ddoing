import { useRef, useEffect, useCallback, RefObject } from "react";
import useScrollFadeIn from "../components/user/useScrollFadeIn";

type Direction = "up" | "down" | "left" | "right";

interface ScrollFadeInOptions {
  direction?: Direction;
  duration?: number;
  delay?: number;
}

export interface ScrollFadeInProps {
  ref: RefObject<HTMLDivElement>;
  style: {
    opacity: number;
    transform: string;
  };
}

const LandingPage = () => {
  const animatedItem = useScrollFadeIn();

  return (
    <div>
      <div>Contacts</div>
      <div>Consequat interdum varius sit amet mattis vulputate enim.</div>
      <div {...animatedItem} />
    </div>
  );
};

export default LandingPage;
