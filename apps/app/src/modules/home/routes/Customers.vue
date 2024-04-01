<template>
   <privateView>
      <div v-if="showCustomerForm" class="fixed inset-0 bg-gray-900 bg-opacity-80 z-50"></div>
      <div v-if="showTask" class="fixed inset-0 bg-gray-900 bg-opacity-80 z-50"></div>
      <div class="container flex flex-col">
         <div class="flex  flex-row px-2 py-5   sp">
            <Button class="flex  text-white bg-gray-800 hover:bg-gray-600 focus:outline-none 
         font-medium rounded-md text-sm  pl-4 py-2.5 text-center *
             me-2 dark:bg-blue-600 dark:hover:bg-green-700 dark:focus:ring-green-800" @click="toggleForm">
               <span class="flex flex-row mr-4">
                  <Plus class="mr-2"></Plus>customer
               </span>

            </Button>

            <Search @search="handleSearch" class="relative left-8 shadow px-4 w-1/3 " />
         </div>

         <!--create customer form -->
         <div
            class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-md z-50"
            v-if="showCustomerForm">
            <CustomerForm :toggleForm="toggleForm" :showCustomerForm="showCustomerForm"  class=" h-full"></CustomerForm>
            <button @click="toggleForm" class="absolute right-0 top-0 bg-red-600 w-4">
               <X color="white" size="16"></X>
            </button>
         </div>
        
       <!--task component -->
       <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-md z-50" v-if="showTask">
         <Tasks :customerId="customerId" />
         <button @click="showTask=!showTask" class="absolute right-0 top-0 bg-red-600 w-4">  <X color="white" size="16"></X></button>
          
       </div>

         <KanbanBoard @showTasks="handleShowTasks"></KanbanBoard>
      </div>
   </privateView>
</template>
<script setup>
import { Plus, X } from 'lucide-vue-next'
import { ref, watch,defineEmits } from 'vue';
import CustomerForm from '@/views/components/CreateCustomerForm.vue'
import { toggleCustomerForm } from '@/utils/toggleCustomerForm';
const { showCustomerForm, toggleForm } = toggleCustomerForm();
const searchTerm = ref('');
const handleSearch = (searchTerm) => {
   console.log('Search term:', searchTerm);
};
const showTask = ref(false);
const customerId = ref(null);
const handleShowTasks = (cardId) => {
  showTask.value = true;
  customerId.value = cardId;
  console.log('customer',customerId);
};
</script>
<style lang="">

</style>