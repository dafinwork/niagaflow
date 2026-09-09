<template>
  <div class="bg-blueGray-50 text-blueGray-700 min-h-screen">
    <index-navbar />

    <!-- Hero Section -->
    <section class="relative pt-24 pb-20 flex content-center items-center justify-center bg-gradient-to-b from-white to-blueGray-100 border-b border-blueGray-200">
      <div class="container mx-auto px-4">
        <div class="items-center flex flex-wrap pt-12">
          <div class="w-full lg:w-7/12 px-4 ml-auto mr-auto text-left">
            <span class="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 mb-4">
              <i class="fas fa-truck-fast mr-1"></i> Solusi Rantai Pasok Distributor & Grosir
            </span>
            <h1 class="font-black text-4xl sm:text-5xl text-blueGray-800 leading-tight">
              Otomasi Distribusi Grosir dari Gudang hingga Toko Retail.
            </h1>
            <p class="mt-4 text-base text-blueGray-600 leading-relaxed">
              Tingkatkan efisiensi omzet dan penagihan piutang toko grosir Anda dengan sistem terintegrasi <strong>NiagaFlow</strong>.
            </p>
            <div class="mt-8 flex flex-wrap gap-3">
              <router-link
                to="/admin/dashboard"
                class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition inline-flex items-center text-sm"
              >
                <i class="fas fa-gauge mr-2"></i> Buka Dashboard Admin
              </router-link>
              <router-link
                to="/auth/login"
                class="bg-white hover:bg-blueGray-100 text-blueGray-800 font-bold px-6 py-3.5 rounded-xl border border-blueGray-300 shadow-sm transition inline-flex items-center text-sm"
              >
                <i class="fas fa-arrow-right-to-bracket mr-2 text-emerald-600"></i> Masuk Akun
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import IndexNavbar from "@/components/Navbars/IndexNavbar.vue";

export default {
  name: "landing-page",
  components: {
    IndexNavbar,
  },
};
</script>
