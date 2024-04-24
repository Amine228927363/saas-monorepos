<template>
  <div class="flex flex-wrap">
    <div class="w-1/4 px-4" v-for="(column, index) in workspaceColumns" :key="index">
      <div class="mb-4  " v-for="(workspace, workspaceIndex) in column" :key="workspaceIndex">
        <router-link :to="{ name: 'customer-view', params: { workspaceId: workspace.id } }"><WorkspaceCard class="hover:bg-gray-100" :workspace="workspace" :deleteWorkspace="deleteWorkspace" /></router-link>
      </div>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { ref, computed ,onMounted,defineEmits} from 'vue';
import WorkspaceCard from './WorkspaceCard.vue';
import { useWorkspaceStore } from '@/stores/workspace';
import type { Workspace } from '@/types/Workspace';
const workspaceStore = useWorkspaceStore();
const workspaces = ref<Workspace[]>([]);
onMounted(async () => {
  try {
    const fetchedWorkspaces = await workspaceStore.getAllWorkspaces(); 
    workspaces.value = fetchedWorkspaces; 
  } catch (error) {
    console.error('Error fetching workspaces:', error);
  }
});

const numColumns = computed(() => Math.ceil(workspaces.value.length / 4));

const deleteWorkspace = async (id: number) => {
  const workspaceStore = useWorkspaceStore();
  
  try {
    await workspaceStore.deleteWorkspace(id);
    workspaces.value = workspaces.value.filter(workspace => workspace.id !== id);
    console.log('workspace deleted successfully ');
  } catch (error) {
    console.log('Error deleting the workspace');
  }
};
// Distribute workspaces into columns
const workspaceColumns = computed(() => {
  const columns = [];
  for (let i = 0; i < numColumns.value; i++) {
    columns.push(workspaces.value.slice(i * 4, (i + 1) * 4));
  }
  return columns;
});
</script>
