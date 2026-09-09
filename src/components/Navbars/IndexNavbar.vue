<template>
  <nav
    class="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow border-b border-blueGray-200"
  >
    <div
      class="container px-4 mx-auto flex flex-wrap items-center justify-between"
    >
      <div
        class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
      >
        <router-link
          to="/"
          class="text-blueGray-800 text-lg font-black leading-relaxed inline-flex items-center mr-4 py-1 whitespace-nowrap"
        >
          <span class="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center mr-2 text-sm shadow">
            <i class="fas fa-boxes-stacked"></i>
          </span>
          <span>Niaga<span class="text-emerald-600 font-extrabold">Flow</span></span>
        </router-link>
        <button
          class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none text-blueGray-600"
          type="button"
          v-on:click="setNavbarOpen"
        >
          <i class="fas fa-bars"></i>
        </button>
      </div>

      <div
        class="lg:flex flex-grow items-center"
        :class="[navbarOpen ? 'block' : 'hidden']"
      >
        <ul class="flex flex-col lg:flex-row list-none mr-auto space-x-1">
          <li class="flex items-center">
            <router-link
              to="/admin/customers"
              class="hover:text-emerald-600 text-blueGray-700 px-3 py-2 flex items-center text-xs uppercase font-bold"
            >
              <i class="fas fa-store text-blueGray-400 mr-1.5"></i> Toko Mitra
            </router-link>
          </li>
          <li class="flex items-center">
            <router-link
              to="/admin/tier-pricing"
              class="hover:text-emerald-600 text-blueGray-700 px-3 py-2 flex items-center text-xs uppercase font-bold"
            >
              <i class="fas fa-tags text-blueGray-400 mr-1.5"></i> Tier Pricing
            </router-link>
          </li>
          <li class="flex items-center">
            <router-link
              to="/admin/sales-orders"
              class="hover:text-emerald-600 text-blueGray-700 px-3 py-2 flex items-center text-xs uppercase font-bold"
            >
              <i class="fas fa-file-invoice-dollar text-blueGray-400 mr-1.5"></i> Sales Order
            </router-link>
          </li>
        </ul>

        <ul class="flex flex-col lg:flex-row list-none lg:ml-auto items-center space-x-2">
          <li class="flex items-center">
            <router-link
              to="/auth/login"
              class="text-blueGray-700 hover:text-emerald-600 text-xs font-bold uppercase px-3 py-2"
            >
              Masuk Akun
            </router-link>
          </li>
          <li class="flex items-center">
            <router-link
              to="/admin/dashboard"
              class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase px-4 py-2.5 rounded-lg shadow hover:shadow-md transition inline-flex items-center"
            >
              <i class="fas fa-gauge mr-1.5"></i> Buka Dashboard Demo
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      navbarOpen: false,
    };
  },
  methods: {
    setNavbarOpen: function () {
      this.navbarOpen = !this.navbarOpen;
    },
  },
};
</script>
