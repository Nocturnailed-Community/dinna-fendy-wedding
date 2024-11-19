<template>
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Daftar Undangan</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
  <!-- Tombol Edit Template -->
  <button
    @click="openTemplateModal"
    class="bg-blue-500 text-white px-3 py-2 rounded w-full"
  >
    Edit Template Pesan
  </button>

  <!-- Input File CSV, Tombol Upload, dan Link Template -->
  <div class="flex flex-col gap-4">
    <!-- Input File CSV -->
    <input
      type="file"
      id="csvInput"
      accept=".csv"
      class="bg-gray-100 border border-gray-300 rounded px-3 py-2 w-full"
    />

    <!-- Tombol Upload CSV -->
    <button
      @click="saveMultipleInvitationWithCSV()"
      class="bg-green-500 text-white px-3 py-2 rounded w-full"
    >
      Upload Undangan (CSV)
    </button>

    <!-- Link ke Google Spreadsheet -->
    <a
      href="https://docs.google.com/spreadsheets/d/1v6sTfwW4iTtAEda8mtOb1anR081PGYOs3NgztK60Nvk/edit?usp=sharing"
      target="_blank"
      rel="noopener noreferrer"
      class="text-blue-500 underline text-sm"
    >
      Download Template CSV
    </a>
  </div>

  <!-- Tombol Tambah Banyak Undangan dan Tambah Undangan -->
  <div class="flex flex-col gap-4">
    <!-- Tombol Tambah Banyak Undangan -->
    <button
      @click="openModalMultiple()"
      class="bg-green-500 text-white px-3 py-2 rounded w-full"
    >
      Tambah Banyak Undangan
    </button>

    <!-- Tombol Tambah Undangan -->
    <button
      @click="openModal()"
      class="bg-green-500 text-white px-3 py-2 rounded w-full"
    >
      Tambah Undangan
    </button>
  </div>
