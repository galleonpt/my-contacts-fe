import { useCallback, useState } from 'react';

const useAnimatedList = (initialValue = []) => {
  const [items, setItems] = useState(initialValue);
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([]);

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalItemsIds((prev) => [...prev, id]);
  }, []);

  const handleAnimationEnd = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setPendingRemovalItemsIds((prev) => prev.filter((itemId) => itemId !== id));
  }, []);

  return {
    items,
    setItems,
    pendingRemovalItemsIds,
    handleRemoveItem,
    handleAnimationEnd,
  };
};

export default useAnimatedList;
