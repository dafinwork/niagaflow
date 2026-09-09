<template>
  <div>
    <!-- Header Page -->
    <div class="mb-6 flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-xl shadow-md border border-blueGray-200">
      <div>
        <div class="flex items-center space-x-3">
          <span class="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow">
            <i class="fas fa-store"></i>
          </span>
          <div>
            <h1 class="text-xl font-bold text-blueGray-800">Direktori Pelanggan & Toko Grosir</h1>
            <p class="text-xs text-blueGray-500">Kelola master toko mitra, tier harga acuan, dan batas plafon kredit</p>
          </div>
        </div>
      </div>
      <div>
        <button
          @click="openAddModal"
          class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow hover:shadow-md transition inline-flex items-center"
        >
          <i class="fas fa-plus-circle mr-2"></i> Tambah Toko Baru
        </button>
      </div>
    </div>

    <!-- Filter & Search Bar -->
    <div class="bg-white p-4 rounded-xl shadow mb-6 border border-blueGray-200 flex flex-wrap items-center justify-between gap-4">
      <div class="flex-1 min-w-[240px] relative">
        <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-blueGray-400">
          <i class="fas fa-search text-xs"></i>
        </span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari nama toko, pemilik, atau wilayah..."
          class="w-full pl-9 pr-4 py-2 border border-blueGray-300 rounded-lg text-xs focus:ring-emerald-500 focus:border-emerald-500 text-blueGray-700"
        />
      </div>

      <div class="flex flex-wrap gap-2 text-xs">
        <select
          v-model="filterTier"
          class="border border-blueGray-300 rounded-lg px-3 py-2 bg-white text-blueGray-700 focus:ring-emerald-500 focus:border-emerald-500"
        >
          <option value="">Semua Tier Harga</option>
          <option value="Tier 1">Tier 1 (Grosir Besar)</option>
          <option value="Tier 2">Tier 2 (Semi-Grosir)</option>
          <option value="Tier 3">Tier 3 (Pengecer)</option>
          <option value="Tier 4">Tier 4 (Retail/Warung)</option>
        </select>

        <select
          v-model="filterCity"
          class="border border-blueGray-300 rounded-lg px-3 py-2 bg-white text-blueGray-700 focus:ring-emerald-500 focus:border-emerald-500"
        >
          <option value="">Semua Wilayah</option>
          <option value="Jakarta Timur">Jakarta Timur</option>
          <option value="Jakarta Barat">Jakarta Barat</option>
          <option value="Jakarta Selatan">Jakarta Selatan</option>
          <option value="Tangerang Selatan">Tangerang Selatan</option>
          <option value="Bogor">Bogor</option>
          <option value="Bekasi Utara">Bekasi</option>
        </select>
      </div>
    </div>

    <!-- Table of Customers -->
    <div class="bg-white rounded-xl shadow-lg border border-blueGray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-blueGray-50 text-blueGray-600 text-xs font-bold uppercase tracking-wider border-b border-blueGray-200">
              <th class="py-3.5 px-4">Toko & Pemilik</th>
              <th class="py-3.5 px-4">Wilayah & Kontak</th>
              <th class="py-3.5 px-4">Tier Harga</th>
              <th class="py-3.5 px-4">Plafon Kredit & Pemakaian</th>
              <th class="py-3.5 px-4">Termin (TOP)</th>
              <th class="py-3.5 px-4">Status</th>
              <th class="py-3.5 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-blueGray-100 text-xs">
            <tr
              v-for="customer in filteredCustomers"
              :key="customer.id"
              class="hover:bg-blueGray-50/70 transition"
            >
              <!-- Toko & Pemilik -->
              <td class="py-3.5 px-4">
                <div class="font-bold text-blueGray-800 text-sm">
                  {{ customer.name }}
                </div>
                <div class="text-blueGray-500 text-[11px] flex items-center space-x-1.5 mt-0.5">
                  <span class="bg-blueGray-100 text-blueGray-700 px-1.5 py-0.5 rounded font-mono font-semibold">{{ customer.code }}</span>
                  <span>•</span>
                  <span>Pemilik: {{ customer.owner }}</span>
                </div>
              </td>

              <!-- Wilayah & Kontak -->
              <td class="py-3.5 px-4">
                <div class="text-blueGray-700 font-medium">
                  <i class="fas fa-location-dot text-emerald-600 mr-1"></i> {{ customer.city }}
                </div>
                <div class="text-blueGray-500 text-[11px] mt-0.5">
                  <i class="fab fa-whatsapp text-emerald-500 mr-1"></i> {{ customer.phone }}
                </div>
              </td>

              <!-- Tier Harga -->
              <td class="py-3.5 px-4">
                <span
                  class="px-2.5 py-1 text-[11px] font-bold rounded-full border inline-block"
                  :class="tierBadge(customer.tier)"
                >
                  {{ customer.tier }}
                </span>
                <div class="text-[10px] text-blueGray-400 mt-1 font-medium">
                  {{ customer.category }}
                </div>
              </td>

              <!-- Plafon Kredit & Pemakaian -->
              <td class="py-3.5 px-4 min-w-[200px]">
                <div class="flex justify-between text-[11px] mb-1">
                  <span class="text-blueGray-500">Terpakai: <strong class="text-rose-600">{{ formatRupiah(customer.usedCredit) }}</strong></span>
                  <span class="text-blueGray-700 font-semibold">Max: {{ formatRupiah(customer.creditLimit) }}</span>
                </div>
                <div class="w-full bg-blueGray-200 rounded-full h-2 overflow-hidden">
                  <div
                    class="h-2 rounded-full transition-all duration-300"
                    :class="creditBarColor(customer.usedCredit, customer.creditLimit)"
                    :style="{ width: Math.min(100, Math.round((customer.usedCredit / customer.creditLimit) * 100)) + '%' }"
                  ></div>
                </div>
                <div class="text-right text-[10px] text-blueGray-400 mt-0.5">
                  Sisa Limit: {{ formatRupiah(Math.max(0, customer.creditLimit - customer.usedCredit)) }}
                </div>
              </td>

              <!-- TOP -->
              <td class="py-3.5 px-4">
                <span class="font-bold text-blueGray-700">
                  {{ customer.topDays === 0 ? 'COD (Tunai)' : customer.topDays + ' Hari' }}
                </span>
              </td>

              <!-- Status -->
              <td class="py-3.5 px-4">
                <span
                  class="px-2 py-0.5 text-[11px] font-bold rounded"
                  :class="customer.status === 'Aktif' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'"
                >
                  {{ customer.status }}
                </span>
              </td>

              <!-- Aksi -->
              <td class="py-3.5 px-4 text-center">
                <button
                  @click="viewCustomer(customer)"
                  class="text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 p-2 rounded-lg mr-1 text-xs"
                  title="Lihat Detail"
                >
                  <i class="fas fa-eye"></i>
                </button>
                <router-link
                  to="/admin/sales-orders"
                  class="text-emerald-600 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 p-2 rounded-lg text-xs"
                  title="Buat Order"
                >
                  <i class="fas fa-cart-plus"></i>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Tambah Toko Baru -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-blueGray-200">
        <div class="bg-emerald-600 p-4 text-white flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <i class="fas fa-store text-lg"></i>
            <h3 class="font-bold text-base">Tambah Mitra Toko Baru</h3>
          </div>
          <button @click="showAddModal = false" class="text-white hover:text-blueGray-200">
            <i class="fas fa-times text-lg"></i>
          </button>
        </div>

        <form @submit.prevent="submitAddCustomer" class="p-6 space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label class="block font-bold text-blueGray-700 mb-1">Nama Toko / Outlet *</label>
              <input
                v-model="form.name"
                required
                type="text"
                placeholder="Contoh: Toko Berkah Mandiri"
                class="w-full border border-blueGray-300 rounded-lg p-2.5 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label class="block font-bold text-blueGray-700 mb-1">Nama Pemilik / PIC *</label>
              <input
                v-model="form.owner"
                required
                type="text"
                placeholder="Contoh: Bpk. H. Slamet"
                class="w-full border border-blueGray-300 rounded-lg p-2.5 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label class="block font-bold text-blueGray-700 mb-1">Nomor Telepon / WhatsApp *</label>
              <input
                v-model="form.phone"
                required
                type="text"
                placeholder="Contoh: 0812-3456-7890"
                class="w-full border border-blueGray-300 rounded-lg p-2.5 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label class="block font-bold text-blueGray-700 mb-1">Kota / Wilayah Operasional *</label>
              <select
                v-model="form.city"
                class="w-full border border-blueGray-300 rounded-lg p-2.5 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
              >
                <option value="Jakarta Timur">Jakarta Timur</option>
                <option value="Jakarta Barat">Jakarta Barat</option>
                <option value="Jakarta Selatan">Jakarta Selatan</option>
                <option value="Jakarta Utara">Jakarta Utara</option>
                <option value="Tangerang Selatan">Tangerang Selatan</option>
                <option value="Bekasi">Bekasi</option>
                <option value="Bogor">Bogor</option>
              </select>
            </div>

            <div>
              <label class="block font-bold text-blueGray-700 mb-1">Skema Tier Harga *</label>
              <select
                v-model="form.tier"
                class="w-full border border-blueGray-300 rounded-lg p-2.5 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
              >
                <option value="Tier 1">Tier 1 - Grosir Utama / Distributor</option>
                <option value="Tier 2">Tier 2 - Semi Grosir / Agen</option>
                <option value="Tier 3">Tier 3 - Toko Pengecer Besar</option>
                <option value="Tier 4">Tier 4 - Retail / Warung Lingkungan</option>
              </select>
            </div>

            <div>
              <label class="block font-bold text-blueGray-700 mb-1">Plafon Batas Kredit (Rp) *</label>
              <input
                v-model.number="form.creditLimit"
                required
                type="number"
                placeholder="20000000"
                class="w-full border border-blueGray-300 rounded-lg p-2.5 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label class="block font-bold text-blueGray-700 mb-1">Termin Pembayaran (TOP) *</label>
              <select
                v-model.number="form.topDays"
                class="w-full border border-blueGray-300 rounded-lg p-2.5 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
              >
                <option :value="0">COD (Bayar Tunai di Tempat)</option>
                <option :value="7">TOP 7 Hari</option>
                <option :value="14">TOP 14 Hari</option>
                <option :value="21">TOP 21 Hari</option>
                <option :value="30">TOP 30 Hari</option>
              </select>
            </div>

            <div>
              <label class="block font-bold text-blueGray-700 mb-1">Salesman Penanggung Jawab *</label>
              <select
                v-model="form.salesmanId"
                class="w-full border border-blueGray-300 rounded-lg p-2.5 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
              >
                <option v-for="sales in salesmenList" :key="sales.id" :value="sales.id">
                  {{ sales.name }} ({{ sales.area }})
                </option>
              </select>
            </div>
          </div>

          <div class="text-xs">
            <label class="block font-bold text-blueGray-700 mb-1">Alamat Lengkap Toko</label>
            <textarea
              v-model="form.address"
              rows="2"
              placeholder="Jl. Pasar Baru Blok C No. 12..."
              class="w-full border border-blueGray-300 rounded-lg p-2.5 focus:ring-emerald-500 focus:border-emerald-500"
            ></textarea>
          </div>

          <div class="flex justify-end space-x-3 pt-4 border-t border-blueGray-100">
            <button
              type="button"
              @click="showAddModal = false"
              class="px-4 py-2 border border-blueGray-300 rounded-lg text-xs font-bold text-blueGray-600 hover:bg-blueGray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow"
            >
              Simpan Mitra Toko
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Detail Toko -->
    <div
      v-if="selectedCustomer"
      class="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden border border-blueGray-200">
        <div class="bg-blueGray-800 p-4 text-white flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <i class="fas fa-building text-lg text-emerald-400"></i>
            <h3 class="font-bold text-base">{{ selectedCustomer.name }}</h3>
          </div>
          <button @click="selectedCustomer = null" class="text-white hover:text-blueGray-300">
            <i class="fas fa-times text-lg"></i>
          </button>
        </div>

        <div class="p-6 space-y-4 text-xs text-blueGray-700">
          <div class="grid grid-cols-2 gap-3 bg-blueGray-50 p-4 rounded-xl border border-blueGray-200">
            <div>
              <span class="text-blueGray-400 text-[11px] block">Kode Pelanggan</span>
              <span class="font-bold font-mono text-sm text-blueGray-800">{{ selectedCustomer.code }}</span>
            </div>
            <div>
              <span class="text-blueGray-400 text-[11px] block">Skema Tier Harga</span>
              <span class="font-bold text-emerald-600">{{ selectedCustomer.tier }} ({{ selectedCustomer.category }})</span>
            </div>
            <div>
              <span class="text-blueGray-400 text-[11px] block">Nama Pemilik</span>
              <span class="font-semibold">{{ selectedCustomer.owner }}</span>
            </div>
            <div>
              <span class="text-blueGray-400 text-[11px] block">No. WhatsApp</span>
              <span class="font-semibold">{{ selectedCustomer.phone }}</span>
            </div>
          </div>

          <div>
            <span class="text-blueGray-400 text-[11px] block mb-1">Alamat Outlet</span>
            <p class="font-medium p-3 bg-white rounded-lg border border-blueGray-200">
              {{ selectedCustomer.address }}, {{ selectedCustomer.city }}
            </p>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <span class="text-emerald-700 text-[11px] block font-semibold">Batas Kredit (Plafon)</span>
              <span class="font-bold text-emerald-800 text-sm">{{ formatRupiah(selectedCustomer.creditLimit) }}</span>
            </div>
            <div class="p-3 bg-rose-50 rounded-lg border border-rose-200">
              <span class="text-rose-700 text-[11px] block font-semibold">Piutang Terpakai</span>
              <span class="font-bold text-rose-800 text-sm">{{ formatRupiah(selectedCustomer.usedCredit) }}</span>
            </div>
          </div>

          <div class="flex justify-end pt-4 border-t border-blueGray-100">
            <button
              @click="selectedCustomer = null"
              class="px-4 py-2 bg-blueGray-700 hover:bg-blueGray-800 text-white rounded-lg font-bold"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { niagaState, formatRupiah, addCustomer } from "@/services/niagaFlowData.js";

