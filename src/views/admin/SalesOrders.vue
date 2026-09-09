<template>
  <div>
    <!-- Header -->
    <div class="mb-6 flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-xl shadow-md border border-blueGray-200">
      <div class="flex items-center space-x-3">
        <span class="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow">
          <i class="fas fa-file-invoice-dollar"></i>
        </span>
        <div>
          <h1 class="text-xl font-bold text-blueGray-800">Sales Order (SO) Penjualan Grosir</h1>
          <p class="text-xs text-blueGray-500">Penerbitan pesanan penjualan, kalkulasi tier harga otomatis, dan approval gudang</p>
        </div>
      </div>
      <div>
        <button
          @click="openCreateSOModal"
          class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow hover:shadow-md transition inline-flex items-center"
        >
          <i class="fas fa-plus-circle mr-2"></i> Buat Sales Order Baru
        </button>
      </div>
    </div>

    <!-- Filter & Summary Status -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 text-xs">
      <div class="bg-white p-3.5 rounded-xl border border-blueGray-200 shadow-sm flex items-center justify-between">
        <div>
          <span class="text-blueGray-400 block text-[11px] font-semibold">Total Order</span>
          <span class="text-base font-bold text-blueGray-800">{{ salesOrders.length }} SO</span>
        </div>
        <span class="w-8 h-8 rounded-lg bg-blueGray-100 text-blueGray-600 flex items-center justify-center font-bold">
          <i class="fas fa-list-check"></i>
        </span>
      </div>
      <div class="bg-white p-3.5 rounded-xl border border-blueGray-200 shadow-sm flex items-center justify-between">
        <div>
          <span class="text-blueGray-400 block text-[11px] font-semibold">Siap Dikirim / Diproses</span>
          <span class="text-base font-bold text-sky-600">{{ activeProcessingCount }} SO</span>
        </div>
        <span class="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center font-bold">
          <i class="fas fa-dolly"></i>
        </span>
      </div>
      <div class="bg-white p-3.5 rounded-xl border border-blueGray-200 shadow-sm flex items-center justify-between">
        <div>
          <span class="text-blueGray-400 block text-[11px] font-semibold">Order Selesai Diterima</span>
          <span class="text-base font-bold text-emerald-600">{{ completedCount }} SO</span>
        </div>
        <span class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
          <i class="fas fa-circle-check"></i>
        </span>
      </div>
      <div class="bg-white p-3.5 rounded-xl border border-blueGray-200 shadow-sm flex items-center justify-between">
        <div>
          <span class="text-blueGray-400 block text-[11px] font-semibold">Nilai Transaksi</span>
          <span class="text-sm font-bold text-emerald-700">{{ formatRupiah(totalSOAmount) }}</span>
        </div>
        <span class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
          <i class="fas fa-rupiah-sign"></i>
        </span>
      </div>
    </div>

    <!-- Table of Sales Orders -->
    <div class="bg-white rounded-xl shadow-lg border border-blueGray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="bg-blueGray-50 text-blueGray-600 font-bold uppercase tracking-wider border-b border-blueGray-200">
              <th class="py-3.5 px-4">No. SO & Tanggal</th>
              <th class="py-3.5 px-4">Toko / Mitra Pembeli</th>
              <th class="py-3.5 px-4">Salesman</th>
              <th class="py-3.5 px-4">Termin Bayar</th>
              <th class="py-3.5 px-4 text-right">Grand Total (PPN)</th>
              <th class="py-3.5 px-4 text-center">Status SO</th>
              <th class="py-3.5 px-4 text-center">Status Kirim</th>
              <th class="py-3.5 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-blueGray-100">
            <tr
              v-for="order in salesOrders"
              :key="order.id"
              class="hover:bg-blueGray-50/80 transition"
            >
              <td class="py-3.5 px-4">
                <div class="font-bold text-blueGray-800 text-sm font-mono">{{ order.code }}</div>
                <div class="text-[11px] text-blueGray-400">{{ formatDateIndo(order.date) }}</div>
              </td>
              <td class="py-3.5 px-4">
                <div class="font-bold text-blueGray-800">{{ order.customerName }}</div>
                <div class="text-[11px] text-blueGray-500">Invoice: {{ order.invoiceNumber }}</div>
              </td>
              <td class="py-3.5 px-4 text-blueGray-700">
                <i class="fas fa-user-tie text-emerald-600 mr-1"></i> {{ order.salesmanName }}
              </td>
              <td class="py-3.5 px-4 font-medium text-blueGray-600">
                {{ order.paymentTerms }}
              </td>
              <td class="py-3.5 px-4 text-right font-bold text-emerald-700 text-sm">
                {{ formatRupiah(order.grandTotal) }}
              </td>
              <td class="py-3.5 px-4 text-center">
                <span
                  class="px-2.5 py-1 text-[11px] font-bold rounded-full"
                  :class="statusBadge(order.status)"
                >
                  {{ order.status }}
                </span>
              </td>
              <td class="py-3.5 px-4 text-center">
                <span
                  class="px-2 py-0.5 text-[10px] font-semibold rounded border"
                  :class="deliveryBadge(order.deliveryStatus)"
                >
                  {{ order.deliveryStatus }}
                </span>
              </td>
              <td class="py-3.5 px-4 text-center">
                <button
                  @click="viewInvoiceModal(order)"
                  class="bg-blueGray-100 hover:bg-blueGray-200 text-blueGray-700 px-2.5 py-1 rounded font-bold mr-1"
                  title="Lihat Nota"
                >
                  <i class="fas fa-print mr-1"></i> Nota
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Form Buat Sales Order Baru (Interactive) -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden border border-blueGray-200 text-xs">
        <div class="bg-emerald-600 p-4 text-white flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <i class="fas fa-cart-flatbed text-lg"></i>
            <h3 class="font-bold text-base">Penerbitan Sales Order (SO) Baru</h3>
          </div>
          <button @click="showCreateModal = false" class="text-white hover:text-blueGray-200">
            <i class="fas fa-times text-lg"></i>
          </button>
        </div>

        <div class="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <!-- Customer & Sales Selection -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-blueGray-50 p-4 rounded-xl border border-blueGray-200">
            <div>
              <label class="block font-bold text-blueGray-700 mb-1">Pilih Toko / Mitra *</label>
              <select
                v-model="newOrder.customerId"
                @change="onCustomerChange"
                class="w-full border border-blueGray-300 rounded-lg p-2.5 bg-white font-semibold text-blueGray-800"
              >
                <option v-for="c in customers" :key="c.id" :value="c.id">
                  {{ c.name }} ({{ c.tier }})
                </option>
              </select>
            </div>

            <div>
              <label class="block font-bold text-blueGray-700 mb-1">Salesman Penanggung Jawab *</label>
              <select
                v-model="newOrder.salesmanId"
                class="w-full border border-blueGray-300 rounded-lg p-2.5 bg-white font-semibold text-blueGray-800"
              >
                <option v-for="s in salesmen" :key="s.id" :value="s.id">
                  {{ s.name }} ({{ s.code }})
                </option>
              </select>
            </div>

            <div>
              <label class="block font-bold text-blueGray-700 mb-1">Termin Pembayaran *</label>
              <input
                v-model="newOrder.paymentTerms"
                type="text"
                class="w-full border border-blueGray-300 rounded-lg p-2.5 bg-white"
              />
            </div>
          </div>

          <!-- Customer Credit Limit Info Bar -->
          <div v-if="selectedCustInfo" class="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <i class="fas fa-circle-info text-emerald-600 text-sm"></i>
              <span class="text-blueGray-700 font-medium">
                Plafon Toko: <strong>{{ formatRupiah(selectedCustInfo.creditLimit) }}</strong> |
                Sisa Limit: <strong class="text-emerald-700">{{ formatRupiah(selectedCustInfo.creditLimit - selectedCustInfo.usedCredit) }}</strong>
              </span>
            </div>
            <span class="bg-emerald-200 text-emerald-800 font-bold px-2 py-0.5 rounded text-[11px]">
              Tier Berlaku: {{ selectedCustInfo.tier }}
            </span>
          </div>

          <!-- Items Selection Table -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <h4 class="font-bold text-sm text-blueGray-800">Daftar Barang yang Dipesan</h4>
              <button
                type="button"
                @click="addItemRow"
                class="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 px-3 py-1.5 rounded-lg font-bold inline-flex items-center"
              >
                <i class="fas fa-plus mr-1"></i> Tambah Item
              </button>
            </div>

            <table class="w-full border border-blueGray-200 rounded-lg overflow-hidden text-left">
              <thead>
                <tr class="bg-blueGray-100 text-blueGray-700 font-bold uppercase text-[11px]">
                  <th class="p-2.5">Produk Barang</th>
                  <th class="p-2.5 text-center">Satuan</th>
                  <th class="p-2.5 text-center w-20">Qty</th>
                  <th class="p-2.5 text-right">Harga Tier (Rp)</th>
                  <th class="p-2.5 text-center w-20">Diskon %</th>
                  <th class="p-2.5 text-right">Subtotal</th>
                  <th class="p-2.5 text-center w-12">Hapus</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-blueGray-100">
                <tr v-for="(item, idx) in newOrder.items" :key="idx" class="hover:bg-blueGray-50">
                  <td class="p-2">
                    <select
                      v-model="item.productId"
                      @change="onProductSelect(item)"
                      class="w-full border border-blueGray-300 rounded p-1.5 bg-white text-xs"
                    >
                      <option v-for="p in products" :key="p.id" :value="p.id">
                        {{ p.name }} (Stok: {{ p.stocks['Gudang Pusat'] }} {{ p.packUnit }})
                      </option>
                    </select>
                  </td>
                  <td class="p-2 text-center font-semibold text-blueGray-600">
                    {{ item.unit }}
                  </td>
                  <td class="p-2 text-center">
                    <input
                      v-model.number="item.qty"
                      @input="recalculateItem(item)"
                      type="number"
                      min="1"
                      class="w-full border border-blueGray-300 rounded p-1 text-center font-bold"
                    />
                  </td>
                  <td class="p-2 text-right font-medium text-blueGray-700">
                    {{ formatRupiah(item.price) }}
                  </td>
                  <td class="p-2 text-center">
                    <input
                      v-model.number="item.discount"
                      @input="recalculateItem(item)"
                      type="number"
                      step="0.5"
                      min="0"
                      class="w-full border border-blueGray-300 rounded p-1 text-center"
                    />
                  </td>
                  <td class="p-2 text-right font-bold text-emerald-700">
                    {{ formatRupiah(item.subtotal) }}
                  </td>
                  <td class="p-2 text-center">
                    <button
                      type="button"
                      @click="removeItemRow(idx)"
                      class="text-rose-500 hover:text-rose-700 p-1"
                      :disabled="newOrder.items.length <= 1"
                    >
                      <i class="fas fa-trash-can"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Total Calculation -->
          <div class="bg-blueGray-50 p-4 rounded-xl border border-blueGray-200 flex flex-col items-end space-y-1.5">
            <div class="flex justify-between w-64 text-blueGray-600">
              <span>Subtotal Order:</span>
              <span class="font-bold">{{ formatRupiah(calculatedSubtotal) }}</span>
            </div>
            <div class="flex justify-between w-64 text-blueGray-600">
              <span>PPN (11%):</span>
              <span class="font-bold">{{ formatRupiah(calculatedTax) }}</span>
            </div>
            <div class="flex justify-between w-64 text-sm font-bold text-emerald-800 pt-2 border-t border-blueGray-200">
              <span>Grand Total:</span>
              <span class="text-base">{{ formatRupiah(calculatedGrandTotal) }}</span>
            </div>
          </div>

          <!-- Footer Actions -->
          <div class="flex justify-end space-x-3 pt-4 border-t border-blueGray-200">
            <button
              type="button"
              @click="showCreateModal = false"
              class="px-4 py-2 border border-blueGray-300 rounded-lg text-blueGray-600 font-bold"
            >
              Batal
            </button>
            <button
              type="button"
              @click="submitSalesOrder"
              class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold shadow"
            >
              <i class="fas fa-check-circle mr-1.5"></i> Terbitkan Sales Order
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Nota Print View -->
    <div
      v-if="selectedOrderForPrint"
      class="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-blueGray-300 text-xs">
        <div class="p-6">
          <!-- Header Nota -->
          <div class="flex items-center justify-between border-b pb-4 mb-4">
            <div>
              <div class="font-black text-lg text-emerald-700">PT NIAGAFLOW MAKMUR DISTRIBUSI</div>
              <p class="text-blueGray-500 text-[11px]">Distributor & Grosir FMCG, Bahan Pokok & Sembako</p>
              <p class="text-blueGray-400 text-[10px]">Kawasan Industri Cikarang • Telp: (021) 8990-1122</p>
            </div>
            <div class="text-right">
              <div class="font-black text-base text-blueGray-800 font-mono">{{ selectedOrderForPrint.code }}</div>
              <span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[10px]">SALES ORDER RESMI</span>
              <p class="text-blueGray-400 text-[11px] mt-1">Tgl: {{ selectedOrderForPrint.date }}</p>
            </div>
          </div>

          <!-- Info Toko & Sales -->
          <div class="grid grid-cols-2 gap-4 bg-blueGray-50 p-3 rounded-lg mb-4">
            <div>
              <span class="text-blueGray-400 block text-[10px]">DIPESAN OLEH (TOKO):</span>
              <strong class="text-blueGray-800 text-sm">{{ selectedOrderForPrint.customerName }}</strong>
              <div class="text-blueGray-600 mt-0.5">Termin: {{ selectedOrderForPrint.paymentTerms }}</div>
            </div>
            <div class="text-right">
              <span class="text-blueGray-400 block text-[10px]">SALESMAN:</span>
              <strong class="text-blueGray-800">{{ selectedOrderForPrint.salesmanName }}</strong>
              <div class="text-blueGray-600 mt-0.5">Status: {{ selectedOrderForPrint.status }}</div>
            </div>
          </div>

          <!-- Table Items Nota -->
          <table class="w-full border-collapse text-left mb-4">
            <thead>
              <tr class="border-b bg-blueGray-100 text-blueGray-700 font-bold">
                <th class="py-2 px-2">Nama Barang</th>
                <th class="py-2 px-2 text-center">Qty</th>
                <th class="py-2 px-2 text-right">Harga Satuan</th>
                <th class="py-2 px-2 text-center">Disc</th>
                <th class="py-2 px-2 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-blueGray-100">
              <tr v-for="(it, idx) in selectedOrderForPrint.items" :key="idx">
                <td class="py-2 px-2 font-medium">{{ it.productName }}</td>
                <td class="py-2 px-2 text-center">{{ it.qty }} {{ it.unit }}</td>
                <td class="py-2 px-2 text-right">{{ formatRupiah(it.price) }}</td>
                <td class="py-2 px-2 text-center">{{ it.discount }}%</td>
                <td class="py-2 px-2 text-right font-bold">{{ formatRupiah(it.subtotal) }}</td>
              </tr>
            </tbody>
          </table>

          <!-- Total Footer Nota -->
          <div class="flex justify-between items-center pt-2 border-t font-bold">
            <span class="text-blueGray-500">Grand Total Termasuk PPN (11%)</span>
            <span class="text-base text-emerald-700">{{ formatRupiah(selectedOrderForPrint.grandTotal) }}</span>
          </div>

          <div class="flex justify-end space-x-2 mt-6 pt-4 border-t">
            <button
              @click="selectedOrderForPrint = null"
              class="px-4 py-2 border rounded-lg text-blueGray-600 font-bold"
            >
              Tutup
            </button>
            <button
              @click="printNota"
              class="px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold"
            >
              <i class="fas fa-print mr-1"></i> Cetak Dokumen
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { niagaState, formatRupiah, formatDateIndo, createSalesOrder } from "@/services/niagaFlowData.js";

