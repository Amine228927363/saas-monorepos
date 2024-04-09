<template>

   
  <div class="overflow-y-auto max-h-[600px]">
   <div class="flex justify-between my-4 mx-2 ">
    <span class="font-bold"><h1>Tasks of this Stage:</h1></span>
  
   </div> 
  <Table >
    <TableCaption>A list of your recent tasks.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]">
          Id
        </TableHead>
        <TableHead>Name</TableHead>
        <TableHead class="text-right">
          Description
        </TableHead>
        <TableHead>Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="task in tasks" :key="task.id" :class="{ 'bg-green-100 text-green-900': task.status === 'Done' }">
        <TableCell class="font-medium">
          {{ task.id }}
        </TableCell>
        <TableCell>{{ task.name }}</TableCell>
        <TableCell class="text-right">
          {{ task.description }}
        </TableCell>
        <TableCell>
          <select v-model="task.status" @change="handleStatusChange(task)"  class="flex flex-col py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none
           focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option v-for="option in statusOptions" :key="option" :value="option">{{ option }}</option>
          </select>
          
        </TableCell>
        <TableCell>
          <input
            type="checkbox"
            :checked="task.status === 'Done'"
            class="form-checkbox mx-4 h-5 w-5 text-green-500"
            @change="handleTaskCompletion(task)"
          />
        </TableCell>
        <TableCell> 
          <button @click="handleDeleteTask(task.id)" class="text-red-600 hover:text-red-900">
            <span class="flex flex-row px-2 mx-4">Delete<Trash size="12"></Trash></span></button>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
  
</div>
</template>

<script setup lang="">
import { ref, onMounted, defineProps } from 'vue';
import { Trash, ListTodo } from 'lucide-vue-next';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTaskStore } from '@/stores/task';
import {useCustomerStore} from '@/stores/customer'
const taskStore = useTaskStore();
const tasks = ref([]);
const allTasks = ref([]);
const statusOptions = ['ToDo', 'InProgress', 'Done'];
const props = defineProps(['customerId', 'showTaskCreate']);
const customerId = props.customerId;
const showTaskCreate = props.showTaskCreate;
const customerStore = useCustomerStore();
const fetchTasksByCustomerId = async (customerId) => {
  try {
    const customer=await customerStore.getCustomerById(customerId);
    allTasks.value=await taskStore.getTasksByCustomerId(customerId);
    console.log(customer.data.onboardingProcessID);
    tasks.value = allTasks.value.filter(task=>task.processId ===customer.data.onboardingProcessID)
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};
const handleStatusChange = async (task) => {
  try {
    await taskStore.updateTaskStatusById(task.id, task.status);
    console.log('task updated successfully')
  } catch (error) {
    console.log('Error updating task status:', error);
  }
};
const handleDeleteTask = async (taskId) => {
  try {
    await taskStore.deleteTaskById(taskId);
    tasks.value = tasks.value.filter(task => task.id !== taskId);
    console.log('Task deleted successfully');
  } catch (error) {
    console.log('Error deleting task:', error);
  }
};

onMounted(() => {
  fetchTasksByCustomerId(customerId);
});

</script>
