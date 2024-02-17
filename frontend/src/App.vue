<template>
  <div class="relative flex h-screen font-mono">
    <div id="side-bar" class="flex flex-col text-white duration-300 bg-gray-800 rounded-box w-72">
      <div class="flex items-center justify-between p-4">
        <p class="text-xl font-bold">App</p>
      </div>
      <div class="mb-4 font-medium border-t border-gray-200 dark:border-gray-700"></div>
      <div>
        <router-link
          :to="{ name: 'employees.index' }"
          class="flex px-4 py-3 hover:bg-gray-700"
          active-class="bg-gray-700"
        >
          <i class="material-symbols-outlined">group</i>
          <p class="ms-3">Pegawai</p>
        </router-link>
        <router-link
          :to="{ name: 'positions.index' }"
          class="flex px-4 py-3 hover:bg-gray-700"
          active-class="bg-gray-700"
        >
          <i class="material-symbols-outlined">work</i>
          <p class="ms-3">Posisi</p>
        </router-link>
      </div>
    </div>

    <!-- render vue router -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style>
body {
  background-color: lightgray !important;
}
</style>
