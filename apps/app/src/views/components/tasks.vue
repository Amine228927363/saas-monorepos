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
            <div @click="toggleDescription(task.id)" class="relative overflow-hidden cursor-pointer">
              <div :class="{ 'whitespace-nowrap overflow-hidden text-ellipsis': !showFullDescription[task.id], 'block': showFullDescription[task.id] }" class="description-cell">{{ task.description }}</div>
              <span class="absolute bottom-0 right-0 bg-white bg-opacity-80 p-1 rounded-sm text-xs cursor-pointer" @click.stop="toggleDescription(task.id)">
                {{ showFullDescription[task.id] ? 'Collapse' : 'Expand' }}
              </span>
            </div>
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
const props = defineProps(['customerId','workspaceId', 'showTaskCreate']);
const customerId = props.customerId;

const showTaskCreate = props.showTaskCreate;
const customerStore = useCustomerStore();
const designReviewDefaultTasks = [
  {
    name: 'Review Design Documents',
    description: 'Review the design documents, including architectural drawings, ',
    status: 'ToDo',
    processId: 2, 
  },
  {
    name: 'Identify Design Flaws or Issues',
    description: ' Identify any potential design flaws, errors, or issues that could affect the functionality, safety, or efficiency of the project.',
    status: 'ToDo',
    processId: 2, 
  },

];
const clientAssignDefaultTasks = [
  {
    name: 'Provide Background Information',
    description: 'Customers should provide detailed background information ',
    status: 'ToDo',
    processId: 1, 
  },
  {
    name: 'Establish Communication Channels',
    description: 'Determine the preferred communication channels and frequency of updates. ',
    status: 'ToDo',
    processId: 1, 
  },

];
const devProcessDefaultTasks = [
  {
    name: 'Prototyping',
    description: 'Develop prototypes or mockups to visualize and validate key features and functionalities early in the development process.',
    status: 'ToDo',
    processId: 3, 
  },
  {
    name: 'Coding',
    description: ' Write code according to the design specifications using programming languages',
    status: 'ToDo',
    processId: 3, 
  },

];
const contentDelivryDefaultTasks = [
  {
    name: 'Content Preparation',
    description: 'Task 1 description for Stage 1',
    status: 'ToDo',
    processId: 4, 
  },
  {
    name: 'Content Management',
    description: 'Organize and manage content repositories or libraries, categorizing content, applying metadata',
    status: 'ToDo',
    processId: 4, 
  },

];
const showFullDescription = ref({});

const toggleDescription = (taskId) => {
  showFullDescription.value[taskId] = !showFullDescription.value[taskId];
};
const fetchTasksByCustomerId = async (customerId) => {
  try {
    const workspaceId = props.workspaceId;
    const customer=await customerStore.getCustomerById(customerId);
    await taskStore.getTasksByCustomerId(customerId);
    allTasks.value=taskStore.tasks;
    const status=customer.data.status;
    tasks.value = allTasks.value.filter(task=>task.processId ===customer.data.onboardingProcessID)
    if(tasks.value.length == 0) {
          const currentDate = new Date();
          const dueDate = new Date(currentDate);
          dueDate.setDate(dueDate.getDate() + 10); 
        switch (status) {
          case 'Client Assignement':
          
      for (const defaultTask of clientAssignDefaultTasks) {
        await taskStore.createTask({
          ...defaultTask,
          dueDate: dueDate,
          CustomerId: customerId,
          workspaceId: workspaceId,
        });
      }
      
            break;
          
          case "Design Review" :
          for (const defaultTask of designReviewDefaultTasks){
            await taskStore.createTask({
              ...defaultTask,
              dueDate: dueDate,
              CustomerId: customerId,
              workspaceId: workspaceId,
            })
          }
          break;
          case "Developement Process":
          for (const defaultTask of devProcessDefaultTasks) {
            await taskStore.createTask({
              ...defaultTask,
              dueDate: dueDate,
              CustomerId: customerId,
              workspaceId: workspaceId,
            });
          }
          break;
        case "Content Delivry":
          for (const defaultTask of contentDelivryDefaultTasks) {
            await taskStore.createTask({
              ...defaultTask,
              dueDate: dueDate,
              CustomerId: customerId,
              workspaceId: workspaceId,
            });
          }
          break;
        default:
          console.error('Invalid process ID:', processId);
          break;
        }
        await taskStore.getTasksByCustomerId(customerId);
        allTasks.value=taskStore.tasks;
        tasks.value = allTasks.value.filter(task=>task.processId ===customer.data.onboardingProcessID)
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
<style scoped>
.description-cell {
  max-width: calc(100% - 24px); 

}

.show-description-cell-full .description-cell {
  white-space: normal;
  overflow: visible;
}
</style>