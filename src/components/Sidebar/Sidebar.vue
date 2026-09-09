<template>
  <nav
    class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6 border-r border-blueGray-200"
  >
    <div
      class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto"
    >
      <!-- Toggler for Mobile -->
      <button
        class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
        type="button"
        v-on:click="toggleCollapseShow('bg-white m-2 py-3 px-6')"
      >
        <i class="fas fa-bars"></i>
      </button>

      <!-- Brand Logo -->
      <router-link
        class="md:block text-left md:pb-2 text-emerald-600 mr-0 inline-block whitespace-nowrap text-xl font-extrabold p-2 px-0 tracking-wide"
        to="/admin/dashboard"
      >
        <div class="flex items-center space-x-2">
          <span class="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-md">
            <i class="fas fa-boxes-stacked text-base"></i>
          </span>
          <div>
            <span class="text-blueGray-800 font-black">Niaga</span><span class="text-emerald-600 font-extrabold">Flow</span>
            <div class="text-[10px] text-blueGray-400 font-semibold tracking-wider uppercase -mt-1">Distribusi & Grosir</div>
          </div>
        </div>
      </router-link>

      <!-- User on Mobile -->
      <ul class="md:hidden items-center flex flex-wrap list-none">
        <li class="inline-block relative">
          <notification-dropdown />
        </li>
        <li class="inline-block relative">
          <user-dropdown />
        </li>
      </ul>

      <!-- Collapse content -->
      <div
        class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-2 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded"
        v-bind:class="collapseShow"
      >
        <!-- Collapse header for mobile -->
        <div
          class="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200"
        >
          <div class="flex flex-wrap items-center">
            <div class="w-6/12 font-bold text-emerald-600 text-lg">
              NiagaFlow
            </div>
            <div class="w-6/12 flex justify-end">
              <button
                type="button"
                class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                v-on:click="toggleCollapseShow('hidden')"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Section 1: Dashboard -->
        <h6
          class="md:min-w-full text-blueGray-400 text-xs uppercase font-bold block pt-2 pb-2 tracking-wider"
        >
          Ringkasan Operasional
        </h6>
        <ul class="md:flex-col md:min-w-full flex flex-col list-none">
          <li class="items-center">
            <router-link
              to="/admin/dashboard"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-2.5 font-bold block rounded-lg px-3 transition-colors duration-150"
                :class="[
                  isActive
                    ? 'text-white bg-emerald-600 shadow-md'
                    : 'text-blueGray-600 hover:text-emerald-600 hover:bg-emerald-50',
                ]"
              >
                <i
                  class="fas fa-chart-pie mr-2 text-sm"
                  :class="[isActive ? 'text-white' : 'text-blueGray-400']"
                ></i>
                Dashboard Utama
              </a>
            </router-link>
          </li>
        </ul>

        <!-- Divider -->
        <hr class="my-3 md:min-w-full border-blueGray-200" />

        <!-- Section 2: Mitra & Skema Penjualan -->
        <h6
          class="md:min-w-full text-blueGray-400 text-xs uppercase font-bold block pt-1 pb-2 tracking-wider"
        >
          Mitra & Skema Harga
        </h6>
        <ul class="md:flex-col md:min-w-full flex flex-col list-none space-y-1">
          <li class="items-center">
            <router-link
              to="/admin/customers"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-2 font-bold block rounded-lg px-3 transition-colors duration-150"
                :class="[
                  isActive
                    ? 'text-white bg-emerald-600 shadow-md'
                    : 'text-blueGray-600 hover:text-emerald-600 hover:bg-emerald-50',
                ]"
              >
                <i
                  class="fas fa-store mr-2 text-sm"
                  :class="[isActive ? 'text-white' : 'text-blueGray-400']"
                ></i>
                Pelanggan / Toko
              </a>
            </router-link>
          </li>

          <li class="items-center">
            <router-link
              to="/admin/tier-pricing"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-2 font-bold block rounded-lg px-3 transition-colors duration-150"
                :class="[
                  isActive
                    ? 'text-white bg-emerald-600 shadow-md'
                    : 'text-blueGray-600 hover:text-emerald-600 hover:bg-emerald-50',
                ]"
              >
                <i
                  class="fas fa-tags mr-2 text-sm"
                  :class="[isActive ? 'text-white' : 'text-blueGray-400']"
                ></i>
                Tier Pricing Grosir
              </a>
            </router-link>
          </li>

          <li class="items-center">
            <router-link
              to="/admin/salesmen"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-2 font-bold block rounded-lg px-3 transition-colors duration-150"
                :class="[
                  isActive
                    ? 'text-white bg-emerald-600 shadow-md'
                    : 'text-blueGray-600 hover:text-emerald-600 hover:bg-emerald-50',
                ]"
              >
                <i
                  class="fas fa-route mr-2 text-sm"
                  :class="[isActive ? 'text-white' : 'text-blueGray-400']"
                ></i>
                Salesman & Rute
              </a>
            </router-link>
          </li>
        </ul>

        <!-- Divider -->
        <hr class="my-3 md:min-w-full border-blueGray-200" />

        <!-- Section 3: Pesanan & Pengiriman -->
        <h6
          class="md:min-w-full text-blueGray-400 text-xs uppercase font-bold block pt-1 pb-2 tracking-wider"
        >
          Transaksi Distribusi
        </h6>
        <ul class="md:flex-col md:min-w-full flex flex-col list-none space-y-1">
          <li class="items-center">
            <router-link
              to="/admin/sales-orders"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-2 font-bold block rounded-lg px-3 transition-colors duration-150"
                :class="[
                  isActive
                    ? 'text-white bg-emerald-600 shadow-md'
                    : 'text-blueGray-600 hover:text-emerald-600 hover:bg-emerald-50',
                ]"
              >
                <i
                  class="fas fa-file-invoice-dollar mr-2 text-sm"
                  :class="[isActive ? 'text-white' : 'text-blueGray-400']"
                ></i>
                Sales Order (SO)
              </a>
            </router-link>
          </li>

          <li class="items-center">
            <router-link
              to="/admin/delivery"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-2 font-bold block rounded-lg px-3 transition-colors duration-150"
                :class="[
                  isActive
                    ? 'text-white bg-emerald-600 shadow-md'
                    : 'text-blueGray-600 hover:text-emerald-600 hover:bg-emerald-50',
                ]"
              >
                <i
                  class="fas fa-truck-fast mr-2 text-sm"
                  :class="[isActive ? 'text-white' : 'text-blueGray-400']"
                ></i>
                Surat Jalan (DO)
              </a>
            </router-link>
          </li>

          <li class="items-center">
            <router-link
              to="/admin/invoices"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-2 font-bold block rounded-lg px-3 transition-colors duration-150"
                :class="[
                  isActive
                    ? 'text-white bg-emerald-600 shadow-md'
                    : 'text-blueGray-600 hover:text-emerald-600 hover:bg-emerald-50',
                ]"
              >
                <i
                  class="fas fa-receipt mr-2 text-sm"
                  :class="[isActive ? 'text-white' : 'text-blueGray-400']"
                ></i>
                Faktur & Invoice
              </a>
            </router-link>
          </li>
        </ul>

        <!-- Divider -->
        <hr class="my-3 md:min-w-full border-blueGray-200" />

        <!-- Section 4: Inventori & Keuangan -->
        <h6
          class="md:min-w-full text-blueGray-400 text-xs uppercase font-bold block pt-1 pb-2 tracking-wider"
        >
          Gudang & Finansial
        </h6>
        <ul class="md:flex-col md:min-w-full flex flex-col list-none space-y-1">
          <li class="items-center">
            <router-link
              to="/admin/inventory"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-2 font-bold block rounded-lg px-3 transition-colors duration-150"
                :class="[
                  isActive
                    ? 'text-white bg-emerald-600 shadow-md'
                    : 'text-blueGray-600 hover:text-emerald-600 hover:bg-emerald-50',
                ]"
              >
                <i
                  class="fas fa-boxes-packing mr-2 text-sm"
                  :class="[isActive ? 'text-white' : 'text-blueGray-400']"
                ></i>
                Stok Multi-Gudang
              </a>
            </router-link>
          </li>

          <li class="items-center">
            <router-link
              to="/admin/payments"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-2 font-bold block rounded-lg px-3 transition-colors duration-150"
                :class="[
                  isActive
                    ? 'text-white bg-emerald-600 shadow-md'
                    : 'text-blueGray-600 hover:text-emerald-600 hover:bg-emerald-50',
                ]"
              >
                <i
                  class="fas fa-hand-holding-dollar mr-2 text-sm"
                  :class="[isActive ? 'text-white' : 'text-blueGray-400']"
                ></i>
                Piutang & Pembayaran
              </a>
            </router-link>
          </li>

          <li class="items-center">
            <router-link
              to="/admin/reports"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-2 font-bold block rounded-lg px-3 transition-colors duration-150"
                :class="[
                  isActive
                    ? 'text-white bg-emerald-600 shadow-md'
                    : 'text-blueGray-600 hover:text-emerald-600 hover:bg-emerald-50',
                ]"
              >
                <i
                  class="fas fa-chart-line mr-2 text-sm"
                  :class="[isActive ? 'text-white' : 'text-blueGray-400']"
                ></i>
                Laporan Operasional
              </a>
            </router-link>
          </li>
        </ul>

        <!-- Divider -->
        <hr class="my-3 md:min-w-full border-blueGray-200" />

        <!-- Section 5: Navigasi Cepat -->
        <h6
          class="md:min-w-full text-blueGray-400 text-xs uppercase font-bold block pt-1 pb-2 tracking-wider"
        >
          Halaman & Akses
        </h6>
        <ul class="md:flex-col md:min-w-full flex flex-col list-none space-y-1">
          <li class="items-center">
            <router-link
              class="text-blueGray-600 hover:text-emerald-600 text-xs uppercase py-2 font-bold block px-3"
              to="/landing"
            >
              <i class="fas fa-globe mr-2 text-sm text-blueGray-400"></i>
              Portal NiagaFlow
            </router-link>
          </li>

          <li class="items-center">
            <router-link
              class="text-blueGray-600 hover:text-emerald-600 text-xs uppercase py-2 font-bold block px-3"
              to="/auth/login"
            >
              <i class="fas fa-arrow-right-to-bracket mr-2 text-sm text-blueGray-400"></i>
              Ganti Akun / Login
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import NotificationDropdown from "@/components/Dropdowns/NotificationDropdown.vue";
import UserDropdown from "@/components/Dropdowns/UserDropdown.vue";

export default {
  data() {
    return {
      collapseShow: "hidden",
    };
  },
  methods: {
    toggleCollapseShow: function (classes) {
      this.collapseShow = classes;
    },
  },
  components: {
    NotificationDropdown,
    UserDropdown,
  },
};
</script>
