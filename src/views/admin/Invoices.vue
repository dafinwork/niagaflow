<template>
  <div>
    <!-- Header -->
    <div class="mb-6 flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-xl shadow-md border border-blueGray-200">
      <div class="flex items-center space-x-3">
        <span class="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow">
          <i class="fas fa-receipt"></i>
        </span>
        <div>
          <h1 class="text-xl font-bold text-blueGray-800">Faktur Penjualan & Invoice Komersial</h1>
          <p class="text-xs text-blueGray-500">Penagihan resmi distributor, pengawasan termin pembayaran (TOP), dan rekonsiliasi faktur</p>
        </div>
      </div>
      <div>
        <router-link
          to="/admin/payments"
          class="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow transition inline-flex items-center"
        >
          <i class="fas fa-hand-holding-dollar mr-2"></i> Input Pembayaran Piutang
        </router-link>
      </div>
    </div>

    <!-- Invoices Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6 text-xs">
      <div class="bg-white p-4 rounded-xl border border-blueGray-200 shadow">
        <span class="text-blueGray-400 block text-[11px] font-semibold">Total Tagihan Beredar</span>
        <span class="text-base font-bold text-blueGray-800">{{ formatRupiah(totalInvoicesAmount) }}</span>
      </div>
      <div class="bg-white p-4 rounded-xl border border-blueGray-200 shadow">
        <span class="text-blueGray-400 block text-[11px] font-semibold">Telah Terbayar / Lunas</span>
        <span class="text-base font-bold text-emerald-600">{{ formatRupiah(totalPaidAmount) }}</span>
      </div>
      <div class="bg-white p-4 rounded-xl border border-blueGray-200 shadow">
        <span class="text-blueGray-400 block text-[11px] font-semibold">Sisa Saldo Piutang (AR)</span>
        <span class="text-base font-bold text-sky-600">{{ formatRupiah(totalBalanceAmount) }}</span>
      </div>
      <div class="bg-white p-4 rounded-xl border border-blueGray-200 shadow">
        <span class="text-rose-500 block text-[11px] font-semibold">Faktur Jatuh Tempo (Overdue)</span>
        <span class="text-base font-bold text-rose-600">{{ overdueInvoicesCount }} Faktur</span>
      </div>
    </div>

    <!-- Invoices Table -->
    <div class="bg-white rounded-xl shadow-lg border border-blueGray-200 overflow-hidden">
      <div class="p-4 border-b border-blueGray-200 bg-blueGray-50 flex flex-wrap items-center justify-between gap-3">
        <h3 class="font-bold text-sm text-blueGray-800 uppercase tracking-wide">
          Daftar Faktur Penjualan Distributor
        </h3>
        <div class="flex items-center space-x-2 text-xs">
          <select
            v-model="statusFilter"
            class="border border-blueGray-300 rounded-lg px-3 py-1.5 bg-white text-blueGray-700"
          >
            <option value="">Semua Status Tagihan</option>
            <option value="Belum Lunas">Belum Lunas</option>
            <option value="Lunas">Lunas</option>
            <option value="Overdue">Jatuh Tempo (Overdue)</option>
          </select>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="bg-blueGray-100/70 text-blueGray-600 font-bold uppercase tracking-wider border-b border-blueGray-200">
              <th class="py-3.5 px-4">No. Faktur</th>
              <th class="py-3.5 px-4">Toko Pelanggan</th>
              <th class="py-3.5 px-4">Tgl Terbit & Jatuh Tempo</th>
              <th class="py-3.5 px-4 text-right">Total Tagihan</th>
              <th class="py-3.5 px-4 text-right">Sisa Piutang</th>
              <th class="py-3.5 px-4 text-center">Status</th>
              <th class="py-3.5 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-blueGray-100">
            <tr
              v-for="inv in filteredInvoices"
              :key="inv.id"
              class="hover:bg-blueGray-50/80 transition"
            >
              <td class="py-3.5 px-4">
                <div class="font-bold text-blueGray-800 font-mono text-sm">{{ inv.code }}</div>
                <div class="text-[11px] text-blueGray-500 font-mono">Ref SO: {{ inv.soCode }}</div>
              </td>
              <td class="py-3.5 px-4">
                <div class="font-bold text-blueGray-800">{{ inv.customerName }}</div>
                <div class="text-[11px] text-blueGray-500">Sales: {{ inv.salesman }}</div>
              </td>
              <td class="py-3.5 px-4">
                <div class="text-blueGray-700">{{ formatDateIndo(inv.issueDate) }}</div>
                <div class="text-[11px] font-semibold text-rose-600">Tempo: {{ formatDateIndo(inv.dueDate) }}</div>
              </td>
              <td class="py-3.5 px-4 text-right font-medium text-blueGray-700">
                {{ formatRupiah(inv.amount) }}
              </td>
              <td class="py-3.5 px-4 text-right font-bold text-rose-600 text-sm">
                {{ formatRupiah(inv.balance) }}
              </td>
              <td class="py-3.5 px-4 text-center">
                <span
                  class="px-2.5 py-1 text-[11px] font-bold rounded-full border inline-block"
                  :class="invStatusBadge(inv.status)"
                >
                  {{ inv.status }}
                </span>
              </td>
              <td class="py-3.5 px-4 text-center">
                <button
                  @click="openPrintModal(inv)"
                  class="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded font-bold mr-1"
                >
                  <i class="fas fa-print mr-1"></i> Cetak Faktur
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Cetak Faktur Penjualan -->
    <div
      v-if="selectedInvoice"
      class="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-blueGray-300 text-xs">
        <div class="p-6">
          <!-- Header Faktur -->
          <div class="flex items-center justify-between border-b pb-4 mb-4">
            <div>
              <div class="font-black text-lg text-emerald-700">PT NIAGAFLOW MAKMUR DISTRIBUSI</div>
              <p class="text-blueGray-500 text-[11px]">FAKTUR PENJUALAN & TAGIHAN GROSIR</p>
              <p class="text-blueGray-400 text-[10px]">NPWP: 01.892.441.9-012.000</p>
            </div>
            <div class="text-right">
              <div class="font-black text-base text-blueGray-800 font-mono">{{ selectedInvoice.code }}</div>
              <span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[10px]">COMMERCIAL INVOICE</span>
              <p class="text-blueGray-400 text-[11px] mt-1">Ref SO: {{ selectedInvoice.soCode }}</p>
            </div>
          </div>

          <!-- Rincian Mitra -->
          <div class="grid grid-cols-2 gap-4 bg-blueGray-50 p-3 rounded-lg mb-4">
            <div>
              <span class="text-blueGray-400 block text-[10px]">TAGIHAN KEPADA:</span>
              <strong class="text-blueGray-800 text-sm">{{ selectedInvoice.customerName }}</strong>
              <div class="text-blueGray-600 mt-0.5">Kode: {{ selectedInvoice.customerCode }}</div>
            </div>
            <div class="text-right">
              <span class="text-blueGray-400 block text-[10px]">TANGGAL & TEMPO:</span>
              <div class="text-blueGray-700">Tgl Terbit: {{ selectedInvoice.issueDate }}</div>
              <div class="text-rose-600 font-bold">Jatuh Tempo: {{ selectedInvoice.dueDate }} (TOP {{ selectedInvoice.topDays }} Hari)</div>
            </div>
          </div>

          <div class="p-4 bg-blueGray-100 rounded-lg space-y-2 mb-4">
            <div class="flex justify-between text-blueGray-700">
              <span>Total Nilai Barang (Sebelum Pajak):</span>
              <span class="font-bold">{{ formatRupiah(Math.round(selectedInvoice.amount / 1.11)) }}</span>
            </div>
            <div class="flex justify-between text-blueGray-700">
              <span>PPN Keluaran (11%):</span>
              <span class="font-bold">{{ formatRupiah(selectedInvoice.amount - Math.round(selectedInvoice.amount / 1.11)) }}</span>
            </div>
            <div class="flex justify-between text-sm font-bold text-blueGray-900 pt-2 border-t border-blueGray-300">
              <span>Total Faktur:</span>
              <span class="text-emerald-700">{{ formatRupiah(selectedInvoice.amount) }}</span>
            </div>
            <div class="flex justify-between text-xs text-rose-600 font-bold">
              <span>Sisa Tagihan Belum Dibayar:</span>
              <span>{{ formatRupiah(selectedInvoice.balance) }}</span>
            </div>
          </div>

          <div class="bg-amber-50 border border-amber-200 p-2.5 rounded text-[11px] text-amber-800">
            <strong>Instruksi Pembayaran:</strong> Transfer Bank BCA Rek. 892-001928-1 a/n PT NiagaFlow Makmur. Harap cantumkan nomor faktur pada berita transfer.
          </div>

          <div class="flex justify-end space-x-2 mt-6 pt-4 border-t">
            <button
              @click="selectedInvoice = null"
              class="px-4 py-2 border rounded-lg text-blueGray-600 font-bold"
            >
              Tutup
            </button>
            <button
              @click="printAction"
              class="px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold"
            >
              <i class="fas fa-print mr-1"></i> Cetak Faktur Pajak
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { niagaState, formatRupiah, formatDateIndo } from "@/services/niagaFlowData.js";

