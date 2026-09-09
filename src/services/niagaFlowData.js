import { reactive, computed } from "vue";

export const niagaState = reactive({
  // Daftar Pelanggan / Toko
  customers: [
    {
      id: 1,
      code: "CUST-001",
      name: "Toko Sembako Berkah Jaya",
      owner: "H. Ridwan Sanusi",
      phone: "0812-3456-7890",
      address: "Jl. Pasar Induk Kramat Jati No. 45",
      city: "Jakarta Timur",
      category: "Grosir Utama",
      tier: "Tier 1",
      creditLimit: 75000000,
      usedCredit: 24500000,
      topDays: 14,
      salesmanId: 1,
      status: "Aktif",
    },
    {
      id: 2,
      code: "CUST-002",
      name: "Grosir Maju Makmur",
      owner: "Ibu Linda Wijaya",
      phone: "0813-8877-2211",
      address: "Jl. Raya Serpong KM 8 No. 12",
      city: "Tangerang Selatan",
      category: "Sub-Distributor",
      tier: "Tier 1",
      creditLimit: 100000000,
      usedCredit: 68000000,
      topDays: 30,
      salesmanId: 2,
      status: "Aktif",
    },
    {
      id: 3,
      code: "CUST-003",
      name: "Toko Murah Rezeki",
      owner: "Bpk. Hendra Gunawan",
      phone: "0817-9912-3411",
      address: "Jl. Daan Mogot Raya No. 118",
      city: "Jakarta Barat",
      category: "Semi-Grosir",
      tier: "Tier 2",
      creditLimit: 40000000,
      usedCredit: 38500000,
      topDays: 14,
      salesmanId: 1,
      status: "Overdue",
    },
    {
      id: 4,
      code: "CUST-004",
      name: "Toko Kelontong Barokah",
      owner: "Ibu Siti Rohmah",
      phone: "0856-7788-9900",
      address: "Pasar Anyar Blok B No. 7",
      city: "Bogor",
      category: "Retail / Pengecer",
      tier: "Tier 3",
      creditLimit: 15000000,
      usedCredit: 5200000,
      topDays: 7,
      salesmanId: 3,
      status: "Aktif",
    },
    {
      id: 5,
      code: "CUST-005",
      name: "Minimarket Kita Mandiri",
      owner: "Bpk. Budi Santoso",
      phone: "0811-2233-4455",
      address: "Jl. Raya Kaliabang No. 23",
      city: "Bekasi Utara",
      category: "Semi-Grosir",
      tier: "Tier 2",
      creditLimit: 50000000,
      usedCredit: 19400000,
      topDays: 21,
      salesmanId: 4,
      status: "Aktif",
    },
    {
      id: 6,
      code: "CUST-006",
      name: "Warung Madura Berkah Subur",
      owner: "Mas Farhan",
      phone: "0878-1122-3344",
      address: "Jl. Fatmawati Raya No. 89",
      city: "Jakarta Selatan",
      category: "Retail / Eceran",
      tier: "Tier 4",
      creditLimit: 5000000,
      usedCredit: 0,
      topDays: 0, // Cash on Delivery
      salesmanId: 2,
      status: "Aktif",
    },
  ],

  // Master Produk & Multi-Satuan & Tier Prices
  products: [
    {
      id: 1,
      code: "PRD-001",
      name: "Minyak Goreng Sawit Resto 2 Liter",
      category: "Sembako",
      baseUnit: "Pcs",
      packUnit: "Karton",
      packRatio: 6, // 1 karton = 6 pcs (pouch 2L)
      costPrice: 195000, // modal per karton
      tierPrices: {
        "Tier 1": 204000, // Rp 34.000/pcs
        "Tier 2": 210000, // Rp 35.000/pcs
        "Tier 3": 216000, // Rp 36.000/pcs
        "Tier 4": 225000, // Rp 37.500/pcs
      },
      minStock: 50,
      stocks: {
        "Gudang Pusat": 340,
        "Gudang Transit": 75,
        "Armada Kanvas": 24,
      },
      image: "fas fa-bottle-droplet",
    },
    {
      id: 2,
      code: "PRD-002",
      name: "Beras Premium Ramos Wangi 5 Kg",
      category: "Sembako",
      baseUnit: "Pcs",
      packUnit: "Karton",
      packRatio: 5, // 1 karung/bal = 5 pack 5kg
      costPrice: 340000, // per bal
      tierPrices: {
        "Tier 1": 355000,
        "Tier 2": 365000,
        "Tier 3": 375000,
        "Tier 4": 390000,
      },
      minStock: 40,
      stocks: {
        "Gudang Pusat": 180,
        "Gudang Transit": 45,
        "Armada Kanvas": 15,
      },
      image: "fas fa-wheat-awn",
    },
    {
      id: 3,
      code: "PRD-003",
      name: "Tepung Terigu Segitiga Biru 1 Kg",
      category: "Bahan Pokok",
      baseUnit: "Pcs",
      packUnit: "Karton",
      packRatio: 12, // 1 karton = 12 pcs
      costPrice: 128000,
      tierPrices: {
        "Tier 1": 136000,
        "Tier 2": 140000,
        "Tier 3": 145000,
        "Tier 4": 152000,
      },
      minStock: 30,
      stocks: {
        "Gudang Pusat": 210,
        "Gudang Transit": 60,
        "Armada Kanvas": 18,
      },
      image: "fas fa-bowl-rice",
    },
    {
      id: 4,
      code: "PRD-004",
      name: "Gula Pasir Kristal Putih GMP 1 Kg",
      category: "Sembako",
      baseUnit: "Pcs",
      packUnit: "Karton",
      packRatio: 20, // 1 karton = 20 pcs
      costPrice: 320000,
      tierPrices: {
        "Tier 1": 338000,
        "Tier 2": 346000,
        "Tier 3": 355000,
        "Tier 4": 370000,
      },
      minStock: 50,
      stocks: {
        "Gudang Pusat": 25, // Alert Kritis!
        "Gudang Transit": 10,
        "Armada Kanvas": 5,
      },
      image: "fas fa-cubes-stacked",
    },
    {
      id: 5,
      code: "PRD-005",
      name: "Mi Instan Goreng Spesial (Dus 40 Pcs)",
      category: "Makanan Instan",
      baseUnit: "Pcs",
      packUnit: "Dus",
      packRatio: 40,
      costPrice: 108000,
      tierPrices: {
        "Tier 1": 114000,
        "Tier 2": 118000,
        "Tier 3": 122000,
        "Tier 4": 128000,
      },
      minStock: 100,
      stocks: {
        "Gudang Pusat": 520,
        "Gudang Transit": 140,
        "Armada Kanvas": 45,
      },
      image: "fas fa-box-open",
    },
    {
      id: 6,
      code: "PRD-006",
      name: "Susu Kental Manis Putih Kaleng 370g",
      category: "Minuman",
      baseUnit: "Pcs",
      packUnit: "Karton",
      packRatio: 48,
      costPrice: 510000,
      tierPrices: {
        "Tier 1": 535000,
        "Tier 2": 550000,
        "Tier 3": 565000,
        "Tier 4": 585000,
      },
      minStock: 35,
      stocks: {
        "Gudang Pusat": 85,
        "Gudang Transit": 20,
        "Armada Kanvas": 8,
      },
      image: "fas fa-jar",
    },
    {
      id: 7,
      code: "PRD-007",
      name: "Kopi Bubuk Robusta Sachet Renteng",
      category: "Minuman",
      baseUnit: "Renceng",
      packUnit: "Karton",
      packRatio: 12, // 1 karton = 12 renceng
      costPrice: 135000,
      tierPrices: {
        "Tier 1": 142000,
        "Tier 2": 147000,
        "Tier 3": 152000,
        "Tier 4": 160000,
      },
      minStock: 40,
      stocks: {
        "Gudang Pusat": 110,
        "Gudang Transit": 32,
        "Armada Kanvas": 14,
      },
      image: "fas fa-mug-hot",
    },
    {
      id: 8,
      code: "PRD-008",
      name: "Deterjen Konsentrat 800g Dus (12 Pcs)",
      category: "Personal & Home Care",
      baseUnit: "Pcs",
      packUnit: "Dus",
      packRatio: 12,
      costPrice: 215000,
      tierPrices: {
        "Tier 1": 228000,
        "Tier 2": 236000,
        "Tier 3": 244000,
        "Tier 4": 255000,
      },
      minStock: 30,
      stocks: {
        "Gudang Pusat": 18, // Alert Kritis!
        "Gudang Transit": 8,
        "Armada Kanvas": 3,
      },
      image: "fas fa-soap",
    },
  ],

  // Aturan Tier Pricing & Volume Discount
  tierRules: [
    {
      tier: "Tier 1",
      name: "Distributor Besar / Grosir Utama",
      description: "Mitra volume besar dengan transaksi rutin minimal Rp 50 Juta/bulan",
      margin: "4.5% - 6.5%",
      minOrderUnit: "15 Karton per item",
      customerCount: 2,
    },
    {
      tier: "Tier 2",
      name: "Sub-Distributor & Agen Menengah",
      description: "Grosir pasar tradisional & agen sembako skala menengah",
      margin: "7.0% - 9.5%",
      minOrderUnit: "8 Karton per item",
      customerCount: 2,
    },
    {
      tier: "Tier 3",
      name: "Semi-Grosir & Toko Kelontong Besar",
      description: "Pengecer besar & minimarket mandiri dengan tempo 7-14 hari",
      margin: "10.0% - 12.5%",
      minOrderUnit: "3 Karton per item",
      customerCount: 1,
    },
    {
      tier: "Tier 4",
      name: "Retail & Warung Kelontong Eceran",
      description: "Warung lingkungan & pembeli eceran partai kecil dengan sistem COD",
      margin: "14.0% - 17.5%",
      minOrderUnit: "1 Karton / Bebas",
      customerCount: 1,
    },
  ],

  volumeDiscounts: [
    { minQty: 10, maxQty: 29, discountPercent: 1.5, note: "Diskon Volume Reguler" },
    { minQty: 30, maxQty: 49, discountPercent: 3.0, note: "Diskon Partai Menengah" },
    { minQty: 50, maxQty: 999, discountPercent: 5.0, note: "Diskon Partai Kontainer / Truk" },
  ],

  // Tim Salesman & Call Plan
  salesmen: [
    {
      id: 1,
      code: "SLS-01",
      name: "Agus Pratama",
      phone: "0812-9876-5432",
      role: "Senior Sales Canvaser",
      area: "Jakarta Timur & Jakarta Pusat",
      targetMonthly: 180000000,
      achievedMonthly: 154200000,
      activeStores: 28,
      commissionRate: 2.0, // %
      rating: 4.8,
      ruteHarian: {
        Senin: "Kramat Jati, Jatinegara, Matraman",
        Selasa: "Pasar Rebo, Ciracas, Cipayung",
        Rabu: "Duren Sawit, Cakung, Pulo Gadung",
        Kamis: "Cempaka Putih, Johar Baru, Senen",
        Jumat: "Tanah Abang, Gambir, Kemayoran",
        Sabtu: "Follow-up Toko Grosir Utama & Penagihan",
      },
    },
    {
      id: 2,
      code: "SLS-02",
      name: "Bambang Kurniawan",
      phone: "0813-1122-8899",
      role: "Sales Motoris & Semi-Grosir",
      area: "Jakarta Selatan & Tangsel",
      targetMonthly: 150000000,
      achievedMonthly: 142800000,
      activeStores: 34,
      commissionRate: 2.2,
      rating: 4.7,
      ruteHarian: {
        Senin: "Serpong, BSD, Pamulang",
        Selasa: "Ciputat, Bintaro, Pondok Aren",
        Rabu: "Kebayoran Lama, Pesanggrahan, Cilandak",
        Kamis: "Pasar Minggu, Jagakarsa, Pancoran",
        Jumat: "Tebet, Mampang Prapatan, Setiabudi",
        Sabtu: "Penagihan Faktur Jatuh Tempo",
      },
    },
    {
      id: 3,
      code: "SLS-03",
      name: "Dedi Suhendra",
      phone: "0857-4433-2211",
      role: "Sales Canvaser Luar Kota",
      area: "Bogor Raya & Depok",
      targetMonthly: 160000000,
      achievedMonthly: 122500000,
      activeStores: 25,
      commissionRate: 2.5,
      rating: 4.5,
      ruteHarian: {
        Senin: "Cimanggis, Sukmajaya, Cilodong Depok",
        Selasa: "Margonda, Beji, Sawangan Depok",
        Rabu: "Cibinong, Citeureup, Babakan Madang",
        Kamis: "Bogor Tengah, Pasar Anyar, Bogor Barat",
        Jumat: "Ciawi, Megamendung, Cisarua",
        Sabtu: "Rekap Pesanan Toko & Setoran Kas",
      },
    },
    {
      id: 4,
      code: "SLS-04",
      name: "Fajar Nugraha",
      phone: "0819-0099-8877",
      role: "Key Account & Industri Grosir",
      area: "Bekasi Kota & Cikarang",
      targetMonthly: 200000000,
      achievedMonthly: 191400000,
      activeStores: 22,
      commissionRate: 1.8,
      rating: 4.9,
      ruteHarian: {
        Senin: "Bekasi Barat, Kranji, Pondok Gede",
        Selasa: "Bekasi Timur, Rawa Lumbu, Mustika Jaya",
        Rabu: "Bekasi Utara, Kaliabang, Babelan",
        Kamis: "Tambun, Cibitung Industri",
        Jumat: "Cikarang Barat, Cikarang Pusat, Lemahabang",
        Sabtu: "Audit Display & Pengawasan Piutang",
      },
    },
  ],

  // Gudang & Lokasi Penyimpanan
  warehouses: [
    {
      code: "WH-01",
      name: "Gudang Pusat Cikarang",
      type: "Main Hub / DC",
      address: "Kawasan Industri MM2100 Blok B No. 4, Cikarang Barat",
      capacityUsed: 78,
      supervisor: "Rahmat Hidayat",
      phone: "021-8990-1122",
    },
    {
      code: "WH-02",
      name: "Gudang Transit Daan Mogot",
      type: "Cross-docking & Transit",
      address: "Jl. Daan Mogot KM 14 No. 8, Cengkareng, Jakarta Barat",
      capacityUsed: 62,
      supervisor: "Dani Prasetyo",
      phone: "021-5441-3344",
    },
    {
      code: "WH-03",
      name: "Armada Mobil Kanvas (Fleet)",
      type: "Mobile Stock / Kanvas",
      address: "Armada Truk Canter Box (B 9128 UXT & B 9452 TCG)",
      capacityUsed: 45,
      supervisor: "Budi Santoso",
      phone: "0812-7766-5544",
    },
  ],

  // Sales Orders (SO)
  salesOrders: [
    {
      id: 1,
      code: "SO-202609-001",
      date: "2026-09-07",
      customerId: 1,
      customerName: "Toko Sembako Berkah Jaya",
      salesmanId: 1,
      salesmanName: "Agus Pratama",
      status: "Selesai",
      paymentTerms: "TOP 14 Hari",
      items: [
        { productId: 1, productName: "Minyak Goreng Sawit Resto 2L", unit: "Karton", qty: 25, price: 204000, discount: 1.5, subtotal: 5023500 },
        { productId: 2, productName: "Beras Premium Ramos Wangi 5Kg", unit: "Karton", qty: 20, price: 355000, discount: 1.5, subtotal: 6993500 },
        { productId: 5, productName: "Mi Instan Goreng Spesial Dus", unit: "Dus", qty: 30, price: 114000, discount: 3.0, subtotal: 3317400 },
      ],
      subtotal: 15334400,
      tax: 1686784,
      grandTotal: 17021184,
      deliveryStatus: "Telah Diterima",
      invoiceNumber: "INV-202609-001",
    },
    {
      id: 2,
      code: "SO-202609-002",
      date: "2026-09-08",
      customerId: 2,
      customerName: "Grosir Maju Makmur",
      salesmanId: 2,
      salesmanName: "Bambang Kurniawan",
      status: "Diproses",
      paymentTerms: "TOP 30 Hari",
      items: [
        { productId: 1, productName: "Minyak Goreng Sawit Resto 2L", unit: "Karton", qty: 50, price: 204000, discount: 5.0, subtotal: 9690000 },
        { productId: 4, productName: "Gula Pasir Kristal Putih 1Kg", unit: "Karton", qty: 30, price: 338000, discount: 3.0, subtotal: 9835800 },
        { productId: 6, productName: "Susu Kental Manis Putih 370g", unit: "Karton", qty: 15, price: 535000, discount: 1.5, subtotal: 7904625 },
      ],
      subtotal: 27430425,
      tax: 3017347,
      grandTotal: 30447772,
      deliveryStatus: "Dalam Perjalanan",
      invoiceNumber: "INV-202609-002",
    },
    {
      id: 3,
      code: "SO-202609-003",
      date: "2026-09-08",
      customerId: 3,
      customerName: "Toko Murah Rezeki",
      salesmanId: 1,
      salesmanName: "Agus Pratama",
      status: "Disetujui",
      paymentTerms: "TOP 14 Hari",
      items: [
        { productId: 3, productName: "Tepung Terigu Segitiga Biru 1Kg", unit: "Karton", qty: 15, price: 140000, discount: 1.5, subtotal: 2068500 },
        { productId: 5, productName: "Mi Instan Goreng Spesial Dus", unit: "Dus", qty: 25, price: 118000, discount: 1.5, subtotal: 2905750 },
      ],
      subtotal: 4974250,
      tax: 547168,
      grandTotal: 5521418,
      deliveryStatus: "Siap Dikirim",
      invoiceNumber: "INV-202609-003",
    },
    {
      id: 4,
      code: "SO-202609-004",
      date: "2026-09-09",
      customerId: 5,
      customerName: "Minimarket Kita Mandiri",
      salesmanId: 4,
      salesmanName: "Fajar Nugraha",
      status: "Disetujui",
      paymentTerms: "TOP 21 Hari",
      items: [
        { productId: 2, productName: "Beras Premium Ramos Wangi 5Kg", unit: "Karton", qty: 15, price: 365000, discount: 1.5, subtotal: 5393750 },
        { productId: 7, productName: "Kopi Bubuk Robusta Sachet Renteng", unit: "Karton", qty: 10, price: 147000, discount: 1.5, subtotal: 1447950 },
        { productId: 8, productName: "Deterjen Konsentrat 800g Dus", unit: "Dus", qty: 12, price: 236000, discount: 1.5, subtotal: 2789520 },
      ],
      subtotal: 9631220,
      tax: 1059434,
      grandTotal: 10690654,
      deliveryStatus: "Menunggu Jadwal Armada",
      invoiceNumber: "INV-202609-004",
    },
    {
      id: 5,
      code: "SO-202609-005",
      date: "2026-09-09",
      customerId: 6,
      customerName: "Warung Madura Berkah Subur",
      salesmanId: 2,
      salesmanName: "Bambang Kurniawan",
      status: "Draft",
      paymentTerms: "Cash on Delivery (COD)",
      items: [
        { productId: 1, productName: "Minyak Goreng Sawit Resto 2L", unit: "Karton", qty: 4, price: 225000, discount: 0, subtotal: 900000 },
        { productId: 5, productName: "Mi Instan Goreng Spesial Dus", unit: "Dus", qty: 5, price: 128000, discount: 0, subtotal: 640000 },
      ],
      subtotal: 1540000,
      tax: 169400,
      grandTotal: 1709400,
      deliveryStatus: "Draft",
      invoiceNumber: "-",
    },
  ],

  // Delivery Orders / Surat Jalan (DO)
  deliveryOrders: [
    {
      id: 1,
      code: "DO-202609-001",
      soCode: "SO-202609-001",
      customerName: "Toko Sembako Berkah Jaya",
      destination: "Jl. Pasar Induk Kramat Jati No. 45, Jakarta Timur",
      dispatchDate: "2026-09-07 09:30",
      deliveredDate: "2026-09-07 13:45",
      driverName: "Yayan Rohiman",
      vehiclePlate: "B 9128 UXT (Colt Diesel 4 Roda)",
      totalPackages: "75 Koli / Karton",
      status: "Telah Diterima",
      recipient: "H. Ridwan Sanusi (Stempel Basah)",
      notes: "Koli barang lengkap, segel utuh.",
    },
    {
      id: 2,
      code: "DO-202609-002",
      soCode: "SO-202609-002",
      customerName: "Grosir Maju Makmur",
      destination: "Jl. Raya Serpong KM 8 No. 12, Tangerang Selatan",
      dispatchDate: "2026-09-08 08:15",
      deliveredDate: "-",
      driverName: "Surya Kencana",
      vehiclePlate: "B 9452 TCG (Fuso Box 6 Roda)",
      totalPackages: "95 Koli / Karton",
      status: "Dalam Perjalanan",
      recipient: "-",
      notes: "Rute tol Jakarta-Serpong, estimasi tiba pukul 16:00.",
    },
    {
      id: 3,
      code: "DO-202609-003",
      soCode: "SO-202609-003",
      customerName: "Toko Murah Rezeki",
      destination: "Jl. Daan Mogot Raya No. 118, Jakarta Barat",
      dispatchDate: "2026-09-09 10:00",
      deliveredDate: "-",
      driverName: "Iwan Setiawan",
      vehiclePlate: "B 9801 QZ (Blindvan GranMax)",
      totalPackages: "40 Koli / Karton",
      status: "Siap Dikirim",
      recipient: "-",
      notes: "Barang sudah di-load di staging area Gudang Daan Mogot.",
    },
  ],

  // Invoices & Faktur Penjualan
  invoices: [
    {
      id: 1,
      code: "INV-202609-001",
      soCode: "SO-202609-001",
      customerCode: "CUST-001",
      customerName: "Toko Sembako Berkah Jaya",
      issueDate: "2026-09-07",
      dueDate: "2026-09-21",
      topDays: 14,
      amount: 17021184,
      paid: 17021184,
      balance: 0,
      status: "Lunas",
      salesman: "Agus Pratama",
    },
    {
      id: 2,
      code: "INV-202609-002",
      soCode: "SO-202609-002",
      customerCode: "CUST-002",
      customerName: "Grosir Maju Makmur",
      issueDate: "2026-09-08",
      dueDate: "2026-10-08",
      topDays: 30,
      amount: 30447772,
      paid: 0,
      balance: 30447772,
      status: "Belum Lunas",
      salesman: "Bambang Kurniawan",
    },
    {
      id: 3,
      code: "INV-202609-003",
      soCode: "SO-202609-003",
      customerCode: "CUST-003",
      customerName: "Toko Murah Rezeki",
      issueDate: "2026-08-20",
      dueDate: "2026-09-03", // Sudah overdue
      topDays: 14,
      amount: 28500000,
      paid: 10000000,
      balance: 18500000,
      status: "Overdue",
      salesman: "Agus Pratama",
    },
    {
      id: 4,
      code: "INV-202609-004",
      soCode: "SO-202609-004",
      customerCode: "CUST-005",
      customerName: "Minimarket Kita Mandiri",
      issueDate: "2026-09-09",
      dueDate: "2026-09-30",
      topDays: 21,
      amount: 10690654,
      paid: 0,
      balance: 10690654,
      status: "Belum Lunas",
      salesman: "Fajar Nugraha",
    },
  ],

  // Riwayat Pembayaran Masuk
  payments: [
    {
      id: 1,
      code: "PAY-202609-001",
      date: "2026-09-08",
      customerName: "Toko Sembako Berkah Jaya",
      invoiceCode: "INV-202609-001",
      amount: 17021184,
      method: "Transfer Bank BCA",
      refNumber: "TRF-88912763",
      account: "BCA Rek. 892-001928-1 (PT NiagaFlow Makmur)",
      recordedBy: "Finance AR (Dewi)",
      status: "Terverifikasi",
    },
    {
      id: 2,
      code: "PAY-202609-002",
      date: "2026-09-06",
      customerName: "Toko Murah Rezeki",
      invoiceCode: "INV-202609-003",
      amount: 10000000,
      method: "Bilyet Giro Bank Mandiri",
      refNumber: "BG-MDR-90124",
      account: "Kliring Sukses",
      recordedBy: "Finance AR (Dewi)",
      status: "Terverifikasi",
    },
    {
      id: 3,
      code: "PAY-202609-003",
      date: "2026-09-05",
      customerName: "Minimarket Kita Mandiri",
      invoiceCode: "INV-202608-019",
      amount: 12500000,
      method: "Transfer Bank Mandiri",
      refNumber: "TRF-33410982",
      account: "Mandiri Rek. 120-00-112233-4",
      recordedBy: "Finance AR (Dewi)",
      status: "Terverifikasi",
    },
  ],

  // Mutasi Stok & Stock Opname
  stockMutations: [
    {
      id: 1,
      date: "2026-09-08 14:00",
      type: "Mutasi Keluar (Kirim)",
      productName: "Minyak Goreng Sawit Resto 2L",
      from: "Gudang Pusat Cikarang",
      to: "Toko Sembako Berkah Jaya (SO-001)",
      qty: 25,
      unit: "Karton",
      pic: "Rahmat H.",
    },
    {
      id: 2,
      date: "2026-09-08 16:30",
      type: "Transfer Antar Gudang",
      productName: "Mi Instan Goreng Spesial Dus",
      from: "Gudang Pusat Cikarang",
      to: "Gudang Transit Daan Mogot",
      qty: 80,
      unit: "Dus",
      pic: "Dani P.",
    },
    {
      id: 3,
      date: "2026-09-09 08:30",
      type: "Penerimaan Pabrik (Inbound)",
      productName: "Gula Pasir Kristal Putih 1Kg",
      from: "PT Pabrik Gula Nusantara",
      to: "Gudang Pusat Cikarang",
      qty: 150,
      unit: "Karton",
      pic: "Rahmat H.",
    },
  ],
});

