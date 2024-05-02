<template>
  <Card class="flew flex-col w-full font-mono ">
    <CardHeader class="flex flex-col">
      <CardTitle class="">Create Task</CardTitle>
      <CardDescription>EnterTask details</CardDescription>
    </CardHeader>
    <CardContent class="w-full h-screen">
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="newCustomer.name" class="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="taskName"
            v-model="newTask.name"
            placeholder="Enter name"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div class="mb-4">
          <label for="newTask.description" class="block text-sm font-medium text-gray-700">Description:</label>
          <textarea
            id="taskDescription"
            v-model="newTask.description"
            placeholder="Enter description"
            rows="4"
            class="mt-1 block w-full h-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        <div class="mb-4">
          <label for="newCustomer.org" class="block text-sm font-medium text-gray-700">Status:</label>
          <input
            type="text"
            id="status"
            v-model="newTask.status"
            placeholder=""
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div class="mb-4">
          <label for="dueDate" class="block text-sm font-medium text-gray-700">Due Date:</label>
          <input v-model="newTask.dueDate" type="date" id="dueDate" name="dueDate" class="mt-1 block w-full h-12 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
        </div>
        <div class="flex justify-end">
          <button type="submit" class="bg-green-500 hover:bg-green-600 mt-28 text-white font-medium py-2 px-4 rounded">
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

<script setup lang="ts"  >
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ref} from 'vue';
import { toggleCustomerForm } from '@/utils/toggleCustomerForm';
import {useCustomerStore} from '@/stores/customer'
import {useTaskStore} from '@/stores/task'

import { defineProps,defineEmits } from 'vue';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
const props = defineProps(['customerId','workspaceId','showTaskCreate']);
const customerId=props.customerId;
const workspaceId=props.workspaceId;
const taskStore= useTaskStore();
const customerStore = useCustomerStore();
const newTask=ref({
     name:'',
     description:'',
     processId:'',
     CustomerId:'',
     workspaceId:0,
     status:'ToDo',
     dueDate:'',

})

const handleSubmit = async() => {
  try {
    const customer = await customerStore.getCustomerById(customerId);
    if (!customer) {
      throw new Error('No Customer Found'); 
    }
   
    newTask.value.processId=customer.data.onboardingProcessID;
    newTask.value.CustomerId = customerId;
    newTask.value.workspaceId = workspaceId;
    // Convert dueDate string to a Date object
    const dueDate = new Date(newTask.value.dueDate);
    if (isNaN(dueDate.getTime())) {
      throw new Error('Invalid due date');
    }
    console.log(newTask.value.dueDate)
    newTask.value.dueDate = dueDate.toISOString();
    await  taskStore.createTask(newTask.value);
    resetForm();
  } catch (error) {
    console.log('Error creating task:', error);
  }
};


const resetForm = () => {
  newTask.value = {
    name: '',
    description: '',
    status: 'ToDo',
    dueDate: ''
  };
};

</script>
