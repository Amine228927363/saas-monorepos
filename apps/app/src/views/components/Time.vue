<template lang="">
    <div class="flex items-center bg-blue-300 w-[320px] h-24 justify-center shadow-lg py-4 rounded-full">
        <span class="text-4xl font-medium mr-2 text-white">
          {{ formattedTime }}
        </span>
        <span class="text-white">
          {{ formattedDate }}
        </span>
      </div>
   
</template>
<script setup lang="">
import { ref, onMounted } from 'vue';

const formattedTime = ref('');
const formattedDate = ref('');

const updateTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  formattedTime.value = `${hours}:${minutes}:${seconds}`;

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  formattedDate.value = new Intl.DateTimeFormat('en-US', options).format(now);
};
onMounted(updateTime);
setInterval(updateTime, 1000); 
</script>
<style lang="">
    
</style>