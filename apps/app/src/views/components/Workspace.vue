<template>

    <div class="container w-full  min-h-screen">
      <div class="flex flex-col translate-y-36 translate-x-24">
        <!-- Heading -->
        <div class="flex flex-col items-start">
          <h1 class="font-bold text-2xl">Welcome <span>{{userName}}</span>, Consult your Workspaces</h1>
          <span class="text-sm font-light mx-8">Start with choosing the table you are working on</span>
        </div>
  
        <!-- Button -->
        <div class="flex   translate-x-1/2 mt-4">
          <Button class="flex p-2 bg-red-400 rounded text-white" @click="showAddWorkspace=true">New workspace<Plus size="18"></Plus></Button>
        </div>
  
        <!-- Workspace cards -->
        <div class="flex flex-col mt-4">
            <WorkspaceBoard />
        </div>
      </div>
      <!--add new workspace form-->
      
      <div v-if="showAddWorkspace"
      class="absolute top-0 left-0 w-full h-full bg-gray-200 bg-opacity-60 flex justify-center items-center z-60">
      <div class="bg-white p-6 rounded-md shadow-lg">
        <h2 class="text-lg font-semibold font-mono mb-4">Add New Workspace</h2>
        <form @submit.prevent="addWorkspace">
          <div class="mb-4">
            <label for="name" class="block text-sm font-mono font-medium text-gray-700">Name:</label>
            <input v-model="newWorkspace.name" type="text"  name="name"
              class="mt-1 block w-full h-8  border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required>
          </div>
          <div class="flex justify-end">
            <button type="submit" class="px-4 py-2 font-mono bg-blue-500 text-white rounded-md hover:bg-blue-600">Add
              Workspace</button>
            <button @click="showAddWorkspace = false" type="button"
              class="ml-2 px-4 py-2 font-mono bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">Cancel</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  </template>
  
  <script >
  import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import WorkspaceBoard from './WorkspaceBoard.vue';
import { useWorkspaceStore } from '@/stores/workspace';
export default {
  components: {
    WorkspaceBoard,
  },
  setup() {
    const userName = ref('');
    const showAddWorkspace=ref(false)
    const userStore = useUserStore();
    const workspaceStore = useWorkspaceStore();
    const newWorkspace = ref({ 
      name: '' 
    });
    const addWorkspace=async () =>{
      try {
        console.log(newWorkspace);
        const res = await workspaceStore.createWorkspace(newWorkspace.value);
        showAddWorkspace.value=false
        window.location.reload();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    onMounted(async () => {
      try {
        const name = await userStore.getUserName();
        // Assign the user name to the userName ref
        userName.value = name;
      } catch (error) {
        console.error('Failed to get user name:', error);
      }
    });

    return {
      userName,
      showAddWorkspace,
      newWorkspace,
      workspaceStore,
      addWorkspace,
    };
  },
};

  </script>
  