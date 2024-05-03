<template>
  <Table>
    <TableCaption>A list of your recent Tasks.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]">Id</TableHead>
        <TableHead class="w-[100px]">Name</TableHead>
        <TableHead>Description</TableHead>
        <TableHead>Status</TableHead>
        <TableHead class="text-right">Customer</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="task in Tasks" :key="task.id">
        <TableCell class="font-medium">{{ task.id }}</TableCell>
        <TableCell class="font-medium">{{ task.name }}</TableCell>
        <TableCell>{{ task.description }}</TableCell>
        <TableCell>{{ task.status }}</TableCell>
        <TableCell class="text-right">{{ task.Customer }}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>

<script setup>
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCustomerStore } from '@/stores/customer';
import { useTaskStore } from '@/stores/task';
import { ref, onMounted } from 'vue';
const taskStore = useTaskStore();
const customerStore = useCustomerStore();
const Tasks = ref([]);
const getCustomerName = async (CustomerId) => {
  try {

    const customer = await customerStore.getCustomerById(CustomerId);
    return customer.data.name;

  } catch (error) {
    console.log('Error:', error);
    return '';
  }
};
const fetchTasks = async () => {
  try {
    await taskStore.getAllTasks();
    const tasksWithCustomerNames = await Promise.all(
      taskStore.tasks.map(async (task) => {
        const customerName = await getCustomerName(task.CustomerId);
        return {
          ...task,
          Customer: customerName,

        };
      })
    );

    Tasks.value = tasksWithCustomerNames;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
onMounted(fetchTasks);
</script>