<template>
  <div>
    <!-- Quick Action Bar -->
    <div class="mb-6 flex flex-wrap gap-3 items-center justify-between bg-white p-4 rounded-xl shadow-md border border-blueGray-200">
      <div class="flex items-center space-x-3">
        <span class="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
          <i class="fas fa-bolt"></i>
        </span>
        <div>
          <h4 class="text-sm font-bold text-blueGray-700 uppercase">Aksi Cepat Operasional</h4>
          <p class="text-xs text-blueGray-500">Pusat kendali transaksi dan distribusi harian</p>
        </div>
      </div>
      <div class="flex flex-wrap gap-2">
        <router-link
          to="/admin/sales-orders"
          class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow hover:shadow-md transition inline-flex items-center"
        >
          <i class="fas fa-plus-circle mr-2"></i> Buat Sales Order (SO)
        </router-link>
        <router-link
          to="/admin/payments"
          class="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow hover:shadow-md transition inline-flex items-center"
        >
          <i class="fas fa-hand-holding-dollar mr-2"></i> Catat Pembayaran Piutang
        </router-link>
        <router-link
          to="/admin/delivery"
          class="bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow hover:shadow-md transition inline-flex items-center"
        >
          <i class="fas fa-truck-fast mr-2"></i> Surat Jalan (DO)
        </router-link>
        <router-link
          to="/admin/inventory"
          class="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow hover:shadow-md transition inline-flex items-center"
        >
          <i class="fas fa-boxes-stacked mr-2"></i> Cek Stok Gudang
        </router-link>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="flex flex-wrap">
      <div class="w-full xl:w-8/12 mb-6 xl:mb-0 px-4">
        <!-- Sales Trend Line Chart -->
        <div class="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-xl bg-blueGray-800 text-white">
          <div class="rounded-t mb-0 px-5 py-4 bg-transparent border-b border-blueGray-700">
            <div class="flex flex-wrap items-center justify-between">
              <div>
                <h6 class="uppercase text-emerald-400 text-xs font-bold tracking-wider">
                  Analisis Penjualan Distributor
                </h6>
                <h2 class="text-white text-lg font-bold">
                  Tren Omzet Bulanan (Juta Rupiah)
                </h2>
              </div>
              <span class="text-xs bg-emerald-500/20 text-emerald-300 font-semibold px-2.5 py-1 rounded-full border border-emerald-500/30">
                <i class="fas fa-arrow-trend-up mr-1"></i> +14.8% YoY
              </span>
            </div>
          </div>
          <div class="p-4 flex-auto">
            <div class="relative h-350-px">
              <canvas id="sales-trend-chart"></canvas>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full xl:w-4/12 px-4">
        <!-- Category Distribution Bar Chart -->
        <div class="relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded-xl border border-blueGray-200">
          <div class="rounded-t mb-0 px-5 py-4 bg-transparent border-b border-blueGray-200">
            <h6 class="uppercase text-blueGray-400 text-xs font-bold tracking-wider">
              Kategori Barang Grosir
            </h6>
            <h2 class="text-blueGray-700 text-lg font-bold">
              Volume Penjualan (Karton)
            </h2>
          </div>
          <div class="p-4 flex-auto">
            <div class="relative h-350-px">
              <canvas id="category-bar-chart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tables & Monitoring Row -->
    <div class="flex flex-wrap mt-6">
      <!-- Recent Sales Orders Table -->
      <div class="w-full xl:w-8/12 mb-6 xl:mb-0 px-4">
        <div class="relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded-xl border border-blueGray-200">
          <div class="rounded-t mb-0 px-5 py-4 border-b border-blueGray-200 flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <span class="w-8 h-8 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm font-bold">
                <i class="fas fa-receipt"></i>
              </span>
              <h3 class="font-bold text-base text-blueGray-700">
                Sales Order Terkini
              </h3>
            </div>
            <router-link
              to="/admin/sales-orders"
              class="text-emerald-600 hover:text-emerald-700 text-xs font-bold uppercase tracking-wider"
            >
              Lihat Semua SO <i class="fas fa-arrow-right ml-1"></i>
            </router-link>
          </div>
          <div class="block w-full overflow-x-auto">
            <table class="items-center w-full bg-transparent border-collapse text-left">
              <thead>
                <tr class="bg-blueGray-50 text-blueGray-500 border-b border-blueGray-200 text-xs uppercase font-semibold">
                  <th class="px-5 py-3">No. SO</th>
                  <th class="px-5 py-3">Nama Toko / Mitra</th>
                  <th class="px-5 py-3">Salesman</th>
                  <th class="px-5 py-3">Total Tagihan</th>
                  <th class="px-5 py-3">Status SO</th>
                  <th class="px-5 py-3">Pengiriman</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-blueGray-100 text-xs">
                <tr v-for="order in recentOrders" :key="order.id" class="hover:bg-blueGray-50/50">
                  <td class="px-5 py-3.5 font-bold text-blueGray-700">
                    {{ order.code }}
                  </td>
                  <td class="px-5 py-3.5 font-medium text-blueGray-800">
                    {{ order.customerName }}
                  </td>
                  <td class="px-5 py-3.5 text-blueGray-600">
                    {{ order.salesmanName }}
                  </td>
                  <td class="px-5 py-3.5 font-bold text-emerald-700">
                    {{ formatRupiah(order.grandTotal) }}
                  </td>
                  <td class="px-5 py-3.5">
                    <span
                      class="px-2.5 py-1 text-[11px] font-bold rounded-full"
                      :class="orderStatusBadge(order.status)"
                    >
                      {{ order.status }}
                    </span>
                  </td>
                  <td class="px-5 py-3.5">
                    <span
                      class="px-2 py-0.5 text-[10px] font-semibold rounded"
                      :class="deliveryStatusBadge(order.deliveryStatus)"
                    >
                      {{ order.deliveryStatus }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Overdue / Credit Monitoring -->
      <div class="w-full xl:w-4/12 px-4">
        <div class="relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded-xl border border-blueGray-200">
          <div class="rounded-t mb-0 px-5 py-4 border-b border-blueGray-200 flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <span class="w-8 h-8 rounded bg-rose-50 text-rose-600 flex items-center justify-center text-sm font-bold">
                <i class="fas fa-triangle-exclamation"></i>
              </span>
              <h3 class="font-bold text-base text-blueGray-700">
                Pengawasan Piutang & Jatuh Tempo
              </h3>
            </div>
            <router-link
              to="/admin/payments"
              class="text-rose-600 hover:text-rose-700 text-xs font-bold"
            >
              Kelola
            </router-link>
          </div>
          <div class="p-4 space-y-3">
            <div
              v-for="inv in overdueInvoices"
              :key="inv.id"
              class="p-3 rounded-lg border border-rose-200 bg-rose-50/50 flex flex-col space-y-1.5"
            >
              <div class="flex items-center justify-between">
                <span class="font-bold text-xs text-blueGray-800">{{ inv.customerName }}</span>
                <span class="text-[10px] uppercase font-bold text-rose-700 bg-rose-200 px-2 py-0.5 rounded">
                  Jatuh Tempo: {{ formatDateIndo(inv.dueDate) }}
                </span>
              </div>
              <div class="flex items-center justify-between text-xs text-blueGray-600">
                <span>Faktur: <strong>{{ inv.code }}</strong></span>
                <span class="font-bold text-rose-600">{{ formatRupiah(inv.balance) }}</span>
              </div>
              <div class="text-[11px] text-blueGray-500 flex items-center justify-between pt-1 border-t border-rose-100">
                <span>Sales: {{ inv.salesman }}</span>
                <router-link
                  to="/admin/payments"
                  class="text-indigo-600 hover:text-indigo-800 font-bold"
                >
                  Bayar Sekarang →
                </router-link>
              </div>
            </div>

            <div class="mt-4 pt-3 border-t border-blueGray-100">
              <h5 class="text-xs font-bold uppercase text-blueGray-500 mb-2">Peringatan Stok Gudang Kritis</h5>
              <div class="space-y-2">
                <div
                  v-for="prod in lowStockList"
                  :key="prod.id"
                  class="flex items-center justify-between text-xs p-2 rounded bg-amber-50 border border-amber-200 text-amber-900"
                >
                  <div class="flex items-center space-x-2">
                    <i class="fas fa-box text-amber-600"></i>
                    <span class="font-medium truncate max-w-[170px]">{{ prod.name }}</span>
                  </div>
                  <span class="font-bold bg-amber-200 px-2 py-0.5 rounded text-[11px]">
                    Sisa: {{ currentStock(prod) }} {{ prod.packUnit }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
import { niagaState, formatRupiah, formatDateIndo } from "@/services/niagaFlowData.js";

export default {
  name: "dashboard-page",
  data() {
    return {
      lineChartInstance: null,
      barChartInstance: null,
    };
  },
  computed: {
    recentOrders() {
      return niagaState.salesOrders.slice(0, 5);
    },
    overdueInvoices() {
      return niagaState.invoices.filter((i) => i.status === "Overdue" || i.balance > 0);
    },
    lowStockList() {
      return niagaState.products.filter((p) => {
        const totalStock = Object.values(p.stocks).reduce((a, b) => a + b, 0);
        return totalStock <= p.minStock;
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initSalesTrendChart();
      this.initCategoryBarChart();
    });
  },
  methods: {
    formatRupiah,
    formatDateIndo,
    currentStock(prod) {
      return Object.values(prod.stocks).reduce((a, b) => a + b, 0);
    },
    orderStatusBadge(status) {
      switch (status) {
        case "Selesai":
          return "bg-emerald-100 text-emerald-800";
        case "Diproses":
          return "bg-sky-100 text-sky-800";
        case "Disetujui":
          return "bg-indigo-100 text-indigo-800";
        default:
          return "bg-amber-100 text-amber-800";
      }
    },
    deliveryStatusBadge(status) {
      switch (status) {
        case "Telah Diterima":
          return "bg-emerald-50 text-emerald-700 border border-emerald-200";
        case "Dalam Perjalanan":
          return "bg-sky-50 text-sky-700 border border-sky-200";
        case "Siap Dikirim":
          return "bg-amber-50 text-amber-700 border border-amber-200";
        default:
          return "bg-blueGray-100 text-blueGray-700";
      }
    },
    initSalesTrendChart() {
      const ctx = document.getElementById("sales-trend-chart");
      if (!ctx) return;
      this.lineChartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Apr", "Mei", "Jun", "Jul", "Ags", "Sep"],
          datasets: [
            {
              label: "Tahun 2026 (Aktual)",
              backgroundColor: "rgba(16, 185, 129, 0.2)",
              borderColor: "#10b981",
              pointBackgroundColor: "#10b981",
              data: [142, 168, 185, 192, 210, 235],
              fill: true,
              borderWidth: 3,
            },
            {
              label: "Target Bulanan",
              backgroundColor: "transparent",
              borderColor: "#94a3b8",
              borderDash: [5, 5],
              data: [130, 150, 170, 180, 200, 220],
              fill: false,
              borderWidth: 2,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            labels: { fontColor: "#cbd5e1" },
            align: "end",
            position: "bottom",
          },
          tooltips: {
            mode: "index",
            intersect: false,
            callbacks: {
              label: function (tooltipItem, data) {
                return data.datasets[tooltipItem.datasetIndex].label + ": Rp " + tooltipItem.yLabel + " Juta";
              },
            },
          },
          scales: {
            xAxes: [
              {
                ticks: { fontColor: "#94a3b8" },
                gridLines: { color: "rgba(255, 255, 255, 0.1)" },
              },
            ],
            yAxes: [
              {
                ticks: {
                  fontColor: "#94a3b8",
                  callback: function (val) {
                    return "Rp " + val + " Jt";
                  },
                },
                gridLines: { color: "rgba(255, 255, 255, 0.1)" },
              },
            ],
          },
        },
      });
    },
    initCategoryBarChart() {
      const ctx = document.getElementById("category-bar-chart");
      if (!ctx) return;
      this.barChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Sembako", "Bahan Pokok", "Mi Instan", "Minuman", "Perawatan"],
          datasets: [
            {
              label: "Volume (Dus/Karton)",
              backgroundColor: "#10b981",
              data: [820, 460, 1240, 390, 260],
              barThickness: 24,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          legend: { display: false },
          scales: {
            xAxes: [
              {
                ticks: { fontColor: "#64748b" },
                gridLines: { display: false },
              },
            ],
            yAxes: [
              {
                ticks: { fontColor: "#64748b" },
                gridLines: { color: "rgba(0, 0, 0, 0.05)" },
              },
            ],
          },
        },
      });
    },
  },
};
</script>
