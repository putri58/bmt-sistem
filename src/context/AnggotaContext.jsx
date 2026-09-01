import { createContext, useContext, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   SEED DATA — anggota yang sudah aktif (tidak perlu disetujui)
───────────────────────────────────────────────────────────── */
const seedAnggota = [
  {
    id: "AGT-001",
    namaAnggota: "Sari Wulandari",
    noIdentitas: "3201234567890001",
    jenisIdentitas: "KTP",
    tempatLahir: "Bandung",
    tanggalLahir: "1990-05-12",
    kewarganegaraan: "WNI",
    status: "Menikah",
    jenisKelamin: "Wanita",
    namaIbuKandung: "Dewi Lestari",
    alamatRumah: "Jl. Mawar No. 12, Bandung",
    kota: "Bandung",
    kodePos: "40111",
    email: "sari@email.com",
    noTelp: "081234567890",
    simpanan: 4500000,
    statusAnggota: "Aktif",
    tglDaftar: "2024-01-10",
    tglDisetujui: "2024-01-12",
  },
  {
    id: "AGT-002",
    namaAnggota: "Dedi Kurniawan",
    noIdentitas: "3201234567890002",
    jenisIdentitas: "KTP",
    tempatLahir: "Jakarta",
    tanggalLahir: "1988-08-20",
    kewarganegaraan: "WNI",
    status: "Menikah",
    jenisKelamin: "Pria",
    namaIbuKandung: "Sri Wahyuni",
    alamatRumah: "Jl. Melati No. 5, Bandung",
    kota: "Bandung",
    kodePos: "40112",
    email: "dedi@email.com",
    noTelp: "082345678901",
    simpanan: 2800000,
    statusAnggota: "Aktif",
    tglDaftar: "2024-02-05",
    tglDisetujui: "2024-02-07",
  },
  {
    id: "AGT-003",
    namaAnggota: "Rina Melati",
    noIdentitas: "3201234567890003",
    jenisIdentitas: "KTP",
    tempatLahir: "Cimahi",
    tanggalLahir: "1992-03-15",
    kewarganegaraan: "WNI",
    status: "Lajang",
    jenisKelamin: "Wanita",
    namaIbuKandung: "Ratna Sari",
    alamatRumah: "Jl. Anggrek No. 8, Cimahi",
    kota: "Cimahi",
    kodePos: "40513",
    email: "rina@email.com",
    noTelp: "083456789012",
    simpanan: 6200000,
    statusAnggota: "Aktif",
    tglDaftar: "2024-03-01",
    tglDisetujui: "2024-03-03",
  },
  {
    id: "AGT-004",
    namaAnggota: "Budi Santoso",
    noIdentitas: "3201234567890004",
    jenisIdentitas: "KTP",
    tempatLahir: "Bandung",
    tanggalLahir: "1985-11-30",
    kewarganegaraan: "WNI",
    status: "Menikah",
    jenisKelamin: "Pria",
    namaIbuKandung: "Siti Aminah",
    alamatRumah: "Jl. Kenanga No. 3, Bandung",
    kota: "Bandung",
    kodePos: "40114",
    email: "budi@email.com",
    noTelp: "084567890123",
    simpanan: 1500000,
    statusAnggota: "Tidak Aktif",
    tglDaftar: "2024-04-10",
    tglDisetujui: "2024-04-12",
  },
  {
    id: "AGT-005",
    namaAnggota: "Ahmad Fauzi",
    noIdentitas: "3201234567890005",
    jenisIdentitas: "KTP",
    tempatLahir: "Cimahi",
    tanggalLahir: "1993-07-22",
    kewarganegaraan: "WNI",
    status: "Menikah",
    jenisKelamin: "Pria",
    namaIbuKandung: "Hj. Nurhalimah",
    alamatRumah: "Jl. Dahlia No. 7, Cimahi",
    kota: "Cimahi",
    kodePos: "40515",
    email: "ahmad@email.com",
    noTelp: "085678901234",
    simpanan: 3200000,
    statusAnggota: "Aktif",
    tglDaftar: "2024-05-20",
    tglDisetujui: "2024-05-22",
  },
  {
    id: "AGT-006",
    namaAnggota: "Fitriani",
    noIdentitas: "3201234567890006",
    jenisIdentitas: "KTP",
    tempatLahir: "Bandung",
    tanggalLahir: "1997-01-08",
    kewarganegaraan: "WNI",
    status: "Lajang",
    jenisKelamin: "Wanita",
    namaIbuKandung: "Yanti Kusuma",
    alamatRumah: "Jl. Tulip No. 2, Bandung",
    kota: "Bandung",
    kodePos: "40116",
    email: "fitri@email.com",
    noTelp: "086789012345",
    simpanan: 800000,
    statusAnggota: "Aktif",
    tglDaftar: "2024-06-15",
    tglDisetujui: "2024-06-17",
  },
  {
    id: "AGT-007",
    namaAnggota: "Hendra Gunawan",
    noIdentitas: "3201234567890007",
    jenisIdentitas: "KTP",
    tempatLahir: "Cimahi",
    tanggalLahir: "1986-09-14",
    kewarganegaraan: "WNI",
    status: "Menikah",
    jenisKelamin: "Pria",
    namaIbuKandung: "Ema Rosmala",
    alamatRumah: "Jl. Flamboyan No. 15, Cimahi",
    kota: "Cimahi",
    kodePos: "40517",
    email: "hendra@email.com",
    noTelp: "087890123456",
    simpanan: 5100000,
    statusAnggota: "Aktif",
    tglDaftar: "2024-07-01",
    tglDisetujui: "2024-07-03",
  },
];

/* ─────────────────────────────────────────────────────────────
   SEED PENDAFTAR — contoh antrian yang belum diproses
───────────────────────────────────────────────────────────── */
const seedPendaftar = [
  {
    pendaftarId: "PD-001",
    namaAnggota: "Rizky Ramadhan",
    noIdentitas: "3578012345670001",
    jenisIdentitas: "KTP",
    tempatLahir: "Surabaya",
    tanggalLahir: "1995-04-18",
    kewarganegaraan: "WNI",
    status: "Lajang",
    jenisKelamin: "Pria",
    namaIbuKandung: "Susi Handayani",
    alamatRumah: "Jl. Kenari No. 9, Bandung",
    kota: "Bandung",
    kodePos: "40121",
    email: "rizky@email.com",
    noTelp: "081298765432",
    tglDaftar: "2026-08-30",
    statusPendaftaran: "Menunggu",
  },
  {
    pendaftarId: "PD-002",
    namaAnggota: "Nadia Permata",
    noIdentitas: "3201987654320002",
    jenisIdentitas: "KTP",
    tempatLahir: "Bogor",
    tanggalLahir: "1998-12-05",
    kewarganegaraan: "WNI",
    status: "Lajang",
    jenisKelamin: "Wanita",
    namaIbuKandung: "Linda Sanjaya",
    alamatRumah: "Jl. Pahlawan No. 3, Cimahi",
    kota: "Cimahi",
    kodePos: "40522",
    email: "nadia@email.com",
    noTelp: "082198765431",
    tglDaftar: "2026-09-01",
    statusPendaftaran: "Menunggu",
  },
];

/* ─────────────────────────────────────────────────────────────
   CONTEXT
───────────────────────────────────────────────────────────── */
const AnggotaContext = createContext(null);

export function AnggotaProvider({ children }) {
  // Daftar anggota yang sudah disetujui (ditampilkan di halaman Anggota)
  const [anggotaList, setAnggotaList] = useState(seedAnggota);

  // Antrian pendaftar yang menunggu keputusan admin
  const [pendaftarList, setPendaftarList] = useState(seedPendaftar);

  /* Tambah pendaftar baru dari form guest */
  function tambahPendaftar(formData) {
    const newId = `PD-${String(pendaftarList.length + 1).padStart(3, "0")}`;
    const entry = {
      ...formData,
      pendaftarId: newId,
      tglDaftar: new Date().toISOString().split("T")[0],
      statusPendaftaran: "Menunggu",
    };
    setPendaftarList((prev) => [entry, ...prev]);
  }

  /* Admin menyetujui pendaftar → pindah ke anggotaList */
  function setujuiPendaftar(pendaftarId) {
    const pendaftar = pendaftarList.find((p) => p.pendaftarId === pendaftarId);
    if (!pendaftar) return;

    // Buat record anggota baru
    const newAgtId = `AGT-${String(anggotaList.length + 1).padStart(3, "0")}`;
    const newAnggota = {
      id: newAgtId,
      namaAnggota:    pendaftar.namaAnggota,
      noIdentitas:    pendaftar.noIdentitas,
      jenisIdentitas: pendaftar.jenisIdentitas,
      tempatLahir:    pendaftar.tempatLahir,
      tanggalLahir:   pendaftar.tanggalLahir,
      kewarganegaraan: pendaftar.kewarganegaraan,
      status:         pendaftar.status,
      jenisKelamin:   pendaftar.jenisKelamin,
      namaIbuKandung: pendaftar.namaIbuKandung,
      alamatRumah:    pendaftar.alamatRumah,
      kota:           pendaftar.kota,
      kodePos:        pendaftar.kodePos,
      email:          pendaftar.email,
      noTelp:         pendaftar.noTelp,
      simpanan:       0,
      statusAnggota:  "Aktif",
      tglDaftar:      pendaftar.tglDaftar,
      tglDisetujui:   new Date().toISOString().split("T")[0],
    };

    setAnggotaList((prev) => [...prev, newAnggota]);
    setPendaftarList((prev) =>
      prev.map((p) =>
        p.pendaftarId === pendaftarId
          ? { ...p, statusPendaftaran: "Disetujui", idAnggota: newAgtId }
          : p
      )
    );
  }

  /* Admin menolak pendaftar */
  function tolakPendaftar(pendaftarId, alasan = "") {
    setPendaftarList((prev) =>
      prev.map((p) =>
        p.pendaftarId === pendaftarId
          ? { ...p, statusPendaftaran: "Ditolak", alasanTolak: alasan }
          : p
      )
    );
  }

  /* Update data anggota (dari halaman Anggota) */
  function updateAnggota(id, updatedData) {
    setAnggotaList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updatedData } : a))
    );
  }

  /* Hapus anggota */
  function hapusAnggota(id) {
    setAnggotaList((prev) => prev.filter((a) => a.id !== id));
  }

  /* Jumlah pendaftar yang masih menunggu (untuk badge sidebar) */
  const jumlahMenunggu = pendaftarList.filter(
    (p) => p.statusPendaftaran === "Menunggu"
  ).length;

  return (
    <AnggotaContext.Provider
      value={{
        anggotaList,
        pendaftarList,
        jumlahMenunggu,
        tambahPendaftar,
        setujuiPendaftar,
        tolakPendaftar,
        updateAnggota,
        hapusAnggota,
      }}
    >
      {children}
    </AnggotaContext.Provider>
  );
}

export function useAnggota() {
  const ctx = useContext(AnggotaContext);
  if (!ctx) throw new Error("useAnggota harus dipakai di dalam AnggotaProvider");
  return ctx;
}
