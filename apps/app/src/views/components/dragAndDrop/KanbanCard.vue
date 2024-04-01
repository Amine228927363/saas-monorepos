<template>
    <div
      class="kanban-card flex flex-row bg-gray-100 rounded shadow p-3 mb-2 cursor-pointer"
      draggable="true"
      @dragstart="dragStart($event, card)"
    >
    <div class="avatar mr-2">
      <img :src="card.avatar" :alt="card.title" class="w-8 h-8 rounded-full" />
    </div>
     <div class="flex-1">{{ card.title }}</div> 
     <div class="flex justify-between px-2">
      <button @click="showTasks"  class="flex items-center justify-center  mx-1 rounded-full w-10 h-10 bg-gray-100 transition-transform duration-300 transform hover:scale-110"
      @mouseover="showTaskText = true"
      @mouseleave="showTaskText = false"
      
      >
        <ListTodo color="green"></ListTodo>
        <span class="absolute top-0 left-0 w-12 bg-gray-100 text-gray-600 text-xs rounded-md py-1 px-2 mt-8 opacity-0 transition-opacity duration-300"
        :class="{ 'opacity-100': showTaskText }"> Tasks</span>
      </button>
      <button @click="deleteCustomer(card.id)" class="relative p-2 rounded-full w-10 h-10 bg-gray-100 transition-transform duration-300 transform hover:scale-110"
      @mouseover="showDeleteText = true"
      @mouseleave="showDeleteText = false"
      
      >
        <Trash color="red"></Trash>
        <span class="absolute top-0 left-0 w-12 bg-gray-100 text-gray-600 text-xs rounded-md py-1 px-2 mt-8 opacity-0 transition-opacity duration-300"
        :class="{ 'opacity-100': showDeleteText }"> Delete</span>
      </button>




     </div>
     
    </div>
    
  </template>
  <script setup>
  import { defineProps, ref, getCurrentInstance } from 'vue';
  import { Trash, ListTodo } from 'lucide-vue-next';
  import { useCustomerStore } from '@/stores/customer';
  
  const customerStore = useCustomerStore();
  const props = defineProps({
    card: Object,
    index: Number,
    id: String,
  });
  
  const dragStart = (event, card) => {
    event.dataTransfer.setData('text/plain', card.id);
  };
  
  const deleteCustomer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
  
    try {
      customerStore.deleteCustomer(id);
    } catch (error) {
      console.error('Error deleting customer:', error.message);
    }
  };
  const instance = getCurrentInstance();
  const showTasks = () => {
    const customerId= props.card.id;
    instance.emit('showTasks', customerId);
    console.log(customerId);
  };
  
  const showDeleteText = ref(false);
  const showTaskText = ref(false);
  </script>
