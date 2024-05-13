<template>
    <div class="container mx-auto mt-8">
      <div class="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 class="text-2xl font-bold mb-4">Confirmation Page</h1>
        <p class="text-gray-600 mb-4">Please click the button below to verify your email:</p>
        <button @click="verifytoken" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Verify Email
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { verifyToken } from '@/utils/linkGenerator';

  const router = useRouter();

  const verifytoken = async () => {
    const token = router.currentRoute.value.params.token as string;
    if (!token) {
      alert('Invalid URL');
      return router.push('/register');
    } else {
      try {
        console.log(`Verifying ${token}...`);
        const response = await verifyToken(token);
        if (response){ alert('Email has been verified! You can now log in.');} 
      } catch (error) {
        console.error('Error verifying token:', error);
        alert('Error verifying token. Please try again later.');
        router.push('/error');
      }
    }
  }
</script>

  
  <style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .bg-white {
    background-color: #ffffff;
  }
  
  .max-w-lg {
    max-width: 32rem;
  }
  
  .text-2xl {
    font-size: 1.5rem;
  }
  
  .text-gray-600 {
    color: #4b5563;
  }
  
  .bg-blue-500 {
    background-color: #3b82f6;
  }
  
  .hover\:bg-blue-600:hover {
    background-color: #2563eb;
  }
  
  .text-white {
    color: #ffffff;
  }
  
  .font-bold {
    font-weight: 700;
  }
  
  .py-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  
  .px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .rounded {
    border-radius: 0.375rem;
  }
  </style>
  