</div>

      <!-- Search and Settings -->
      <div class="flex justify-between items-center mb-4">
        <select v-model="limit" @change="fetchInvitations" class="border rounded px-3 py-1">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
        </select>
        <input
          v-model="search"
          @input="fetchInvitations"
          type="text"
          placeholder="Cari nama..."
          class="border rounded px-3 py-1 w-1/3"
        />    
      </div>

      <!-- Table -->
      <table class="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th class="border px-4 py-2">Nama</th>
            <th class="border px-4 py-2">No. WhatsApp</th>
            <th class="border px-4 py-2">Status</th>
            <th class="border px-4 py-2">Link</th>
            <th class="border px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="invitation in invitations" :key="invitation.id">
            <td class="border px-4 py-2">{{ invitation.name }}</td>
            <td class="border px-4 py-2">{{ invitation.number }}</td>
            <td class="border px-4 py-2">
              <span
                :class="[ 
                  'px-2 py-1 rounded text-white', 
                  invitation.status === 1 ? 'bg-green-500' : 'bg-gray-500' 
                ]"
              >
                {{ invitation.status === 1 ? 'Terkirim' : 'Belum Terkirim' }}
              </span>
            </td>
            <td class="border px-4 py-2">
              <a
                :href="invitation.link"
                target="_blank"
                class="text-blue-500 underline"
              >
                Open Invitation
              </a>
            </td>
            <td class="border px-4 py-2">
              <button
                @click="sendInvitation(invitation)"
                :disabled="invitation.status === 'sent'"
                class="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50 m-3"
              >
                Kirim
              </button>
              <button
                @click="cancelInvitation(invitation)"
                :disabled="invitation.status === 'sent'"
                class="bg-gray-500 text-white px-3 py-1 rounded disabled:opacity-50 m-3"
              >
                Ubah Status Kirim
              </button>
              <button
                @click="openModal(invitation)"
                class="bg-yellow-500 text-white px-3 py-1 rounded m-3"
              >
                Edit
              </button>
              <button
                @click="deleteInvitation(invitation.id)"
                class="bg-red-500 text-white px-3 py-1 rounded m-3"
              >
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Pagination -->
      <div class="mt-4 flex justify-between items-center">
        <button
          @click="prevPage"
          :disabled="page === 1"
          class="bg-gray-300 px-2 py-1 rounded"
        >
          Previous
        </button>
        <span>Page {{ page }} of {{ pagination.totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="page === pagination.totalPages"
          class="bg-gray-300 px-2 py-1 rounded"
        >
          Next
        </button>
      </div>
  
      <!-- Modal -->
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-6 rounded shadow w-1/3">
          <h2 class="text-lg font-bold mb-4">{{ modalTitle }}</h2>
          <form @submit.prevent="saveInvitation">
            <div class="mb-4">
              <label for="name" class="block mb-1">Nama</label>
              <input
                v-model="modalData.name"
                type="text"
                id="name"
                required
                class="border rounded px-3 py-1 w-full"
                placeholder="Masukkan Nama"
              />
            </div>
            <div class="mb-4">
              <label for="number" class="block mb-1">No. WhatsApp</label>
              <input
                v-model="modalData.number"
                type="text"
                id="number"
                required
                class="border rounded px-3 py-1 w-full"
                placeholder="Masukkan No. WhatsApp"
              />
            </div>
            <div class="flex justify-end">
              <button
                @click="closeModal"
                type="button"
                class="bg-gray-300 px-3 py-1 rounded mr-2"
              >
                Batal
              </button>
              <button
                type="submit"
                class="bg-green-500 text-white px-3 py-1 rounded"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Modal -->
<div v-if="showMultipleModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
  <div class="bg-white p-6 rounded shadow w-1/3">
    <h2 class="text-lg font-bold mb-4">{{ modalTitle }}</h2>
    <form @submit.prevent="saveMultipleInvitation">
      <div class="mb-4">
        <label for="bulkInput" class="block mb-1">Nama dan No. WhatsApp</label>
        <textarea
          v-model="bulkInput"
          id="bulkInput"
          rows="10"
          placeholder="Masukkan Nama dan Nomor, contoh: Kuku dan Koko, 6288888888888 jika banyak kasih baris baru dan seterusnya"
          required
          class="border rounded px-3 py-1 w-full"
        ></textarea>
      </div>
      <div class="flex justify-end">
        <button
          @click="closeModalMultiple"
          type="button"
          class="bg-gray-300 px-3 py-1 rounded mr-2"
        >
          Batal
        </button>
        <button
          type="submit"
          class="bg-green-500 text-white px-3 py-1 rounded"
        >
          Simpan
        </button>
      </div>
    </form>
  </div>
</div>

      <!-- Modal Edit Template Pesan -->
<div
  v-if="showTemplateModal"
  class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
>
  <div class="bg-white p-6 rounded shadow w-1/3">
    <h2 class="text-lg font-bold mb-4">Edit Template Pesan</h2>
    <p class="text-sm mb-4 text-red-500">*Jangan hilangkan <strong>{name}</strong> untuk nama, dan <strong>{link}</strong> untuk generate link undangan, sesuaikan penempatan di deskripsi pesan.</p>
    <form @submit.prevent="saveMessageTemplate">
      <div class="mb-4">
        <label for="templateMessage" class="block mb-1">Template Pesan</label>
        <textarea
          v-model="messageTemplate"
          id="templateMessage"
          rows="4"
          class="border rounded px-3 py-1 w-full"
          placeholder="Masukkan template pesan dengan placeholder {name} dan {link}"
          required
        ></textarea>
      </div>
      <div class="flex justify-end">
        <button
          @click="closeTemplateModal"
          type="button"
          class="bg-gray-300 px-3 py-1 rounded mr-2"
        >
          Batal
        </button>
        <button type="submit" class="bg-green-500 text-white px-3 py-1 rounded">
          Simpan
        </button>
      </div>
    </form>
  </div>
</div>

    </div>
</template>
  
<script setup>
  import { ref, onMounted } from "vue";
  
  const invitations = ref([]);
  const page = ref(1);
  const limit = ref(10);
  const search = ref("");
  const pagination = ref({ totalPages: 1 });
  
  const bulkInput = ref("");
  const showModal = ref(false);
  const showMultipleModal = ref(false);
  const modalTitle = ref("");
  const modalData = ref({ id: null, name: "", number: "" });
  
  const fetchInvitations = async () => {
    const { data, pagination: pag } = await $fetch("/api/invitations/get-invitations", {
      params: { page: page.value, limit: limit.value, search: search.value },
    });
    invitations.value = data;
    pagination.value = pag;
  };

  const saveMultipleInvitationWithCSV = async () => {
    const fileInput = document.getElementById("csvInput"); // Ambil elemen input file
    const file = fileInput.files[0]; // Ambil file pertama yang diunggah

    if (!file) {
      alert("Please upload a CSV file.");
      return;
    }

    try {
      const text = await readFileAsText(file); // Baca file sebagai teks
      const invitations = parseCSV(text); // Parse teks CSV menjadi objek

      if (invitations.length === 0) {
        alert("The uploaded CSV file is empty or invalid.");
        return;
      }

      await useFetch("/api/invitations/post-multiple-invitation", {
        method: "POST",
        body: invitations,
      });

      alert("Invitations successfully submitted!");
      closeModalMultiple();
      fetchInvitations();
    } catch (error) {
      console.error("Failed to save invitations:", error);
      alert("An error occurred while saving invitations. Please try again.");
    } finally {
      closeModalMultiple();
    }
  };

  // Fungsi untuk membaca file sebagai teks
  const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  // Fungsi untuk mem-parsing CSV menjadi array objek
  const parseCSV = (text) => {
    const lines = text.split("\n");
    return lines
      .map((line) => {
        const [name, number] = line.trim().split(","); // Asumsikan data dipisahkan dengan koma
        return { name: name?.trim(), number: number?.trim() };
      })
      .filter((entry) => entry.name && entry.number); // Filter data yang valid
  };
  
  const saveInvitation = async () => {
    if (modalData.value.id) {
      // Update existing invitation
      await $fetch(`/api/invitations/put-invitation?id=${modalData.value.id}`, {
        method: "PUT",
        body: modalData.value,
      });
    } else {
      // Create new invitation
      await $fetch("/api/invitations/post-invitation", {
        method: "POST",
        body: modalData.value,
      });
    }
    closeModal();
    fetchInvitations();
  };

  const saveMultipleInvitation = async () => {
    const invitations = bulkInput.value
      .split("\n") // Split input by new lines
      .map((line) => {
        const [name, number] = line.trim().split(","); // Split by comma
        return { name, number };
      })
      .filter((entry) => entry.name && entry.number); // Filter out invalid entries

    if (invitations.length === 0) {
      alert("Please provide valid input.");
      return;
    }

    try {
      await useFetch("/api/invitations/post-multiple-invitation", {
        method: "POST",
        body: invitations,
      });
      alert("Invitations successfully submitted!"); // Notify user of success
      closeModalMultiple(); // Close the modal
      fetchInvitations(); // Refresh invitation data
    } catch (error) {
      console.error("Failed to save invitations:", error);
      alert("An error occurred while saving invitations. Please try again."); // Notify user of failure
    } finally {
      closeModalMultiple(); // Ensure modal closes regardless of success or error
    }
  };

  const deleteInvitation = async (id) => {
    // Tampilkan konfirmasi sebelum menghapus
    const confirmation = confirm("Apakah Anda yakin ingin menghapus undangan ini?");
    if (!confirmation) {
        return; // Batalkan proses jika pengguna memilih "Tidak"
    }

    try {
        await $fetch(`/api/invitations/delete-invitation?id=${id}`, { method: "DELETE" });
        alert("Undangan berhasil dihapus!");
        fetchInvitations();
    } catch (error) {
        console.error(error);
        alert("Gagal menghapus undangan. Silakan coba lagi.");
    }
  };
  
  const openModal = (invitation = null) => {
    if (invitation) {
      modalData.value = { ...invitation };
      modalTitle.value = "Edit Undangan";
    } else {
      modalData.value = { id: null, name: "", number: "" };
      modalTitle.value = "Tambah Undangan";
    }
    showModal.value = true;
  };

  const openModalMultiple = () => {
    showMultipleModal.value = true;
 };
  
  const closeModalMultiple = () => {
    showMultipleModal.value = false;
};
  
  const closeModal = () => {
    showModal.value = false;
  };
  
  const sendInvitation = async (invitation) => {
  // Tampilkan konfirmasi sebelum mengirim
  const confirmation = confirm(
    `Apakah Anda yakin ingin mengirim undangan kepada ${invitation.name}?`
  );
  if (!confirmation) {
    return; // Batalkan proses jika pengguna memilih "Tidak"
  }

  try {
    // Ambil deskripsi pesan dari API
    const response = await $fetch(`/api/messages/get-message`, {
      method: "GET",
    });
    
    const { messageTemplate } = response;

    // Ganti placeholder dalam pesan template dengan data undangan
    const message = messageTemplate
      .replace("{name}", invitation.name)
      .replace("{link}", invitation.link);

    const phoneNumber = `+${invitation.number}`;
    const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    // Buka tautan WhatsApp di tab baru
    const link = document.createElement("a");
    link.href = whatsappLink;
    link.target = "_blank";
    link.rel = "noopener noreferrer"; // Menambah keamanan
    document.body.appendChild(link); // Tambahkan elemen sementara ke dokumen
    link.click(); // Simulasikan klik pada elemen
    document.body.removeChild(link); // Hapus elemen setelah diklik

    // Ubah status undangan menjadi 1 (terkirim)
    await $fetch(`/api/invitations/put-invitation?id=${invitation.id}`, {
      method: "PUT",
      body: {
        name: invitation.name,
        number: invitation.number,
        status: 1,
      },
    });

    alert(`Undangan untuk ${invitation.name} berhasil dikirim melalui WhatsApp!`);
    fetchInvitations(); // Memperbarui data undangan di UI
  } catch (error) {
    console.error(error);
    alert("Gagal mengirim undangan. Silakan coba lagi.");
  }
};

const cancelInvitation = async (invitation) => {
  // Tampilkan konfirmasi sebelum mengirim
  const confirmation = confirm(
    `Apakah Anda yakin ingin ubah status undangan kepada ${invitation.name}?`
  );
  if (!confirmation) {
    return; // Batalkan proses jika pengguna memilih "Tidak"
  }

  try {
    // Ubah status undangan menjadi 1 (terkirim)
    await $fetch(`/api/invitations/put-invitation?id=${invitation.id}`, {
      method: "PUT",
      body: {
        name: invitation.name,
        number: invitation.number,
        status: 0,
      },
    });

    alert(`Undangan untuk ${invitation.name} berhasil ubah status!`);
    fetchInvitations(); // Memperbarui data undangan di UI
  } catch (error) {
    console.error(error);
    alert("Gagal mengirim undangan. Silakan coba lagi.");
  }
};
 
  const prevPage = () => {
    if (page.value > 1) {
      page.value--;
      fetchInvitations();
    }
  };
  
  const nextPage = () => {
    if (page.value < pagination.value.totalPages) {
      page.value++;
      fetchInvitations();
    }
  };
  
  onMounted(fetchInvitations);

  // State tambahan
const showTemplateModal = ref(false);
const messageId = ref(false);
const messageTemplate = ref("Halo {name}, silakan buka tautan berikut: {link}");

// Fetch template pesan dari API saat aplikasi dimuat
const fetchMessageTemplate = async () => {
  try {
    const response = await $fetch("/api/messages/get-message", {
      method: "GET",
    });
    messageId.value = response.id;
    messageTemplate.value = response.messageTemplate;
  } catch (error) {
    console.error("Gagal mengambil template pesan:", error);
    alert("Gagal memuat template pesan. Silakan coba lagi.");
  }
};

// Buka modal edit template
const openTemplateModal = () => {
  showTemplateModal.value = true;
};

// Tutup modal edit template
const closeTemplateModal = () => {
  showTemplateModal.value = false;
};

// Simpan template pesan ke API
const saveMessageTemplate = async () => {
  try {
    await $fetch("/api/messages/put-message", {
      method: "PUT",
      body: { 
        id: messageId.value,
        messageTemplate: messageTemplate.value 
    },
    });
    alert("Template pesan berhasil diperbarui!");
    closeTemplateModal();
  } catch (error) {
    console.error("Gagal menyimpan template pesan:", error);
    alert("Gagal menyimpan template pesan. Silakan coba lagi.");
  }
};

// Panggil fetch template saat aplikasi dimuat
onMounted(() => {
  fetchInvitations();
  fetchMessageTemplate();
});

</script>  