<script setup lang="ts">
import vLanguageSelector from '@/components/v-language-selector.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
<template>
  <div class="h-screen bg-gradient-to-br from-blue-600 to-cyan-300">
  <header class="flex items-center justify-between px-9 py-7">
    <img alt="Saas monorepo" height="46" width="115" src="@/assets/images/logo.svg" />
    <v-language-selector />
  </header>
  <div class="flex min-h-[calc(100vh-98px)] items-center justify-normal">
    <slot></slot>
  </div>
</div>
</template>
