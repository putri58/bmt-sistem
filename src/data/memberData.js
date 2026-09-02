// ── DUMMY DATA ANGGOTA ──────────────────────────────────────────────

export const simpananData = {
  pokok:    500000,
  wajib:    2000000,
  sukarela: 2500000,
  get total() { return this.pokok + this.wajib + this.sukarela; },

  riwayat: [
    { id: "S-001", tanggal: "2026-09-01", jenis: "Simpanan Wajib",   nominal: 100000,  keterangan: "Setoran rutin September" },
    { id: "S-002", tanggal: "2026-08-01", jenis: "Simpanan Wajib",   nominal: 100000,  keterangan: "Setoran rutin Agustus" },
    { id: "S-003", tanggal: "2026-07-15", jenis: "Simpanan Sukarela",nominal: 500000,  keterangan: "Setoran tambahan" },
    { id: "S-004", tanggal: "2026-07-01", jenis: "Simpanan Wajib",   nominal: 100000,  keterangan: "Setoran rutin Juli" },
    { id: "S-005", tanggal: "2026-06-01", jenis: "Simpanan Wajib",   nominal: 100000,  keterangan: "Setoran rutin Juni" },
    { id: "S-006", tanggal: "2026-05-01", jenis: "Simpanan Wajib",   nominal: 100000,  keterangan: "Setoran rutin Mei" },
  ],
};

export const pinjamanData = {
  aktif: {
    id:          "PJM-00124",
    jenis:       "Pembiayaan Murabahah",
    pokok:       10000000,
    tenor:       12,
    bunga:       1.5,
    angsuranBln: 900000,
    tglMulai:    "2026-06-01",
    sudahBayar:  3,
    get sisaPinjaman() { return this.pokok - (this.angsuranBln * this.sudahBayar * 0.85); },
    get progress() { return Math.round((this.sudahBayar / this.tenor) * 100); },
    status: "Aktif",
  },
};

export const angsuranData = [
  { id: "AGS-001", ke: 1,  tanggal: "2026-07-01", nominal: 900000, status: "Lunas" },
  { id: "AGS-002", ke: 2,  tanggal: "2026-08-01", nominal: 900000, status: "Lunas" },
  { id: "AGS-003", ke: 3,  tanggal: "2026-09-01", nominal: 900000, status: "Lunas" },
  { id: "AGS-004", ke: 4,  tanggal: "2026-10-01", nominal: 900000, status: "Belum Bayar" },
  { id: "AGS-005", ke: 5,  tanggal: "2026-11-01", nominal: 900000, status: "Belum Bayar" },
  { id: "AGS-006", ke: 6,  tanggal: "2026-12-01", nominal: 900000, status: "Belum Bayar" },
  { id: "AGS-007", ke: 7,  tanggal: "2027-01-01", nominal: 900000, status: "Belum Bayar" },
  { id: "AGS-008", ke: 8,  tanggal: "2027-02-01", nominal: 900000, status: "Belum Bayar" },
  { id: "AGS-009", ke: 9,  tanggal: "2027-03-01", nominal: 900000, status: "Belum Bayar" },
  { id: "AGS-010", ke: 10, tanggal: "2027-04-01", nominal: 900000, status: "Belum Bayar" },
  { id: "AGS-011", ke: 11, tanggal: "2027-05-01", nominal: 900000, status: "Belum Bayar" },
  { id: "AGS-012", ke: 12, tanggal: "2027-06-01", nominal: 900000, status: "Belum Bayar" },
];

export const transaksiData = [
  { id: "TRX-001", tanggal: "2026-09-01", jenis: "Simpanan Wajib",      nominal: 100000,  tipe: "masuk",  keterangan: "Setoran rutin September" },
  { id: "TRX-002", tanggal: "2026-09-01", jenis: "Pembayaran Angsuran", nominal: 900000,  tipe: "keluar", keterangan: "Angsuran ke-3 PJM-00124" },
  { id: "TRX-003", tanggal: "2026-08-01", jenis: "Simpanan Wajib",      nominal: 100000,  tipe: "masuk",  keterangan: "Setoran rutin Agustus" },
  { id: "TRX-004", tanggal: "2026-08-01", jenis: "Pembayaran Angsuran", nominal: 900000,  tipe: "keluar", keterangan: "Angsuran ke-2 PJM-00124" },
  { id: "TRX-005", tanggal: "2026-07-15", jenis: "Simpanan Sukarela",   nominal: 500000,  tipe: "masuk",  keterangan: "Setoran sukarela tambahan" },
  { id: "TRX-006", tanggal: "2026-07-01", jenis: "Simpanan Wajib",      nominal: 100000,  tipe: "masuk",  keterangan: "Setoran rutin Juli" },
  { id: "TRX-007", tanggal: "2026-07-01", jenis: "Pembayaran Angsuran", nominal: 900000,  tipe: "keluar", keterangan: "Angsuran ke-1 PJM-00124" },
  { id: "TRX-008", tanggal: "2026-06-15", jenis: "Pencairan Pinjaman",  nominal: 10000000, tipe: "masuk",  keterangan: "Pencairan PJM-00124" },
  { id: "TRX-009", tanggal: "2026-06-01", jenis: "Simpanan Wajib",      nominal: 100000,  tipe: "masuk",  keterangan: "Setoran rutin Juni" },
  { id: "TRX-010", tanggal: "2026-05-01", jenis: "Simpanan Wajib",      nominal: 100000,  tipe: "masuk",  keterangan: "Setoran rutin Mei" },
];
