<template>
    <nav class="bg-gray-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <!-- Logo -->
          <div class="flex-shrink-0 text-xl font-bold">
            <NuxtLink to="/" class="text-white hover:text-gray-300">Dinna & Fendy</NuxtLink>
          </div>
  
          <!-- Menu for larger screens -->
          <div class="hidden md:flex space-x-4">
            <NuxtLink
              to="/admin/dashboard"
              class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              :class="{ 'bg-gray-900': $route.path === '/admin/dashboard' }"
            >
              Dashboard
            </NuxtLink>
            <NuxtLink
              to="/admin/users"
              class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              :class="{ 'bg-gray-900': $route.path === '/admin/users' }"
            >
              Pengguna
            </NuxtLink>
            <NuxtLink
              to="/admin/invitation"
              class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              :class="{ 'bg-gray-900': $route.path === '/admin/invitation' }"
            >
              Undangan
            </NuxtLink>
            <NuxtLink
              to="/admin/attendance"
              class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              :class="{ 'bg-gray-900': $route.path === '/admin/attendance' }"
            >
              Presensi
            </NuxtLink>
            <NuxtLink
              to="/admin/wishes"
              class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              :class="{ 'bg-gray-900': $route.path === '/admin/wishes' }"
            >
              Ucapan
            </NuxtLink>
            <NuxtLink
              to="/logout"
              class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              :class="{ 'bg-gray-900': $route.path === '/logout' }"
            >
              Logout
            </NuxtLink>
          </div>
  
          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center">
            <button
              @click="toggleMenu"
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
  
      <!-- Mobile menu -->
      <div v-if="isMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <NuxtLink
            to="/admin/dashboard"
            class="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
            :class="{ 'bg-gray-900': $route.path === '/admin/dashboard' }"
          >
            Dashboard
          </NuxtLink>
          <NuxtLink
            to="/admin/invitation"
            class="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
            :class="{ 'bg-gray-900': $route.path === '/admin/invitation' }"
          >
            Undangan
          </NuxtLink>
          <NuxtLink
            to="/admin/attendance"
            class="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
            :class="{ 'bg-gray-900': $route.path === '/admin/attendance' }"
          >
            Presensi
          </NuxtLink>
          <NuxtLink
            to="/admin/wishes"
            class="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
            :class="{ 'bg-gray-900': $route.path === '/admin/wishes' }"
          >
            Ucapan
          </NuxtLink>
          <NuxtLink
            to="/logout"
            class="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
            :class="{ 'bg-gray-900': $route.path === '/logout' }"
          >
            Logout
          </NuxtLink>
        </div>
      </div>
    </nav>
</template>
  
<script setup>
  import { ref } from 'vue';
  
  const isMenuOpen = ref(false);
  
  function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value;
  }
</script>
  