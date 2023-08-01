import { createContext, ReactNode, useContext, useState } from "react"
import { ShoppingCart } from "../components/ShoppingCart"
import { useLocalStorage } from "../hooks/useLocatStorage"

type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItems = {
    id: number
    quantity: number
}
type ShoppingCartContext= {
    openCart:()=> void
    closeCart:()=> void
    getItemQuentity: (id:number)=> number
    increaseCartQuentity: (id:number)=> void
    decreaseCartQuentity: (id:number)=> void
    removeFromCart: (id:number)=> void
    cartQuantity: number
    cartItems: CartItems[]
}
const ShoppinfCartContext = createContext({} as
    ShoppingCartContext)

export function useShoppingCart(){
    return useContext(ShoppinfCartContext)
}





export function ShoppingCartProvider({ children }:
    ShoppingCartProviderProps) {
        const[isOpen,setIsOpen]= useState(false)
        const[cartItems,setCartItems]= useLocalStorage<CartItems[]>("shopping-cart",[])
        


        const cartQuantity = cartItems.reduce(
            (quantity, item)=> item.quantity+ quantity, 0
        )

        const openCart = () => setIsOpen(true)
        const closeCart = () => setIsOpen(false)


        function getItemQuentity(id:number){
            return cartItems.find(item=>item.id === id)?.quantity ||
            0
        }
           
        
        function increaseCartQuentity (id:number){
            setCartItems(currItem=>{
                if (currItem.find(item=> item.id === id)== null){
                    return[...currItem, {id, quantity:1}]

                }else{
                    return currItem.map(item=>{
                        if (item.id=== id ){
                            return{...item,quantity: item.quantity+1}
                        } else {
                            return item
                        }
                    })
                }
            })

        }

        function decreaseCartQuentity (id:number){
            setCartItems(currItem=>{
                if (currItem.find(item=> item.id === id)?.quantity===1){
                   return currItem.filter(item=> item.id !== id)

                }else{
                    return currItem.map(item=>{
                        if (item.id=== id ){
                            return{...item,quantity: item.quantity-1}
                        } else {
                            return item
                        }
                    })
                }
            })

        }

        function removeFromCart(id:number){
            setCartItems(currItems=> {
                return currItems.filter(item=>item.id !==id)
            })
        }



    return(
    <ShoppinfCartContext.Provider value={{getItemQuentity, increaseCartQuentity,decreaseCartQuentity,removeFromCart, openCart, closeCart, cartItems, cartQuantity,}}>
        {children}
        <ShoppingCart isOpen={isOpen}/>
    </ShoppinfCartContext.Provider>
    )
}