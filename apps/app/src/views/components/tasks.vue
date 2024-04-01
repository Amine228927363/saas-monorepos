<template>
  <div class="overflow-y-auto max-h-[600px]">
   <div class="flex justify-between my-4 mx-2 ">
    <span class="font-bold"><h1>Tasks of this Stage:</h1></span>
    <Button @click="createTask" class="flex flex-row mx-4  bg-green-900 rounded"><Plus color="white"/> <span class="text-white"> Add</span></Button>
   </div> 
  <Table>
    <TableCaption>A list of your recent invoices.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]">
          Id
        </TableHead>
        <TableHead>Name</TableHead>
        <TableHead class="text-right">
          Description
        </TableHead>
        <TableHead>Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="task in tasks" :key="task.id">
        <TableCell class="font-medium">
          {{ task.id }}
        </TableCell>
        <TableCell>{{ task.name }}</TableCell>
        <TableCell class="text-right">
          {{ task.description }}
        </TableCell>
        <TableCell>
          <Select v-model="task.status" :placeholder="'Select status for ' + task.id">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem v-for="option in statusOptions" :key="option" :value="option">
                  {{ option }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
  
</div>
</template>

<script setup lang="ts" >
import { ref,onMounted ,getCurrentInstance, defineEmits,defineProps} from 'vue';
import {Plus} from 'lucide-vue-next'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTaskStore } from '@/stores/task';
const taskStore= useTaskStore();
const tasks= ref([]);
const statusOptions= ['To DO','In Progress','Done']
const props = defineProps(['customerId']);
const customerId=props.customerId;
const fetchTasksByCustomerId = async (customerId) => {
  try {
    tasks.value = await taskStore.getTasksByCustomerId(customerId);
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};
onMounted(() => {
  fetchTasksByCustomerId(customerId);

});

const createTask=()=>{
  console.log('task created successfully')
}

</script>
