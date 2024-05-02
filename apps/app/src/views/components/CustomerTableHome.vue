<template>
  <div class="flex flex-col mt-8">
    <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
        <table class="min-w-full">
          <thead>
            <tr>
              <th
                class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                Name
              </th>
              <th
                class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                Company
              </th>
              <th
                class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                Status
              </th>
              <th
                class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                Progress
              </th>
              <th class="px-6 py-3 border-b border-gray-200 bg-gray-50">
                <div class=" w-[400px]">
                  <Search @search="handleSearch" class="relative left-8 shadow px-4 w-full " />
                </div>
              </th>
            </tr>
          </thead>

          <tbody class="bg-white">
            <tr v-for="(customer, index) in customerList" :key="index" class="hover:bg-gray-50">
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 w-10 h-10">
                    <img class="w-10 h-10 rounded-full"
                      :src="generateAvatarUrl(customer.name)"
                      alt="">
                  </div>

                  <div class="ml-4">
                    <div class="text-sm font-medium leading-5 text-gray-900">{{ customer.name }}</div>
                    <div class="text-sm leading-5 text-gray-500">{{ customer.email }}</div>
                  </div>
                </div>
              </td>

              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                <div class="text-sm leading-5 text-gray-900">{{ customer.organization }}</div>
              </td>

              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                <span :class="{
                    'inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full': customer.status === 'Onboarded',
                    'inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full': customer.status !== 'Onboarded'
                  }">
                  {{ customer.status }}
                </span>
              </td>
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="overflow-hidden bg-blue-50 h-1.5 rounded-full w-full mr-2">
                    <div :style="{ width: getProgressWidth(customer.id) + '%' }" class="h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <svg class="w-6 h-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="2" y2="6"/><line x1="12" x2="12" y1="18" y2="22"/><line x1="4.93" x2="7.76" y1="4.93" y2="7.76"/><line x1="16.24" x2="19.07" y1="16.24" y2="19.07"/><line x1="2" x2="6" y1="12" y2="12"/><line x1="18" x2="22" y1="12" y2="12"/>
                  <line x1="4.93" x2="7.76" y1="19.07" y2="16.24"/><line x1="16.24" x2="19.07" y1="7.76" y2="4.93"/></svg>
                </div>
              </td>
              <td class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap">
                <router-link class="text-indigo-600 hover:text-indigo-900"
                  :to="{ name: 'CustomerProfile', params: { id: customer.id } }">Edit</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted,computed } from 'vue'
import { useCustomerStore } from '@/stores/customer';
import type { Customer } from '@/types/customer';
import { useTaskStore } from '@/stores/task';
import type { task } from '@/types/task';
const customerStore = useCustomerStore();
const taskStore = useTaskStore();
const customerList = ref<Customer[]>([]);
const searchTerm = ref<string>('');
  const tasks=ref<task[]>([])
const fetchCustomers = async () => {
  try {
    const fetchedCustomers = await customerStore.getCustomers();
    customerList.value = fetchedCustomers;
  } catch (error) {
    console.log('Error fetching customers:', error);
  }
};
function generateAvatarUrl(name:string) {
    if (!name || name.trim().length === 0) {
        return 'a';
    }
    const avatarUrl = `https://ui-avatars.com/api/?name=${name}`;
    
    return avatarUrl;
}
const getProgressWidth = async (customerId:string) => {
    try {
      const fetchedTasks = await taskStore.getTasksByCustomerId(customerId);
      tasks.value = fetchedTasks;
      const numTasks = tasks.value.length;
      const numDoneTasks = tasks.value.filter(task => task.status === 'Done').length;
      const progress = numTasks > 0 ? (numDoneTasks / numTasks) * 100 : 0;
      console.log(progress, typeof(progress));
      return progress;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return 0; 
    }
  };



onMounted(() => {
  fetchCustomers();
 
});

const handleSearch = () => {
  searchTerm.value = searchTerm.value.trim();
};
</script>
