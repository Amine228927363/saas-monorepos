<template>
  <public-view>
    <div class="flex w-full items-center justify-center">
      <form class="bg-white px-10 py-8 rounded-xl w-screen shadow-xl max-w-sm" @submit.prevent="onSubmit">
        <div class="w-full max-w-xs self-center pb-11 text-center">
          <h1 class="pb-2 text-4xl font-extrabold">{{ t('sign_up') }}</h1>
          <p class="font- text-muted-foreground pb-2 text-sm">{{ t('login_text') }}</p>
          <label
            class="text-destructive bg-transparent text-xs"
            :class="[!authStore.isLoading && authStore.error ? 'block' : 'hidden']"
          >{{ authStore.error?.code ? t(authStore.error?.code) : authStore.error?.message }}</label>
        </div>
        <div class="flex flex-col gap-5">
          <FormField v-slot="{ componentField }" name="full_name">
            <FormItem>
              <FormLabel>Fullname:</FormLabel>
              <FormControl>
                <Input type="text" placeholder="John Doe" v-bind="componentField" />
              </FormControl>
              <FormMessage name="fullname" />
            </FormItem>
          </FormField>
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
          <FormField v-slot="{ componentField }" name="confirmPassword">
            <FormItem>
              <FormLabel>{{ t('confirm_password') }}</FormLabel>
              <FormControl>
                <Input type="password" :placeholder="t('confirm_password')" v-bind="componentField" />
              </FormControl>
              <FormMessage name="confirmPassword" />
            </FormItem>
          </FormField>
          <Button :disabled="isLoading" class="mt-6 w-full shadow-xl bg-gradient-to-tr from-blue-600 to-red-400 hover:to-red-700
           text-indigo-100 py-2 rounded-md text-lg tracking-wide transition duration-1000">
            <LoaderSpinner v-if="isLoading" class="mr-2 size-4 animate-spin" />
            <span>SignUp</span>
          </Button>
        </div>
      </form>
    </div>
  </public-view>
</template>

<script setup lang="ts">
import { Loader2 as LoaderSpinner } from 'lucide-vue-next';
import { useI18n } from 'vue-i18n';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { useAuthStore } from '@/stores/auth';
import { router } from '@/router';
import { Input } from '@/components/ui/input';
import * as z from 'zod';
import { storeToRefs } from 'pinia';

const { t } = useI18n();
const authStore = useAuthStore();
const { isLoading } = storeToRefs(authStore);

const formSchema = toTypedSchema(
  z.object({
    full_name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().refine((value) => value === form.values.password, {
      message: 'Passwords do not match',
    }),
  })
);

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
});

const onSubmit = form.handleSubmit(async (values) => {
  const { confirmPassword, ...registrationData } = values; // Exclude confirmPassword from submission
  await authStore.register(registrationData);
  
    router.replace({ name: 'login' });
  
});
</script>
