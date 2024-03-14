<script setup lang="ts">
import { Loader2 as LoaderSpinner } from 'lucide-vue-next'
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
import { values } from 'lodash'

const { t } = useI18n()
const authStore = useAuthStore()
const { isLoading } = storeToRefs(authStore)
const formSchema = toTypedSchema(
  z.object({
    Fullname: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6)
  })
)

const form = useForm({
  validationSchema: formSchema
})
const onSubmit = form.handleSubmit(async (values) => {
  await authStore.register(values)
  router.replace({ name: 'login' })
})
</script>
<template>
  <public-view>
    <div class="flex w-full items-center justify-center">
      <form class="max-w-xs" @submit.prevent="onSubmit">
        <div class="w-full max-w-xs self-center pb-11 text-center">
          <h1 class="pb-2 text-4xl font-extrabold">Sign Up</h1>
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
              <FormLabel>Fullname</FormLabel>
              <FormControl>
                <Input type="text" placeholder="firstname" v-model="form.values.Fullname" />
              </FormControl>
              <FormLabel>{{ t('email') }}</FormLabel>
              <FormControl>
                <Input type="text" placeholder="example@gmail.com" v-model="form.values.email" />
              </FormControl>
              <FormMessage name="email" />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>{{ t('password') }}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  :placeholder="t('password')"
                  v-model="form.values.password"
                />
              </FormControl>
              <FormMessage name="password" />
            </FormItem>
          </FormField>
          <router-link
            :to="{ name: 'login' }"
            class="text-info text-sm font-semibold hover:underline"
            >You already have an account ?</router-link
          >
          <Button :disabled="isLoading">
            <LoaderSpinner v-if="isLoading" class="mr-2 size-4 animate-spin" />
            <span>SignUp</span>
          </Button>
        </div>
      </form>
    </div>
  </public-view>
</template>
