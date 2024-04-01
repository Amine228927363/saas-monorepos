<template>
    <Table>
      <TableCaption>A list of your recent Tasks.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]">Id</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead class="text-right">Customer</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="task in Tasks" :key="task.id">
          <TableCell class="font-medium">{{ task.id }}</TableCell>
          <TableCell>{{ task.description }}</TableCell>
          <TableCell>{{ task.completed }}</TableCell>
          <TableCell class="text-right">{{ customer}}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </template>
  
  <script setup lang="ts">
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
import { ref,onMounted } from 'vue';
 const taskStore= useTaskStore();
 const customerStore= useCustomerStore();
 const Tasks= ref([]);
 const customerCache = new Map();
 const getCustomerName = async (CustomerId)=>{
try {
    
      const customer = await customerStore.getCustomerById(CustomerId);
      customerCache.set(CustomerId, customer.name);
      return customer.name;
    
  } catch (error) {
    console.log('Error:', error);
    return ''; 
  }
 };
 const fetchTasks = async () => {
  try {
    const fetchedTasks = await taskStore.getAllTasks();
    const tasksWithCustomerNames = await Promise.all(
      fetchedTasks.map(async (task) => {
        const customerName = await getCustomerName(task.CustomerId);
        return {
          ...task,
          customer: customerName,
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
  