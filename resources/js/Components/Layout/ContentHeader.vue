<template>
  <section class="content-header">
    <h1>{{name.toUpperCase() }}</h1>
    <ol class="breadcrumb">
      <li>
        <a href="javascript:;">
          <i class="fa fa-home"></i>Home
        </a>
      </li>
      <li class="active">{{ name.toUpperCase()}}</li>
    </ol>
  </section>
</template>

<script>
export default {
  props: {
    name
  }
};
</script>

<style>
</style>