// Helper format mata uang Rupiah
export function formatRupiah(number) {
  if (number === null || number === undefined) return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(number);
}

// Helper format angka standar
export function formatNumber(num) {
  if (num === null || num === undefined) return "0";
  return new Intl.NumberFormat("id-ID").format(num);
}

// Helper format tanggal Indonesia
export function formatDateIndo(dateStr) {
  if (!dateStr || dateStr === "-") return "-";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch (e) {
    return dateStr;
  }
}

// Hitung total ringkasan KPI untuk Dashboard
export const dashboardKPIs = computed(() => {
  const totalSalesMonth = niagaState.salesOrders.reduce((acc, curr) => acc + curr.grandTotal, 0);
  const totalOutstandingPiutang = niagaState.invoices.reduce((acc, curr) => acc + curr.balance, 0);
  const overdueInvoices = niagaState.invoices.filter((inv) => inv.status === "Overdue");
  const lowStockProducts = niagaState.products.filter((p) => {
    const totalCurrentStock = Object.values(p.stocks).reduce((sum, val) => sum + val, 0);
    return totalCurrentStock <= p.minStock;
  });
  const pendingDeliveries = niagaState.deliveryOrders.filter((d) => d.status !== "Telah Diterima");

  return {
    totalSalesMonth,
    totalOutstandingPiutang,
    overdueCount: overdueInvoices.length,
    lowStockCount: lowStockProducts.length,
    pendingDeliveriesCount: pendingDeliveries.length,
    activeCustomersCount: niagaState.customers.length,
    activeSalesOrdersCount: niagaState.salesOrders.length,
  };
});

