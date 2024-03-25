<template >
   <privateView>
      <div v-if="showCustomerForm" class="fixed inset-0 bg-gray-900 bg-opacity-80 z-50"></div>
    <div class="container flex flex-col"> 
      <div class="flex justify-between px-4 py-8   sp"><Button class="flex  text-white bg-gray-800 hover:bg-gray-600 focus:outline-none 
         font-medium rounded-md text-sm  pl-4 py-2.5 text-center *
             me-2 dark:bg-blue-600 dark:hover:bg-green-700 dark:focus:ring-green-800" @click="toggleForm">
             <span class="flex flex-row mr-4"> <Plus class="mr-2"></Plus>customer
             </span>
            
            </Button>
             
    <Search class="w-full"/>
             </div>

   <!--create customer form -->
   <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-md z-50" 
   v-if="showCustomerForm" >
    <CustomerForm class=" h-full" ></CustomerForm>
    <button @click="toggleForm" class="absolute right-0 top-0 bg-red-600 w-4"><X color="white" size="16"></X></button>
   </div>
    





      <KanbanBoard></KanbanBoard>
   </div>
   </privateView>
</template>
<script setup >
import {Plus,X } from 'lucide-vue-next'
import { ref } from 'vue';
import CustomerForm from '@/views/components/CreateCustomerForm.vue'
import { toggleCustomerForm } from '@/utils/toggleCustomerForm';
const {showCustomerForm, toggleForm}= toggleCustomerForm();
</script>
<style lang="">
    
</style>