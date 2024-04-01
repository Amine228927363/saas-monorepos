<template> 
    <div class="flex justify-around p-8 bg-gray-100 min-h-screen">
    
      <KanbanColumn
        v-for="status in columnStatuses"
        :key="status"
        :status="status"
        :cards="filteredCards(status)"
        @moveCard="moveCard"
        @showTasks="handleShowTasks"
      ></KanbanColumn>
    </div>
  </template>
  
  <script setup lang="">
  import { ref,onMounted,watch,getCurrentInstance } from 'vue';
  import KanbanColumn from './KanbanColumn.vue';
  import {useCustomerStore} from '@/stores/customer'

  const customerStore = useCustomerStore();

 const cards = ref([]);

  const columnStatuses = ['New', 'In Progress', 'onboarded'];
  const mockAvatarUrls = [
 'https://i.pravatar.cc/150',
 'https://i.pravatar.cc/153',
 'https://i.pravatar.cc/151',
 'https://i.pravatar.cc/152',
 'https://i.pravatar.cc/150',
 'https://i.pravatar.cc/150',
 'https://i.pravatar.cc/151',
 'https://i.pravatar.cc/152',

];
const getavatar =()=>{return mockAvatarUrls[0];}; 

const fetchCustomers = async () => {
  try {
    const customers= await customerStore.getCustomers();
    cards.value = customers.map(customer => ({
      id: customer.id,
      title: customer.name,
      status:customer.status,
      avatar:getavatar(),
    }));
  } catch (error) {
    console.log('Error fetching customers')

  }
};
const moveCard = async (cardId, newStatus) => {
  const card = cards.value.find(card => card.id === cardId);
  if (card) {
    card.status = newStatus;
    try {
      await customerStore.updateCustomer(card.id, newStatus);
      console.log(`Updated customer ${card.id} to status: ${newStatus}`);
    } catch (error) {
      console.error('Error updating customer:', error.message);
      card.status = card.status;
    }
  }
};
onMounted(() => {
  fetchCustomers();
});
const filteredCards = (status) => cards.value.filter(card => card.status === status);





watch(customerStore.customers, (newCustomers) => {
  cards.value = newCustomers.map(customer => ({
    id: customer.id,
    title: customer.name,
    status: customer.status,
    avatar: customer.avatar,
  }));
});
const instance = getCurrentInstance();
  
const handleShowTasks = (cardId) => {
  instance.emit('showTasks', cardId);
};
  </script>