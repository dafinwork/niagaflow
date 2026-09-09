<template>
  <div>
    <!-- Header -->
    <div class="mb-6 flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-xl shadow-md border border-blueGray-200">
      <div class="flex items-center space-x-3">
        <span class="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow">
          <i class="fas fa-hand-holding-dollar"></i>
        </span>
        <div>
          <h1 class="text-xl font-bold text-blueGray-800">Manajemen Piutang & Penerimaan Pembayaran</h1>
          <p class="text-xs text-blueGray-500">Pencatatan setoran transfer/giro/kasir, pelunasan faktur, dan pemulihan plafon kredit toko</p>
        </div>
      </div>
      <div>
        <button
          @click="openPaymentModal"
          class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow hover:shadow-md transition inline-flex items-center"
        >
          <i class="fas fa-plus-circle mr-2"></i> Input Pembayaran Masuk
        </button>
      </div>
    </div>

    <!-- Aging Schedule Matrix Summary -->
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6 text-xs">
      <div class="bg-white p-4 rounded-xl border border-emerald-200 shadow-sm bg-emerald-50/30">
        <span class="text-emerald-700 block text-[11px] font-bold">Lancar (Belum Jatuh Tempo)</span>
        <span class="text-base font-bold text-emerald-800">Rp 41.138.426</span>
        <div class="text-[10px] text-blueGray-400 mt-1">2 Toko Grosir</div>
      </div>
      <div class="bg-white p-4 rounded-xl border border-amber-200 shadow-sm bg-amber-50/30">
        <span class="text-amber-700 block text-[11px] font-bold">Overdue 1 - 14 Hari</span>
        <span class="text-base font-bold text-amber-800">Rp 18.500.000</span>
        <div class="text-[10px] text-blueGray-400 mt-1">1 Faktur (Toko Murah Rezeki)</div>
      </div>
      <div class="bg-white p-4 rounded-xl border border-orange-200 shadow-sm bg-orange-50/30">
        <span class="text-orange-700 block text-[11px] font-bold">Overdue 15 - 30 Hari</span>
        <span class="text-base font-bold text-orange-800">Rp 0</span>
        <div class="text-[10px] text-blueGray-400 mt-1">0 Toko</div>
      </div>
      <div class="bg-white p-4 rounded-xl border border-rose-200 shadow-sm bg-rose-50/30">
        <span class="text-rose-700 block text-[11px] font-bold">Macet (&gt; 30 Hari)</span>
        <span class="text-base font-bold text-rose-800">Rp 0</span>
        <div class="text-[10px] text-blueGray-400 mt-1">Kualitas Kredit Baik</div>
      </div>
    </div>

    <!-- Outstanding Invoices Ready for Payment -->
    <div class="bg-white rounded-xl shadow-lg border border-blueGray-200 overflow-hidden mb-6">
      <div class="p-4 border-b border-blueGray-200 bg-blueGray-50 flex items-center justify-between">
        <h3 class="font-bold text-sm text-blueGray-800 uppercase tracking-wide">
          <i class="fas fa-file-circle-exclamation mr-1.5 text-amber-600"></i> Tagihan Belum Lunas yang Siap Ditagihkan
        </h3>
        <span class="text-xs text-blueGray-500 font-semibold">Pilih faktur untuk pelunasan cepat</span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="bg-blueGray-100/70 text-blueGray-600 font-bold uppercase tracking-wider border-b border-blueGray-200">
              <th class="py-3 px-4">No. Faktur</th>
              <th class="py-3 px-4">Nama Mitra Toko</th>
              <th class="py-3 px-4">Jatuh Tempo</th>
              <th class="py-3 px-4 text-right">Nilai Faktur</th>
              <th class="py-3 px-4 text-right">Sisa Tagihan</th>
              <th class="py-3 px-4 text-center">Aksi Cepat</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-blueGray-100">
            <tr
              v-for="inv in unpaidInvoices"
              :key="inv.id"
              class="hover:bg-blueGray-50/80 transition"
            >
              <td class="py-3 px-4 font-bold font-mono text-blueGray-800">{{ inv.code }}</td>
              <td class="py-3 px-4 font-medium text-blueGray-800">{{ inv.customerName }}</td>
              <td class="py-3 px-4" :class="inv.status === 'Overdue' ? 'text-rose-600 font-bold' : 'text-blueGray-600'">
                {{ formatDateIndo(inv.dueDate) }}
                <span v-if="inv.status === 'Overdue'" class="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded ml-1">
                  Lewat Tempo!
                </span>
              </td>
              <td class="py-3 px-4 text-right text-blueGray-600">{{ formatRupiah(inv.amount) }}</td>
              <td class="py-3 px-4 text-right font-bold text-emerald-700 text-sm">{{ formatRupiah(inv.balance) }}</td>
              <td class="py-3 px-4 text-center">
                <button
                  @click="paySpecificInvoice(inv)"
                  class="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg font-bold text-[11px]"
                >
                  <i class="fas fa-hand-holding-dollar mr-1"></i> Bayar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Payments History Table -->
    <div class="bg-white rounded-xl shadow-lg border border-blueGray-200 overflow-hidden">
      <div class="p-4 border-b border-blueGray-200 bg-blueGray-50 flex items-center justify-between">
        <h3 class="font-bold text-sm text-blueGray-800 uppercase tracking-wide">
          <i class="fas fa-clock-rotate-left mr-1.5 text-emerald-600"></i> Riwayat Penerimaan Pembayaran Masuk
        </h3>
        <span class="text-xs text-blueGray-500 font-semibold">Tervalidasi Bagian Keuangan</span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="bg-blueGray-100/70 text-blueGray-600 font-bold uppercase tracking-wider border-b border-blueGray-200">
              <th class="py-3 px-4">No. Kuitansi</th>
              <th class="py-3 px-4">Tanggal</th>
              <th class="py-3 px-4">Mitra Toko</th>
              <th class="py-3 px-4">Faktur Terkait</th>
              <th class="py-3 px-4">Metode Bayar</th>
              <th class="py-3 px-4 text-right">Nominal Masuk</th>
              <th class="py-3 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-blueGray-100">
            <tr
              v-for="p in payments"
              :key="p.id"
              class="hover:bg-blueGray-50/80 transition"
            >
              <td class="py-3.5 px-4 font-mono font-bold text-blueGray-800">{{ p.code }}</td>
              <td class="py-3.5 px-4 text-blueGray-600">{{ formatDateIndo(p.date) }}</td>
              <td class="py-3.5 px-4 font-bold text-blueGray-800">{{ p.customerName }}</td>
              <td class="py-3.5 px-4 font-mono text-emerald-700 font-semibold">{{ p.invoiceCode }}</td>
              <td class="py-3.5 px-4 text-blueGray-700">
                <span class="font-bold">{{ p.method }}</span>
                <div class="text-[10px] text-blueGray-400 font-mono">Ref: {{ p.refNumber }}</div>
              </td>
              <td class="py-3.5 px-4 text-right font-bold text-emerald-700 text-sm">
                {{ formatRupiah(p.amount) }}
              </td>
              <td class="py-3.5 px-4 text-center">
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <i class="fas fa-check mr-0.5"></i> {{ p.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Input Pembayaran -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-blueGray-200 text-xs">
        <div class="bg-emerald-600 p-4 text-white flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <i class="fas fa-hand-holding-dollar text-base"></i>
            <h3 class="font-bold text-sm">Pencatatan Penerimaan Pembayaran</h3>
          </div>
          <button @click="showModal = false" class="text-white hover:text-blueGray-200">
            <i class="fas fa-times text-base"></i>
          </button>
        </div>

        <form @submit.prevent="submitPayment" class="p-6 space-y-4">
          <div>
            <label class="block font-bold text-blueGray-700 mb-1">Pilih Faktur Tagihan *</label>
            <select
              v-model="form.invoiceCode"
              @change="onInvoiceSelect"
              class="w-full border border-blueGray-300 rounded-lg p-2.5 bg-white font-semibold text-blueGray-800"
            >
              <option v-for="inv in unpaidInvoices" :key="inv.id" :value="inv.code">
                {{ inv.code }} — {{ inv.customerName }} (Sisa: {{ formatRupiah(inv.balance) }})
              </option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-blueGray-700 mb-1">Nama Toko</label>
              <input
                v-model="form.customerName"
                disabled
                class="w-full border border-blueGray-200 bg-blueGray-100 rounded-lg p-2.5 text-blueGray-700 font-bold"
              />
            </div>
            <div>
              <label class="block font-bold text-blueGray-700 mb-1">Metode Bayar *</label>
              <select
                v-model="form.method"
                class="w-full border border-blueGray-300 rounded-lg p-2.5 bg-white text-blueGray-800"
              >
                <option value="Transfer Bank BCA">Transfer Bank BCA</option>
                <option value="Transfer Bank Mandiri">Transfer Bank Mandiri</option>
                <option value="Tunai / Kasir Kolektor">Tunai (Kolektor Lapangan)</option>
                <option value="Bilyet Giro / Cek Bank">Bilyet Giro / Cek</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block font-bold text-blueGray-700 mb-1">Jumlah Pembayaran Masuk (Rp) *</label>
            <input
              v-model.number="form.amount"
              type="number"
              min="1"
              required
              class="w-full border border-blueGray-300 rounded-lg p-2.5 focus:ring-emerald-500 font-bold text-emerald-700 text-sm"
            />
          </div>

          <div>
            <label class="block font-bold text-blueGray-700 mb-1">Nomor Referensi Bank / Giro / Bukti</label>
            <input
              v-model="form.refNumber"
              type="text"
              placeholder="Contoh: TRF-889102 atau BG-MDR-9921"
              class="w-full border border-blueGray-300 rounded-lg p-2.5 focus:ring-emerald-500"
            />
          </div>

          <div class="flex justify-end space-x-2 pt-4 border-t border-blueGray-100">
            <button
              type="button"
              @click="showModal = false"
              class="px-4 py-2 border border-blueGray-300 rounded-lg text-blueGray-600 font-bold"
            >
              Batal
            </button>
            <button
              type="submit"
              class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold shadow"
            >
              Simpan Pembayaran & Perbarui Piutang
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { niagaState, formatRupiah, formatDateIndo, recordPayment } from "@/services/niagaFlowData.js";

export default {
  name: "payments-page",
  data() {
    return {
      showModal: false,
      form: {
        invoiceCode: "",
        customerName: "",
        amount: 0,
        method: "Transfer Bank BCA",
        refNumber: "",
      },
    };
  },
  computed: {
    payments() {
      return niagaState.payments;
    },
    invoices() {
      return niagaState.invoices;
    },
    unpaidInvoices() {
      return this.invoices.filter((i) => i.balance > 0);
    },
  },
  methods: {
    formatRupiah,
    formatDateIndo,
    openPaymentModal() {
      if (this.unpaidInvoices.length > 0) {
        const inv = this.unpaidInvoices[0];
        this.form = {
          invoiceCode: inv.code,
          customerName: inv.customerName,
          amount: inv.balance,
          method: "Transfer Bank BCA",
          refNumber: "",
        };
      }
      this.showModal = true;
    },
    paySpecificInvoice(inv) {
      this.form = {
        invoiceCode: inv.code,
        customerName: inv.customerName,
        amount: inv.balance,
        method: "Transfer Bank BCA",
        refNumber: "",
      };
      this.showModal = true;
    },
    onInvoiceSelect() {
      const inv = this.invoices.find((i) => i.code === this.form.invoiceCode);
      if (inv) {
        this.form.customerName = inv.customerName;
        this.form.amount = inv.balance;
      }
    },
    submitPayment() {
      const rec = recordPayment(this.form);
      this.showModal = false;
      alert(`Pembayaran ${rec.code} sebesar ${this.formatRupiah(rec.amount)} berhasil dicatat! Sisa plafon kredit toko telah dipulihkan.`);
    },
  },
};
</script>
