import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";

// styles
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";

// mounting point for the whole app
import App from "@/App.vue";

// layouts
import Admin from "@/layouts/Admin.vue";
import Auth from "@/layouts/Auth.vue";

// views for Admin layout (NiagaFlow Modules)
import Dashboard from "@/views/admin/Dashboard.vue";
import Customers from "@/views/admin/Customers.vue";
import TierPricing from "@/views/admin/TierPricing.vue";
import Salesmen from "@/views/admin/Salesmen.vue";
import Inventory from "@/views/admin/Inventory.vue";
import SalesOrders from "@/views/admin/SalesOrders.vue";
import Delivery from "@/views/admin/Delivery.vue";
import Invoices from "@/views/admin/Invoices.vue";
import Payments from "@/views/admin/Payments.vue";
import Reports from "@/views/admin/Reports.vue";

import Settings from "@/views/admin/Settings.vue";
import Tables from "@/views/admin/Tables.vue";
import Maps from "@/views/admin/Maps.vue";

// views for Auth layout
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

// views without layouts
import Landing from "@/views/Landing.vue";
import Profile from "@/views/Profile.vue";
import Index from "@/views/Index.vue";

// routes
const routes = [
  {
    path: "/admin",
    redirect: "/admin/dashboard",
    component: Admin,
    children: [
      {
        path: "/admin/dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "/admin/customers",
        name: "Customers",
        component: Customers,
      },
      {
        path: "/admin/tier-pricing",
        name: "TierPricing",
        component: TierPricing,
      },
      {
        path: "/admin/salesmen",
        name: "Salesmen",
        component: Salesmen,
      },
      {
        path: "/admin/inventory",
        name: "Inventory",
        component: Inventory,
      },
      {
        path: "/admin/sales-orders",
        name: "SalesOrders",
        component: SalesOrders,
      },
      {
        path: "/admin/delivery",
        name: "Delivery",
        component: Delivery,
      },
      {
        path: "/admin/invoices",
        name: "Invoices",
        component: Invoices,
      },
      {
        path: "/admin/payments",
        name: "Payments",
        component: Payments,
      },
      {
        path: "/admin/reports",
        name: "Reports",
        component: Reports,
      },
      {
        path: "/admin/settings",
        component: Settings,
      },
      {
        path: "/admin/tables",
        component: Tables,
      },
      {
        path: "/admin/maps",
        component: Maps,
      },
    ],
  },
  {
    path: "/auth",
    redirect: "/auth/login",
    component: Auth,
    children: [
      {
        path: "/auth/login",
        component: Login,
      },
      {
        path: "/auth/register",
        component: Register,
      },
    ],
  },
  {
    path: "/landing",
    component: Landing,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/",
    component: Index,
  },
  { path: "/:pathMatch(.*)*", redirect: "/admin/dashboard" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
