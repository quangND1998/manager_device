<template>
    <div>
        <breeze-validation-errors class="mb-4" />

        <form @submit.prevent="submit">
            <div>
                <breeze-label for="email" value="Email" />

                <input
                    id="email"
                    type="email"
                    class="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
                    v-model="form.email"
                    required
                    autofocus
                    autocomplete="username"
                    ref="input"
                />
            </div>

            <div class="mt-4">
                <breeze-label for="password" value="Password" />

                <input
                    id="password_confirmation"
                    type="password"
                    class="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
                    v-model="form.password"
                    required
                    autocomplete="new-password"
                    ref="input"
                />
            </div>

            <div class="mt-4">
                <breeze-label for="password_confirmation" value="Confirm Password" />
                <input
                    id="password_confirmation"
                    type="password"
                    class="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
                    v-model="form.password_confirmation"
                    required
                    autocomplete="new-password"
                    ref="input"
                />
            </div>

            <div class="flex items-center justify-end mt-4">
                <breeze-button
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                >Reset Password</breeze-button>
            </div>
        </form>
    </div>
</template>

<script>
import BreezeButton from '@/Components/Button'
import BreezeGuestLayout from "@/Layouts/Guest"
import BreezeInput from '@/Components/Input'
import BreezeLabel from '@/Components/Label'
import BreezeValidationErrors from '@/Components/ValidationErrors'

export default {
    layout: BreezeGuestLayout,

    components: {
        BreezeButton,
        BreezeInput,
        BreezeLabel,
        BreezeValidationErrors,
    },

    props: {
        email: String,
        token: String,
    },

    data() {
        return {
            form: this.$inertia.form({
                token: this.token,
                email: this.email,
                password: '',
                password_confirmation: '',
            })
        }
    },

    methods: {
        submit() {
            this.form.post(this.route('password.update'), {
                onFinish: () => this.form.reset('password', 'password_confirmation'),
            })
        },
        focus() {
            this.$refs.input.focus()
        }

    }
}
</script>
