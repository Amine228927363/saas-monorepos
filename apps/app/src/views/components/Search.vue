<template>
  <div
    class="relative flex"
    data-twe-input-wrapper-init
    data-twe-input-group-ref
  >
    <input
      type="search"
      v-model="searchTerm"
      @input="emitSearch"
      class="peer block  w-full rounded border-0px-3 py-[0.32rem]  leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
      placeholder="Search"
      aria-label="Search"
      id="search-input"
      aria-describedby="search-button"
    />
    <label
      for="search-input"
      class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
      >Search
    </label>
    <button
      @click="emitSearch"
      class="relative z-[2] -ms-0.5 translate-x-4 flex items-center rounded-e bg-gray-800 px-5  text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
      type="button"
      id="search-button"
      data-twe-ripple-init
      data-twe-ripple-color="light"
    >
      <span class="[&>svg]:h-5 [&>svg]:w-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue';
const searchTerm = ref('');
const instance = getCurrentInstance();
const emitSearch = () => {
  if (instance) {
    instance.emit('search', searchTerm.value);
    console.log(searchTerm.value)
  }
};
</script>


