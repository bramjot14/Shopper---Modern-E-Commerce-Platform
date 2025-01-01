// import React, { createContext, useState } from "react";
// import all_product from "../Components/Assets/all_product";

// export const ShopContext = createContext(null);

// const getDefaultCart = () => {
//     let cart = {};
//     for (let index = 0; index < all_product.length; index++) {
//         cart[index] = 0;
//         //key: productID
//         //value: no. of items added to particular productID 
//     }
//     return cart;
// };

// const ShopContextProvider = (props) => {
//     const [cartItems, setCartItems] = useState(getDefaultCart());

//     const addToCart = (itemId) => { 
//         // itemId is coming from productDisplay.jsx
//         setCartItems((prev) => ({ 
//             ...prev, // Copy all existing cart items
//             [itemId]: prev[itemId] + 1 
//             // Increment the quantity of the specified item
//         }));
//         console.log(cartItems);
//     };     
        
//     const removeFromCart = (itemId) => {
//         // itemId is coming from CartItems.jsx
//          setCartItems((prev) => ( {
//             ...prev, [itemId]:prev[itemId] - 1
//         })) 
//     }

//     const getTotalCartAmount = () => {
//         let totalAmount = 0;
//         for(const item in cartItems) // item represents key of cartItems 
//         {
//             if(cartItems[item] > 0) {
//                 let itemInfo = all_product.find((product) => product.id === Number(item))
//                 totalAmount += itemInfo.new_price * cartItems[item];
//             }
//         }
//         return totalAmount;
//     }

//     const getTotalCartItems = () => {
//         let totalItem = 0;
//         for(const item in cartItems) // item represents key of cartItems 
//         {
//             if(cartItems[item] > 0) {
//                 totalItem += cartItems[item]
//             }
//         }
//         return totalItem
//     }
    
//     const contextValue = { getTotalCartAmount, getTotalCartItems, all_product, cartItems, addToCart, removeFromCart }; // Sharing all products and the current cart state with all ShopContext consuming components.

//     return (
//         <ShopContext.Provider value={contextValue}>
//             {props.children}
//         </ShopContext.Provider>
//     );
// };

// export default ShopContextProvider;




import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ShopContext = createContext(null);

const getDefaultCart = (products) => {
  let cart = {};
  for (let index = 0; index < products.length; index++) {
    cart[products[index].id] = 0; // key: productID, value: no. of items added to particular productID 
  }
  return cart;
};

const ShopContextProvider = (props) => {
    const [Products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState(() => {
      const savedCart = JSON.parse(localStorage.getItem("cartItems"));
      return savedCart || {};
    });
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get("http://localhost:5002/products");
          setProducts(response.data);
  
          // Initialize cartItems if no data in local storage
          if (!localStorage.getItem("cartItems")) {
            setCartItems(getDefaultCart(response.data));
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
  
      fetchProducts();
    }, []);
  
    useEffect(() => {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);
  
    const addToCart = (itemId) => {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] + 1,
      }));
    };
  
    const removeFromCart = (itemId) => {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] - 1,
      }));
    };
  
    const getTotalCartAmount = () => {
      let totalAmount = 0;
      for (const item in cartItems) {
        if (cartItems[item] > 0) {
          let itemInfo = Products.find((product) => product.id === Number(item));
          if (itemInfo) {
            totalAmount += itemInfo.new_price * cartItems[item];
          }
        }
      }
      return totalAmount;
    };
  
    const getTotalCartItems = () => {
      let totalItem = 0;
      for (const item in cartItems) {
        if (cartItems[item] > 0) {
          totalItem += cartItems[item];
        }
      }
      return totalItem;
    };
  
    const contextValue = {
      getTotalCartAmount,
      getTotalCartItems,
      all_product: Products,
      cartItems,
      addToCart,
      removeFromCart,
    };
  
    return (
      <ShopContext.Provider value={contextValue}>
        {props.children}
      </ShopContext.Provider>
    );
  };
  

export default ShopContextProvider;






// export default ShopContextProvider;

    /* Example explaining addToCart-
       Initial state (cartItems):
       { 1: 2, 2: 3, 3: 1 } // Product 1 has 2 items, Product 2 has 3 items, Product 3 has 1 item
    
       Calling addToCart(2):
       - 'prev' becomes { 1: 2, 2: 3, 3: 1 }
       - Updates Product 2 quantity to 4.
    
       Resulting state (cartItems):
       { 1: 2, 2: 4, 3: 1 } // Product 2's quantity increased by 1, others remain unchanged.
    */

/* 

1. Create a Context named `ShopContext`
   - `createContext` creates a context object that allows state/data sharing
   - Default value is set to `null` (initial state when no data is provided)
   Code: export const ShopContext = createContext(null);

2. Define a helper function `getDefaultCart`
   - This function initializes the `cart` object with default values (0 for each product)
   Code:
       const getDefaultCart = () => {
           let cart = {};
           for (let index = 0; index < all_product.length; index++) {
               cart[index] = 0;
           }
           return cart;
       };

3. Define a component named `ShopContextProvider`
   - This component will act as a wrapper (Provider) to supply data to other components
   Code:
       const ShopContextProvider = (props) => { 
           const [cartItems, setCartItems] = useState(getDefaultCart());
           const contextValue = { all_product };
           return ( ... );
       };

4. Define the `contextValue` to be shared
   - The `contextValue` holds the `all_product` data and other shared states or functions
   Code: const contextValue = { all_product };

5. Use the `ShopContext.Provider` to make the context value available
   - The `ShopContext.Provider` wraps around child components to provide the context value
   Code: 
       return (
           <ShopContext.Provider value={contextValue}>
               {props.children}
           </ShopContext.Provider>
       );

6. Export `ShopContextProvider` as the default export
   - This makes `ShopContextProvider` reusable in other parts of the application
   Code: export default ShopContextProvider;
*/
