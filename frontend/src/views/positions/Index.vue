<template>
  <div class="w-full h-screen px-10 py-5 bg-gray-100">
    <p class="mb-4 text-3xl font-bold">Posisi</p>
    <div class="py-4">
      <router-link
        :to="{ name: 'positions.create' }"
        type="button"
        class="inline-flex items-center px-3 py-2 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
      >
        <i class="material-icons me-2">add</i>
        Tambah Posisi
      </router-link>
    </div>
    <div class="relative max-h-full overflow-y-auto drop-shadow-md">
      <table class="w-full text-left max-h-60">
        <thead class="sticky top-0 text-white uppercase bg-gray-800 border-b">
          <tr>
            <th scope="col" class="px-6 py-3">No</th>
            <th scope="col" class="px-6 py-3">Id</th>
            <th scope="col" class="px-6 py-3">Nama</th>
            <th scope="col" class="px-6 py-3">Gaji</th>
            <th scope="col" class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(position, index) in positions" :key="index" class="text-lg bg-white border-b">
            <td class="px-6 py-3">{{ index + 1 }}</td>
            <td class="px-6 py-3">{{ position.position_id }}</td>
            <td class="px-6 py-3">{{ position.position_name }}</td>
            <td class="px-6 py-3">{{ position.salary }}</td>
            <td class="px-6 py-3">
              <router-link
                :to="{ name: 'positions.edit', params: { id: position.position_id } }"
                type="button"
                class="inline-flex items-center p-2 text-sm font-medium text-center text-yellow-500 border border-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-white me-2"
              >
                <i class="material-icons">edit</i>
              </router-link>
              <button
                class="inline-flex items-center p-2 text-sm font-medium text-center text-red-500 border border-red-500 rounded-lg me-2 hover:bg-red-500 hover:text-white"
                type="button"
                @click.prevent="positionDelete(position.position_id)"
              >
                <i class="material-icons">delete</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'

export default {
  setup() {
    let positions = ref([])

    onMounted(() => {
      fetchPositions()
    })

    function fetchPositions() {
      axios
        .get('http://localhost:3000/api/positions')
        .then((response) => {
          positions.value = response.data.data
        })
        .catch((error) => {
          console.log(error.response.data)
        })
    }

    function positionDelete(employee_id) {
      if (confirm('Are you sure you want to delete this position?')) {
        axios
          .delete(`http://localhost:3000/api/positions/delete/${employee_id}`)
          .then(() => {
            fetchPositions()
            alert('Data berhasil dihapus.')
          })
          .catch((error) => {
            console.log(error.response.data)
            alert(error.response.data.message)
          })
      } else {
        return
      }
    }

    return {
      positions,
      fetchPositions,
      positionDelete,
    }
  },
}
</script>