export default {
  name: "sales-orders-page",
  data() {
    return {
      showCreateModal: false,
      selectedOrderForPrint: null,
      newOrder: {
        customerId: 1,
        salesmanId: 1,
        paymentTerms: "TOP 14 Hari",
        items: [],
      },
    };
  },
  computed: {
    salesOrders() {
      return niagaState.salesOrders;
    },
    customers() {
      return niagaState.customers;
    },
    salesmen() {
      return niagaState.salesmen;
    },
    products() {
      return niagaState.products;
    },
    activeProcessingCount() {
      return this.salesOrders.filter((o) => o.status === "Disetujui" || o.status === "Diproses").length;
    },
    completedCount() {
      return this.salesOrders.filter((o) => o.status === "Selesai").length;
    },
    totalSOAmount() {
      return this.salesOrders.reduce((sum, o) => sum + o.grandTotal, 0);
    },
    selectedCustInfo() {
      return this.customers.find((c) => c.id === this.newOrder.customerId);
    },
    calculatedSubtotal() {
      return this.newOrder.items.reduce((sum, item) => sum + item.subtotal, 0);
    },
    calculatedTax() {
      return Math.round(this.calculatedSubtotal * 0.11);
    },
    calculatedGrandTotal() {
      return this.calculatedSubtotal + this.calculatedTax;
    },
  },
  methods: {
    formatRupiah,
    formatDateIndo,
    statusBadge(status) {
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
    deliveryBadge(status) {
      switch (status) {
        case "Telah Diterima":
          return "bg-emerald-50 text-emerald-700 border-emerald-200";
        case "Dalam Perjalanan":
          return "bg-sky-50 text-sky-700 border-sky-200";
        case "Siap Dikirim":
          return "bg-amber-50 text-amber-700 border-amber-200";
        default:
          return "bg-blueGray-100 text-blueGray-700 border-blueGray-200";
      }
    },
    openCreateSOModal() {
      const cust = this.customers[0];
      const prod = this.products[0];
      const tierPrice = prod.tierPrices[cust.tier] || prod.costPrice;

      this.newOrder = {
        customerId: cust.id,
        salesmanId: cust.salesmanId,
        paymentTerms: cust.topDays === 0 ? "Cash on Delivery (COD)" : `TOP ${cust.topDays} Hari`,
        items: [
          {
            productId: prod.id,
            productName: prod.name,
            unit: prod.packUnit,
            qty: 10,
            price: tierPrice,
            discount: 1.5,
            subtotal: Math.round(tierPrice * 10 * 0.985),
          },
        ],
      };
      this.showCreateModal = true;
    },
    onCustomerChange() {
      const cust = this.selectedCustInfo;
      if (!cust) return;
      this.newOrder.salesmanId = cust.salesmanId;
      this.newOrder.paymentTerms = cust.topDays === 0 ? "Cash on Delivery (COD)" : `TOP ${cust.topDays} Hari`;
      // Update item prices to customer's tier
      this.newOrder.items.forEach((item) => {
        this.recalculateItem(item);
      });
    },
    addItemRow() {
      const prod = this.products[1] || this.products[0];
      const cust = this.selectedCustInfo;
      const tierPrice = prod.tierPrices[cust ? cust.tier : "Tier 2"] || prod.costPrice;

      this.newOrder.items.push({
        productId: prod.id,
        productName: prod.name,
        unit: prod.packUnit,
        qty: 5,
        price: tierPrice,
        discount: 0,
        subtotal: tierPrice * 5,
      });
    },
    removeItemRow(idx) {
      this.newOrder.items.splice(idx, 1);
    },
    onProductSelect(item) {
      const prod = this.products.find((p) => p.id === item.productId);
      if (!prod) return;
      item.productName = prod.name;
      item.unit = prod.packUnit;
      this.recalculateItem(item);
    },
    recalculateItem(item) {
      const prod = this.products.find((p) => p.id === item.productId);
      const cust = this.selectedCustInfo;
      if (!prod || !cust) return;

      item.price = prod.tierPrices[cust.tier] || prod.costPrice;
      const baseSub = item.price * (item.qty || 1);
      const discFactor = 1 - (item.discount || 0) / 100;
      item.subtotal = Math.round(baseSub * discFactor);
    },
    submitSalesOrder() {
      const cust = this.selectedCustInfo;
      const sales = this.salesmen.find((s) => s.id === this.newOrder.salesmanId);

      const payload = {
        customerId: cust.id,
        customerName: cust.name,
        salesmanId: sales ? sales.id : 1,
        salesmanName: sales ? sales.name : "Salesman",
        paymentTerms: this.newOrder.paymentTerms,
        items: this.newOrder.items,
        subtotal: this.calculatedSubtotal,
        tax: this.calculatedTax,
        grandTotal: this.calculatedGrandTotal,
      };

      const created = createSalesOrder(payload);
      this.showCreateModal = false;
      alert(`Sales Order ${created.code} senilai ${this.formatRupiah(created.grandTotal)} berhasil diterbitkan!`);
    },
    viewInvoiceModal(order) {
      this.selectedOrderForPrint = order;
    },
    printNota() {
      window.print();
    },
  },
};
</script>
