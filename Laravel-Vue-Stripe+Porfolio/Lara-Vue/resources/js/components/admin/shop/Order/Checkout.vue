<template>
    <div>
        <div class="card mx-auto">
            <div class="table">
                <div class="project_table-heading">
                    <p>Item</p>
                    <p>Quantity</p>
                    <p>Price</p>
                    <p>Actions</p>
                </div>
                <!-- item 1 -->
                <div
                    class="project_table-items"
                    v-for="(item, index) in cart"
                    :key="item.id"
                >
                    <p v-text="item.name"></p>
                    <p v-text="item.quantity"></p>
                    <p v-text="cartLineTotal(item)"></p>
                    <div>
                        <button
                            class="btn btn-secondary"
                            @click="$store.commit('removeFromCart', index)"
                        >
                            Remove
                        </button>
                    </div>
                </div>
                <hr />
                <div class="project_table-items">
                    <tr>
                        <p style="margin-right: 100px">Total</p>
                        <p v-text="cartQuantity"></p>
                        <p v-text="cartTotal"></p>
                    </tr>
                </div>
            </div>

            <!--  -->
            <!-- <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in cart" :key=" item.id">
                        <td v-text="item.name"></td>
                        <td v-text="item.quantity"></td>
                        <td v-text="cartLineTotal(item)"></td>
                        <td> <button class="btn btn-primary" @click="$store.commit('removeFromCart', index)">Remove</button></td>
                    </tr>
                    <tr> 
                        <td>Total Amount</td>
                        <td v-text="cartQuantity"></td>
                        <td v-text="cartTotal"></td>
                    </tr>
                </tbody>
            </table> -->
        </div>
        <div class="mx-auto">
            <div class="mt-3">
                <div class="relative">
                    <label for="first_name"> First Name</label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        v-model="customer.first_name"
                    />
                </div>
            </div>
        </div>
        <div class="mx-auto">
            <div class="mt-3">
                <div class="relative">
                    <label for="last_name"> Last Name</label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        v-model="customer.last_name"
                    />
                </div>
            </div>
        </div>
        <div class="mx-auto">
            <div class="mt-3">
                <div class="relative">
                    <label for="email"> Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        v-model="customer.email"
                    />
                </div>
            </div>
        </div>
        <div class="mx-auto">
            <div class="mt-3">
                <div class="relative">
                    <label for="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        v-model="customer.address"
                    />
                </div>
            </div>
        </div>
        <div class="mx-auto">
            <div class="mt-3">
                <div class="relative">
                    <label for="city"> City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        v-model="customer.city"
                        :disabled="paymentProcessing"
                    />
                </div>
            </div>
        </div>
        <div class="mx-auto">
            <div class="mt-3">
                <div class="relative">
                    <label for="state">State</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        v-model="customer.state"
                    />
                </div>
            </div>
        </div>
        <div class="mx-auto">
            <div class="mt-3">
                <div class="relative">
                    <label for="zipcode"> Zip Code</label>
                    <input
                        type="text"
                        id="zipcode"
                        name="zipcode"
                        v-model="customer.zipcode"
                    />
                </div>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="relative">
            <label for="card_element"> Credit Card Information</label>
            <div id="card-element"></div>
        </div>
        <div>
            <button
                class="btn btn-secondary"
                @click="processPayment"
                :disabled="paymentProcessing"
                v-text="paymentProcessing ? 'Processing' : 'Pay Now'"
            ></button>
        </div>
    </div>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";

export default {
    data() {
        return {
            stripe: {},
            cardElement: {},
            customer: {
                first_name: "",
                last_name: "",
                email: "",
                address: "",
                city: "",
                state: "",
                zipcode: "",
            },
            paymentProcessing: false,
        };
    },
    async mounted() {
        this.stripe = await loadStripe("");
        const elements = this.stripe.elements();
        this.cardElement = elements.create("card", {
            classes: {
                base: "input",
            },
        });

        this.cardElement.mount("#card-element");
    },
    methods: {
        cartLineTotal(item) {
            let price = item.price * item.quantity;
            price = price / 100;
            return price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        },
        async processPayment() {
            // send data to stripe
            this.paymentProcessing = true;

            const { paymentMethod, error } =
                await this.stripe.createPaymentMethod(
                    "card",
                    this.cardElement,
                    {
                        billing_details: {
                            name:
                                this.customer.first_name +
                                " " +
                                this.customer.last_name,
                            email: this.customer.email,
                            address: {
                                line1: this.customer.address,
                                city: this.customer.city,
                                state: this.customer.state,
                                postal_code: this.customer.zipcode,
                            },
                        },
                    }
                );

            if (error) {
                this.paymentProcessing = false;
                alert(error);
            } else {
                this.customer.payment_method_id = paymentMethod.id;
                this.customer.amount = this.cart.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                );
                this.customer.cart = JSON.stringify(this.cart);

                axios
                    .post("/api/purchase", this.customer)
                    .then((response) => {
                        this.paymentProcessing = false;
                        this.$store.commit("updateOrder", response.data);
                        // this.$store.dispatch('clearCart');

                        this.$router.push({ name: "ordersummary" });
                    })
                    .catch((error) => {
                        this.paymentProcessing = false;
                        alert(error);
                    });
            }
        },
    },
    computed: {
        cart() {
            return this.$store.state.cart;
        },
        cartQuantity() {
            return this.$store.state.cart.reduce(
                (acc, item) => acc + item.quantity,
                0
            );
        },
        cartTotal() {
            let price = this.cart.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );
            price = price / 100;
            return price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        },
    },
};
</script>
