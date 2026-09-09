<template>
  <div>
    <!-- Header -->
    <div class="mb-6 flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-xl shadow-md border border-blueGray-200">
      <div class="flex items-center space-x-3">
        <span class="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow">
          <i class="fas fa-chart-line"></i>
        </span>
        <div>
          <h1 class="text-xl font-bold text-blueGray-800">Laporan Operasional & Analitik Distributor</h1>
          <p class="text-xs text-blueGray-500">Rekapitulasi omzet penjualan, valuasi persediaan stok gudang, dan umur piutang mitra</p>
        </div>
      </div>
      <div class="flex space-x-2">
        <button
          @click="printReport"
          class="bg-blueGray-700 hover:bg-blueGray-800 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow transition inline-flex items-center"
        >
          <i class="fas fa-print mr-2"></i> Cetak Laporan
        </button>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="flex space-x-2 mb-6 border-b border-blueGray-200 pb-2">
      <button
        @click="activeTab = 'sales'"
        class="px-4 py-2 rounded-lg text-xs font-bold transition-all"
        :class="activeTab === 'sales' ? 'bg-emerald-600 text-white shadow' : 'bg-white text-blueGray-600 hover:bg-blueGray-100'"
      >
        <i class="fas fa-bag-shopping mr-1.5"></i> Laporan Penjualan & Sales
      </button>
      <button
        @click="activeTab = 'inventory'"
        class="px-4 py-2 rounded-lg text-xs font-bold transition-all"
        :class="activeTab === 'inventory' ? 'bg-emerald-600 text-white shadow' : 'bg-white text-blueGray-600 hover:bg-blueGray-100'"
      >
        <i class="fas fa-boxes-stacked mr-1.5"></i> Valuasi Stok Persediaan
      </button>
      <button
        @click="activeTab = 'ar'"
        class="px-4 py-2 rounded-lg text-xs font-bold transition-all"
        :class="activeTab === 'ar' ? 'bg-emerald-600 text-white shadow' : 'bg-white text-blueGray-600 hover:bg-blueGray-100'"
      >
        <i class="fas fa-clock mr-1.5"></i> Umur Piutang (Aging Schedule)
      </button>
    </div>

    <!-- TAB 1: LAPORAN PENJUALAN -->
    <div v-if="activeTab === 'sales'" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div class="bg-white p-4 rounded-xl border border-blueGray-200 shadow">
          <span class="text-blueGray-400 block text-[11px] font-semibold">Total Omzet Penjualan</span>
          <span class="text-lg font-bold text-emerald-700">{{ formatRupiah(totalSales) }}</span>
          <div class="text-[10px] text-blueGray-400 mt-1">Berdasarkan {{ salesOrders.length }} Sales Order</div>
        </div>
        <div class="bg-white p-4 rounded-xl border border-blueGray-200 shadow">
          <span class="text-blueGray-400 block text-[11px] font-semibold">Rata-rata Nilai Order</span>
          <span class="text-lg font-bold text-blueGray-800">{{ formatRupiah(avgOrderValue) }}</span>
          <div class="text-[10px] text-blueGray-400 mt-1">Per transaksi toko</div>
        </div>
        <div class="bg-white p-4 rounded-xl border border-blueGray-200 shadow">
          <span class="text-blueGray-400 block text-[11px] font-semibold">Top Toko Kontributor</span>
          <span class="text-lg font-bold text-indigo-700">Grosir Maju Makmur</span>
          <div class="text-[10px] text-blueGray-400 mt-1">Total pesanan Rp 30,4 Juta</div>
        </div>
      </div>

      <!-- Sales Table -->
      <div class="bg-white rounded-xl shadow border border-blueGray-200 overflow-hidden">
        <div class="p-4 bg-blueGray-50 border-b border-blueGray-200">
          <h3 class="font-bold text-xs uppercase text-blueGray-700">Rekap Performa Salesman Distributor</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-blueGray-100 text-blueGray-700 font-bold uppercase">
                <th class="py-3 px-4">Salesman</th>
                <th class="py-3 px-4">Wilayah Operasional</th>
                <th class="py-3 px-4 text-right">Target Penjualan</th>
                <th class="py-3 px-4 text-right">Realisasi Omzet</th>
                <th class="py-3 px-4 text-center">Capaian %</th>
                <th class="py-3 px-4 text-right">Estimasi Komisi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-blueGray-100">
              <tr v-for="s in salesmen" :key="s.id" class="hover:bg-blueGray-50">
                <td class="py-3 px-4 font-bold text-blueGray-800">{{ s.name }} ({{ s.code }})</td>
                <td class="py-3 px-4 text-blueGray-600">{{ s.area }}</td>
                <td class="py-3 px-4 text-right text-blueGray-600">{{ formatRupiah(s.targetMonthly) }}</td>
                <td class="py-3 px-4 text-right font-bold text-emerald-700">{{ formatRupiah(s.achievedMonthly) }}</td>
                <td class="py-3 px-4 text-center">
                  <span class="px-2 py-0.5 rounded font-bold text-[11px] bg-emerald-100 text-emerald-800">
                    {{ ((s.achievedMonthly / s.targetMonthly) * 100).toFixed(1) }}%
                  </span>
                </td>
                <td class="py-3 px-4 text-right font-bold text-indigo-700">
                  {{ formatRupiah((s.achievedMonthly * s.commissionRate) / 100) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB 2: VALUASI STOK GUDANG -->
    <div v-if="activeTab === 'inventory'" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div class="bg-white p-4 rounded-xl border border-blueGray-200 shadow">
          <span class="text-blueGray-400 block text-[11px] font-semibold">Total Nilai Persediaan Aset</span>
          <span class="text-lg font-bold text-emerald-700">{{ formatRupiah(totalStockValuation) }}</span>
          <div class="text-[10px] text-blueGray-400 mt-1">Dihitung berdasarkan HPP Modal</div>
        </div>
        <div class="bg-white p-4 rounded-xl border border-blueGray-200 shadow">
          <span class="text-blueGray-400 block text-[11px] font-semibold">Total Volume Fisik</span>
          <span class="text-lg font-bold text-blueGray-800">{{ totalStockUnits }} Karton / Dus</span>
          <div class="text-[10px] text-blueGray-400 mt-1">Tersimpan di 3 lokasi gudang</div>
        </div>
        <div class="bg-white p-4 rounded-xl border border-blueGray-200 shadow">
          <span class="text-rose-500 block text-[11px] font-semibold">SKU Kritis (Di Bawah Buffer)</span>
          <span class="text-lg font-bold text-rose-600">2 Produk</span>
          <div class="text-[10px] text-blueGray-400 mt-1">Gula GMP & Deterjen Dus</div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow border border-blueGray-200 overflow-hidden">
        <div class="p-4 bg-blueGray-50 border-b border-blueGray-200">
          <h3 class="font-bold text-xs uppercase text-blueGray-700">Valuasi Stok Fisik per SKU Produk</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-blueGray-100 text-blueGray-700 font-bold uppercase">
                <th class="py-3 px-4">Nama Produk</th>
                <th class="py-3 px-4">Kategori</th>
                <th class="py-3 px-4 text-center">Total Karton</th>
                <th class="py-3 px-4 text-right">Modal Satuan (HPP)</th>
                <th class="py-3 px-4 text-right">Nilai Aset Persediaan</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-blueGray-100">
              <tr v-for="p in products" :key="p.id" class="hover:bg-blueGray-50">
                <td class="py-3 px-4 font-bold text-blueGray-800">{{ p.name }}</td>
                <td class="py-3 px-4 text-blueGray-600">{{ p.category }}</td>
                <td class="py-3 px-4 text-center font-bold text-blueGray-800">{{ getProdTotal(p) }} {{ p.packUnit }}</td>
                <td class="py-3 px-4 text-right text-blueGray-600">{{ formatRupiah(p.costPrice) }}</td>
                <td class="py-3 px-4 text-right font-bold text-emerald-700">{{ formatRupiah(getProdTotal(p) * p.costPrice) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB 3: AGING SCHEDULE PIUTANG -->
    <div v-if="activeTab === 'ar'" class="space-y-6">
      <div class="bg-white rounded-xl shadow border border-blueGray-200 overflow-hidden">
        <div class="p-4 bg-blueGray-50 border-b border-blueGray-200">
          <h3 class="font-bold text-xs uppercase text-blueGray-700">Jadwal Umur Piutang per Mitra Toko</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-blueGray-100 text-blueGray-700 font-bold uppercase">
                <th class="py-3 px-4">Toko Pelanggan</th>
                <th class="py-3 px-4 text-right">Batas Kredit</th>
                <th class="py-3 px-4 text-right text-emerald-800">Lancar (&lt; 15 Hari)</th>
                <th class="py-3 px-4 text-right text-amber-800">Overdue 1-14 Hari</th>
                <th class="py-3 px-4 text-right text-rose-800">Overdue &gt; 15 Hari</th>
                <th class="py-3 px-4 text-right">Total Piutang</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-blueGray-100">
              <tr v-for="c in customers" :key="c.id" class="hover:bg-blueGray-50">
                <td class="py-3 px-4">
                  <div class="font-bold text-blueGray-800">{{ c.name }}</div>
                  <div class="text-[11px] text-blueGray-400">{{ c.city }} • TOP {{ c.topDays }} Hari</div>
                </td>
                <td class="py-3 px-4 text-right text-blueGray-600">{{ formatRupiah(c.creditLimit) }}</td>
                <td class="py-3 px-4 text-right font-medium text-emerald-700">
                  {{ c.id === 3 ? 'Rp 0' : formatRupiah(c.usedCredit) }}
                </td>
                <td class="py-3 px-4 text-right font-medium text-amber-700">
                  {{ c.id === 3 ? formatRupiah(c.usedCredit) : 'Rp 0' }}
                </td>
                <td class="py-3 px-4 text-right font-medium text-rose-700">Rp 0</td>
                <td class="py-3 px-4 text-right font-bold text-sm" :class="c.usedCredit > 0 ? 'text-blueGray-800' : 'text-blueGray-400'">
                  {{ formatRupiah(c.usedCredit) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { niagaState, formatRupiah } from "@/services/niagaFlowData.js";

export default {
  name: "reports-page",
  data() {
    return {
      activeTab: "sales",
    };
  },
  computed: {
    salesOrders() {
      return niagaState.salesOrders;
    },
    salesmen() {
      return niagaState.salesmen;
    },
    products() {
      return niagaState.products;
    },
    customers() {
      return niagaState.customers;
    },
    totalSales() {
      return this.salesOrders.reduce((sum, o) => sum + o.grandTotal, 0);
    },
    avgOrderValue() {
      if (!this.salesOrders.length) return 0;
      return Math.round(this.totalSales / this.salesOrders.length);
    },
    totalStockUnits() {
      return this.products.reduce((acc, p) => acc + this.getProdTotal(p), 0);
    },
    totalStockValuation() {
      return this.products.reduce((acc, p) => acc + this.getProdTotal(p) * p.costPrice, 0);
    },
  },
  methods: {
    formatRupiah,
    getProdTotal(p) {
      return Object.values(p.stocks).reduce((sum, v) => sum + v, 0);
    },
    printReport() {
      window.print();
    },
  },
};
</script>
