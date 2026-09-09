<template>
  <div>
    <!-- Header -->
    <div class="mb-6 flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-xl shadow-md border border-blueGray-200">
      <div class="flex items-center space-x-3">
        <span class="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow">
          <i class="fas fa-truck-fast"></i>
        </span>
        <div>
          <h1 class="text-xl font-bold text-blueGray-800">Surat Jalan & Pengiriman (DO)</h1>
          <p class="text-xs text-blueGray-500">Monitoring pengiriman armada distributor, alokasi supir, dan tanda terima toko</p>
        </div>
      </div>
      <div>
        <button
          @click="showCreateDOModal = true"
          class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow hover:shadow-md transition inline-flex items-center"
        >
          <i class="fas fa-plus-circle mr-2"></i> Terbitkan Surat Jalan (DO)
        </button>
      </div>
    </div>

    <!-- Status Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-xs">
      <div class="bg-white p-4 rounded-xl border border-blueGray-200 shadow flex items-center justify-between">
        <div>
          <span class="text-blueGray-400 block text-[11px] font-semibold">Siap Dikirim di Staging</span>
          <span class="text-lg font-bold text-amber-600">{{ readyDeliveryCount }} Pengiriman</span>
        </div>
        <span class="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-base font-bold">
          <i class="fas fa-boxes-packing"></i>
        </span>
      </div>
      <div class="bg-white p-4 rounded-xl border border-blueGray-200 shadow flex items-center justify-between">
        <div>
          <span class="text-blueGray-400 block text-[11px] font-semibold">Dalam Perjalanan (On Route)</span>
          <span class="text-lg font-bold text-sky-600">{{ onRouteCount }} Armada</span>
        </div>
        <span class="w-10 h-10 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center text-base font-bold">
          <i class="fas fa-truck-arrow-right"></i>
        </span>
      </div>
      <div class="bg-white p-4 rounded-xl border border-blueGray-200 shadow flex items-center justify-between">
        <div>
          <span class="text-blueGray-400 block text-[11px] font-semibold">Telah Diterima Toko</span>
          <span class="text-lg font-bold text-emerald-600">{{ completedDeliveryCount }} Surat Jalan</span>
        </div>
        <span class="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-base font-bold">
          <i class="fas fa-circle-check"></i>
        </span>
      </div>
    </div>

    <!-- Table of Delivery Orders -->
    <div class="bg-white rounded-xl shadow-lg border border-blueGray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="bg-blueGray-50 text-blueGray-600 font-bold uppercase tracking-wider border-b border-blueGray-200">
              <th class="py-3.5 px-4">No. DO & Ref SO</th>
              <th class="py-3.5 px-4">Toko Tujuan</th>
              <th class="py-3.5 px-4">Supir & Armada Truk</th>
              <th class="py-3.5 px-4 text-center">Muatan</th>
              <th class="py-3.5 px-4">Waktu Berangkat</th>
              <th class="py-3.5 px-4 text-center">Status</th>
              <th class="py-3.5 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-blueGray-100">
            <tr
              v-for="item in deliveryOrders"
              :key="item.id"
              class="hover:bg-blueGray-50/80 transition"
            >
              <td class="py-3.5 px-4">
                <div class="font-bold text-blueGray-800 font-mono text-sm">{{ item.code }}</div>
                <div class="text-[11px] text-emerald-600 font-semibold font-mono">{{ item.soCode }}</div>
              </td>
              <td class="py-3.5 px-4">
                <div class="font-bold text-blueGray-800">{{ item.customerName }}</div>
                <div class="text-[11px] text-blueGray-400 truncate max-w-xs">{{ item.destination }}</div>
              </td>
              <td class="py-3.5 px-4">
                <div class="font-bold text-blueGray-700">{{ item.driverName }}</div>
                <div class="text-[11px] text-blueGray-500 font-mono">{{ item.vehiclePlate }}</div>
              </td>
              <td class="py-3.5 px-4 text-center font-bold text-blueGray-700">
                {{ item.totalPackages }}
              </td>
              <td class="py-3.5 px-4 text-blueGray-600">
                {{ item.dispatchDate }}
              </td>
              <td class="py-3.5 px-4 text-center">
                <span
                  class="px-2.5 py-1 text-[11px] font-bold rounded-full border inline-block"
                  :class="doStatusBadge(item.status)"
                >
                  {{ item.status }}
                </span>
              </td>
              <td class="py-3.5 px-4 text-center">
                <button
                  @click="printSuratJalan(item)"
                  class="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 px-2.5 py-1 rounded font-bold"
                >
                  <i class="fas fa-print mr-1"></i> Cetak DO
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Cetak Surat Jalan -->
    <div
      v-if="selectedDO"
      class="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-blueGray-300 text-xs">
        <div class="p-6">
          <div class="flex items-center justify-between border-b pb-4 mb-4">
            <div>
              <div class="font-black text-lg text-emerald-700">PT NIAGAFLOW MAKMUR DISTRIBUSI</div>
              <p class="text-blueGray-500 text-[11px]">Logistik & Surat Jalan Pengiriman Resmi</p>
            </div>
            <div class="text-right">
              <div class="font-black text-base text-blueGray-800 font-mono">{{ selectedDO.code }}</div>
              <span class="px-2 py-0.5 bg-sky-100 text-sky-800 font-bold rounded text-[10px]">SURAT JALAN / DO</span>
              <p class="text-blueGray-400 text-[11px] mt-1">Ref SO: {{ selectedDO.soCode }}</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 bg-blueGray-50 p-3 rounded-lg mb-4">
            <div>
              <span class="text-blueGray-400 block text-[10px]">ALAMAT PENERIMA:</span>
              <strong class="text-blueGray-800 text-sm">{{ selectedDO.customerName }}</strong>
              <div class="text-blueGray-600 mt-0.5">{{ selectedDO.destination }}</div>
            </div>
            <div class="text-right">
              <span class="text-blueGray-400 block text-[10px]">ARMADA & SUPIR:</span>
              <strong class="text-blueGray-800">{{ selectedDO.driverName }}</strong>
              <div class="text-blueGray-600 mt-0.5">{{ selectedDO.vehiclePlate }}</div>
              <div class="text-emerald-700 font-bold mt-1">Total Muatan: {{ selectedDO.totalPackages }}</div>
            </div>
          </div>

          <!-- Tanda Tangan 3 Kolom -->
          <div class="grid grid-cols-3 gap-4 text-center mt-12 pt-6 border-t">
            <div>
              <div class="text-blueGray-500 mb-14">Pengirim / Kepala Gudang</div>
              <div class="font-bold text-blueGray-800 border-t border-blueGray-300 pt-1">( Rahmat Hidayat )</div>
            </div>
            <div>
              <div class="text-blueGray-500 mb-14">Supir / Kurir Armada</div>
              <div class="font-bold text-blueGray-800 border-t border-blueGray-300 pt-1">( {{ selectedDO.driverName }} )</div>
            </div>
            <div>
              <div class="text-blueGray-500 mb-14">Penerima / Stempel Toko</div>
              <div class="font-bold text-blueGray-800 border-t border-blueGray-300 pt-1">( ........................... )</div>
            </div>
          </div>

          <div class="flex justify-end space-x-2 mt-8 pt-4 border-t">
            <button
              @click="selectedDO = null"
              class="px-4 py-2 border rounded-lg text-blueGray-600 font-bold"
            >
              Tutup
            </button>
            <button
              @click="printAction"
              class="px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold"
            >
              <i class="fas fa-print mr-1"></i> Cetak Surat Jalan
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { niagaState } from "@/services/niagaFlowData.js";

export default {
  name: "delivery-page",
  data() {
    return {
      selectedDO: null,
      showCreateDOModal: false,
    };
  },
  computed: {
    deliveryOrders() {
      return niagaState.deliveryOrders;
    },
    readyDeliveryCount() {
      return this.deliveryOrders.filter((d) => d.status === "Siap Dikirim").length;
    },
    onRouteCount() {
      return this.deliveryOrders.filter((d) => d.status === "Dalam Perjalanan").length;
    },
    completedDeliveryCount() {
      return this.deliveryOrders.filter((d) => d.status === "Telah Diterima").length;
    },
  },
  methods: {
    doStatusBadge(status) {
      switch (status) {
        case "Telah Diterima":
          return "bg-emerald-100 text-emerald-800 border-emerald-200";
        case "Dalam Perjalanan":
          return "bg-sky-100 text-sky-800 border-sky-200";
        default:
          return "bg-amber-100 text-amber-800 border-amber-200";
      }
    },
    printSuratJalan(item) {
      this.selectedDO = item;
    },
    printAction() {
      window.print();
    },
  },
};
</script>
