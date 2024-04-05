<template>

  <div class="kanban-column bg-white  shadow rounded p-4 flex-1 mx-2" @dragover.prevent @drop="drop($event)">
    <h2 class="font-bold text-zinc-800 mb-2">{{ status }}
      <button @click.prevent="deleteColumn(status)" class="ml-2 text-red-500 hover:text-red-700 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M3 5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v2H3V5zm12 2H5v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V7zm-7 2a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H8z" />
        </svg>
      </button>
    </h2>
    <KanbanCard v-for="card in cards" :key="card.id" :card="card" @showTasks="handleShowTasks"></KanbanCard>

  </div>
</template>

<script setup lang="ts">
  import { defineProps, defineEmits,getCurrentInstance } from 'vue';
  import KanbanCard from './KanbanCard.vue';
  const props = defineProps({
    status: String,
    cards: Array,
  });
  const instance = getCurrentInstance();
  
  const emit = defineEmits(['moveCard', 'showTasks']);
  const handleShowTasks = (cardId) => {
  instance.emit('showTasks', cardId);
};
const deleteColumn = (status: string) => {
  emit('deleteColumn', status);
};
  const drop = event => {
    const cardId = event.dataTransfer.getData('text/plain');
    emit('moveCard',cardId, props.status);
  };
  </script>