// Aksi Tambah Sales Order Baru
export function createSalesOrder(orderPayload) {
  const newId = niagaState.salesOrders.length + 1;
  const newCode = `SO-202609-${String(newId).padStart(3, "0")}`;
  
  const newOrder = {
    id: newId,
    code: newCode,
    date: new Date().toISOString().split("T")[0],
    customerId: orderPayload.customerId,
    customerName: orderPayload.customerName,
    salesmanId: orderPayload.salesmanId,
    salesmanName: orderPayload.salesmanName,
    status: "Disetujui",
    paymentTerms: orderPayload.paymentTerms || "TOP 14 Hari",
    items: orderPayload.items,
    subtotal: orderPayload.subtotal,
    tax: orderPayload.tax,
    grandTotal: orderPayload.grandTotal,
    deliveryStatus: "Siap Dikirim",
    invoiceNumber: `INV-202609-${String(newId).padStart(3, "0")}`,
  };

  niagaState.salesOrders.unshift(newOrder);

  // Otomatis kurangi stok gudang pusat untuk tiap item
  orderPayload.items.forEach((item) => {
    const prod = niagaState.products.find((p) => p.id === item.productId);
    if (prod && prod.stocks["Gudang Pusat"] >= item.qty) {
      prod.stocks["Gudang Pusat"] -= item.qty;
    }
  });

  // Otomatis buat Faktur / Invoice
  const newInvoice = {
    id: niagaState.invoices.length + 1,
    code: newOrder.invoiceNumber,
    soCode: newCode,
    customerCode: `CUST-${String(orderPayload.customerId).padStart(3, "0")}`,
    customerName: orderPayload.customerName,
    issueDate: newOrder.date,
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    topDays: 14,
    amount: newOrder.grandTotal,
    paid: 0,
    balance: newOrder.grandTotal,
    status: "Belum Lunas",
    salesman: orderPayload.salesmanName,
  };
  niagaState.invoices.unshift(newInvoice);

  // Update limit pemakaian kredit customer
  const cust = niagaState.customers.find((c) => c.id === orderPayload.customerId);
  if (cust) {
    cust.usedCredit += newOrder.grandTotal;
  }

  return newOrder;
}

