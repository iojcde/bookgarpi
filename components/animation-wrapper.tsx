"use client";
import { useEffect, useRef, useState } from "react";

export const AnimationWrapper = ({
  show,
  children,
  from = { opacity: 0, transform: "translateY(50px)" },
  to = { opacity: 1, transform: "translateY(00px)" },
  unMountAnimation = [{ opacity: 0, transform: "translateY(50px)" }],
  options = { duration: 150, fill: "forwards" },
  className,
}: {
  show: boolean;
  children: React.ReactNode;
  from?: Keyframe;
  to?: Keyframe;
  unMountAnimation?: Keyframe[];
  options?: KeyframeAnimationOptions;
  className?: string;
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  const [removeState, setRemove] = useState(!show);

  useEffect(() => {
    const childElement = elementRef.current;
    if (show) {
      setRemove(false);
      if (!childElement) return;
      childElement.animate([from, to], options);
    } else {
      if (!childElement) return;
      const animation = childElement.animate(
        unMountAnimation || [to, from],
        options
      );
      animation.onfinish = () => {
        setRemove(true);
      };
    }
  }, [show, removeState]);

  return (
    !removeState && (
      <div className={className} ref={elementRef}>
        {children}
      </div>
    )
  );
};
