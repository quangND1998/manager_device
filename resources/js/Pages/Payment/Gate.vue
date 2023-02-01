<template>
    <section class="content">
        <ContentHeaderVue :name="'Order '" />
        <alert :dismissible="true"></alert>
        <div class="container mx-auto mt-10">
            <div class="flex shadow-md my-10">
                <div class="w-full bg-white px-10 py-10">
                    <div class="flex justify-between border-b pb-8">
                        <h1 class="font-semibold text-2xl">CHECKOUT</h1>

                    </div>
                    <div id="summary" class="w px-8 py-10">
                        <div class="flex justify-around payment-method">
                            <div class="flex justify-between mt-10">
                                <label for="card" class="method card">
                                    <div class="card-logos">
                                        <img src="/static/img/onepay.png"/>
                                    </div>

                                    <div class="radio-input">
                                        <input id="onepay" type="radio" v-model="form.gate" value="onepay" class="payment">
                                    </div>
                                    </label>

                            </div>
                            <div class="flex justify-between mt-10">
                                <label for="paypal" class="method paypal">
                                    <div class="card-logos">
                                        <img src="/static/img/paypal_logo.png"/>
                                        <img src="/static/img/mastercard_logo.png"/>
                                    </div>
                                    <div class="radio-input">
                                        <input id="paypal" type="radio" v-model="form.gate" value="paypal" class="payment" >

                                    </div>
                                    </label>
                            </div>
                        </div>
                        <div class="border-t mt-8">
                            <a href="/payment/order">
                            <!-- <a> -->
                                <button
                                class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-2xl text-white uppercase w-full"
                                >Checkout</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { Link } from "@inertiajs/inertia-vue";
import Layout from "@/Components/Layout/Layout";
import ContentHeaderVue from "@/Components/Layout/ContentHeader";
import Alert from "@/Components/Alert";
export default {
    layout: Layout,
    components: {
        Link,
        Alert,
        ContentHeaderVue
    },
    props: {
        cart: Array,
        item: Object,
        gate : Text
    },
    data() {
        return {
            form: this.$inertia.form({
                user: this.$page.props.auth.user,
                cart: this.cart,
                item: this.item,
                gate: "onepay"
            })
        }
    },
    methods:{
        checkout(){
            console.log(this)
            this.form.get(route("payment.order"), {
                preserveState: true,
                onError: errors => {
                },
                onSuccess: page => {
                }
            });
        }
    }
};
</script>

<style>

</style>
