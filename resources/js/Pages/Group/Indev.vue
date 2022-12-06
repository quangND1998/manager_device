<template>
     <section class="content">
        <ContentHeaderVue :name="'Devices'" />
        <alert :dismissible="true"></alert>
    </section>
    
</template>

<script>
import { Link } from "@inertiajs/inertia-vue";
import Layout from "@/Components/Layout/Layout";
import ContentHeaderVue from "@/Components/Layout/ContentHeader";
import Pagination from "@/Components/Pagination";
import Alert from "@/Components/Alert";
export default {
    layout: Layout,
    components: {
        Link,
        ContentHeaderVue,
        Pagination,
        Alert
    },
}
</script>

<style>

</style>