export default {
  name: "invoices-page",
  data() {
    return {
      statusFilter: "",
      selectedInvoice: null,
    };
  },
  computed: {
    invoices() {
      return niagaState.invoices;
    },
    totalInvoicesAmount() {
      return this.invoices.reduce((sum, i) => sum + i.amount, 0);
    },
    totalPaidAmount() {
      return this.invoices.reduce((sum, i) => sum + i.paid, 0);
    },
    totalBalanceAmount() {
      return this.invoices.reduce((sum, i) => sum + i.balance, 0);
    },
    overdueInvoicesCount() {
      return this.invoices.filter((i) => i.status === "Overdue").length;
    },
    filteredInvoices() {
      if (!this.statusFilter) return this.invoices;
      return this.invoices.filter((i) => i.status === this.statusFilter);
    },
  },
  methods: {
    formatRupiah,
    formatDateIndo,
    invStatusBadge(status) {
      switch (status) {
        case "Lunas":
          return "bg-emerald-100 text-emerald-800 border-emerald-300";
        case "Overdue":
          return "bg-rose-100 text-rose-800 border-rose-300";
        default:
          return "bg-amber-100 text-amber-800 border-amber-300";
      }
    },
    openPrintModal(inv) {
      this.selectedInvoice = inv;
    },
    printAction() {
      window.print();
    },
  },
};
</script>
