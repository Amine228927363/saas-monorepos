<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
    <h2 class="text-2xl font-semibold mb-4">Compose Email</h2>
    <form @submit.prevent="sendEmail">
      <div class="mb-4">
        <label for="to" class="block text-sm font-medium text-gray-700">To:</label>
        <input v-model="email.email" type="email" id="to" required
               class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
      </div>
      <div class="mb-4">
        <label for="subject" class="block text-sm font-medium text-gray-700">Subject:</label>
        <input v-model="email.subject" type="text" id="subject" required
               class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
      </div>
      <div class="mb-4">
        <label for="message" class="block text-sm font-medium text-gray-700">Message:</label>
        <textarea v-model="email.message" id="message" required
                  class="mt-1 block w-full h-[350px] border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
      </div>
      <button type="submit" class="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600">Send</button>
    </form>
  </div>
</template>

<script setup>
import { ref,defineProps } from 'vue';
import { useEmailStore } from '@/stores/email';



const emailStore = useEmailStore();
const props=defineProps(['customer','toggleContact'])
const customer=props.customer;
const email = ref({
  email: customer.email,
  name:customer.name,
  subject: '',
  message: '',
});
const sendEmail = async () => {
  try {
   
    await emailStore.contactCustomer(email.value);
    alert('Email sent successfully!');
    props.toggleContact()
  } catch (error) {
    console.error('Error sending email:', error);
    alert('Failed to send email. Please try again.');
  }
};
</script>
