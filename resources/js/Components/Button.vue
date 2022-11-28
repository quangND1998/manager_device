<template>
    <button :type="type" :disabled="loading"  class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150">
        <div v-if="loading" class="btn-spinner mr-2" />
        <slot />
    </button>
</template>

<script>
    export default {
        props: {
            loading: Boolean,
            type: {
                type: String,
                default: 'submit',
            },
        }
    }
</script>
