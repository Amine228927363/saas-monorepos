<template>
  <div class="flex flex-col mt-8">
    <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
        <table class="min-w-full">
          <thead>
            <tr>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                Name
              </th>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                Company
              </th>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                Status
              </th>
              <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
            </tr>
          </thead>
  
          <tbody class="bg-white">
            <tr v-for="(customer, index) in customerList" :key="index" class="hover:bg-gray-50">
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 w-10 h-10">
                    <img
                    class="w-10 h-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  >
                  </div>
      
                  <div class="ml-4">
                    <div class="text-sm font-medium leading-5 text-gray-900">{{ customer.name }}</div>
                    <div class="text-sm leading-5 text-gray-500">{{ customer.email }}</div>
                  </div>
                </div>
              </td>
      
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                <div class="text-sm leading-5 text-gray-900">{{ customer.title }}</div>
                <div class="text-sm leading-5 text-gray-500">{{ customer.title2 }}</div>
              </td>
      
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                <span
                  :class="{
                    'inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full': customer.status === 'Onboarded',
                    'inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full': customer.status !== 'Onboarded'
                  }"
                >
                  {{ customer.status }}
                </span>
              </td>
      
         
      
              <td class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap">
                <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCustomerStore } from '@/stores/customer';
const customerStore = useCustomerStore();
const customerList = ref([]);

const fetchCustomers = async () => {
  try {
    const fetchedCustomers = await customerStore.getCustomers();
    customerList.value = fetchedCustomers.map(customer => ({
      id: customer.id,
      email: customer.email,
      name: customer.name,
      status: customer.status,

    }));
  } catch (error) {
    console.log('Error fetching customers:', error);
  }
};

onMounted(() => {
  fetchCustomers();
});
</script
