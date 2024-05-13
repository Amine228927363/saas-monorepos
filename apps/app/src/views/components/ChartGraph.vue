<template>
  <div class="flex flex-row justify-between">
    <div id="app" class="flex items-center">
      
    </div>
    <div class="mx-12">
      <div class="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
        <div class="flex justify-between">
          <div>
            <h5 class="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">{{ numCustomersThisWeek }}</h5>
            <p class="text-base font-normal text-gray-500 dark:text-gray-400">Customers this week</p>
          </div>
          <div class="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
            Onboarded customers: {{ onboardedCustomerPercentage }}%
            
          </div>
        </div>
        <div id="area-chart"></div>
        <div class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
          <div class="flex justify-between items-center pt-5">
            <button @click="toggleDropdown" class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white" type="button">
              {{ selectedOption }}
              <svg class="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
              </svg>
            </button>
            <div v-show="showDropdown" class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
              <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li v-for="option in dropdownOptions" :key="option">
                  <a @click="selectOption(option)" href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{{ option }}</a>
                </li>
              </ul>
            </div>
         
          </div>
          
        </div>
        <VueApexCharts width="320" type="line" :options="options2" :series="series"></VueApexCharts>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { useCustomerStore } from '@/stores/customer';
const customerStore = useCustomerStore();

const numCustomersThisWeek = ref(0);
const series = ref([{ name: 'New customers', data: [] }]);

const options2 = {
  chart: {
    height: "100%",
    maxWidth: "100%",
    type: "area",
    fontFamily: "Inter, sans-serif",
    dropShadow: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    enabled: true,
    x: {
      show: false,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      opacityFrom: 0.55,
      opacityTo: 20,
      shade: "#1C64F2",
      gradientToColors: ["#1C64F2"],
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 6,
  },
  grid: {
    show: false,
    strokeDashArray: 4,
    padding: {
      left: 2,
      right: 2,
      top: 0
    },
  },
  series: [
    {
      name: "New customers",
      data:  [],
      color: "#1A56DB",
    },
  ],
  xaxis: {
    categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
};

const dropdownOptions = ['Yesterday', 'Today', 'Last 7 days'];
let showDropdown = ref(false);
let selectedOption = 'Last 7 days';

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const selectOption = (option) => {
  selectedOption = option;
  showDropdown = false; // Hide dropdown after selection
};

const getCustomersThisWeek = async () => {
  try {
    const customersThisWeek = await customerStore.getCustomersForWeek();
    const customerCountByDay = [0, 0, 0, 0, 0, 0, 0]; 
    customersThisWeek.forEach((customer) => {
      const dayOfWeek = new Date(customer.createdAt).getDay();
      customerCountByDay[dayOfWeek]++;
    });
    numCustomersThisWeek.value = customersThisWeek.length;
    series.value[0].data = customerCountByDay;
  } catch (error) {
    console.error("Error fetching customers for the week:", error);
  } 
};

const getOnboardedCustomer = async () => {
  try {
   await customerStore.getCustomers();
    const customers= customerStore.customers
    const totalCustomers = customers.length;
    let onboardedCustomers = 0;

    customers.forEach((customer) => {
      if (customer.status=='Onboarded') {
        onboardedCustomers++;
      }
    });

    const percentageOnboarded = (onboardedCustomers / totalCustomers) * 100;
    return percentageOnboarded.toFixed(2)
  } catch (error) {
    console.error("Error fetching customers for the week:", error);
    return null; 
  }
};
const onboardedCustomerPercentage = ref(null);
onMounted(async () => {
  getCustomersThisWeek()
  onboardedCustomerPercentage.value = await getOnboardedCustomer();
});
</script>
