import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = 
defineStore('cart', ()=>{
    const items = ref([])
    function addToCart(product){
 const id = product.productId || product._id || product.product
  const price = Number(product.price) || 0
        const existing = items.value.find(i => i.productId === id)
        if(existing){
            existing.quantity++
        } else{
            items.value.push({
                productId: id,
                product:product.product,
                price: price,
                quantity:1
            })}}
    

   function removeFromCart(productId){
        items.value = items.value.filter(i=>i.productId !== productId)
    }


//ADD AND DECREASE CART QUANTITY
function increaseQuantity(productId){
    const item = items.value.find(i=>i.productId === productId)
    if(item){item.quantity++
    }
}

function decreaseQuantity(productId){
    const item = items.value.find(i=> i.productId === productId)
        if (item) {
            if(item.quantity >1){

                item.quantity--
            } else{removeFromCart(productId)}
            
        
    }
}

  const cartTotal = computed(() => {
    return items.value.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0)
  })
  return {
    items,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartTotal,
  }
})