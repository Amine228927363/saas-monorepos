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
const options=['Edit', 'Viewer']
</script>

<template>
  <!-- ====== Table Section Start -->
  <section class="flex flex-col  bg-white dark:bg-dark">
    <div class="container w-full">
      <div class="flex flex-row items-center justify-center">
        <div class="flex flex-col w-full h-[480px]">
          <div>
            <h1 class="font-bold text-2xl">Staff Members</h1>
            <table class="w-full">
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
                  <td class="py-4 px-6">
                    <!-- Bouton pour inscrire -->
                    <a href="#" class="inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium">
                      Edit
                    </a>
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
