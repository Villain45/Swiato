//zustand is better in handling the functions same as that of useContext in react 
import create from 'zustand'

export const useStore = create(
    //set is used to change anything like var array etc
    (set) => ({
        //for cart
        cart: {
            foodItems:[]
        },


        //adding items into Cart
        addFoodItems:(data)=>
        //state gives the existing state
        set((state) => ({
            cart: {
                foodItems:[...state.cart.foodItems, data]
            }
        })),


        ///removing items
        removeFoodItems:(index)=>
        set((state)=>({
            cart:{
                foodItems: state.cart.foodItems.filter((_,i)=>i!=index)
            }
        })),

        resetCart:() => 
        set(()=>({
            cart: {
                foodItems:[]
            }
        }))
    })
)
