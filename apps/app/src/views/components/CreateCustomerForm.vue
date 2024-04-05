<template>
  <Card class="">
    <CardHeader class="flex flex-col">
      <CardTitle class="">Create Customer</CardTitle>
      <CardDescription>Enter customer details</CardDescription>
    </CardHeader>
    <CardContent class="">
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="newCustomer.name" class="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="customerName"
            v-model="newCustomer.name"
            placeholder="Enter name"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div class="mb-4">
          <label for="newCustomer.email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="customerEmail"
            v-model="newCustomer.email"
            placeholder="Enter email"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div class="mb-4">
          <label for="newCustomer.org" class="block text-sm font-medium text-gray-700">Organization:</label>
          <input
            type="text"
            id="oganization"
            v-model="newCustomer.organization"
            placeholder="Enter organization Name"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div class="mb-4">
          <label for="newCustomer.status" class="block text-sm font-medium text-gray-700">Status:</label>
          <input
            type="text"
            id="status"
            v-model="newCustomer.status"
            placeholder="Enter organization Name"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div class="flex justify-end">
          <button type="submit" class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded">
            Create
          </button>
        </div>
      </form>
    </CardContent>
    <CardFooter>
   <!--     Footer content -->
    </CardFooter>
  </Card>

</template>

<script setup lang="ts">
import { ref,defineProps } from 'vue';
import { useCustomerStore } from '@/stores/customer';
import type { Customer } from '@/types/customer';
const props = defineProps<{
  toggleForm: () => void;
}>()
let showCustomerForm=props.showCustomerForm;
const newCustomer = ref<Customer>({
  name: '',
  email: '',
  organization: '',
  status: 'New'
});
const toggleForm = props.toggleForm;
const custStore = useCustomerStore();

const handleSubmit = () => {
  custStore.createCustomer(newCustomer.value);
  newCustomer.value = { name: '', email: '', organization: '', status: 'New' };
  toggleForm();
  window.location.reload();
};
</script>
