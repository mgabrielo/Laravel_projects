


<template>


<section>
    <div class="container px-5 py-24 mx-auto">
        <h1 style="margin: 50px; justify-content: center; text-align: center;">Welcome To Shop Demo</h1>
        <div v-if="!products.length">
            <a>
                <img :src="getPhoto()" alt="avatar"/>
            </a>
           <div class="card mt-4">
            Loading
           </div>
        </div>
        <div class="card_wrapper_2" style="margin: 50px;" v-else>
            <div class="card" style="width: 250px;" v-for="product in products" :key="product.id" >
                <div class="project_img-container">
                        <img  :src="getPhoto()"  class="project_img">
                    </div>
                <router-link :to="{name: 'productsshow', params: {slug: product.slug}}">
                    <button class="btn btn-primary" >
                                Buy </button>
                </router-link>
                <div>
                <h3 v-for="category in product.categories" v-text="category.name"></h3>
                <h2 v-text="product.name"></h2>
                <p v-text="formatCurrency(product.price)"></p>
            </div>
            </div>


            <!-- <div class="wrapper_right ">
                <div class="card"  v-for="product in products" :key="product.id" >
                    <div class="project_img-container">
                        <img :src="getPhoto()"  class="project_img">
                    </div>
                    <br>
                    <div v-for="product in products" :key="product.id" >
                <router-link :to="{name: 'productsshow', params: {slug: product.slug}}">
                        Link
                </router-link>
                <div>
                <h3 v-for="category in product.categories" v-text="category.name"></h3>
                <h2 v-text="product.name"></h2>
                <p v-text="formatCurrency(product.price)"></p>
                </div>
            </div> -->
                    
<!--     
                    <br><br><br>
                   
                </div>    
             </div> -->
           
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
        }
    }
}
</script>

