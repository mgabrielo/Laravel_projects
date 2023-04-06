<template>
    
    <div>
      <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Register</h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <router-link :to="{name: 'LogIn'}" class="font-medium text-indigo-600 hover:text-indigo-500">
          log in to your acount</router-link>
      </p>
    </div>
    <form class="mt-8 space-y-6" @submit="register">
      <input type="hidden" name="remember" value="true">
      <div class="-space-y-px rounded-md shadow-sm">
        <div>
          <label for="name" class="sr-only">Full Name</label>
          <input id="name" name="name" type="name" autocomplete="name" v-model="user.name" required class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
           placeholder="Full Name">
        </div>
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input id="email-address" name="email" type="email" autocomplete="email" v-model="user.email" required class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" 
          placeholder="Email address">
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input id="password" name="password" type="password" autocomplete="current-password" v-model="user.password" required class="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
           placeholder="Password">
        </div>
        <div>
          <label for="password_confrimation" class="sr-only">Password Confirmation</label>
          <input id="password_confrimation" name="password_confrimation" type="password" v-model="user.password_confrimation" autocomplete="current-password_confrimation" required class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
           placeholder="Password Confrimation">
        </div>
      </div>


      <div>
        <button type="submit" class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
            </svg>
          </span>
          Sign Up
        </button>
      </div>
    </form>

</template>

<script setup>
import store from "../store";
import {useRouter} from "vue-router";
import axios from "axios";
import { ref } from "vue";

const router = useRouter();
const user =ref({
  name: '',
  email: '',
  password: '',
  password_confrimation: '',
});


// const register = async()=>{
//   await axios.post('/api/register', {
//     name : user.value.name,
//     email: user.value.email,
//     password: user.value.password,
//     password_confrimation: user.value.password_confrimation
//   } )
//   router.push('/');
// }
const register = async(ev)=>{
  ev.preventDefault();
 await store.dispatch('register', user).then(()=>{
  router.push('/');
 })
  
}
</script>

<style>

</style>