// Aksi Catat Pembayaran Piutang
export function recordPayment(payPayload) {
  const newPayId = niagaState.payments.length + 1;
  const payCode = `PAY-202609-${String(newPayId).padStart(3, "0")}`;

  const paymentRecord = {
    id: newPayId,
    code: payCode,
    date: new Date().toISOString().split("T")[0],
    customerName: payPayload.customerName,
    invoiceCode: payPayload.invoiceCode,
    amount: Number(payPayload.amount),
    method: payPayload.method,
    refNumber: payPayload.refNumber || `REF-${Math.floor(100000 + Math.random() * 900000)}`,
    account: payPayload.account || "BCA Rek. PT NiagaFlow Makmur",
    recordedBy: "Finance AR (Dewi)",
    status: "Terverifikasi",
  };

  niagaState.payments.unshift(paymentRecord);

  // Alokasi pelunasan pada invoice
  const inv = niagaState.invoices.find((i) => i.code === payPayload.invoiceCode);
  if (inv) {
    inv.paid += paymentRecord.amount;
    inv.balance = Math.max(0, inv.amount - inv.paid);
    if (inv.balance === 0) {
      inv.status = "Lunas";
    } else {
      inv.status = "Belum Lunas";
    }
  }

  // Kurangi usedCredit pada toko
  const cust = niagaState.customers.find((c) => c.name === payPayload.customerName);
  if (cust) {
    cust.usedCredit = Math.max(0, cust.usedCredit - paymentRecord.amount);
    if (cust.usedCredit < cust.creditLimit && cust.status === "Overdue") {
      cust.status = "Aktif";
    }
  }

  return paymentRecord;
}

