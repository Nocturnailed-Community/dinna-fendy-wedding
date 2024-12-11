<template>
  <div class="flex flex-col min-h-screen p-4">
    <Navbar />

    <!-- Search and Settings -->
    <div class="flex flex-wrap justify-between items-center mb-4 mt-4">
      <select v-model="limit" @change="fetchUsers" class="border rounded px-3 py-1">
        <option :value="5">5</option>
        <option :value="10">10</option>
        <option :value="20">20</option>
      </select>
      <input
        v-model="search"
        @input="fetchUsers"
        type="text"
        placeholder="Cari nama..."
        class="border rounded px-3 py-1 w-full sm:w-1/3 mt-2 sm:mt-0"
      />
      <button @click="openModal('add')" class="bg-green-500 text-white px-4 py-2 rounded mt-2 sm:mt-0">
        Tambah User
      </button>
    </div>

    <!-- Responsive Table -->
    <div class="overflow-x-auto">
      <table class="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th class="border px-4 py-2">Nama</th>
            <th class="border px-4 py-2">Role</th>
            <th class="border px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="border px-4 py-2">{{ user.name }}</td>
            <td class="border px-4 py-2">{{ user.role }}</td>
            <td class="border px-4 py-2">
              <button @click="openModal('edit', user)" class="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
              <button @click="deleteUser(user.id)" class="bg-red-500 text-white px-2 py-1 rounded ml-2">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="mt-4 flex justify-between items-center">
      <button
        @click="prevPage"
        :disabled="page === 1"
        class="bg-gray-300 px-2 py-1 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span>Page {{ page }} of {{ pagination.totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="page === pagination.totalPages"
        class="bg-gray-300 px-2 py-1 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>

    <!-- Modal for Add/Edit User -->
    <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-white rounded p-6 w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">{{ modalMode === 'add' ? 'Tambah User' : 'Edit User' }}</h2>
        <form @submit.prevent="saveUser">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium">Nama</label>
            <input
              v-model="form.name"
              id="name"
              type="text"
              class="border rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div class="mb-4">
            <label for="role" class="block text-sm font-medium">Role</label>
            <input
              v-model="form.role"
              id="role"
              type="text"
              class="border rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium">Password</label>
            <input
              v-model="form.password"
              id="password"
              type="text"
              class="border rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div class="flex justify-end">
            <button @click="closeModal" type="button" class="bg-gray-300 text-black px-4 py-2 rounded mr-2">Batal</button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Simpan</button>
          </div>
        </form>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
  import Navbar from '~/components/Admin/Navbar/Navbar.vue';
  import Footer from '~/components/Admin/Footer/Footer.vue';
  import { ref, onMounted } from 'vue';

  const users = ref([]);
  const page = ref(1);
  const limit = ref(10);
  const search = ref("");
  const pagination = ref({ totalPages: 1 });
  const isModalOpen = ref(false);
  const modalMode = ref('add'); // 'add' or 'edit'
  const form = ref({ name: '', role: '', password: '', id: null });

  // Fetch users with pagination and search
  const fetchUsers = async () => {
    const { data, pagination: pag } = await $fetch("/api/users/get-users", {
      params: { page: page.value, limit: limit.value, search: search.value },
    });
    users.value = data;
    pagination.value = pag;
  };

  // Handle pagination
  const prevPage = () => {
    if (page.value > 1) {
      page.value--;
      fetchUsers();
    }
  };

  const nextPage = () => {
    if (page.value < pagination.value.totalPages) {
      page.value++;
      fetchUsers();
    }
  };

  // Open modal for Add/Edit
  const openModal = (mode, user = null) => {
    modalMode.value = mode;
    if (mode === 'edit' && user) {
      form.value = { ...user };
    } else {
      form.value = { name: '', role: '', password: '', id: null };
    }
    isModalOpen.value = true;
  };

  // Close modal
  const closeModal = () => {
    isModalOpen.value = false;
  };

  // Save user (add or edit)
  const saveUser = async () => {
    if (modalMode.value === 'add') {
      const { success } = await $fetch("/api/users/post-user", {
        method: "POST",
        body: { name: form.value.name, role: form.value.role, password: form.value.password },
      });
      if (success) fetchUsers();
    } else if (modalMode.value === 'edit') {
      const { success } = await $fetch(`/api/users/put-user?id=${form.value.id}`, {
        method: "PUT",
        body: { name: form.value.name, role: form.value.role, password: form.value.password },
      });
      if (success) fetchUsers();
    }
    closeModal();
  };

  // Delete user
  const deleteUser = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      const { success } = await $fetch(`/api/users/delete-user?id=${id}`, { method: "DELETE" });
      if (success) {
        fetchUsers();
      }
    }
  };

  // Fetch users on mount
  onMounted(() => {
    fetchUsers();
  });
</script>

<style>
  /* Add any custom styles here */
</style>
