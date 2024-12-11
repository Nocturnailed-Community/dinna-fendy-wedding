<template>
    <div class="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <div class="bg-white shadow-md rounded p-6 w-full max-w-sm">
        <h2 class="text-xl font-bold mb-4 text-center">Admin Login</h2>
  
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium mb-1">Username</label>
            <input
              id="name"
              v-model="name"
              type="text"
              placeholder="Masukkan username"
              class="border rounded w-full px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
  
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium mb-1">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="Masukkan password"
              class="border rounded w-full px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
  
          <button
            type="submit"
            class="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Login
          </button>
        </form>
  
        <div v-if="errorMessage" class="text-red-500 text-sm mt-4 text-center">
          {{ errorMessage }}
        </div>
      </div>
    </div>
</template>
  
<script setup>
    import { useRouter } from 'vue-router';
    import { ref } from 'vue';
    import { useCookie } from '#app';
  
    const router = useRouter();
  
    const name = ref('');
    const password = ref('');
    const errorMessage = ref('');
  
    const handleLogin = async () => {
      errorMessage.value = '';
  
      if (!name.value || !password.value) {
        errorMessage.value = 'Username dan password harus diisi.';
        return;
      }
  
      try {
        const response = await $fetch('/api/users/login-user', {
          method: 'POST',
          body: { name: name.value, password: password.value },
        });
  
        if (response.error) {
          errorMessage.value = response.error;
          return;
        }
  
        // Simpan token ke cookie
        const authToken = useCookie('authToken');
        authToken.value = response.token;  // Store the token in the cookie
  
        // Redirect ke halaman admin
        router.push('/admin/dashboard');
      } catch (error) {
        console.error(error);
        errorMessage.value = 'Gagal melakukan login. Coba lagi nanti.';
      }
    };
</script>
  
<style scoped>
    body {
      font-family: Arial, sans-serif;
    }
</style>  