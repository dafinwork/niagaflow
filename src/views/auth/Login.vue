<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-4/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded-2xl bg-white border border-blueGray-200"
        >
          <div class="rounded-t mb-0 px-6 py-6 text-center border-b border-blueGray-100">
            <div class="w-12 h-12 mx-auto rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xl shadow mb-2">
              <i class="fas fa-boxes-stacked"></i>
            </div>
            <h2 class="text-xl font-black text-blueGray-800">
              Niaga<span class="text-emerald-600">Flow</span>
            </h2>
            <p class="text-xs text-blueGray-500 font-medium">Sistem Manajemen Distributor & Grosir</p>
          </div>

          <div class="flex-auto px-4 lg:px-8 py-6">
            <div class="text-blueGray-500 text-center mb-4 text-xs font-semibold">
              Pilih Role Akun Demo untuk Masuk Cepat:
            </div>

            <!-- Quick Demo Accounts -->
            <div class="grid grid-cols-1 gap-2 mb-5 text-xs">
              <button
                @click="fillDemo('admin@niagaflow.id', 'Super Admin Distribusi')"
                type="button"
                class="p-2.5 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-left flex items-center justify-between transition"
              >
                <div>
                  <div class="font-bold text-emerald-800">Admin Distribusi & Logistik</div>
                  <div class="text-[10px] text-emerald-600">Akses penuh SO, DO, Stok Gudang</div>
                </div>
                <i class="fas fa-arrow-right text-emerald-600"></i>
              </button>

              <button
                @click="fillDemo('finance@niagaflow.id', 'Keuangan & Penagihan')"
                type="button"
                class="p-2.5 rounded-lg border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-left flex items-center justify-between transition"
              >
                <div>
                  <div class="font-bold text-indigo-800">Finance & Kolektor Piutang (AR)</div>
                  <div class="text-[10px] text-indigo-600">Faktur, Pelunasan, Plafon Kredit</div>
                </div>
                <i class="fas fa-arrow-right text-indigo-600"></i>
              </button>
            </div>

            <div class="relative flex py-2 items-center mb-4">
              <div class="flex-grow border-t border-blueGray-200"></div>
              <span class="flex-shrink mx-2 text-blueGray-400 text-[11px]">atau login manual</span>
              <div class="flex-grow border-t border-blueGray-200"></div>
            </div>

            <form @submit.prevent="login">
              <div class="relative w-full mb-3 text-xs">
                <label class="block uppercase text-blueGray-600 font-bold mb-1">
                  Email Akun
                </label>
                <input
                  v-model="email"
                  type="email"
                  required
                  class="border border-blueGray-300 px-3 py-2.5 text-blueGray-700 bg-white rounded-lg text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full"
                  placeholder="admin@niagaflow.id"
                />
              </div>

              <div class="relative w-full mb-4 text-xs">
                <label class="block uppercase text-blueGray-600 font-bold mb-1">
                  Kata Sandi
                </label>
                <input
                  v-model="password"
                  type="password"
                  required
                  class="border border-blueGray-300 px-3 py-2.5 text-blueGray-700 bg-white rounded-lg text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full"
                  placeholder="••••••••"
                />
              </div>

              <div class="text-center mt-6">
                <button
                  class="bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold uppercase px-6 py-3 rounded-lg shadow-lg hover:shadow-xl outline-none focus:outline-none w-full transition"
                  type="submit"
                >
                  Masuk ke Sistem NiagaFlow
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="text-center">
          <router-link to="/landing" class="text-blueGray-200 text-xs font-semibold hover:underline">
            ← Kembali ke Halaman Utama NiagaFlow
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "admin@niagaflow.id",
      password: "password123",
    };
  },
  methods: {
    fillDemo(email) {
      this.email = email;
      this.password = "demo12345";
      this.login();
    },
    login() {
      this.$router.push("/admin/dashboard");
    },
  },
};
</script>
