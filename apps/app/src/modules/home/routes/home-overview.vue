<script setup lang="">
import { ref, onMounted, computed } from 'vue'
import { Trash, ListTodo } from 'lucide-vue-next';
import Customers from '@/views/components/CustomerTableHome.vue'
import Time from '@/views/components/Time.vue'
import { useCustomerStore } from '@/stores/customer';
import { useTaskStore } from '@/stores/task';
import ChartGraph from '@/views/components/ChartGraph.vue'
const taskStore = useTaskStore();
const customerStore = useCustomerStore();
const numTasks=ref()
const numCustomers = computed(() => customerStore.totalCustomers);
const totalTask=async ()=>{
  await taskStore.getAllTasks();
   numTasks.value= taskStore.tasks.length;
  console.log(numTasks);
}
onMounted(() => {
  customerStore.getCustomers();
  totalTask();

});
</script>
<template>
  <privateView>
    <div >
      <div class="flex flex-row ">
        <h3 class="text-3xl font-medium text-gray-700">
        <img src="@/assets/images/logo3.png" alt="Route Genius" height="150" width="190" >
      </h3>
      <Time class="inline mx-11 translate-y-4"></Time>
    </div>
      <div class="mt-4">
       
        <div class="flex flex-wrap -mx-6">
          <div class="w-full px-6 sm:w-1/2 xl:w-1/3">
            <div class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
              <div class="p-3 bg-indigo-600 bg-opacity-75 rounded-full">
                <svg class="w-8 h-8 text-white" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                    fill="currentColor" />
                  <path
                    d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                    fill="currentColor" />
                  <path
                    d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                    fill="currentColor" />
                  <path
                    d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                    fill="currentColor" />
                  <path
                    d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                    fill="currentColor" />
                  <path
                    d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                    fill="currentColor" />
                </svg>
              </div>

              <div class="mx-5">
                <h4 class="text-2xl font-semibold text-gray-700">
                  {{ numCustomers }}
                </h4>
                <div class="text-gray-500">
                  Customers
                </div>
              </div>
            </div>
          </div>

          <div class="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
            <div class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
              <div class="p-3 bg-blue-600 bg-opacity-75 rounded-full">
                <ListTodo size="32" color="white"></ListTodo>
              </div>

              <div class="mx-5">
                <h4 class="text-2xl font-semibold text-gray-700">
                  {{ numTasks }}
                </h4>
                <div class="text-gray-500">
                  Total Tasks
                </div>
              </div>

            </div>

          </div>
          <!-- Date and Time Section -->
         
      <div class="h-2/3  rounded-md ">
        <ChartGraph class="w-2/3 h-2/3"></ChartGraph></div>
       
        </div>
      </div>
      <Customers class=""></Customers>
      
      
    </div>
  </privateView>
</template>
