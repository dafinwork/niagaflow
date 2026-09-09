<template>
  <div>
    <!-- Header -->
    <div class="mb-6 flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-xl shadow-md border border-blueGray-200">
      <div class="flex items-center space-x-3">
        <span class="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow">
          <i class="fas fa-tags"></i>
        </span>
        <div>
          <h1 class="text-xl font-bold text-blueGray-800">Skema & Matriks Tier Pricing Grosir</h1>
          <p class="text-xs text-blueGray-500">Konfigurasi struktur harga bertingkat multi-tier & aturan diskon volume</p>
        </div>
      </div>
      <div class="flex space-x-2">
        <button
          @click="showRuleModal = true"
          class="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow transition inline-flex items-center"
        >
          <i class="fas fa-sliders mr-2"></i> Aturan Tier & Diskon
        </button>
      </div>
    </div>

    <!-- Tier Descriptions Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div
        v-for="rule in tierRules"
        :key="rule.tier"
        class="bg-white rounded-xl p-4 shadow border border-blueGray-200 flex flex-col justify-between"
      >
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              {{ rule.tier }}
            </span>
            <span class="text-[11px] font-bold text-blueGray-500">
              Margin {{ rule.margin }}
            </span>
          </div>
          <h4 class="font-bold text-sm text-blueGray-800 mb-1">{{ rule.name }}</h4>
          <p class="text-xs text-blueGray-500 mb-3">{{ rule.description }}</p>
        </div>
        <div class="pt-2 border-t border-blueGray-100 flex items-center justify-between text-[11px] text-blueGray-600">
          <span>Min. Order: <strong>{{ rule.minOrderUnit }}</strong></span>
          <span class="font-semibold text-emerald-600">{{ rule.customerCount }} Mitra</span>
        </div>
      </div>
    </div>

    <!-- Pricing Matrix Table -->
    <div class="bg-white rounded-xl shadow-lg border border-blueGray-200 overflow-hidden mb-6">
      <div class="p-4 border-b border-blueGray-200 flex flex-wrap items-center justify-between gap-3 bg-blueGray-50">
        <div>
          <h3 class="font-bold text-sm text-blueGray-800 uppercase tracking-wide">
            Matriks Harga Produk per Tier (Harga per {{ activeUnitView }})
          </h3>
          <p class="text-xs text-blueGray-500">Seluruh harga otomatis terhubung saat penerbitan Sales Order (SO)</p>
        </div>
        <div class="flex items-center space-x-2 text-xs">
          <span class="text-blueGray-500 font-medium">Filter Kategori:</span>
          <select
            v-model="selectedCategory"
            class="border border-blueGray-300 rounded-lg px-3 py-1.5 bg-white text-blueGray-700"
          >
            <option value="">Semua Kategori</option>
            <option value="Sembako">Sembako</option>
            <option value="Bahan Pokok">Bahan Pokok</option>
            <option value="Makanan Instan">Makanan Instan</option>
            <option value="Minuman">Minuman</option>
            <option value="Personal & Home Care">Personal Care</option>
          </select>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="bg-blueGray-100/70 text-blueGray-600 font-bold uppercase tracking-wider border-b border-blueGray-200">
              <th class="py-3 px-4">Kode & Nama Produk</th>
              <th class="py-3 px-4">Satuan Kemasan</th>
              <th class="py-3 px-4 text-right">Modal Pabrik (HPP)</th>
              <th class="py-3 px-4 text-right bg-emerald-50/70 text-emerald-800">Tier 1 (Partai)</th>
              <th class="py-3 px-4 text-right bg-indigo-50/70 text-indigo-800">Tier 2 (Grosir)</th>
              <th class="py-3 px-4 text-right bg-amber-50/70 text-amber-800">Tier 3 (Semi)</th>
              <th class="py-3 px-4 text-right bg-slate-50/70 text-slate-800">Tier 4 (Retail)</th>
              <th class="py-3 px-4 text-center">Simulasi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-blueGray-100">
            <tr
              v-for="prod in filteredProducts"
              :key="prod.id"
              class="hover:bg-blueGray-50/80 transition"
            >
              <td class="py-3 px-4">
                <div class="font-bold text-blueGray-800">{{ prod.name }}</div>
                <div class="text-[11px] text-blueGray-500 font-mono">{{ prod.code }} • {{ prod.category }}</div>
              </td>
              <td class="py-3 px-4">
                <span class="font-bold text-blueGray-700">{{ prod.packUnit }}</span>
                <span class="text-blueGray-400 text-[11px] block">({{ prod.packRatio }} {{ prod.baseUnit }})</span>
              </td>
              <td class="py-3 px-4 text-right font-medium text-blueGray-600">
                {{ formatRupiah(prod.costPrice) }}
              </td>
              <!-- Tier 1 -->
              <td class="py-3 px-4 text-right font-bold text-emerald-700 bg-emerald-50/30">
                {{ formatRupiah(prod.tierPrices['Tier 1']) }}
                <div class="text-[10px] text-emerald-600 font-normal">
                  +{{ calcMargin(prod.costPrice, prod.tierPrices['Tier 1']) }}%
                </div>
              </td>
              <!-- Tier 2 -->
              <td class="py-3 px-4 text-right font-bold text-indigo-700 bg-indigo-50/30">
                {{ formatRupiah(prod.tierPrices['Tier 2']) }}
                <div class="text-[10px] text-indigo-600 font-normal">
                  +{{ calcMargin(prod.costPrice, prod.tierPrices['Tier 2']) }}%
                </div>
              </td>
              <!-- Tier 3 -->
              <td class="py-3 px-4 text-right font-bold text-amber-700 bg-amber-50/30">
                {{ formatRupiah(prod.tierPrices['Tier 3']) }}
                <div class="text-[10px] text-amber-600 font-normal">
                  +{{ calcMargin(prod.costPrice, prod.tierPrices['Tier 3']) }}%
                </div>
              </td>
              <!-- Tier 4 -->
              <td class="py-3 px-4 text-right font-bold text-blueGray-700 bg-slate-50/30">
                {{ formatRupiah(prod.tierPrices['Tier 4']) }}
                <div class="text-[10px] text-blueGray-500 font-normal">
                  +{{ calcMargin(prod.costPrice, prod.tierPrices['Tier 4']) }}%
                </div>
              </td>
              <!-- Aksi -->
              <td class="py-3 px-4 text-center">
                <button
                  @click="selectForSim(prod)"
                  class="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded font-bold text-[11px] border border-emerald-200"
                >
                  Hitung
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Interactive Profit Margin & Volume Discount Simulator -->
    <div class="bg-gradient-to-r from-blueGray-800 to-blueGray-900 text-white rounded-2xl p-6 shadow-xl border border-blueGray-700">
      <div class="flex items-center justify-between mb-4 pb-3 border-b border-blueGray-700">
        <div class="flex items-center space-x-2">
          <span class="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold">
            <i class="fas fa-calculator"></i>
          </span>
          <h3 class="text-base font-bold">Kalkulator Simulasi Margin & Diskon Volume Grosir</h3>
        </div>
        <span class="text-xs text-blueGray-400">Estimasi Laba Kotor Distributor</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
        <div>
          <label class="block text-blueGray-300 font-semibold mb-1">Pilih Produk</label>
          <select
            v-model="sim.productId"
            class="w-full bg-blueGray-700 border border-blueGray-600 rounded-lg p-2.5 text-white focus:ring-emerald-500"
          >
            <option v-for="p in products" :key="p.id" :value="p.id">
              {{ p.name }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-blueGray-300 font-semibold mb-1">Tier Pelanggan</label>
          <select
            v-model="sim.tier"
            class="w-full bg-blueGray-700 border border-blueGray-600 rounded-lg p-2.5 text-white focus:ring-emerald-500"
          >
            <option value="Tier 1">Tier 1 - Distributor Besar</option>
            <option value="Tier 2">Tier 2 - Agen Menengah</option>
            <option value="Tier 3">Tier 3 - Semi Grosir</option>
            <option value="Tier 4">Tier 4 - Retail/Warung</option>
          </select>
        </div>

        <div>
          <label class="block text-blueGray-300 font-semibold mb-1">Jumlah Pesanan (Karton/Dus)</label>
          <input
            v-model.number="sim.qty"
            type="number"
            min="1"
            class="w-full bg-blueGray-700 border border-blueGray-600 rounded-lg p-2.5 text-white focus:ring-emerald-500"
          />
        </div>

        <div>
          <label class="block text-blueGray-300 font-semibold mb-1">Diskon Volume Otomatis</label>
          <div class="bg-blueGray-700/80 border border-blueGray-600 rounded-lg p-2.5 text-emerald-400 font-bold">
            {{ appliedVolumeDiscount }}% ({{ sim.qty }} Karton)
          </div>
        </div>
      </div>

      <!-- Result KPI Cards in Simulator -->
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6 pt-4 border-t border-blueGray-700 text-xs">
        <div class="bg-blueGray-800/80 p-3 rounded-xl border border-blueGray-700">
          <span class="text-blueGray-400 block text-[11px]">Harga Satuan Final</span>
          <span class="text-sm font-bold text-white">{{ formatRupiah(simResult.finalUnitPrice) }}</span>
        </div>
        <div class="bg-blueGray-800/80 p-3 rounded-xl border border-blueGray-700">
          <span class="text-blueGray-400 block text-[11px]">Total Omzet Bruto</span>
          <span class="text-sm font-bold text-sky-400">{{ formatRupiah(simResult.totalRevenue) }}</span>
        </div>
        <div class="bg-blueGray-800/80 p-3 rounded-xl border border-blueGray-700">
          <span class="text-blueGray-400 block text-[11px]">Total Modal (HPP)</span>
          <span class="text-sm font-bold text-rose-400">{{ formatRupiah(simResult.totalCost) }}</span>
        </div>
        <div class="bg-emerald-950/60 p-3 rounded-xl border border-emerald-500/50">
          <span class="text-emerald-400 block text-[11px] font-semibold">Estimasi Laba Kotor</span>
          <span class="text-base font-bold text-emerald-300">{{ formatRupiah(simResult.grossProfit) }}</span>
          <span class="text-[10px] text-emerald-400 block">Margin: {{ simResult.marginPercent }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { niagaState, formatRupiah } from "@/services/niagaFlowData.js";

export default {
  name: "tier-pricing-page",
  data() {
    return {
      selectedCategory: "",
      activeUnitView: "Karton/Dus",
      showRuleModal: false,
      sim: {
        productId: 1,
        tier: "Tier 1",
        qty: 30,
      },
    };
  },
  computed: {
    products() {
      return niagaState.products;
    },
    tierRules() {
      return niagaState.tierRules;
    },
    volumeDiscounts() {
      return niagaState.volumeDiscounts;
    },
    filteredProducts() {
      if (!this.selectedCategory) return this.products;
      return this.products.filter((p) => p.category === this.selectedCategory);
    },
    selectedSimProduct() {
      return this.products.find((p) => p.id === this.sim.productId) || this.products[0];
    },
    appliedVolumeDiscount() {
      const qty = this.sim.qty || 1;
      const matched = this.volumeDiscounts.find((d) => qty >= d.minQty && qty <= d.maxQty);
      return matched ? matched.discountPercent : 0;
    },
    simResult() {
      const prod = this.selectedSimProduct;
      const baseTierPrice = prod.tierPrices[this.sim.tier] || prod.costPrice;
      const discountAmount = (baseTierPrice * this.appliedVolumeDiscount) / 100;
      const finalUnitPrice = baseTierPrice - discountAmount;
      const qty = this.sim.qty || 1;

      const totalRevenue = finalUnitPrice * qty;
      const totalCost = prod.costPrice * qty;
      const grossProfit = totalRevenue - totalCost;
      const marginPercent = totalRevenue > 0 ? ((grossProfit / totalRevenue) * 100).toFixed(1) : 0;

      return {
        finalUnitPrice,
        totalRevenue,
        totalCost,
        grossProfit,
        marginPercent,
      };
    },
  },
  methods: {
    formatRupiah,
    calcMargin(cost, price) {
      if (!cost || !price) return 0;
      return (((price - cost) / cost) * 100).toFixed(1);
    },
    selectForSim(prod) {
      this.sim.productId = prod.id;
    },
  },
};
</script>
