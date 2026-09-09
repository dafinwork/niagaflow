<template>
  <div class="bg-blueGray-50 text-blueGray-700 min-h-screen">
    <index-navbar />

    <!-- Hero Section -->
    <section class="relative pt-24 pb-20 flex content-center items-center justify-center bg-gradient-to-b from-white to-blueGray-100 border-b border-blueGray-200">
      <div class="container mx-auto px-4">
        <div class="items-center flex flex-wrap pt-12">
          <div class="w-full lg:w-7/12 px-4 ml-auto mr-auto text-left">
            <span class="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 mb-4">
              <i class="fas fa-cubes-stacked mr-1"></i> Sistem Distributor & Grosir Modern
            </span>
            <h1 class="font-black text-4xl sm:text-5xl text-blueGray-800 leading-tight">
              Kendalikan Distribusi, Stok, dan Piutang Toko Lebih Presisi.
            </h1>
            <p class="mt-4 text-base text-blueGray-600 leading-relaxed">
              <strong>NiagaFlow</strong> dirancang khusus untuk operasional distributor sembako, makanan-minuman, bahan pokok, dan grosir FMCG di Indonesia. Dilengkapi fitur skema tier harga otomatis, multi-satuan karton ke pcs, surat jalan armada, hingga pengawasan plafon kredit toko.
            </p>
            <div class="mt-8 flex flex-wrap gap-3">
              <router-link
                to="/admin/dashboard"
                class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition inline-flex items-center text-sm"
              >
                <i class="fas fa-gauge mr-2"></i> Buka Dashboard Operasional
              </router-link>
              <router-link
                to="/admin/sales-orders"
                class="bg-white hover:bg-blueGray-100 text-blueGray-800 font-bold px-6 py-3.5 rounded-xl border border-blueGray-300 shadow-sm transition inline-flex items-center text-sm"
              >
                <i class="fas fa-cart-shopping mr-2 text-emerald-600"></i> Simulasi Sales Order (SO)
              </router-link>
            </div>
            <div class="mt-6 flex items-center space-x-6 text-xs text-blueGray-500 font-semibold">
              <span><i class="fas fa-check-circle text-emerald-500 mr-1.5"></i> Multi-Tier Pricing (1-4)</span>
              <span><i class="fas fa-check-circle text-emerald-500 mr-1.5"></i> Plafon Kredit & Tempo TOP</span>
              <span><i class="fas fa-check-circle text-emerald-500 mr-1.5"></i> Multi-Satuan Grosir</span>
            </div>
          </div>

          <div class="w-full lg:w-5/12 px-4 mt-12 lg:mt-0">
            <div class="relative bg-white p-5 rounded-2xl shadow-2xl border border-blueGray-200">
              <div class="flex items-center justify-between pb-3 mb-3 border-b border-blueGray-100">
                <div class="flex items-center space-x-2">
                  <span class="w-3 h-3 rounded-full bg-rose-500"></span>
                  <span class="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
                </div>
                <span class="text-[11px] font-mono text-blueGray-400 font-bold">niagaflow-control-hub</span>
              </div>
              <div class="space-y-3 text-xs">
                <div class="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex justify-between items-center">
                  <div>
                    <span class="text-[10px] text-emerald-700 uppercase font-bold block">Omzet Bulan Ini</span>
                    <span class="text-base font-black text-emerald-900">Rp 65.380.000</span>
                  </div>
                  <span class="px-2 py-1 bg-emerald-200 text-emerald-800 font-bold rounded text-[10px]">+14.8%</span>
                </div>
                <div class="p-3 bg-sky-50 rounded-xl border border-sky-200 flex justify-between items-center">
                  <div>
                    <span class="text-[10px] text-sky-700 uppercase font-bold block">Pengiriman Hari Ini</span>
                    <span class="text-base font-black text-sky-900">3 Armada Truk Aktif</span>
                  </div>
                  <span class="px-2 py-1 bg-sky-200 text-sky-800 font-bold rounded text-[10px]">On Schedule</span>
                </div>
                <div class="p-3 bg-rose-50 rounded-xl border border-rose-200 flex justify-between items-center">
                  <div>
                    <span class="text-[10px] text-rose-700 uppercase font-bold block">Plafon Kredit Toko Overdue</span>
                    <span class="text-base font-black text-rose-900">Toko Murah Rezeki</span>
                  </div>
                  <span class="px-2 py-1 bg-rose-200 text-rose-800 font-bold rounded text-[10px]">Peringatan!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modules Grid Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="text-xs uppercase font-bold text-emerald-600 tracking-wider mb-2">
            Modul Bisnis Terpadu
          </h2>
          <h3 class="text-3xl font-black text-blueGray-800">
            Satu Ekosistem untuk Seluruh Rantai Distribusi Anda
          </h3>
          <p class="mt-3 text-sm text-blueGray-500">
            Dari input pesanan salesman di lapangan hingga penagihan invoice jatuh tempo oleh tim keuangan.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Modul 1 -->
          <div class="p-6 rounded-2xl border border-blueGray-200 bg-blueGray-50/50 hover:bg-white hover:shadow-xl transition group">
            <div class="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xl shadow mb-4 group-hover:scale-110 transition">
              <i class="fas fa-tags"></i>
            </div>
            <h4 class="font-bold text-lg text-blueGray-800 mb-2">Skema Tier Pricing Grosir</h4>
            <p class="text-xs text-blueGray-600 leading-relaxed mb-4">
              Atur harga otomatis berdasarkan level pelanggan (Tier 1 Partai Besar, Tier 2 Agen, Tier 3 Semi-Grosir, Tier 4 Retail) dan aturan diskon volume kuantiti.
            </p>
            <router-link to="/admin/tier-pricing" class="text-xs font-bold text-emerald-600 hover:text-emerald-700">
              Lihat Matriks Harga →
            </router-link>
          </div>

          <!-- Modul 2 -->
          <div class="p-6 rounded-2xl border border-blueGray-200 bg-blueGray-50/50 hover:bg-white hover:shadow-xl transition group">
            <div class="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xl shadow mb-4 group-hover:scale-110 transition">
              <i class="fas fa-file-invoice-dollar"></i>
            </div>
            <h4 class="font-bold text-lg text-blueGray-800 mb-2">Sales Order & Surat Jalan (DO)</h4>
            <p class="text-xs text-blueGray-600 leading-relaxed mb-4">
              Alur pemesanan terintegrasi dengan persetujuan gudang, alokasi supir armada pengiriman, dan pencetakan nota/surat jalan resmi 3 rangkap.
            </p>
            <router-link to="/admin/sales-orders" class="text-xs font-bold text-indigo-600 hover:text-indigo-700">
              Buka Modul SO →
            </router-link>
          </div>

          <!-- Modul 3 -->
          <div class="p-6 rounded-2xl border border-blueGray-200 bg-blueGray-50/50 hover:bg-white hover:shadow-xl transition group">
            <div class="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center text-xl shadow mb-4 group-hover:scale-110 transition">
              <i class="fas fa-boxes-packing"></i>
            </div>
            <h4 class="font-bold text-lg text-blueGray-800 mb-2">Stok Gudang Multi-Satuan</h4>
            <p class="text-xs text-blueGray-600 leading-relaxed mb-4">
              Konversi otomatis satuan khas grosir (Karton ke Pcs), monitoring stok antar gudang pusat, gudang transit, dan armada mobil kanvas.
            </p>
            <router-link to="/admin/inventory" class="text-xs font-bold text-sky-600 hover:text-sky-700">
              Cek Persediaan Gudang →
            </router-link>
          </div>

          <!-- Modul 4 -->
          <div class="p-6 rounded-2xl border border-blueGray-200 bg-blueGray-50/50 hover:bg-white hover:shadow-xl transition group">
            <div class="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center text-xl shadow mb-4 group-hover:scale-110 transition">
              <i class="fas fa-hand-holding-dollar"></i>
            </div>
            <h4 class="font-bold text-lg text-blueGray-800 mb-2">Pengawasan Piutang & Plafon Toko</h4>
            <p class="text-xs text-blueGray-600 leading-relaxed mb-4">
              Cegah piutang macet dengan matriks aging schedule, alert toko jatuh tempo, dan pembatasan limit kredit saat pembuatan order baru.
            </p>
            <router-link to="/admin/payments" class="text-xs font-bold text-amber-600 hover:text-amber-700">
              Kelola Piutang & Pembayaran →
            </router-link>
          </div>

          <!-- Modul 5 -->
          <div class="p-6 rounded-2xl border border-blueGray-200 bg-blueGray-50/50 hover:bg-white hover:shadow-xl transition group">
            <div class="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center text-xl shadow mb-4 group-hover:scale-110 transition">
              <i class="fas fa-route"></i>
            </div>
            <h4 class="font-bold text-lg text-blueGray-800 mb-2">Call Plan Salesman & Rute Toko</h4>
            <p class="text-xs text-blueGray-600 leading-relaxed mb-4">
              Pengelolaan jadwal kunjungan harian tim canvaser dan motoris, monitoring target bulanan vs realisasi, serta komisi penjualan.
            </p>
            <router-link to="/admin/salesmen" class="text-xs font-bold text-purple-600 hover:text-purple-700">
              Jadwal Rute Salesman →
            </router-link>
          </div>

          <!-- Modul 6 -->
          <div class="p-6 rounded-2xl border border-blueGray-200 bg-blueGray-50/50 hover:bg-white hover:shadow-xl transition group">
            <div class="w-12 h-12 rounded-xl bg-rose-600 text-white flex items-center justify-center text-xl shadow mb-4 group-hover:scale-110 transition">
              <i class="fas fa-chart-line"></i>
            </div>
            <h4 class="font-bold text-lg text-blueGray-800 mb-2">Laporan Operasional & Valuasi</h4>
            <p class="text-xs text-blueGray-600 leading-relaxed mb-4">
              Laporan laba kotor, kontribusi omzet per kategori produk, nilai aset persediaan stok gudang, dan rekapitulasi penagihan siap cetak.
            </p>
            <router-link to="/admin/reports" class="text-xs font-bold text-rose-600 hover:text-rose-700">
              Buka Laporan Operasional →
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Banner -->
    <section class="py-16 bg-gradient-to-r from-emerald-700 to-emerald-900 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-black mb-4">Siap Mengoptimalkan Operasional Grosir Anda?</h2>
        <p class="text-sm text-emerald-100 max-w-xl mx-auto mb-8">
          Masuk ke demo interaktif NiagaFlow sekarang juga dan rasakan kemudahan mengelola ratusan outlet toko dengan data yang akurat dan real-time.
        </p>
        <div class="flex justify-center gap-3">
          <router-link
            to="/admin/dashboard"
            class="bg-white hover:bg-blueGray-100 text-emerald-800 font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition text-sm"
          >
            Mulai Demo NiagaFlow
          </router-link>
          <router-link
            to="/auth/login"
            class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-3 rounded-xl border border-emerald-400/50 shadow transition text-sm"
          >
            Login Pengguna
          </router-link>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-8 bg-blueGray-900 text-blueGray-400 text-xs border-t border-blueGray-800">
      <div class="container mx-auto px-4 flex flex-wrap items-center justify-between">
        <div class="flex items-center space-x-2">
          <span class="w-6 h-6 rounded bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
            <i class="fas fa-boxes-stacked"></i>
          </span>
          <span class="font-bold text-white">NiagaFlow</span> — Platform Manajemen Distributor & Grosir Terpadu.
        </div>
        <div class="mt-4 md:mt-0">
          Hak Cipta © 2026 PT NiagaFlow Makmur Distribusi.
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import IndexNavbar from "@/components/Navbars/IndexNavbar.vue";

export default {
  name: "index-page",
  components: {
    IndexNavbar,
  },
};
</script>
