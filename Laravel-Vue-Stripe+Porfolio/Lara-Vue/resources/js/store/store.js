import Vuex from 'vuex';



const store = new Vuex.Store({
    state: {
        products: [],
        cart: [],
        order: {}
    },

    mutations: {
        updateProducts(state, products) {
            state.products = products;
        },
        addToCart(state, product) {
            let productInCartIndex = state.cart.findIndex(item => item.slug == product.slug);
            if (productInCartIndex !== -1) {
                state.cart[productInCartIndex].quantity++;
                return;
            }
            product.quantity = 1;
            state.cart.push(product);
        },
        removeFromCart(state, index) {
            state.cart.splice(index, 1);
        },
        updateOrder(state, order) {
            state.order = order;
        },
        updateCart(state, cart) {
            state.cart = cart
        }
    },

    actions: {
        getProducts({ commit }) {
            axios.get('/api/products')
                .then((response) => {
                    commit('updateProducts', response.data);
                }).catch((error) => console.error(error));
        },
        clearCart({ commit }) {
            commit('updateCart', []);
        }
    }
})



export default store;