<template>
  <div class="w-full h-screen px-10 py-5 bg-gray-100">
    <div class="flex mb-20">
      <router-link :to="{ name: 'positions.index' }">
        <i class="text-4xl text-black me-5 material-icons">arrow_back</i>
      </router-link>
      <p class="text-3xl font-bold">Update Posisi</p>
    </div>
    <form class="max-w-sm mx-auto" @submit.prevent="update">
      <div class="mb-5">
        <label for="position_name" class="block mb-2 font-medium text-gray-900">Nama Posisi</label>
        <input
          type="text"
          id="position_name"
          class="bg-white border border-black text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Nama"
          required
          v-model="position.position_name"
        />
      </div>
      <div class="mb-5">
        <label for="salary" class="block mb-2 font-medium text-gray-900">Gaji</label>
        <input
          type="text"
          id="salary"
          class="bg-white border border-black text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Gaji"
          required
          v-model="position.salary"
        />
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
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {
  setup() {
    const position = reactive({
      position_name: '',
      salary: '',
    })

    const validation = ref([])

    const router = useRouter()

    const route = useRoute()

    const positions = ref([])

    async function fetchPositions() {
      try {
        const response = await axios.get('http://localhost:3000/api/positions')
        positions.value = response.data
      } catch (error) {
        console.error('Error fetching positions:', error)
      }
    }

    function getEmployee() {
      axios
        .get(`http://localhost:3000/api/positions/${route.params.id}`)
        .then((response) => {
          position.position_name = response.data.data.position_name
          position.salary = response.data.data.salary
        })
        .catch((error) => {
          console.log(error.response.data)
        })
    }

    onMounted(() => {
      fetchPositions()
      getEmployee()
    })

    function update() {
      const { position_name, salary } = position

      axios
        .patch(`http://localhost:3000/api/positions/update/${route.params.id}`, {
          position_name,
          salary,
        })
        .then(() => {
          alert('Data berhasil diubah.')
          router.push({
            name: 'positions.index',
          })
        })
        .catch((error) => {
          validation.value = error.response.data
        })
    }

    return {
      position,
      positions,
      validation,
      router,
      update,
    }
  },
}
</script>
