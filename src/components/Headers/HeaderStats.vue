<template>
  <!-- Header Stats -->
  <div class="relative bg-emerald-600 md:pt-32 pb-32 pt-12">
    <div class="px-4 md:px-10 mx-auto w-full">
      <div>
        <!-- Card stats -->
        <div class="flex flex-wrap">
          <!-- KPI 1: Total Omzet Bulan Ini -->
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="OMZET BULAN INI"
              :statTitle="formattedSales"
              statArrow="up"
              statPercent="14.8"
              statPercentColor="text-emerald-500"
              statDescripiron="vs bulan lalu"
              statIconName="fas fa-file-invoice-dollar"
              statIconColor="bg-emerald-500"
            />
          </div>

          <!-- KPI 2: Total Piutang Toko -->
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="PIUTANG BERJALAN (AR)"
              :statTitle="formattedAR"
              statArrow="down"
              statPercent="3.2"
              statPercentColor="text-red-500"
              :statDescripiron="kpis.overdueCount + ' invoice jatuh tempo'"
              statIconName="fas fa-hand-holding-dollar"
              statIconColor="bg-orange-500"
            />
          </div>

          <!-- KPI 3: Pesanan Aktif (SO) -->
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="SALES ORDER BULAN INI"
              :statTitle="kpis.activeSalesOrdersCount + ' Pesanan'"
              statArrow="up"
              statPercent="8.5"
              statPercentColor="text-emerald-500"
              :statDescripiron="kpis.pendingDeliveriesCount + ' dalam pengiriman'"
              statIconName="fas fa-truck-ramp-box"
              statIconColor="bg-indigo-500"
            />
          </div>

          <!-- KPI 4: Stok Kritis / Reorder Alert -->
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="PERINGATAN STOK GUDANG"
              :statTitle="kpis.lowStockCount + ' SKU Kritis'"
              statArrow="down"
              statPercent="2"
              statPercentColor="text-red-500"
              statDescripiron="Perlu reorder pabrik"
              statIconName="fas fa-triangle-exclamation"
              statIconColor="bg-red-500"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardStats from "@/components/Cards/CardStats.vue";
import { dashboardKPIs, formatRupiah } from "@/services/niagaFlowData.js";

export default {
  components: {
    CardStats,
  },
  computed: {
    kpis() {
      return dashboardKPIs.value;
    },
    formattedSales() {
      return formatRupiah(this.kpis.totalSalesMonth);
    },
    formattedAR() {
      return formatRupiah(this.kpis.totalOutstandingPiutang);
    },
  },
};
</script>