// Aksi Tambah Toko Baru
export function addCustomer(custPayload) {
  const newId = niagaState.customers.length + 1;
  const newCust = {
    id: newId,
    code: `CUST-${String(newId).padStart(3, "0")}`,
    name: custPayload.name,
    owner: custPayload.owner,
    phone: custPayload.phone,
    address: custPayload.address,
    city: custPayload.city || "Jakarta",
    category: custPayload.category || "Grosir",
    tier: custPayload.tier || "Tier 2",
    creditLimit: Number(custPayload.creditLimit || 20000000),
    usedCredit: 0,
    topDays: Number(custPayload.topDays || 14),
    salesmanId: Number(custPayload.salesmanId || 1),
    status: "Aktif",
  };
  niagaState.customers.push(newCust);
  return newCust;
}

// Aksi Tambah Surat Jalan Pengiriman
export function createDeliveryOrder(doPayload) {
  const newId = niagaState.deliveryOrders.length + 1;
  const newDO = {
    id: newId,
    code: `DO-202609-${String(newId).padStart(3, "0")}`,
    soCode: doPayload.soCode,
    customerName: doPayload.customerName,
    destination: doPayload.destination,
    dispatchDate: new Date().toLocaleString("id-ID"),
    deliveredDate: "-",
    driverName: doPayload.driverName,
    vehiclePlate: doPayload.vehiclePlate,
    totalPackages: doPayload.totalPackages || "30 Koli",
    status: "Dalam Perjalanan",
    recipient: "-",
    notes: doPayload.notes || "Pengiriman reguler armada kanvas",
  };
  niagaState.deliveryOrders.unshift(newDO);
  return newDO;
}
