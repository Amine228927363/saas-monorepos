<template>
   <privateView class="">
      <div v-if="showCustomerForm" class="fixed inset-0 bg-gray-900 bg-opacity-80 z-50"></div>
      <div v-if="showTask" class="fixed inset-0 bg-gray-900 bg-opacity-80 z-50"></div>
      <div v-if="showTaskCreate" class="fixed inset-0 bg-gray-900 bg-opacity-80 z-50"></div>
      <div v-if="stuffShow" class="fixed inset-0 bg-gray-900 bg-opacity-80 z-50"></div>
      <div v-if="shareShow" class="fixed inset-0 bg-gray-900 bg-opacity-80 z-50"></div>
      <div class="container flex flex-col">
         <div class="flex flex-row justify-between items-center px-2 py-5 sp">
            <Button class=" text-white bg-red-400 hover:bg-gray-600 focus:outline-none 
             font-medium rounded-md text-sm  pl-4 py-2.5 text-center *
             me-2 dark:bg-blue-600 dark:hover:bg-green-700 dark:focus:ring-green-800" @click="toggleForm">
               <span class="flex flex-row mr-4">
                  <Plus class="mr-2"></Plus>customer
               </span>

            </Button>
            <span class=" px-8  font-xxl font-bold "><svg xmlns="http://www.w3.org/2000/svg" fill="black" class="inline h-4 mx-2 w-4 " data-name="Layer 1" viewBox="0 0 24 24"  id="edit"><path d="M3.5,24h15A3.51,3.51,0,0,0,22,20.487V12.95a1,1,0,0,0-2,0v7.537A1.508,1.508,0,0,1,18.5,22H3.5A1.508,1.508,0,0,1,2,20.487V5.513A1.508,1.508,0,0,1,3.5,4H11a1,1,0,0,0,0-2H3.5A3.51,3.51,0,0,0,0,5.513V20.487A3.51,3.51,0,0,0,3.5,24Z"></path><path d="M9.455,10.544l-.789,3.614a1,1,0,0,0,.271.921,1.038,1.038,0,0,0,.92.269l3.606-.791a1,1,0,0,0,.494-.271l9.114-9.114a3,3,0,0,0,0-4.243,3.07,3.07,0,0,0-4.242,0l-9.1,9.123A1,1,0,0,0,9.455,10.544Zm10.788-8.2a1.022,1.022,0,0,1,1.414,0,1.009,1.009,0,0,1,0,1.413l-.707.707L19.536,3.05Zm-8.9,8.914,6.774-6.791,1.4,1.407-6.777,6.793-1.795.394Z"></path></svg>Onboarding Table </span>
            <div class="ml-2/3 flex   right-0 top-0 ">
            <Button class="flex  text-gray-500 bg-white border hover:bg-gray-100 focus:outline-none 
            font-medium rounded-md text-sm  pl-4 py-2.5 px-3 text-center *
            me-2 dark:bg-blue-600 dark:hover:bg-green-700 dark:focus:ring-green-800" @click="toggleStaff"><UsersRound class="" size="18px"></UsersRound>Staff</Button>
            <Button class="flex  text-white bg-red-400 hover:bg-gray-600 focus:outline-none 
            font-medium rounded-md text-sm  pl-4 py-2.5 px-3 text-center *
            me-2 dark:bg-blue-600 dark:hover:bg-green-700 dark:focus:ring-green-800" @click="toggleShare">Share<UserPlus size="18px"></UserPlus></Button>



            </div>
         </div>

         <!--create customer form -->
         <div
            class="fixed top-0 right-0 transform -translate-x-0 -translate-y-0  h-full w-2/3 bg-white p-6 rounded shadow-md z-50"
            v-if="showCustomerForm">
            <CustomerForm :toggleForm="toggleForm" class=" h-full"></CustomerForm>
            <button @click="toggleForm" class="absolute left-0 top-0  w-6 rounded-full">
               <X color="gray" size="24"></X>
            </button>

         </div>
         <!--create task card -->

         <transition name="slide-right">
            <div v-if="showTaskCreate"
               class="fixed top-0 right-0 transform -translate-x-0 -translate-y-0  h-full w-2/3 bg-white p-6 rounded shadow-md z-50">
               <button @click="showTaskCreate=!showTaskCreate" class="absolute left-0 top-0 bg-white rounded-full">
                  <X color="gray" size="24"></X>
               </button>
               <CreateTask :customerId="customerId" />
            </div>

         </transition>

         <!--task component -->
         <div
            class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-md z-50"
            v-if="showTask">
            <Button @click="createTask" class="flex flex-row  mx-2 px-2 py-2  bg-slate-900 rounded">
               <Plus color="white" /> <span class="text-white"> Add Task</span>
            </Button>
            <Tasks :customerId="customerId" :showTaskCreate="showTaskCreate" />
            <button @click="showTask=!showTask" class="absolute right-0 top-0 bg-red-600 w-4">
               <X color="white" size="16"></X>
            </button>
         </div>
<!--stuff members -->
<div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-md z-50"
v-if="stuffShow">
<Stuff class=""></Stuff>
<button @click="toggleStaff" class="absolute right-0 top-0 bg-red-600 w-4">
   <X color="white" size="16"></X>
</button>
</div>
<!--share component-->
<div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-md z-50"
v-if="shareShow">
<Share class=""></Share>
<button @click="toggleShare" class="absolute right-0 top-0 bg-red-600 w-4">
   <X color="white" size="16"></X>
</button>
</div>
         <KanbanBoard @showTasks="handleShowTasks"></KanbanBoard>
      </div>
   </privateView>
</template>
<script setup lang="">
import { Plus, X,UserPlus,UsersRound } from 'lucide-vue-next'
import { ref, watch,defineEmits } from 'vue';
import CustomerForm from '@/views/components/CreateCustomerForm.vue'
import CreateTask from '@/views/components/CreateTask.vue'
import { toggleCustomerForm } from '@/utils/toggleCustomerForm';
import Stuff from '@/views/components/Staff.vue'
import Share from '@/views/components/Share.vue'
const { showCustomerForm, toggleForm } = toggleCustomerForm();
import EditButton from '@/views/components/EditButton.vue'
const showTaskCreate=ref(false);
const showTask = ref(false);
const stuffShow = ref(false);
const shareShow = ref(false);
const customerId = ref(null);
const status = ref(null);
const createTask = ()=>{
   try {
      showTask.value=false;
   showTaskCreate.value=true;
   } catch (error) {
      console.log(error.message);
   }
 
}
const toggleStaff=()=>{
   stuffShow.value=!stuffShow.value
}
const toggleShare=()=>{
   shareShow.value=!shareShow.value
}

const handleShowTasks = (cardId) => {
  showTask.value = true;
  customerId.value = cardId;
  console.log('customer',customerId);
};
</script>
<style lang="scss">
.slide-right-enter-active, .slide-right-leave-active {
   transition: transform 0.3s ease;
 }
 .slide-right-enter, .slide-right-leave-to {
   transform: translateX(50%);
 }
</style>