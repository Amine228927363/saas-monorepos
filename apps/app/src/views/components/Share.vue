<script setup lang="ts">
import { ref,defineProps,onMounted,watch } from 'vue'
import type { Ref } from 'vue';
import { Link } from 'lucide-vue-next';
import { useEmailStore } from '@/stores/email';
import { useMemberStore } from '@/stores/member';
import {generateUniqueLink} from '@/utils/linkGenerator'
import { fetchUserDetailsByEmail } from '@/utils/member';
import type { MemberWithDetails, createMember, workspaceMember } from '@/types/workspaceMember';
import { useAuthStore } from '@/stores/auth';
import { string } from 'zod';
const options=['Editor', 'Viewer']
const emailStore=useEmailStore();
const props = defineProps(['workspaceId']);
const workspaceId=props.workspaceId;
const authStore= useAuthStore()
const memberStore = useMemberStore();
const shareEmail= ref({
  userId:'',
  email:'',
  full_name:'',
  role:'Editor',
  link:'',
})
const newMember= ref({
  userId:'',
  role:'Editor',
  workspaceId:workspaceId
})
const members: Ref<MemberWithDetails[]> = ref([])
const authToken=  authStore.token
const getUserData= async (email:string)=>{
  try {
    const userData = await fetchUserDetailsByEmail(email,authToken)
    if (userData) {
      console.log('User Full Name:', userData.full_name);
      console.log('User ID:', userData.id);
      return userData
    } else {
      console.log('User not found or error occurred.');
    }
  } catch (error) {
    console.log('Error in adding new user to the workspace');  
  }
}
const generateLink=async ()=>{
  shareEmail.value.link=await generateUniqueLink(newMember.value.role,workspaceId,)
}
const fetchMembers = async () => {
  try {
    await memberStore.getMembersByWorkspace(workspaceId);
    members.value = memberStore.members;
  } catch (error) {
    console.error('Error fetching members:', error);
  }
};
function generateAvatarUrl(name:string) {
    if (!name || name.trim().length === 0) {
        return 'a';
    }
    const avatarUrl = `https://ui-avatars.com/api/?name=${name}`;
    
    return avatarUrl;
}

const share= async()=>{
  try {
    const userData= await getUserData(shareEmail.value.email)
    const userId= userData.id
    newMember.value.workspaceId=workspaceId
    newMember.value.userId=userId
    const newMemberValue = newMember.value;
    console.log(shareEmail.value.role)
    await generateLink()
    await memberStore.createMember(newMemberValue)
    await emailStore.sendEmail(shareEmail.value)
    alert("Invitation sent successfully")
    await fetchMembers()
    shareEmail.value={userId:'',email:'',full_name:'',role:'Editor',link:''}
  } catch (error) {
    console.log('Error sharing ');  
  }
}
const showNotification = ref(false);

const copyLink =async () => {
   await generateLink()
  navigator.clipboard.writeText(shareEmail.value.link)
    .then(() => {
      showNotification.value = true;
      setTimeout(() => {
        showNotification.value = false;
      }, 2000);
    })
    .catch((error) => console.error('Error copying link:', error));
};
onMounted(() => {
  fetchMembers();
});


</script>

<template>
  <!-- ====== Table Section Start -->
  <section class="flex flex-col  bg-white dark:bg-dark">
    <div class="container w-full">
      <div class="flex flex-row items-center justify-center">
        <div v-if="showNotification" class="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md">
          Link copied to clipboard
        </div>
        <div class="flex w-full h-[680px]">
          <div>
            <h1 class="font-bold text-2xl">Share Table </h1>
            <div class="flex flex-row items-center m-8 justify-between">
                <div class="flex flex-row items-center">
                  <input v-model="shareEmail.email" type="email" class=" h-10  border rounded-md p-4 text-sm w-full" placeholder="Email address">
                  <div class="relative">
                    <select v-model="newMember.role" class="flex flex-col px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none
                    focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                       <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
                     </select>
                  </div>
                </div>
                <Button @click="share" class="bg-red-400 text-white rounded h-8  w-24 mx-4 px-4 hover:bg-red-600">Share</Button>
              </div>
              
              <div class="flex flex-row px-8 border-b  ">
                <div class="w-12 h-12 flex items-center justify-center rounded bg-gray-100"> <Link></Link> 
                </div>
                <span class="flex flex-col px-4">Anyone Using the Link Can
                    <Button @click="copyLink" class="text-blue-500 decoration text-sm">Copy link</Button>
                </span>
                <select  class=" text-center px-4 right-0 translate-x-24  h-8 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none
           focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
            </select>
                
              </div>
            
            <table class="w-full m-4">
              <tbody>
                <tr v-for="(item, index) in members" :key="index" class="border-b border-gray-200">
                  <td class="py-4  flex items-center">
                    <!-- Avatar -->
                    <div class="avatar mr-2">
                      <img :src="generateAvatarUrl(item.user.full_name)" alt="avatar" class="w-8 h-8 rounded-full" />
                    </div>
                    <!-- Nom -->
                    <div class="flex flex-col">
                      <span class="font-semibold text-xl">{{ item.user.full_name }}</span>
                      <span class="text-gray-500">{{ item.user.email }}</span>
                    </div>
                  </td>
              
                  <td class="py-4 px-6">
                    <select v-model="item.role"  class="flex flex-col px-4 py-2 translate-x-[45px] border border-gray-300 rounded-md shadow-sm focus:outline-none
           focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
            </select>
                    
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <!-- ====== Table Section End -->
</template>
