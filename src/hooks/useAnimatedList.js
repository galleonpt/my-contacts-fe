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

  const renderList = useCallback((renderItem) => (
    items.map((item) => renderItem(item, {
      isLeaving: pendingRemovalItemsIds.includes(item.id),
    }))
  ), [items, pendingRemovalItemsIds]);

  return {
    items,
    setItems,
    handleRemoveItem,
    handleAnimationEnd,
    renderList,
  };
};

export default useAnimatedList;
