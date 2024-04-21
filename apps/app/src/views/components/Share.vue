<script setup lang="ts">
import { ref } from 'vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Link } from 'lucide-vue-next';
const options=['Edit', 'Viewer']
const tableData = ref([
  {
    name:"Mehdi",
    email:"mehdi@gmail.com",
    role:"developer"
  },
  {
    name:"Raed",
    email:"Raed@gmail.com",
    role:"developer"
  },
  {
    name:"Nassim",
    email:"nassim@gmail.com",
    role:"developer"
  },
  {
    name:"Sofienne",
    email:"sofienne@gmail.com",
    role:"developer"
  },
])
function generateAvatarUrl(name:string) {
    if (!name || name.trim().length === 0) {
        return 'a';
    }
    const firstLetter = name.trim().charAt(0).toUpperCase();
    const avatarUrl = `https://ui-avatars.com/api/?name=${name}`;
    
    return avatarUrl;
}

</script>

<template>
  <!-- ====== Table Section Start -->
  <section class="flex flex-col  bg-white dark:bg-dark">
    <div class="container w-full">
      <div class="flex flex-row items-center justify-center">
        <div class="flex w-full h-[680px]">
          <div>
            <h1 class="font-bold text-2xl">Share Table </h1>
            <div class="flex flex-row items-center m-8 justify-between">
                <div class="flex flex-row items-center">
                  <input type="email" class=" h-10  border rounded-md p-4 text-sm w-full" placeholder="Email address">
                  <div class="relative">
                    <select  class="flex flex-col px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none
                    focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                       <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
                     </select>
                  </div>
                </div>
                <Button class="bg-red-400 text-white rounded h-8  w-24 mx-4 px-4 hover:bg-red-600">Share</Button>
              </div>
              
              <div class="flex flex-row px-8 border-b  ">
                <div class="w-12 h-12 flex items-center justify-center rounded bg-gray-100"> <Link></Link> 
                </div>
                <span class="flex flex-col px-4">Anyone Using the Link Can
                    <Button class="text-blue-500 decoration text-sm">Copy link</Button>
                </span>
                <select  class=" text-center px-4 right-0 translate-x-24  h-8 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none
           focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
            </select>
                
              </div>
            
            <table class="w-full m-4">
              <tbody>
                <tr v-for="(item, index) in tableData" :key="index" class="border-b border-gray-200">
                  <td class="py-4  flex items-center">
                    <!-- Avatar -->
                    <div class="avatar mr-2">
                      <img :src="generateAvatarUrl(item.name)" alt="avatar" class="w-8 h-8 rounded-full" />
                    </div>
                    <!-- Nom -->
                    <div class="flex flex-col">
                      <span class="font-semibold text-xl">{{ item.name }}</span>
                      <span class="text-gray-500">{{ item.email }}</span>
                    </div>
                  </td>
                  <td class="py-4 px-6">{{ item.role }}</td>
                  <td class="py-4 px-6">
                    <select  class="flex flex-col px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none
           focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
            </select>
                    
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <!-- ====== Table Section End -->
</template>
