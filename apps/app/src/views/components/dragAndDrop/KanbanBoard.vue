<template>
    <div class="flex justify-around p-5 bg-gray-100 min-h-screen">
      <KanbanColumn
        v-for="status in columnStatuses"
        :key="status"
        :status="status"
        :cards="filteredCards(status)"
        @moveCard="moveCard"
      ></KanbanColumn>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref,onMounted } from 'vue';
  import KanbanColumn from './KanbanColumn.vue';
  import {useCustomerStore} from '@/stores/customer'

  const customerStore = useCustomerStore();

 const cards = ref([]);

  const columnStatuses = ['New', 'In Progress', 'onboarded'];
  

const fetchCustomers = async () => {
  try {
    const customers= await customerStore.getCustomers();
    cards.value = customers.map(customer => ({
      id: customer.id,
      title: customer.name,
      status:customer.status,
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
  </script>