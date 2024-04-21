<template>


  <div class="overflow-y-auto max-h-[600px]">
    <div class="flex justify-between my-4 mx-2 ">
      <span class="font-bold">
        <h1>Tasks of this Stage:</h1>
      </span>

    </div>
    <Table>
      <TableCaption>A list of your recent tasks.</TableCaption>
      <TableHeader>
        <TableRow class="">
          <TableHead class="w-[100px]">
            Id
          </TableHead>
          <TableHead class="w-[100px]">Name</TableHead>
          <TableHead class="text-right w-[300px] ">
            Description
          </TableHead>
          <TableHead>Status</TableHead>
          <TableHead class="w-[400px]">dueDate </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="task in tasks" :key="task.id" class=""
          :class="{ 'bg-green-100 text-green-900': task.status === 'Done' }">
          <TableCell class="font-medium">
            {{ task.id }}
          </TableCell>
          <TableCell>{{ task.name }}</TableCell>
          <TableCell class="text-right w-[300px]">
            {{ task.description }}
          </TableCell>
          <TableCell>
            <select v-model="task.status" @change="handleStatusChange(task)" class="flex flex-col py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none
           focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option v-for="option in statusOptions" :key="option" :value="option">{{ option }}</option>
            </select>

          </TableCell>
          <TableCell class="">
            {{ formatDate(task.dueDate) }}
          </TableCell>
          <TableCell>
            <input type="checkbox" :checked="task.status === 'Done'" class="form-checkbox  h-5 w-5 text-green-500"
              @change="handleTaskCompletion(task)" />
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
const tasksdef = ref([]);
const statusOptions = ['ToDo', 'InProgress', 'Done'];
const props = defineProps(['customerId', 'showTaskCreate']);
const customerId = props.customerId;
const showTaskCreate = props.showTaskCreate;
const customerStore = useCustomerStore();
const designReviewDefaultTasks = [
  {
    name: 'Task 1 Stage 2',
    description: 'Task 2 description for Stage 2',
    status: 'ToDo',
    processId: 2, 
  },
  {
    name: 'Task 2 Stage 2',
    description: 'Task 2 description for Stage 1',
    status: 'ToDo',
    processId: 2, 
  },

];
const clientAssignDefaultTasks = [
  {
    name: 'Task 1 Stage 1',
    description: 'Task 1 description for Stage 1',
    status: 'ToDo',
    processId: 1, 
  },
  {
    name: 'Task 2 Stage 1',
    description: 'Task 2 description for Stage 1',
    status: 'ToDo',
    processId: 1, 
  },

];
const devProcessDefaultTasks = [
  {
    name: 'Task 1 Stage 1',
    description: 'Task 1 description for Stage 1',
    status: 'ToDo',
    processId: 3, 
  },
  {
    name: 'Task 2 Stage 1',
    description: 'Task 2 description for Stage 1',
    status: 'ToDo',
    processId: 3, 
  },

];
const contentDelivryDefaultTasks = [
  {
    name: 'Task 1 Stage 1',
    description: 'Task 1 description for Stage 1',
    status: 'ToDo',
    processId: 4, 
  },
  {
    name: 'Task 2 Stage 1',
    description: 'Task 2 description for Stage 1',
    status: 'ToDo',
    processId: 4, 
  },

];
const fetchTasksByCustomerId = async (customerId) => {
  try {
    
    const customer=await customerStore.getCustomerById(customerId);
    allTasks.value=await taskStore.getTasksByCustomerId(customerId);
    const processId=customer.data.onboardingProcessID;
    tasks.value = allTasks.value.filter(task=>task.processId ===customer.data.onboardingProcessID)
    if(tasks.value.length == 0) {
          const currentDate = new Date();
          const dueDate = new Date(currentDate);
          dueDate.setDate(dueDate.getDate() + 3); 
        switch (processId) {
          case 1:
          
      for (const defaultTask of clientAssignDefaultTasks) {
        await taskStore.createTask({
          ...defaultTask,
          dueDate: dueDate,
          CustomerId: customerId,
        });
      }
      
            break;
          
          case 2 :
          for (const defaultTask of designReviewDefaultTasks){
            await taskStore.createTask({
              ...defaultTask,
              dueDate: dueDate,
              CustomerId: customerId,
            })
          }
          break;
          case 3:
          for (const defaultTask of devProcessDefaultTasks) {
            await taskStore.createTask({
              ...defaultTask,
              dueDate: dueDate,
              CustomerId: customerId,
            });
          }
          break;
        case 4:
          for (const defaultTask of contentDelivryDefaultTasks) {
            await taskStore.createTask({
              ...defaultTask,
              dueDate: dueDate,
              CustomerId: customerId,
            });
          }
          break;
        default:
          console.error('Invalid process ID:', processId);
          break;
        }
        allTasks.value = await taskStore.getTasksByCustomerId(customerId);  
    }
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
const formatDate = (date) => {
  const formattedDate = new Date(date);
  return formattedDate.toLocaleDateString('en-CA');
};
onMounted(() => {
  fetchTasksByCustomerId(customerId);
});

</script>
