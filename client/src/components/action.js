export const addItem = (item) => ({
  type: 'ADD_ITEM',
  item,
});

export const removeItem = (item) => ({
  type: 'REMOVE_ITEM',
  item,
});

export const updateQuantity = (_id, quantity) => ({
  type: 'UPDATE_QUANTITY',
  _id,
  quantity,
});

export const clearCart = () => ({
  type: 'CLEAR_CART',
});
