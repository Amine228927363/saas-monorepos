<script setup lang="ts">
import vLanguageSelector from '@/components/v-language-selector.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
<template>
  <div class="h-screen bg-gradient-to-r from-blue-500 to-purple-500">
  <header class="flex items-center justify-between px-4 ">
    <img alt="Saas monorepo" height="74" width="170" src="@/assets/images/logo3.png" />
    <v-language-selector />
  </header>
  <div class="flex min-h-[calc(100vh-98px)] items-center justify-normal">
    <slot></slot>
  </div>
</div>
</template>
