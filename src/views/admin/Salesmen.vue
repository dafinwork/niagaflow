<template>
  <div>
    <!-- Header -->
    <div class="mb-6 flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-xl shadow-md border border-blueGray-200">
      <div class="flex items-center space-x-3">
        <span class="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow">
          <i class="fas fa-route"></i>
        </span>
        <div>
          <h1 class="text-xl font-bold text-blueGray-800">Tim Salesman & Call Plan Kunjungan</h1>
          <p class="text-xs text-blueGray-500">Monitoring target penjualan, rute toko harian, dan kinerja canvaser lapangan</p>
        </div>
      </div>
      <div>
        <span class="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
          <i class="fas fa-users mr-1"></i> Total {{ salesmen.length }} Personel Lapangan
        </span>
      </div>
    </div>

    <!-- Salesmen Performance Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div
        v-for="sales in salesmen"
        :key="sales.id"
        class="bg-white rounded-2xl p-5 shadow-lg border border-blueGray-200 flex flex-col justify-between"
      >
        <div>
          <!-- Header Card -->
          <div class="flex items-center justify-between mb-3">
            <span class="text-[11px] font-mono font-bold bg-blueGray-100 text-blueGray-700 px-2 py-0.5 rounded">
              {{ sales.code }}
            </span>
            <div class="flex items-center text-amber-500 text-xs font-bold">
              <i class="fas fa-star mr-1"></i> {{ sales.rating }}
            </div>
          </div>

          <div class="flex items-center space-x-3 mb-4">
            <div class="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-base shadow-inner">
              <i class="fas fa-user-tie"></i>
            </div>
            <div>
              <h3 class="font-bold text-sm text-blueGray-800">{{ sales.name }}</h3>
              <p class="text-[11px] text-blueGray-500 font-medium">{{ sales.role }}</p>
            </div>
          </div>

          <!-- Wilayah -->
          <div class="bg-blueGray-50 p-2.5 rounded-lg text-xs text-blueGray-700 mb-4 border border-blueGray-100">
            <i class="fas fa-location-dot text-emerald-600 mr-1.5"></i>
            <strong>Wilayah:</strong> {{ sales.area }}
          </div>

          <!-- Target & Capaian -->
          <div class="space-y-1.5 text-xs mb-4">
            <div class="flex justify-between">
              <span class="text-blueGray-500">Target Bulan Ini</span>
              <span class="font-semibold text-blueGray-700">{{ formatRupiah(sales.targetMonthly) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-blueGray-500">Capaian Aktual</span>
              <span class="font-bold text-emerald-600">{{ formatRupiah(sales.achievedMonthly) }}</span>
            </div>
            <!-- Progress Bar -->
            <div class="w-full bg-blueGray-200 rounded-full h-2.5 mt-1 overflow-hidden">
              <div
                class="h-2.5 rounded-full bg-emerald-500 transition-all duration-300"
                :style="{ width: Math.min(100, Math.round((sales.achievedMonthly / sales.targetMonthly) * 100)) + '%' }"
              ></div>
            </div>
            <div class="flex justify-between text-[11px] text-blueGray-400 mt-0.5">
              <span>Achievement:</span>
              <span class="font-bold text-emerald-600">
                {{ ((sales.achievedMonthly / sales.targetMonthly) * 100).toFixed(1) }}%
              </span>
            </div>
          </div>
        </div>

        <div class="pt-3 border-t border-blueGray-100 flex items-center justify-between text-xs">
          <span class="text-blueGray-500 font-medium">
            <i class="fas fa-store mr-1 text-emerald-500"></i> {{ sales.activeStores }} Toko
          </span>
          <button
            @click="viewRute(sales)"
            class="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-lg transition"
          >
            Lihat Rute →
          </button>
        </div>
      </div>
    </div>

    <!-- Call Plan & Daily Schedule Detail Panel -->
    <div class="bg-white rounded-2xl shadow-lg border border-blueGray-200 p-6">
      <div class="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-blueGray-200">
        <div>
          <h3 class="font-bold text-base text-blueGray-800">
            Jadwal Call Plan Harian Toko — {{ activeSalesman.name }} ({{ activeSalesman.code }})
          </h3>
          <p class="text-xs text-blueGray-500">Rencana kunjungan terstruktur untuk pemerataan distribusi sembako & grosir</p>
        </div>
        <div class="flex space-x-2 text-xs">
          <select
            v-model="selectedSalesmanId"
            class="border border-blueGray-300 rounded-lg px-3 py-2 bg-white text-blueGray-700 font-bold"
          >
            <option v-for="s in salesmen" :key="s.id" :value="s.id">
              Pilih: {{ s.name }} ({{ s.area }})
            </option>
          </select>
        </div>
      </div>

      <!-- Days Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
        <div
          v-for="(stores, day) in activeSalesman.ruteHarian"
          :key="day"
          class="p-4 rounded-xl border border-blueGray-200 bg-blueGray-50/50 hover:bg-white hover:shadow-md transition"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="font-bold text-sm text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded">
              {{ day }}
            </span>
            <span class="text-[10px] uppercase font-bold text-blueGray-400">
              <i class="fas fa-motorcycle text-emerald-500 mr-1"></i> Rute Kanvas
            </span>
          </div>
          <p class="text-blueGray-700 font-medium mt-2 leading-relaxed">
            {{ stores }}
          </p>
          <div class="mt-3 pt-2 border-t border-blueGray-200 flex items-center justify-between text-[11px] text-blueGray-500">
            <span>Status Kunjungan:</span>
            <span class="text-emerald-600 font-semibold"><i class="fas fa-check-circle mr-1"></i> Terjadwal</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { niagaState, formatRupiah } from "@/services/niagaFlowData.js";

export default {
  name: "salesmen-page",
  data() {
    return {
      selectedSalesmanId: 1,
    };
  },
  computed: {
    salesmen() {
      return niagaState.salesmen;
    },
    activeSalesman() {
      return this.salesmen.find((s) => s.id === this.selectedSalesmanId) || this.salesmen[0];
    },
  },
  methods: {
    formatRupiah,
    viewRute(sales) {
      this.selectedSalesmanId = sales.id;
    },
  },
};
</script>
