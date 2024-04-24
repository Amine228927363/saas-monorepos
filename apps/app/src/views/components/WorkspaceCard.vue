<template>
  <div class="border rounded-lg p-4 mt-4 w-[320px] h-[90px]">
    <!-- Top section -->
    <div class="flex justify-between items-center">
      <!-- Workspace name -->
      <div class="flex items-center">
        <!-- Workspace icon (replace with your icon) -->
        <Table2 class="w-6 h-6 mr-2" size="12" color="#d96d6d"></Table2>
        <span class="font-semibold text-lg">{{ workspace.name }}</span>
      </div>
      <!-- Three dots dropdown menu -->
      <div class="relative" x-data="{ open: false }">
        <button @click="toggle" class="text-gray-600 hover:text-gray-800 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a1919"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis">
            <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>
            <circle cx="5" cy="12" r="1"/></svg>
        </button>
        <!-- Dropdown menu content -->
        <div v-if="open" @click.away="open = false" class="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <!-- Trigger deleteWorkspace function -->
            <button class="flex justify-start px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" @click="callDeleteWorkspace(workspace.id)">Delete</button>
            <!-- Show edit workspace form -->
            <button class="flex justify-start px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" @click="showEditWorkspace = true">Edit</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Bottom section -->
    <div class="mt-4">
      <span class="text-sm text-gray-500">{{ workspace.numberOfClients }} Clients</span>
    </div>
    <!-- Edit workspace form -->
    <div v-if="showEditWorkspace" class="absolute top-0 left-0 w-full h-full bg-gray-200 bg-opacity-60 flex justify-center items-center z-60">
      <div class="bg-white p-6 rounded-md shadow-lg">
        <h2 class="text-lg font-semibold font-mono mb-4">Edit Workspace</h2>
        <form >
          <div class="mb-4">
            <label for="name" class="block text-sm font-mono font-medium text-gray-700">Name:</label>
            <input v-model="newWorkspace.name" type="text" name="name" class="mt-1 block w-full h-8 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
          </div>
          <div class="flex justify-end">
            <button @click="editWorkspace(workspace.id)" class="px-4 py-2 font-mono bg-blue-500 text-white rounded-md hover:bg-blue-600">Edit Workspace</button>
            <button @click="showEditWorkspace = false" type="button" class="ml-2 px-4 py-2 font-mono bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { Table2 } from 'lucide-vue-next';
import { useWorkspaceStore } from '@/stores/workspace';

const workspaceStore = useWorkspaceStore();
const showEditWorkspace = ref(false);
const newWorkspace = ref({
  name: ''
});

const props = defineProps<{
  workspace: Record<string, any>,
  deleteWorkspace: (WorkspaceId: number) => Promise<void>
}>();

// Function to delete a workspace
const callDeleteWorkspace = async (id: number) => {
  try {
    await props.deleteWorkspace(id);
  } catch (error) {
    console.error('Error deleting workspace:', error);
  }
};

// Function to toggle dropdown menu
const open = ref(false);
const toggle = () => {
  open.value = !open.value;
};

// Function to edit a workspace
const editWorkspace = async (id: number) => {
  try {
    await workspaceStore.updateWorkspace(id, newWorkspace.value);
    console.log('Workspace edited successfully');
    showEditWorkspace.value = false;
    window .location.reload();
  } catch (error) {
    console.error('Error editing workspace:', error);
  }
};
</script>
