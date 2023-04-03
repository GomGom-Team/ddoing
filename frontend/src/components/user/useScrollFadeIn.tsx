import { useRef, useEffect, useCallback, RefObject } from "react";

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

const useScrollFadeIn = ({
  direction = "up",
  duration = 1,
  delay = 0,
}: ScrollFadeInOptions = {}): ScrollFadeInProps => {
  const dom = useRef<HTMLDivElement>(null);

  const handleDirection = (name: Direction): string => {
    switch (name) {
      case "up":
        return "translate3d(0, 50%, 0)";
      case "down":
        return "translate3d(0, -50%, 0)";
      case "left":
        return "translate3d(50%, 0, 0)";
      case "right":
        return "translate3d(-50%, 0, 0)";
      default:
        return "";
    }
  };

  const handleScroll = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      const { current } = dom;
      if (entry.isIntersecting) {
        if (current) {
          current.style.transitionProperty = "all";
          current.style.transitionDuration = `${duration}s`;
          current.style.transitionTimingFunction = "cubic-bezier(0, 0, 0.2, 1)";
          current.style.transitionDelay = `${delay}s`;
          current.style.opacity = "1";
          current.style.transform = "translate3d(0, 0, 0)";
        }
      }
    },
    [delay, duration]
  );

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    const { current } = dom;

    if (current) {
      observer = new IntersectionObserver(handleScroll, { threshold: 0.7 });
      observer.observe(current);
    }

    return () => observer && observer.disconnect();
  }, [handleScroll]);

  return {
    ref: dom,
    style: {
      opacity: 0,
      transform: handleDirection(direction),
    },
  };
};

export default useScrollFadeIn;
