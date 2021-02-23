const initialState = {};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      console.log(action.item.quantity, 'action.item.quantity');
      return {
        ...state,
        [action.item._id]: {
          ...action.item,
          quantity: state[action.item._id]
            ? state[action.item._id].quantity + action.item.quantity
            : action.item.quantity,
        },
      };

    case 'REMOVE_ITEM': {
      const stateCopy = { ...state };
      delete stateCopy[action.item._id];
      return stateCopy;
    }

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        [action._id]: {
          ...state[action._id],
          quantity: action.quantity,
        },
      };

    case 'CLEAR_CART':
      return { ...initialState };

    default:
      return state;
  }
}
export const getItems = (state) => state.items;

// quantity: state[action.item._id]? state[action.item._id].quantity + 1: 1,
