<script setup lang="ts">
import {ref , onMounted,defineProps} from 'vue'
import type { Ref } from 'vue';
import { useMemberStore } from '@/stores/member';
import type {MemberWithDetails} from '@/types/workspaceMember'
const staffMembers: Ref<MemberWithDetails[]> = ref([])
const memberStore = useMemberStore();
const props = defineProps(['workspaceId']);
const workspaceId=props.workspaceId;
const fetchMembers = async () => {
  try {
    await memberStore.getMembersByWorkspace(workspaceId);
    staffMembers.value = memberStore.members;
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
const options=['Editor', 'Viewer']
onMounted(() => {
  fetchMembers();
});
</script>

<template>
  <!-- ====== Table Section Start -->
  <section class="flex flex-col  bg-white dark:bg-dark">
    <div class="container w-full">
      <div class="flex flex-row items-center justify-center">
        <div class="flex flex-col w-full h-[480px]">
          <div>
            <h1 class="font-bold text-2xl">Staff Members</h1>
            <table class="w-full">
              <tbody>
                <tr v-for="(member, index) in staffMembers" :key="index" class="border-b border-gray-200">
                  <td class="py-4  flex items-center">
                    <!-- Avatar -->
                    <div class="avatar mr-2">
                      <img :src="generateAvatarUrl(member.user.full_name)" alt="avatar" class="w-8 h-8 rounded-full" />
                    </div>
                    <!-- Nom -->
                    <div class="flex flex-col">
                      <span class="font-semibold text-xl">{{ member.user.full_name }}</span>
                      <span class="text-gray-500">{{ member.user.email }}</span>
                    </div>
                  </td>
                  
                  <td class="py-4 px-6">
                    <select v-model="member.role"   class="flex flex-col px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none
           focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
            </select>
                  </td>
                  <td class="py-4 px-6">
                    <!-- Bouton pour inscrire -->
                    <a href="#" class="inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium">
                      Edit
                    </a>
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
