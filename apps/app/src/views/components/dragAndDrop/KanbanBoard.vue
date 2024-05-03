<template>
  <div class="flex p-8 bg-gray-100 min-h-screen overflow-x-auto">

    <KanbanColumn v-for="status in columnStatuses" :key="status" :status="status" :cards="filteredCards(status)"
      @moveCard="moveCard" @showTasks="handleShowTasks" @deleteColumn="deleteColumn"
      class=" flex-auto md:flex-none md:w-96 "></KanbanColumn>
    <!-- Bouton pour ajouter une nouvelle colonne -->
    <div class="flex-none w-96">
      <button @click="showForm = true" class="flex justify-center items-center w-full h-full bg-white   bg-opacity-80 backdrop-filter backdrop-blur-lg transition duration-300 
        ease-in-out hover:bg-opacity-100 hover:bg-slate-100 rounded-md">
        <Plus size="96px" color="gray"></Plus>
      </button>
    </div>
    <!-- Form to add a new column -->
    <div v-if="showForm"
      class="absolute top-0 left-0 w-full h-full bg-gray-200 bg-opacity-60 flex justify-center items-center z-10">
      <div class="bg-white p-6 rounded-md shadow-lg">
        <h2 class="text-lg font-semibold font-mono mb-4">Add New Stage</h2>
        <form @submit.prevent="addNewColumn">
          <div class="mb-4">
            <label for="step" class="block text-sm font-mono font-medium text-gray-700">Stage:</label>
            <input v-model="newColumn.step" type="text" id="step" name="step"
              class="mt-1 block w-full h-8  border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required>
          </div>
          <div class="flex justify-end">
            <button type="submit" class="px-4 py-2 font-mono bg-blue-500 text-white rounded-md hover:bg-blue-600">Add
              Column</button>
            <button @click="showForm = false" type="button"
              class="ml-2 px-4 py-2 font-mono bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup  lang='ts'>
  import { ref,onMounted,watch,getCurrentInstance ,defineProps } from 'vue';
  import KanbanColumn from './KanbanColumn.vue';
  import {useCustomerStore} from '@/stores/customer'
  import {useTaskStore} from '@/stores/task'
  import { Plus } from 'lucide-vue-next';
  import {useOnboardingProcStore} from '@/stores/onboarding'
  import type { Ref } from 'vue';
  import type { Card } from '@/types/card';
import type { onboardingProc } from '@/types/onboardingProc';
  const customerStore = useCustomerStore();
  const taskStore=useTaskStore()
  const onboardingProcStore = useOnboardingProcStore();
  const cards : Ref<Card[]>=ref([]);
  const onboardingProc:Ref<onboardingProc[]>=ref([]);
   const props = defineProps(['workspaceId']);
const workspaceId=props.workspaceId;
  const columnStatuses = ref([]);
  const newColumn = ref({
  step: ''
});
const showForm = ref(false);
  const mockAvatarUrls = [
 'https://i.pravatar.cc/150',
 'https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',

];
const getavatar =()=>{return mockAvatarUrls[1];}; 
const fetchStages = async () => {
  try {
    await onboardingProcStore.getAllOnboardingProcs();
    const onboardingProcs = onboardingProcStore.onboardingProcs;
    onboardingProc.value= onboardingProcStore.onboardingProcs;
    columnStatuses.value = onboardingProcs.map(proc => proc.step);
  } catch (error) {
    console.error('Error fetching onboarding stages:', error);
  }
};
const fetchCustomers = async () => {
  try {
    await customerStore.getCustomersByWorkspace(workspaceId);
    const customers= customerStore.customers;
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
const moveCard = async (cardId:string, newStatus:string) => {
  const card = cards.value.find(card => card.id === cardId);
  if (card) {
    card.status = newStatus;
    try {
      const process = await onboardingProcStore.getOnboardByStep(newStatus);
      const processId= process.id ;
      await customerStore.updateCustomer(card.id, newStatus, processId);
      await taskStore.validTasks(card.id,processId - 1);
      console.log(`Updated customer ${card.id} to status: ${newStatus}`);
    } catch (error) {
      console.error('Error updating customer:', error);
      card.status = card.status;
    }
  }
};
const addNewColumn = async () => {
  try {
    
    const res = await onboardingProcStore.createOnboardingProc(newColumn.value);
    const newProc = res.data;
    console.log(newProc)
    onboardingProc.value.push(newProc);
    
    columnStatuses.value.push(newProc.step);
    showForm.value = false;
    newColumn.value = {step:''}
    fetchStages();
  } catch (error) {
    console.error('Error creating new column:', error);
  }
};
const deleteColumn = async (status:string) => {
  try {
    const procToDelete = onboardingProc.value.find(proc => proc.step === status);
    if (!procToDelete) {
      console.error('Onboarding process not found for status:', status);
      return;
    }

    await onboardingProcStore.deleteOnboardProc(procToDelete.id);
    console.log('Stage deleted successfully');
    columnStatuses.value = columnStatuses.value.filter(s => s !== status);
  } catch (error) {
    console.error('Error deleting column:', error);
  }
};

onMounted(() => {
  fetchCustomers();
  fetchStages();
});
const filteredCards = (status:string) => cards.value.filter(card => card.status === status);
watch(customerStore.customers, (newCustomers) => {
  cards.value = newCustomers.map(customer => ({
    id: customer.id,
    title: customer.name,
    status: customer.status,
    avatar: customer.avatar,
  }));
});
const instance = getCurrentInstance();
  
const handleShowTasks = (cardId:string) => {
  instance.emit('showTasks', cardId, status);
};
  </script>
<style></style>