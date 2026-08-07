<template>
<div class="menu-container">
  <h1 class="page-title">Nosso <span class="highlight">Cardápio</span></h1>
<div v-if="isLoading" class="loading">Carregando cardápio...</div>
<!-- LEFT SIDE: SHOPPING CART -->
 <div v-else class="page-layout">
  <aside class="cart-sidebar"><h2 class="cart-title">Carrinho de <span class="highlight">Compras</span></h2>
    
    <div v-if="cartStore.items.length === 0" class="empty-cart">
      Seu carrinho está vazio.
    </div>
<div v-else class="cart-items">
  <div v-for="item in cartStore.items" :key="item.productId" class="cart-item">
    <div class="cart-item-info">
      <p class="cart-item-name">{{ item.product }}</p>
      <span class="cart-item-price">R$ {{ ((item.price || 0) * item.quantity).toFixed(2) }}</span>
    </div>

    <!-- Quantity Controls -->
    <div class="cart-item-actions">
      <div class="qty-box">
        <button @click="cartStore.decreaseQuantity(item.productId)" class="btn-qty">-</button>
        <span class="qty-val">{{ item.quantity }}</span>
        <button @click="cartStore.increaseQuantity(item.productId)" class="btn-qty">+</button>
      </div>

      <button @click="cartStore.removeFromCart(item.productId)" class="btn-remove">✕</button>
    </div>
  </div>

  <div class="cart-footer">
    <span>Total:</span>
    <span class="total-price">R$ {{ cartStore.cartTotal.toFixed(2) }}</span>
  </div>
  <button class="btn-checkout">Finalizar Pedido</button>
</div>

</aside>

<!-- RIGHT SIDE: MENU ITEMS -->
<div class="menu-sections">
  <section v-for="category in formattedMenu" :key="category.id" class="category-section">
    <h2 class="category-header">{{ category.title }}</h2>
    <div class="grid-menu">
      <div v-for="item in category.items" :key="item.productId" class="item-card">
        
        <div class="card-body">
          <h3 class="product-name">{{ item.product }}</h3>
          <p class="product-desc" v-if="item.description">{{ item.description }}</p>
        </div>
        <div class="card-footer">
          <span class="product-price">
            R$ {{ item.price ? item.price.toFixed(2) : '--' }}
          </span>
          <button @click="cartStore.addToCart(item)" class="btn-order">Adicionar</button>
        </div>
      
      </div>
    </div>
  </section>
</div>
</div>

</div>
</template>

<script setup>
import api from '@/services/api'
import { useCartStore } from '@/stores/cart'
import axios from 'axios'
import { ref, onMounted, computed } from 'vue'
import{ref, onMounted, computed} from 'vue'
const cartStore = useCartStore()
const menuCategories = ref([])
const isLoading = ref(true)


const formattedMenu = computed(()=>{
  return menuCategories.value.map(doc =>{
    const categoryKey = Object.keys(doc).find(key => key !== '_id')
    return{
      id: doc._id,
      title: categoryKey ? categoryKey.toUpperCase() : 'OUTROS',
      items: doc[categoryKey] || []
    }
  })
})

const getMenu = async () => {
  try {
    const response = await api.get('/menu', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    menuCategories.value = response.data.items || []
  } catch (e) {
    console.log(e, 'error')
  } finally {
    isLoading.value = false
  }
}
onMounted(getMenu)


</script>
<style scoped>
.menu-container{
  background-color: #141414;
  min-height: 100vh;
  padding: 3rem 2rem;
  color: #ffffff;
}
.page-title{
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: bold;
}
.highlight{
  color: #ff4d4d;
}

.category-header{
  font-size: 1.6rem;
  color: #ff4d4d;
  border-bottom: 2px solid #8b0000;
  padding-bottom: .5rem;
  margin-bottom: 1.5rem;


}
.grid-menu{display: grid;
grid-template-columns: repeat(auto-fill, minmax(280px,1fr));
gap: 1.5rem;
margin-bottom: 3.5rem;

}

.item-card{
  background-color: #1a1a1a;
  bottom: 1px solid #2a2a2a;
  border-radius: 10px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform .2s ease, border-color .2s ease;
}
.item-card:hover{

  transform: translateY(-4px);
  border-color: #8b0000;
}
.product-name{
  font-size: 1.1rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: .5rem;
}
.product-desc{
  font-size: .85rem;
  color: #aaaaaa;
  line-height: 1.3;
  margin-bottom: 1rem;
}

.card-footer{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: .8rem;
  border-top: 1px solid #2a2a2a;
}
.product-price{
  font-size: 1.2rem;
  font-weight: bold;
  color: #ff4d4d;
}
.btn-order{
  background-color: #8b0000;
  color:  white;
  border: none;
  padding: .5rem 1rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color .2s ease;
}
.btn-order:hover{
  background-color: #ff4d4d;
}

.page-layout{
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 2rem;
  align-items: start
}

.cart-sidebar{
  position: sticky;
  top: 2rem;
  background-color: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-top: 3px solid #8b0000;
  border-radius: 12px;
  padding: 1.5rem;
}
.card-title{
  font-size: 1.3rem;
  margin-bottom: 1rem;
  font-weight: bold;
}
.empty-cart{
  color: #888;
  font-size: .9rem;
}
.cart-item{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .75rem 0;
  border-bottom: 1px solid #2a2a2a;
}
.cart-item-info{
  display: flex;
  flex-direction: column;
  gap: .2rem;
}
.cart-item-actions{
  display: flex;
  align-items: center;
  gap: .75rem;
}
.qty-box{
  display: flex;
  align-items: center;
  background-color: #2a2a2a;
  border-radius: 6px;
  padding: .2rem .5rem;
  gap: .5rem;
}
.btn-qty{
  background: none;
  border: none;
  color: #ff4d4d;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0 .2rem;

}
.qty-val{
  font-weight: bold;
  font-size: .9rem;
  color: #ffffff;
}
.cart-item-name{
  font-size: .95rem;
  font-weight: bold;
}
.cart-item-price{
  font-size: .8rem;
  color: #aaa;
}
.btn-remove{
  background: none;
  border: none;
  color: #ff4d4d;
  font-weight: bold;
  cursor: pointer;
}
.cart-footer{
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 1rem;
  padding-top: .5rem;


}
.total-price{
  color: #ff4d4d;
}
.btn-checkout{
  width: 100%;
  background-color: #8b0000;
  color: white;
  border: none;
  padding: .8rem;
  border-radius: 6px;
  font-weight:  bold;
  margin-top: 1rem;
  cursor: pointer;
}

.grid-menu{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 3.5rem;
}
@media(max-width:1024px){
  .page-layout{
    grid-template-columns: 1fr;
  }
  .grid-menu{
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}
</style>
