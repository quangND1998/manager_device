<template>
    <section class="content">
        <ContentHeaderVue :name="'Order '" />
        <alert :dismissible="true"></alert>
        <div class="container mx-auto mt-10">
            <div class="flex shadow-md my-10">
                <div class="w-full bg-white px-10 py-10">
                    <div class="flex justify-between border-b pb-8">
                        <h1 class="font-semibold text-2xl">CART SUMMARY</h1>

                    </div>
                    <div id="summary" class="w px-8 py-10">
                        <!-- <h1 class="font-semibold text-2xl border-b pb-8">Company Information</h1> -->
                        <div class="flex justify-between mt-10">
                            <span class="font-semibold text-2xl uppercase">Company name </span>
                            <span class="font-semibold text-2xl">Holomia Technology Company Limited</span>
                        </div>
                        <div class="flex justify-between mt-10">
                            <span class="font-semibold text-2xl uppercase">Company Address</span>
                            <span class="font-semibold text-2xl">Tầng 3 tòa Hà Thành Plaza, 102 Thái Thịnh, Phường Trung
                                Liệt, Quận Đống Đa, Hà Nội</span>
                        </div>
                        <div class="flex justify-between mt-10">
                            <span class="font-semibold text-2xl uppercase">Tel</span>
                            <span class="font-semibold text-2xl">+84 24 22149915</span>
                        </div>
                        <div class="flex justify-between mt-10">
                            <span class="font-semibold text-2xl uppercase">Email</span>
                            <span class="font-semibold text-2xl">hello@holomia.com</span>
                        </div>
                        <div class="flex justify-between mt-10">
                            <span class="font-semibold text-2xl uppercase">Website</span>
                            <span class="font-semibold text-2xl">www.holomia.com</span>
                        </div>

                        <div class="py-10">
                            <div class="flex justify-between mt-10">
                                <span class="font-semibold text-2xl uppercase">Customer Name</span>
                                <span class="font-semibold text-2xl">{{ form.user.name }}</span>
                            </div>
                            <div class="flex justify-between mt-10">
                                <span class="font-semibold text-2xl uppercase">Email</span>
                                <span class="font-semibold text-2xl">{{ form.user.email }}</span>
                            </div>
                            <div class="flex justify-between mt-10">
                                <span class="font-semibold text-2xl uppercase">Product</span>
                                <span class="font-semibold text-2xl">{{ item.item.name }} , Number device: {{
                                    item.number_device
                                }}, Expiry date: {{ item.item.package_time }}</span>
                            </div>
                            <div class="flex justify-between mt-10">
                                <span class="font-semibold text-2xl uppercase">Amount</span>
                                <span class="font-semibold text-2xl">${{ item.price }} ~ <span class="mr-24">  {{
                                    formatPrice(item.price * 25030)
                                }} VND</span> </span>

                                <span>Exchange Rate: USD 1.00 = VND 25,030</span>
                            </div>
                            <div class="flex justify-between mt-10">
                                <strong><em>Terms And Conditions</em></strong>
                                <textarea id="termofpolicy" rows="2" cols="100%" style="width:90%" class="text-2xl">
                            PAYMENT TERMS
                            The use of the MissionX VR Services, especially the creation of an Account, is free of charge unless otherwise stated. The basic version of the MissionX VR Services can be used indefinitely and without restrictions in function unless otherwise stated, without prejudice to Holomia's right to withdraw the MissionX VR Services.
                            Some additional features are only available for paying Users. Payments are in general made via payment providers. When making payments, please make sure to carefully read and agree to the terms and conditions of such payment providers beforehand. You can find more information about the payment providers, their terms and conditions and their privacy policy on their respective websites.
                            You will be informed separately in each case about the object of the purchase, the function and the features of such object, the duration of availability of such object (if any), the purchase price and the available payment method. The respective payments are due upon the execution of the purchase agreement. In case of default the statutory interest accrues. Holomia is also entitled to block the user account, to recover damages and to terminate services.
                            Some MissionX VR Services may require payment of a subscription fee. You must have an Account and pay the subscription or other fees to participate in these activities. For information about subscription and other fees for particular services check the Holomia website. FEES ARE PAYABLE IN ADVANCE AND ARE NOT REFUNDABLE IN WHOLE OR IN PART. Holomia reserves the right to change our fees or billing methods at any time. If you pay a periodic (e.g. monthly) subscription for a MissionX VR Service, Holomia will provide you with notice of any changes to the fees or billing methods at least thirty (30) days in advance by posting such changes on the MissionX VR Service. You are responsible for reviewing the MissionX VR Service to obtain timely notice of such changes. Your continued use of the MissionX VR Service thirty (30) days or more after posting of the changes means that you accept such changes. If any change is unacceptable to you, you may cancel your subscription at any time, but Holomia will not refund any fees that may have accrued to your Account before cancellation of your subscription, and we will not prorate fees for any subscription. If your use of MissionX VR Services is subject to use or sales tax, then Holomia may also charge you for any such taxes, in addition to the subscription or other fees. For further information please contact us by visiting MissionX VR's customer service.
                            Payment Options
                            You may pay fees using the methods available for the particular MissionX VR Service and you agree to the terms and conditions applicable to each payment method you choose. Payment methods may vary by MissionX VR Service. When you provide credit card or other payment information to Holomia and/or its payment providers, you represent to Holomia and/or its payment providers that you are the authorized user of the credit card or other payment method. By agreeing to the MissionX VR’s Terms of Use you have agreed to permit Holomia and/or its payment providers to automatically renew your subscription to a MissionX VR Service by charging a valid credit card number which you have provided to Holomia. Your subscription will be automatically renewed seven (07) days prior to the expiration of the term and each anniversary thereafter for a fee no greater than MissionX VR's then-current price, excluding any promotional and discount pricing, unless you cancel your subscription. You must provide current, complete, and accurate information for your billing account. You must promptly update all information to keep your billing account current, complete, and accurate (such as a change in billing address, credit card number, or credit card expiration date), and you must promptly notify Holomia and/or its payment providers if your credit card is canceled (for example, for loss or theft). Changes to such information can be made by contacting MissionX VR's or the payment provider's customer service (as applicable). If you fail to provide Holomia any of the foregoing information, you agree that Holomia may continue charging you for any subscription automatically renewed unless you cancel your subscription at least seven (07) days prior to the expiration of the subscription. Holomia reserves the right to utilize third party credit card updating services to obtain current expiration dates on credit cards provided by you to MissionX VR. Customers who use a payment method other than credit card may incur an additional payment processing fee, and may not be able to automatically renew subscriptions. For further information please contact us by visiting MissionX VR's customer service. As the Account holder, you are responsible for all charges incurred, including applicable taxes, and all purchases made by you or anyone that uses your Account, including your family or friends. This means that, unless your account or payment information is obtained unlawfully or fraudulently by someone other than those authorized by you to use your Account, you will be responsible for all usage and purchases on your Account.
                            Trial Subscriptions
                            For some MissionX VR Services, Holomia may offer a free trial subscription. If you accept a free trial subscription, Holomia will begin to bill your Account for that MissionX VR Service when the free trial subscription expires, unless you cancel your subscription before that time. You are always responsible for any internet service provider, telephone, wireless and other connection fees that you may incur when using MissionX VR Services, even when we offer a free trial subscription. Trial subscriptions are not transferable.
                            Fees Charged By Third-Party Sites and Vendors
                            We may provide links to other websites. Some of these websites may charge separate fees which are not included in any subscription or other fees that you may pay to Holomia. Any separate charges or obligations that you incur in your dealings with third parties are your responsibility.

                        </textarea>
                            </div>
                        </div>
                        <div class="border-t mt-8">
                            <div class="flex font-semibold justify-between py-6 text-2xl uppercase">
                                <span>Total cost</span>
                                <span>${{ formatPrice(item.price) }}</span>
                            </div>
                            <a href="/topup/gate">
                                <button
                                class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-2xl text-white uppercase w-full"
                                >Checkout</button>
                            </a>
                            <!-- <button
                                class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-2xl text-white uppercase w-full">Checkout</button> -->
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
        item: Object
    },
    data() {
        return {
            form: this.$inertia.form({
                user: this.$page.props.auth.user,
                cart: this.cart,
                item: this.item,
            })
        }
    }
};
</script>

<style>

</style>
