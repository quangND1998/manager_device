<template>
  <div
    class="max-w-xl bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mb-8"
  >
    <div class="flex justify-end px-8 pt-8">
      <div
        id="dropdown"
        class="hidden z-10 w-50 text-xl list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
      >
        <ul class="py-1" aria-labelledby="dropdownButton">
          <li>
            <a
              href="#"
              class="block py-2 px-4 text-xl text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >Edit</a>
          </li>
         
        </ul>
      </div>
    </div>
    <div class="flex flex-col items-center pb-10">
      <img class="mb-3 w-36 h-36 rounded-full shadow-lg" src="assets/img/profile.jpg" />
      <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{{user.name}}</h5>
      <span class="text-xl text-gray-500 dark:text-gray-400"><strong>Email</strong>: {{user.email}}</span>
 
      <div class="flex flex-wrap">
          <strong>Roles</strong>:
          <span v-for="(role,index) in user.roles" :key="index" class="text-xl inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-200 text-gray-700 rounded-full"> {{role.name}}</span>
      </div>
    
      <div class="flex mt-4 space-x-3 lg:mt-6">
      
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    user:Object
  }


};
</script>

<style>
</style>