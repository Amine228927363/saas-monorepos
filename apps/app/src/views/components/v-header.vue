<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router';

const router = useRouter();
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'
const { t } = useI18n()
const appStore = useAppStore()
const authStore = useAuthStore()
const { currentUser } = storeToRefs(useUserStore())
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import avatarPlaceholder from '@/assets/images/avatar-placeholder.png'
import { BellRingIcon, LogOutIcon } from 'lucide-vue-next'
import {Plus } from 'lucide-vue-next'














</script>

<template>
  <header class="container  absolute z-20 hidden py-6 md:block">
    <nav class="flex w-full items-center justify-between">
      <div class="flex fixed items-center  gap-5 right-0">
        <BellRingIcon class="text-muted-foreground" />
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Avatar class="cursor-pointer">
              <AvatarImage :src="avatarPlaceholder" :alt="currentUser?.email" />
              <AvatarFallback>{{ t('user') }}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent :side="'bottom'" :align="'end'" class="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem
                class="text-destructive flex cursor-pointer items-center justify-start gap-2"
                @click="authStore.logout()"
              >
                <LogOutIcon :size="16" />
                <span class="">{{ t('logout') }}</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  </header>
  <!-- mobile-->
  <section
    class="bg-neutral-content shadow-center relative z-20 flex h-14 w-full items-center justify-between px-6 md:hidden"
  >
    <Button  @click="appStore.toggleSideBar()">
      <i class="material-icons">menu</i></Button
    >
    <img src="@/assets/images/logo3.png" alt="Route Genius" height="30" width="75" />
  </section>
</template>