export default {
  name: "customers-page",
  data() {
    return {
      searchQuery: "",
      filterTier: "",
      filterCity: "",
      showAddModal: false,
      selectedCustomer: null,
      form: {
        name: "",
        owner: "",
        phone: "",
        address: "",
        city: "Jakarta Timur",
        tier: "Tier 2",
        creditLimit: 25000000,
        topDays: 14,
        salesmanId: 1,
      },
    };
  },
  computed: {
    customers() {
      return niagaState.customers;
    },
    salesmenList() {
      return niagaState.salesmen;
    },
    filteredCustomers() {
      return this.customers.filter((c) => {
        const matchSearch =
          c.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          c.owner.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          c.city.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchTier = this.filterTier ? c.tier === this.filterTier : true;
        const matchCity = this.filterCity ? c.city.includes(this.filterCity) : true;
        return matchSearch && matchTier && matchCity;
      });
    },
  },
  methods: {
    formatRupiah,
    openAddModal() {
      this.form = {
        name: "",
        owner: "",
        phone: "",
        address: "",
        city: "Jakarta Timur",
        tier: "Tier 2",
        creditLimit: 25000000,
        topDays: 14,
        salesmanId: 1,
      };
      this.showAddModal = true;
    },
    submitAddCustomer() {
      addCustomer(this.form);
      this.showAddModal = false;
      alert(`Mitra Toko "${this.form.name}" berhasil ditambahkan ke sistem NiagaFlow!`);
    },
    viewCustomer(cust) {
      this.selectedCustomer = cust;
    },
    tierBadge(tier) {
      switch (tier) {
        case "Tier 1":
          return "bg-emerald-100 text-emerald-800 border-emerald-300";
        case "Tier 2":
          return "bg-indigo-100 text-indigo-800 border-indigo-300";
        case "Tier 3":
          return "bg-amber-100 text-amber-800 border-amber-300";
        default:
          return "bg-blueGray-100 text-blueGray-800 border-blueGray-300";
      }
    },
    creditBarColor(used, limit) {
      const ratio = used / limit;
      if (ratio > 0.85) return "bg-rose-500";
      if (ratio > 0.6) return "bg-amber-500";
      return "bg-emerald-500";
    },
  },
};
</script>
