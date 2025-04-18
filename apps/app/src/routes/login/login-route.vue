<script setup lang="ts">
import { Loader2 as LoaderSpinner } from 'lucide-vue-next'
import { User } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useAuthStore } from '@/stores/auth'
import { router } from '@/router'
import { Input } from '@/components/ui/input'
import * as z from 'zod'
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const authStore = useAuthStore()
const { isLoading } = storeToRefs(authStore)
const formSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })
)

const form = useForm({
  validationSchema: formSchema
})

const onSubmit = form.handleSubmit(async (values) => {
  await authStore.login(values)
  if (authStore.isAuthenticated) {
    router.replace({ name: 'home-overview' })
  }
})
</script>
<template>
  <public-view>
    <div class="flex w-full h-full items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4">
      <form class="bg-white px-10 py-8 rounded-xl w-screen shadow-xl max-w-sm" @submit.prevent="onSubmit">
        <div class="w-full max-w-xs self-center pb-11 text-center">
          <h1 class="pb-2 text-4xl font-extrabold">{{ t('sign_in') }}</h1>
          <p class="font- text-muted-foreground pb-2 text-sm">{{ t('login_text') }}</p>
          <label
            class="text-destructive bg-transparent text-xs"
            :class="[!authStore.isLoading && authStore.error ? 'block' : 'hidden']"
            >{{ authStore.error?.code ? t(authStore.error?.code) : authStore.error?.message }}
          </label>
        </div>
        <div class="flex flex-col gap-5">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>{{ t('email') }}</FormLabel>
              <FormControl>
                <Input type="text" placeholder="example@gmail.com" v-bind="componentField" />
              </FormControl>
              <FormMessage name="email" />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>{{ t('password') }}</FormLabel>
              <FormControl>
                <Input type="password" :placeholder="t('password')" v-bind="componentField" />
              </FormControl>
              <FormMessage name="password" />
            </FormItem>
          </FormField>
          <div class="flex justify-between "><router-link
            :to="{ name: 'forgot' }"
            class="text-info text-sm font-semibold hover:underline"
            >{{ t('did_you_forget_password') }}</router-link
          >
          <router-link
            :to="{ name: 'register' }"
            class="text-info   text-sm font-semibold hover:underline"
            >Create an account?</router-link
          ></div>
          <Button :disabled="isLoading" class="bg-blue-500 text-indigo-100 py-2
           rounded-md text-lg tracking-wide transition duration-1000">
            <LoaderSpinner v-if="isLoading" class="mr-2 size-4 animate-spin" />
            <span>{{ t('sign_in') }}</span>
          </Button>
        </div>
      </form>
    </div>
  </public-view>
</template>
