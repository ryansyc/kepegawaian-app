<template>
  <div class="flex flex-col w-full h-screen px-10 py-5 bg-gray-100">
    <p class="mb-4 text-3xl font-bold">Pegawai</p>
    <div class="py-4">
      <router-link
        :to="{ name: 'employees.create' }"
        type="button"
        class="inline-flex items-center px-3 py-2 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
      >
        <i class="material-icons me-2">add</i>
        Tambah Pegawai
      </router-link>
    </div>
    <div class="relative max-h-full overflow-y-auto drop-shadow-md">
      <table class="w-full text-left max-h-60">
        <thead class="sticky top-0 text-white uppercase bg-gray-800 border-b">
          <tr>
            <th scope="col" class="px-6 py-3">No</th>
            <th scope="col" class="px-6 py-3">Id</th>
            <th scope="col" class="px-6 py-3">Nama</th>
            <th scope="col" class="px-6 py-3">Email</th>
            <th scope="col" class="px-6 py-3">Posisi</th>
            <th scope="col" class="px-6 py-3">Gaji</th>
            <th scope="col" class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(employee, index) in employees" :key="index" class="text-lg bg-white border-b">
            <td class="px-6 py-3">{{ index + 1 }}</td>
            <td class="px-6 py-3">{{ employee.employee_id }}</td>
            <td class="px-6 py-3">{{ employee.employee_name }}</td>
            <td class="px-6 py-3">{{ employee.email }}</td>
            <td class="px-6 py-3">{{ employee.position_name }}</td>
            <td class="px-6 py-3">{{ employee.salary }}</td>
            <td class="px-6 py-3">
              <router-link
                :to="{ name: 'employees.edit', params: { id: employee.employee_id } }"
                type="button"
                class="inline-flex items-center p-2 text-sm font-medium text-center text-yellow-500 border border-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-white me-2"
              >
                <i class="material-icons">edit</i>
              </router-link>
              <button
                class="inline-flex items-center p-2 text-sm font-medium text-center text-red-500 border border-red-500 rounded-lg me-2 hover:bg-red-500 hover:text-white"
                type="button"
                @click.prevent="employeeDelete(employee.employee_id)"
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
    let employees = ref([])

    onMounted(() => {
      fetchEmployees()
    })

    function fetchEmployees() {
      axios
        .get('http://localhost:3000/api/employees')
        .then((response) => {
          employees.value = response.data.data
        })
        .catch((error) => {
          console.log(error.response.data)
        })
    }

    function employeeDelete(employee_id) {
      if (confirm('Are you sure you want to delete this employee?')) {
        axios
          .delete(`http://localhost:3000/api/employees/delete/${employee_id}`)
          .then(() => {
            fetchEmployees()
            alert('Data berhasil dihapus.')
          })
          .catch((error) => {
            console.log(error.response.data)
          })
      } else {
        return
      }
    }

    return {
      employees,
      fetchEmployees,
      employeeDelete,
    }
  },
}
</script>
