import { useEffect, useRef, useState } from 'react';

const useAnimatedUnmount = (visible) => {
  const [shouldRender, setShouldRender] = useState(visible);
  const animatedElementRef = useRef(null);

  // ! effects
  useEffect(() => {
    const handleAnimationEnd = () => {
      setShouldRender(false);
    };

    if (visible) {
      setShouldRender(true);
    }

    const elementRef = animatedElementRef.current;
    if (!visible && elementRef) {
      elementRef.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      if (elementRef) {
        elementRef.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, [visible]);

  return { shouldRender, animatedElementRef };
};

export default useAnimatedUnmount;
