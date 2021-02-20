const initialState = {
};

export default function cartReducer(state = initialState, action) {
    console.log(action.type,"world")
    switch(action.type){
        case 'ADD_ITEM':
            console.log(action.item._id,"item HELLO")
            const testing = {
                ...state,
                [action.item._id]:{
                ...action.item,
            }
        }
        console.log(testing)
            return testing
        case 'HELLO':
            return {
                hello:action.message,
                ...state
            }

            default:
            console.log("switch",action.type)
            return state;
    }
} 
export const getItems  = (state) => state.items;



          // quantity: state[action.item._id]? state[action.item._id].quantity + 1: 1,
        // case 'REMOVE_ITEM':
        //     {
        //         const stateCopy = { ...state };
        //         delete stateCopy[action.item._id];
        //         return stateCopy;
        //     }
        // case 'UPDATE_QUANTITY':
        //     return {
        //         ...state,
        //         [action._id]:{
        //             ...state[action._id],
        //             quantity: action.quantity,
        //         }
        //     }