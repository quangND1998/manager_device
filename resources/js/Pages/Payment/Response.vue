<template>
    <section class="content">
        <ContentHeaderVue :name="'Order '" />
        <alert :dismissible="true"></alert>
        <div class="container mx-auto mt-10 items-center">
            <div class="flex shadow-md my-10 w-2/5 items-center">
                <div class="w-full bg-white px-10 py-10 items-center m-2">
                    <div class="flex flex-col items-center justify-between border-b pb-8 text-green-600/100">
                        <h1 class="font-semibold text-4xl "> {{ state }} !</h1>
                        <svg aria-hidden="true" class="m-4 flex-shrink-0 w-14 h-14 text-green-600 dark:text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>

                    </div>
                    <div id="summary" class="w px-8 py-10">
                        <div class="flex justify-between mt-10">
                            <span class="font-semibold text-2xl ">Payment type</span>
                            <span class="font-semibold text-2xl">Net banking</span>
                        </div>
                        <div class="flex justify-between mt-10">
                                <span class="font-semibold text-2xl ">Customer Name</span>
                                <span class="font-semibold text-2xl">{{ form.user.name }}</span>
                            </div>
                            <div class="flex justify-between mt-10">
                                <span class="font-semibold text-2xl ">Email</span>
                                <span class="font-semibold text-2xl">{{ form.user.email }}</span>
                            </div>
                            <div class="flex justify-between mt-10">
                                <span class="font-semibold text-2xl uppercase">Amount paid</span>
                                <span class="font-semibold text-2xl"><strong>$ {{ formatPrice(data.vpc_Amount)}}</strong></span>
                            </div>
                            <div class="flex justify-between mt-10">
                                <span class="font-semibold text-2xl">Transaction id</span>
                                <span class="font-semibold text-2xl">{{  data.vpc_NetworkTransactionID}}</span>
                            </div>
                        <!-- <div class="py-10">

                        </div> -->
                        <div class="border-t mt-8 flex justify-center items-center py-10">
                            <button
                                class="bg-blue-500 font-semibold hover:bg-indigo-600 py-3 text-2xl text-white uppercase m-2 p-5"
                                >Detail</button>

                            <button
                                class="bg-blue-500 font-semibold hover:bg-indigo-600 py-3 text-2xl text-white uppercase m-2 p-5"
                                >Close</button>
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
    props:{
        data : Array,
        state : Text
    },
    data() {
        return {
            form:this.$inertia.form({
                user : this.$page.props.auth.user,
                data : this.data,
                state : this.state
            })
        }
    }
};
</script>

<style>

</style>
