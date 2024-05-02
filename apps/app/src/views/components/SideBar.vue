<template>
  <div class="flex">
    <div
      :class="isOpen ? 'w-40' : 'w-60'"
      class="flex flex-col h-screen p-3 duration-300 bg-gray-800 shadow"
    >
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-white">Dashboard</h2>
          <button @click="isOpen = !isOpen">
            <Menu color="white"/>
          </button>
        </div>
        <div class="relative">
          <span class="absolute inset-y-0 left-0 flex items-center py-4">
            <button type="submit" class="p-2 focus:outline-none focus:ring">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </span>
          <input
            type="search"
            name="Search"
            placeholder="Search..."
            class="w-full py-2 pl-10 text-sm rounded-md focus:outline-none"
          />
        </div>
        <div class="flex-1">
          <ul class="pt-2 pb-4 space-y-1 text-sm">
            <li class="rounded-smb hover:bg-slate-500">
              <router-link class="flex items-center p-2 space-x-3 rounded-md" to="/home">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-gray-100"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>

              <span class="text-gray-100">Home</span>

              </router-link> 
        
             
            </li>
            <li class="rounded-sm hover:bg-slate-500">
              <router-link class="text-white flex items-center p-2 space-x-3 rounded-md" to="/workspace">
                <UserRound color=""white></UserRound>
                <span class="text-gray-100">Clients</span>
              </router-link> 
               
               
             
            </li>
            <li class="rounded-sm hover:bg-slate-500">
              <router-link class="flex items-center p-2 space-x-3 rounded-md" to="/task">

                <ListChecks color="white"></ListChecks>

                <span class="text-gray-100"> Tasks</span>
             

              </router-link>
              
            </li>
            <li class="rounded-sm hover:bg-slate-500">
              <a href="#" class="flex items-center p-2 space-x-3 rounded-md">
                <Settings color="white"/>

                <span class="text-gray-100"> Settings </span>
              </a>
            </li>
            <li class="rounded-sm hover:bg-slate-500">
              <Button class="flex items-center p-2 space-x-3 rounded-md" @click="authStore.logout()">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 text-gray-100"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>

                <span class="text-gray-100"> Logout </span>
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import {ListChecks,UserRound,Settings,Menu} from 'lucide-vue-next'
const isOpen = ref(false)
const date = ref()
const authStore=useAuthStore()

</script>
