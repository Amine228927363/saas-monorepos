<template>
    <div
      class="kanban-column bg-gray-200 shadow rounded p-4 flex-1 mx-2"
      @dragover.prevent
      @drop="drop($event)"
    >
      <h2 class="font-bold text-zinc-800 mb-2">{{ status }}</h2>
      <KanbanCard
        v-for="card in cards"
        :key="card.id"
        :card="card"
      ></KanbanCard>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  import KanbanCard from './KanbanCard.vue';
  const props = defineProps({
    status: String,
    cards: Array,
  });
  const emit = defineEmits(['moveCard']);
  const drop = event => {
    const cardId = event.dataTransfer.getData('text/plain');
    emit('moveCard',cardId, props.status);
  };
  </script>