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
        <TableRow v-for="task in tasks" :key="task.id">
          <TableCell class="font-medium">{{ task.id }}</TableCell>
          <TableCell>{{ task.description }}</TableCell>
          <TableCell>{{ task.status }}</TableCell>
          <TableCell class="text-right">{{ task.customer }}</TableCell>
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
  
  // Function to generate a random customer name
  function generateRandomName() {
    const names = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown', 'Emma Davis'];
    return names[Math.floor(Math.random() * names.length)];
  }
  
  // Simulated fetched data, replace this with your actual API call
  const tasks = [
    { id: 1, description: 'Task 1', status: 'Pending', customer: generateRandomName() },
    { id: 2, description: 'Task 2', status: 'Completed', customer: generateRandomName() },
    { id: 3, description: 'Task 3', status: 'Pending', customer: generateRandomName() },
    { id: 5, description: 'Task 4', status: 'Completed', customer: generateRandomName() },
    { id: 6, description: 'Task 4', status: 'Completed', customer: generateRandomName() },
    { id: 7, description: 'Task 4', status: 'Completed', customer: generateRandomName() },
    { id: 8, description: 'Task 4', status: 'Completed', customer: generateRandomName() },
    { id: 9, description: 'Task 4', status: 'Completed', customer: generateRandomName() },
    { id: 10, description: 'Task 4', status: 'Completed', customer: generateRandomName() },
    { id: 11, description: 'Task 4', status: 'Completed', customer: generateRandomName() },
    { id: 12, description: 'Task 4', status: 'Completed', customer: generateRandomName() },
  ];
  
  </script>
  