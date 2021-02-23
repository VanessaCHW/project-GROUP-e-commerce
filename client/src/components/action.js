export const addItem = (item) => ({
  type: 'ADD_ITEM',
  item,
});

export const removeItem = (_id, item) => ({
  type: 'REMOVE_ITEM',
  item,
  _id,
});

export const updateQuantity = (_id, quantity) => ({
  type: 'UPDATE_QUANTITY',
  _id,
  quantity,
});

export const clearCart = () => ({
  type: 'CLEAR_CART',
});
