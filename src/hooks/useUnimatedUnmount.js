import { useEffect, useRef, useState } from 'react';

const useAnimatedUnmount = (open) => {
  const [shouldRender, setShouldRender] = useState(open);
  const animatedElementRef = useRef(null);

  // ! effects
  useEffect(() => {
    const handleAnimationEnd = () => {
      setShouldRender(false);
    };

    if (open) {
      setShouldRender(true);
    }

    const elementRef = animatedElementRef.current;
    if (!open && elementRef) {
      elementRef.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      if (elementRef) {
        elementRef.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, [open]);

  return { shouldRender, animatedElementRef };
};

export default useAnimatedUnmount;
