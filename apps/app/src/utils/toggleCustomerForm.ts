import { ref } from 'vue'

export const toggleCustomerForm = () => {
  const showCustomerForm = ref(false)

  const toggleForm = () => {
    showCustomerForm.value = !showCustomerForm.value
  }

  return {
    showCustomerForm,
    toggleForm
  }
}
