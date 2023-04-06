<template>
<section v-if="product">
<div class="card">
    <router-link  :to = "{name: 'ordercheckout'}">
        <button class="btn btn-primary" style="margin-right: 10px;" >
                                CheckOut </button>
         <span v-text="'('+ $store.state.cart.length+' items)'"></span>
    </router-link>
</div>
<div class="conatiner px-12 py-24 mx-auto" >
<div class=" mx-auto" >
<!-- <img alt="" src=""> -->
<div class="card_wrapper_2" style="margin-top: 20px; ">

    <div class="card" style="width: 550px; margin-left: 430px;"  >
        <h2 class="text-success"  ></h2>
                <div class="project_img-container" style="margin-bottom: 20px;">
                        <img  :src="getPhoto()"  class="project_img">
                    </div>
                <div>
                
    <h2 class="text-success" v-for="category in product.categories" v-text="category.name" ></h2>
    <h1 v-text="product.name"></h1>
    <p v-text="product.description"></p>
    <p v-text="formatCurrency(product.price)"></p>
    <button class="btn btn-secondary" @click="$store.commit('addToCart', product)">Add to Cart</button>
            </div>
            </div>


</div>
</div>
</div>

</section>
</template>

<script>
export default{
    methods:{
        formatCurrency(price){
            price =  (price/100);
            return price.toLocaleString('en-US', {style: 'currency', currency: 'USD' });
        },
        getPhoto(){
            return "/img/upload/avatar.jpg"
            }
    },
    computed:{
        products(){
            return this.$store.state.products;
        },

        product(){
            return this.products.find(product=> product.slug == this.$route.params.slug);
        }
    }
}
</script>