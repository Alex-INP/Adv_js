import { createStore } from 'vuex'

const API_URL = 'http://localhost:3000/api/v1';

export default createStore({
  state: {
    showcase: [],
    cart: [],
    searchString: "",
    isContentVisible: true 
  },
  getters: {
    getCart: (state) => state.cart.slice(),
    getShowcase: (state) => state.showcase.filter((product) => new RegExp(state.searchString, "i").test(product.title)),
    getContentVisibility: (state) => state.isContentVisible,
    getSearchString: (state) => state.searchString
  },
  mutations: {
    setShowcase: (state, payload) => state.showcase = payload,
    addToCart: (state, payload) => {
      if(state.cart.length > 0){
        for(let good of state.cart){
          if(good.id == payload.id){
            ++good.count
            return
          }
        }
        state.cart.push(payload)
      } else {
        state.cart.push(payload)
      }
    },
    removeFromCart: (state, payload) => {
      for(let good of state.cart){
        if(good.id == payload.id){
          if(good.count > 1){
            --good.count
            return
          } else {
            state.cart.splice(state.cart.indexOf(good), 1)
            return
          }
        }
      }   
    },
    hideContent: (state) => state.isContentVisible = false,
    setSearchString(state, payload){
      state.searchString = payload
    }
  },
  actions: {
    loadShowcase({commit}){
      fetch(`${API_URL}/showcase`)
      .then((res) => res.json())
      .then((data) => commit("setShowcase", data))
      .catch(() => commit("hideContent"))
    },
    loadCart({commit}){
      fetch(`${API_URL}/cart`)
      .then((res) => res.json())
      .then((data) => data.forEach((good) => commit("addToCart", good)))
      .catch(() => commit("hideContent"))  
    },
    addToCart({commit}, good){
      commit("addToCart", good)
      fetch(`${API_URL}/cart`, {
        method:"post",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(this.state.cart)
      })
    },
    deleteFromCart({commit}, good){
      commit("removeFromCart", good)
      fetch(`${API_URL}/cart`, {
        method:"delete",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(this.state.cart)
      })
    }
  },
  modules: {
  }
})
