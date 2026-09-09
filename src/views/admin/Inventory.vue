<template>
  <div>
    <!-- Header -->
    <div class="mb-6 flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-xl shadow-md border border-blueGray-200">
      <div class="flex items-center space-x-3">
        <span class="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow">
          <i class="fas fa-boxes-packing"></i>
        </span>
        <div>
          <h1 class="text-xl font-bold text-blueGray-800">Manajemen Stok & Multi-Gudang</h1>
          <p class="text-xs text-blueGray-500">Kontrol persediaan multi-satuan (Karton/Pcs), batas aman reorder, dan transfer antar gudang</p>
        </div>
      </div>
      <div class="flex space-x-2">
        <button
          @click="showMutationModal = true"
          class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow transition inline-flex items-center"
        >
          <i class="fas fa-arrow-right-arrow-left mr-2"></i> Mutasi Antar Gudang
        </button>
      </div>
    </div>

    <!-- Warehouse Locations Overview -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div
        v-for="wh in warehouses"
        :key="wh.code"
        class="bg-white rounded-xl p-4 shadow border border-blueGray-200 flex flex-col justify-between"
      >
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-[11px] font-mono font-bold bg-blueGray-100 text-blueGray-700 px-2 py-0.5 rounded">
              {{ wh.code }}
            </span>
            <span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              {{ wh.type }}
            </span>
          </div>
          <h4 class="font-bold text-sm text-blueGray-800 mb-1">{{ wh.name }}</h4>
          <p class="text-xs text-blueGray-500 mb-3">{{ wh.address }}</p>
        </div>
        <div class="pt-2 border-t border-blueGray-100 text-xs">
          <div class="flex justify-between text-blueGray-600 mb-1">
            <span>Kapasitas Terpakai</span>
            <span class="font-bold text-blueGray-800">{{ wh.capacityUsed }}%</span>
          </div>
          <div class="w-full bg-blueGray-200 rounded-full h-2 overflow-hidden">
            <div
              class="h-2 rounded-full bg-emerald-500"
              :style="{ width: wh.capacityUsed + '%' }"
            ></div>
          </div>
          <div class="flex justify-between text-[10px] text-blueGray-400 mt-1">
            <span>Supervisor: {{ wh.supervisor }}</span>
            <span>{{ wh.phone }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Products Stock Table -->
    <div class="bg-white rounded-xl shadow-lg border border-blueGray-200 overflow-hidden mb-6">
      <div class="p-4 border-b border-blueGray-200 flex flex-wrap items-center justify-between gap-3 bg-blueGray-50">
        <div>
          <h3 class="font-bold text-sm text-blueGray-800 uppercase tracking-wide">
            Daftar Persediaan Barang Multi-Satuan
          </h3>
          <p class="text-xs text-blueGray-500">Stok dikonversi dalam satuan besar (Karton/Dus) dan satuan eceran (Pcs)</p>
        </div>
        <div class="flex items-center space-x-2 text-xs">
          <input
            v-model="stockSearch"
            type="text"
            placeholder="Cari nama barang..."
            class="border border-blueGray-300 rounded-lg px-3 py-1.5 text-xs text-blueGray-700 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="bg-blueGray-100/70 text-blueGray-600 font-bold uppercase tracking-wider border-b border-blueGray-200">
              <th class="py-3 px-4">Produk</th>
              <th class="py-3 px-4">Konversi Satuan</th>
              <th class="py-3 px-4 text-center">Gudang Pusat</th>
              <th class="py-3 px-4 text-center">Gudang Transit</th>
              <th class="py-3 px-4 text-center">Armada Truk</th>
              <th class="py-3 px-4 text-center">Total Fisik</th>
              <th class="py-3 px-4 text-center">Status Reorder</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-blueGray-100">
            <tr
              v-for="prod in filteredStockProducts"
              :key="prod.id"
              class="hover:bg-blueGray-50/80 transition"
            >
              <td class="py-3.5 px-4">
                <div class="font-bold text-blueGray-800 text-sm">{{ prod.name }}</div>
                <div class="text-[11px] text-blueGray-400 font-mono">{{ prod.code }} • {{ prod.category }}</div>
              </td>
              <td class="py-3.5 px-4">
                <span class="font-bold text-blueGray-700">1 {{ prod.packUnit }} = {{ prod.packRatio }} {{ prod.baseUnit }}</span>
              </td>
              <!-- Gudang Pusat -->
              <td class="py-3.5 px-4 text-center font-semibold text-blueGray-700">
                {{ prod.stocks['Gudang Pusat'] }} {{ prod.packUnit }}
              </td>
              <!-- Gudang Transit -->
              <td class="py-3.5 px-4 text-center font-semibold text-blueGray-700">
                {{ prod.stocks['Gudang Transit'] }} {{ prod.packUnit }}
              </td>
              <!-- Armada Kanvas -->
              <td class="py-3.5 px-4 text-center font-semibold text-blueGray-700">
                {{ prod.stocks['Armada Kanvas'] }} {{ prod.packUnit }}
              </td>
              <!-- Total Fisik -->
              <td class="py-3.5 px-4 text-center font-bold text-sm text-emerald-700 bg-emerald-50/30">
                {{ calculateTotalStock(prod) }} {{ prod.packUnit }}
                <div class="text-[10px] text-blueGray-400 font-normal">
                  ≈ {{ calculateTotalStock(prod) * prod.packRatio }} {{ prod.baseUnit }}
                </div>
              </td>
              <!-- Reorder Status -->
              <td class="py-3.5 px-4 text-center">
                <span
                  v-if="calculateTotalStock(prod) <= prod.minStock"
                  class="px-2.5 py-1 text-[11px] font-bold rounded-full bg-rose-100 text-rose-800 border border-rose-300 inline-flex items-center"
                >
                  <i class="fas fa-triangle-exclamation mr-1"></i> Reorder Segera
                </span>
                <span
                  v-else
                  class="px-2.5 py-1 text-[11px] font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 inline-flex items-center"
                >
                  <i class="fas fa-circle-check mr-1"></i> Stok Aman
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Stock Mutations Log -->
    <div class="bg-white rounded-xl shadow-lg border border-blueGray-200 overflow-hidden">
      <div class="p-4 border-b border-blueGray-200 bg-blueGray-50 flex items-center justify-between">
        <h3 class="font-bold text-sm text-blueGray-800 uppercase tracking-wide">
          <i class="fas fa-clock-rotate-left mr-1.5 text-emerald-600"></i> Riwayat Mutasi & Pergerakan Barang
        </h3>
        <span class="text-xs text-blueGray-500 font-medium">Log real-time stok gudang</span>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="bg-blueGray-100/70 text-blueGray-600 font-bold uppercase tracking-wider border-b border-blueGray-200">
              <th class="py-3 px-4">Waktu</th>
              <th class="py-3 px-4">Tipe Mutasi</th>
              <th class="py-3 px-4">Nama Produk</th>
              <th class="py-3 px-4">Asal / Ke</th>
              <th class="py-3 px-4 text-center">Jumlah</th>
              <th class="py-3 px-4">PIC Lapangan</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-blueGray-100">
            <tr v-for="m in stockMutations" :key="m.id" class="hover:bg-blueGray-50/80">
              <td class="py-3 px-4 font-mono text-blueGray-600">{{ m.date }}</td>
              <td class="py-3 px-4 font-bold text-blueGray-800">{{ m.type }}</td>
              <td class="py-3 px-4 font-medium text-blueGray-700">{{ m.productName }}</td>
              <td class="py-3 px-4 text-blueGray-600">
                <div>Dari: <strong class="text-blueGray-800">{{ m.from }}</strong></div>
                <div>Tujuan: <strong class="text-emerald-700">{{ m.to }}</strong></div>
              </td>
              <td class="py-3 px-4 text-center font-bold text-emerald-700">
                {{ m.qty }} {{ m.unit }}
              </td>
              <td class="py-3 px-4 text-blueGray-500">{{ m.pic }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Mutasi Antar Gudang -->
    <div
      v-if="showMutationModal"
      class="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-blueGray-200 text-xs">
        <div class="bg-emerald-600 p-4 text-white flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <i class="fas fa-truck-ramp-box text-base"></i>
            <h3 class="font-bold text-sm">Formulir Transfer / Mutasi Antar Gudang</h3>
          </div>
          <button @click="showMutationModal = false" class="text-white hover:text-blueGray-200">
            <i class="fas fa-times text-base"></i>
          </button>
        </div>

        <form @submit.prevent="submitMutation" class="p-6 space-y-4">
          <div>
            <label class="block font-bold text-blueGray-700 mb-1">Pilih Produk *</label>
            <select
              v-model="mutationForm.productId"
              class="w-full border border-blueGray-300 rounded-lg p-2.5 bg-white text-blueGray-700"
            >
              <option v-for="p in products" :key="p.id" :value="p.id">
                {{ p.name }} (Stok Pusat: {{ p.stocks['Gudang Pusat'] }} {{ p.packUnit }})
              </option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-blueGray-700 mb-1">Gudang Asal *</label>
              <select
                v-model="mutationForm.from"
                class="w-full border border-blueGray-300 rounded-lg p-2.5 bg-white text-blueGray-700"
              >
                <option value="Gudang Pusat">Gudang Pusat Cikarang</option>
                <option value="Gudang Transit">Gudang Transit Daan Mogot</option>
                <option value="Armada Kanvas">Armada Kanvas</option>
              </select>
            </div>
            <div>
              <label class="block font-bold text-blueGray-700 mb-1">Gudang Tujuan *</label>
              <select
                v-model="mutationForm.to"
                class="w-full border border-blueGray-300 rounded-lg p-2.5 bg-white text-blueGray-700"
              >
                <option value="Gudang Transit">Gudang Transit Daan Mogot</option>
                <option value="Armada Kanvas">Armada Kanvas</option>
                <option value="Gudang Pusat">Gudang Pusat Cikarang</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block font-bold text-blueGray-700 mb-1">Jumlah Mutasi (Karton / Dus) *</label>
            <input
              v-model.number="mutationForm.qty"
              type="number"
              min="1"
              required
              class="w-full border border-blueGray-300 rounded-lg p-2.5 focus:ring-emerald-500"
            />
          </div>

          <div class="flex justify-end space-x-2 pt-4 border-t border-blueGray-100">
            <button
              type="button"
              @click="showMutationModal = false"
              class="px-4 py-2 border border-blueGray-300 rounded-lg text-blueGray-600 font-bold"
            >
              Batal
            </button>
            <button
              type="submit"
              class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold shadow"
            >
              Proses Mutasi
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { niagaState, formatRupiah } from "@/services/niagaFlowData.js";

export default {
  name: "inventory-page",
  data() {
    return {
      stockSearch: "",
      showMutationModal: false,
      mutationForm: {
        productId: 1,
        from: "Gudang Pusat",
        to: "Gudang Transit",
        qty: 10,
      },
    };
  },
  computed: {
    products() {
      return niagaState.products;
    },
    warehouses() {
      return niagaState.warehouses;
    },
    stockMutations() {
      return niagaState.stockMutations;
    },
    filteredStockProducts() {
      if (!this.stockSearch) return this.products;
      return this.products.filter((p) =>
        p.name.toLowerCase().includes(this.stockSearch.toLowerCase())
      );
    },
  },
  methods: {
    formatRupiah,
    calculateTotalStock(prod) {
      return Object.values(prod.stocks).reduce((sum, val) => sum + val, 0);
    },
    submitMutation() {
      const prod = this.products.find((p) => p.id === this.mutationForm.productId);
      if (!prod) return;

      if (prod.stocks[this.mutationForm.from] < this.mutationForm.qty) {
        alert("Jumlah stok di gudang asal tidak mencukupi!");
        return;
      }

      prod.stocks[this.mutationForm.from] -= this.mutationForm.qty;
      prod.stocks[this.mutationForm.to] += this.mutationForm.qty;

      niagaState.stockMutations.unshift({
        id: niagaState.stockMutations.length + 1,
        date: new Date().toLocaleString("id-ID"),
        type: "Transfer Antar Gudang",
        productName: prod.name,
        from: this.mutationForm.from,
        to: this.mutationForm.to,
        qty: this.mutationForm.qty,
        unit: prod.packUnit,
        pic: "Admin Gudang (Staff)",
      });

      this.showMutationModal = false;
      alert(`Mutasi sebanyak ${this.mutationForm.qty} ${prod.packUnit} ${prod.name} berhasil!`);
    },
  },
};
</script>
