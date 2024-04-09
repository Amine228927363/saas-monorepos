<template>
    <nav
      class="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 "
    >
      <div
        class="container px-4 mx-auto flex flex-wrap items-center justify-between"
      >
        <div
          class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
        >
          <a
            class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
            href="#"
            >Customer Onboard</a
          ><button
            class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            v-on:click="toggleNavbar()"
          >
          <span class="text-white">close</span>
          </button>
        </div>
        <div
          class="lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none"
          v-bind:class="{'hidden': !showMenu, 'block': showMenu}"
        >
          
          <ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li class="flex items-center">
              <router-link class="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
               to="/login"><span class=" inline-block ml-2">Login</span></router-link>
                

            </li>
            
            <li class="flex items-center">
                <router-link to="register">
                    <button
                    class="bg-white text-gray-800 active:bg-gray-100 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"
                    type="button"
                    style="transition: all 0.15s ease 0s;"
                  >
                     Get Started
                  </button>
                </router-link>
             
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  <script setup>
import { ref } from 'vue';

const showMenu = ref(false);

const toggleNavbar = () => {
  showMenu.value = !showMenu.value;
};
</script>
