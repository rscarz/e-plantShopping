import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], // Initialize items as an empty array
    },
    reducers: {
        addItem: (state, action) => {
            const { name, image, cost } = action.payload;

            const existingItem = state.items.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.items.push({ name, image, cost, quantity: 1 });
            }
        },

        removeItem: (state, action) => {
            // Encuentra el índice del elemento a eliminar (más eficiente si hay muchos elementos)
            const indexToRemove = state.items.findIndex(item => item.name === action.payload);
          
            if (indexToRemove !== -1) {

              const item2 = state.items[indexToRemove];
              state.numberOfCar -= item2.quantity; // Disminuye el número según la cantidad eliminada

              // Utiliza splice para eliminar el elemento por índice (más eficiente que filter en este caso)
              state.items.splice(indexToRemove, 1);
            }
          },


        updateQuantity: (state, action) => {
            const { name, quantity } = action.payload;
            const itemToUpdate = state.items.find(item => item.name === name);
            if (itemToUpdate) {
                itemToUpdate.quantity = quantity;
            }
        },

        // copio del proyecto anterior
        incrementQuantity: (state, action) => {
            const { name, quantity } = action.payload;
            const itemToUpdate = state.items.find(item => item.name === name);

            if (itemToUpdate) {
                itemToUpdate.quantity++;
            }
        },

        decrementQuantity: (state, action) => {
            const { name, quantity } = action.payload;
            const itemToUpdate = state.items.find(item => item.name === name);

            if (itemToUpdate && itemToUpdate.quantity > 0) {
                itemToUpdate.quantity--;
            }

        },

        
    }
});

// Selector to get the total number of items in the cart
export const selectTotalItems = (state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const { addItem, removeItem, updateQuantity, incrementQuantity, decrementQuantity } = CartSlice.actions;

export default CartSlice.reducer;
