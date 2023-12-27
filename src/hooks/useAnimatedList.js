import {
  useCallback, useRef, useState, createRef, useEffect,
} from 'react';

const useAnimatedList = (initialValue = []) => {
  const [items, setItems] = useState(initialValue);
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([]);

  const animatedRefs = useRef(new Map());
  const animationEndListeners = useRef(new Map());

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalItemsIds((prev) => [...prev, id]);
  }, []);

  const handleAnimationEnd = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setPendingRemovalItemsIds((prev) => prev.filter((itemId) => itemId !== id));
  }, []);

  const getAnimatedRef = useCallback((itemId) => {
    let animatedRef = animatedRefs.current.get(itemId);

    if (!animatedRef) {
      animatedRef = createRef();
      animatedRefs.current.set(itemId, animatedRef);
    }

    return animatedRef;
  }, []);

  const renderList = useCallback((renderItem) => (
    items.map((item) => {
      const isLeaving = pendingRemovalItemsIds.includes(item.id);
      const animatedRef = getAnimatedRef(item.id);

      return renderItem(item, { isLeaving, animatedRef });
    })
  ), [items, pendingRemovalItemsIds, getAnimatedRef]);

  useEffect(() => {
    pendingRemovalItemsIds.forEach((itemId) => {
      const animatedRef = animatedRefs.current.get(itemId);
      const alreadyHasListener = animationEndListeners.current.has(itemId);

      if (animatedRef?.current && !alreadyHasListener) {
        animationEndListeners.current.set(itemId, true);

        animatedRef.current.addEventListener('animationend', () => {
          handleAnimationEnd(itemId);
        });
      }
    });
  }, [pendingRemovalItemsIds, handleAnimationEnd]);

  return {
    items,
    setItems,
    handleRemoveItem,
    renderList,
  };
};

export default useAnimatedList;
