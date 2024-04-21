<template>
    <div>
        <div v-if="showUpdateForm" class="fixed inset-0 bg-gray-900 bg-opacity-80 z-50"></div>
       
        <div v-if="customer">
            <div class="p-16 ">
                <div class="p-8 bg-slate-800 shadow mt-24 h-[700px]">
                    <div class="grid grid-cols-1 md:grid-cols-3">
                        <div class="grid grid-cols-3 text-center text-white order-last md:order-first mt-20 md:mt-0">
                            <div>
                                <p class="font-bold  text-xl">{{numTasks}}</p>
                                <p class="text-gray-400">Tasks</p>
                            </div>
                            <div>
                                <p class="font-bold  text-xl">{{ numDoneTasks }}</p>
                                <p class="text-gray-400">Done</p>
                            </div>
                            <div>
                                <p class="font-bold  text-xl">{{ numNotDoneTasks }}</p>
                                <p class="text-gray-400">Not Yet</p>
                            </div>
                        </div>
                        <div class="relative">
                            <div
                                class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                        clip-rule="evenodd" />
                                </svg> </div>
                        </div>
                        <div class="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                            <router-link to="/customer"><button
                                class="text-white py-2 px-4 h-12 w-18 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                                Manage</button></router-link>
                                 <button
                                class="text-white py-2 h-12 w-18 px-4 uppercase rounded bg-green-700 hover:bg-green-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                                Message</button> </div>
                    </div>
                    <div class="mt-20 text-center text-white border-b pb-12">
                        <h1 class="text-4xl font-medium ">{{customer.name}}<span
                                class="font-light t"></span></h1>
                        <p class="font-light  mt-3">{{customer.email}}</p>
                        <p class="m-4 text-green-500 font-semibold text-2xl">{{customer.status}}</p>
                        <p class="mt-4 ">{{customer.organization}}</p>
                       <button class="bg-red-400 rounded m-2 p-2 hover:bg-slate-600" @click="update"><EditButton @click="update" />Update</button>
                    </div>
                   
                </div>
        </div>
        <div v-if="showUpdateForm" class="fixed top-0 right-0 transform -translate-x-0 -translate-y-0  h-full w-2/3 bg-white p-6 rounded shadow-md z-50">
            <updateCustomerForm :toggleForm="toggleForm" :customerId="customerId" class=" h-full" ></updateCustomerForm>
            <button @click="toggleForm" class="absolute left-0 top-0  w-6 rounded-full">
                <X color="gray" size="24"></X>
             </button>
        </div>
     
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
    </div>
</template>

<script setup >
import { ref, onMounted,computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCustomerStore } from '@/stores/customer'
import { mdiAccount, mdiMail, mdiAsterisk, mdiFormTextboxPassword, mdiGithub } from '@mdi/js'
import { useTaskStore } from '@/stores/task';
import { Plus, X } from 'lucide-vue-next'
import EditButton from './EditButton.vue'
import {Pen} from 'lucide-vue-next'
import updateCustomerForm from './updateCustomer.vue'
const taskStore=useTaskStore();
const customerStore = useCustomerStore()
const router = useRouter()
const customerId = router.currentRoute.value.params.id
const customer = ref(null)
const tasks=ref([])
const showUpdateForm=ref(false);
const fetchCustomerById = async (customerId) => {
    try {
        const res =await customerStore.getCustomerById(customerId)
        customer.value = res.data
        tasks.value=await taskStore.getTasksByCustomerId(customerId);
    } catch (error) {
        console.error('Error fetching customer:', error)
    }
}

const numTasks = computed(() => tasks.value.length)
const numDoneTasks = computed(() => tasks.value.filter(task => task.status === 'Done').length);
const numNotDoneTasks = computed(() => tasks.value.filter(task => task.status !== 'Done').length);
const update =()=>{
    toggleForm()
}
const toggleForm=()=>{
   showUpdateForm.value = ! showUpdateForm.value
}
onMounted(() => {
    fetchCustomerById(customerId)
    taskStore.getAllTasks()
    taskStore.getTasksByCustomerId(customerId) ;
})
</script>