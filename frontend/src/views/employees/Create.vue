<template>
  <div class="w-full h-screen px-10 py-5 bg-gray-100">
    <div class="flex mb-20">
      <router-link :to="{ name: 'employees.index' }">
        <i class="text-4xl text-black me-5 material-icons">arrow_back</i>
      </router-link>
      <p class="text-3xl font-bold">Tambah Pegawai</p>
    </div>
    <form class="max-w-sm mx-auto" @submit.prevent="store">
      <div class="mb-5">
        <label for="name" class="block mb-2 font-medium text-gray-900">Nama</label>
        <input
          type="text"
          id="name"
          class="bg-white border border-black text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Nama"
          required
          v-model="employee.employee_name"
        />
      </div>
      <div class="mb-5">
        <label for="email" class="block mb-2 font-medium text-gray-900">Email</label>
        <input
          type="email"
          id="email"
          class="bg-white border border-black text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="abc@email.com"
          required
          v-model="employee.email"
        />
      </div>
      <div class="mb-5">
        <label for="positions" class="block mb-2 font-medium text-gray-900">Posisi</label>
        <select
          id="positions"
          class="bg-white border border-black text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          v-model="employee.position_id"
        >
          <option value="">-</option>
          <option
            v-for="position in positions"
            :key="position.position_id"
            :value="position.position_id"
          >
            {{ position.position_name }}
          </option>
        </select>
      </div>

      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
      <div
        class="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
        role="alert"
        v-if="validation.length > 0"
      >
        <i class="material-icons me-2">info</i>
        <div>
          <span class="font-medium">
            {{ validation[0] }}
          </span>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  setup() {
    const employee = reactive({
      employee_name: '',
      email: '',
      position_id: '',
    })

    const validation = ref([])

    const router = useRouter()

    const positions = ref([])

    async function fetchPositions() {
      try {
        const response = await axios.get('http://localhost:3000/api/positions')
        positions.value = response.data.data
      } catch (error) {
        console.error('Error fetching positions:', error)
      }
    }

    function store() {
      const { employee_name, email, position_id } = employee

      if (position_id == '') {
        validation.value = ['Position is required']
        return
      }

      axios
        .post('http://localhost:3000/api/employees/store', {
          employee_name,
          email,
          position_id,
        })
        .then(() => {
          alert('Data berhasil ditambahkan.')
          router.push({
            name: 'employees.index',
          })
        })
        .catch((error) => {
          validation.value = error.response.data
        })
    }

    onMounted(fetchPositions)

    return {
      employee,
      positions,
      validation,
      router,
      store,
    }
  },
}
</script>
