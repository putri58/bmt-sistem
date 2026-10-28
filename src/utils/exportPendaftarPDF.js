import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Konversi URL gambar ke base64
async function imageUrlToBase64(url) {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

function formatDate(d) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric",
  });
}

const KANTOR_LABEL = {
  pusat:   "Kantor Pusat",
  rumbai:  "Cabang Rumbai",
  panam:   "Cabang Panam",
  duri:    "Cabang Duri",
  cibubur: "Cabang Cibubur",
};

export async function exportPendaftarPDF(pendaftar) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const margin = 15;
  let y = margin;

  // ── HEADER ──────────────────────────────────────────────
  doc.setFillColor(30, 94, 63); // hijau BMT
  doc.rect(0, 0, W, 28, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("KSPPS BMT AL-ITTIHAD", W / 2, 11, { align: "center" });

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Koperasi Simpan Pinjam & Pembiayaan Syariah", W / 2, 17, { align: "center" });

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("FORMULIR DATA PENDAFTAR ANGGOTA", W / 2, 24, { align: "center" });

  y = 35;

  // ── INFO PENDAFTARAN ──────────────────────────────────────
  doc.setTextColor(30, 94, 63);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("INFORMASI PENDAFTARAN", margin, y);

  doc.setDrawColor(30, 94, 63);
  doc.setLineWidth(0.4);
  doc.line(margin, y + 1, W - margin, y + 1);
  y += 5;

  const infoData = [
    ["ID Pendaftaran", pendaftar.pendaftar_id || "-"],
    ["Kantor Tujuan",  KANTOR_LABEL[pendaftar.kantor_tujuan] || pendaftar.kantor_tujuan || "-"],
    ["Tanggal Daftar", formatDate(pendaftar.tgl_daftar)],
    ["Status",         pendaftar.status_pendaftaran || "-"],
  ];

  if (pendaftar.status_pendaftaran === "Ditolak" && pendaftar.alasan_tolak) {
    infoData.push(["Alasan Tolak", pendaftar.alasan_tolak]);
  }
  if (pendaftar.status_pendaftaran === "Disetujui" && pendaftar.id_anggota) {
    infoData.push(["ID Anggota", pendaftar.id_anggota]);
  }

  autoTable(doc, {
    startY: y,
    head: [],
    body: infoData,
    theme: "plain",
    styles: { fontSize: 8.5, cellPadding: 1.5, textColor: [30, 30, 30] },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 45, textColor: [80, 80, 80] },
      1: { cellWidth: "auto" },
    },
    margin: { left: margin, right: margin },
  });

  y = doc.lastAutoTable.finalY + 6;

  // ── DATA DIRI ──────────────────────────────────────────
  doc.setTextColor(30, 94, 63);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("DATA DIRI", margin, y);
  doc.setLineWidth(0.4);
  doc.line(margin, y + 1, W - margin, y + 1);
  y += 5;

  const dataDiri = [
    ["Nama Lengkap",     pendaftar.nama_anggota || "-"],
    ["Jenis Identitas",  pendaftar.jenis_identitas || "-"],
    ["No. Identitas",    pendaftar.no_identitas || "-"],
    ["Tempat Lahir",     pendaftar.tempat_lahir || "-"],
    ["Tanggal Lahir",    formatDate(pendaftar.tanggal_lahir)],
    ["Jenis Kelamin",    pendaftar.jenis_kelamin || "-"],
    ["Status Perkawinan",pendaftar.status_perkawinan || "-"],
    ["Kewarganegaraan",  pendaftar.kewarganegaraan || "-"],
    ["Nama Ibu Kandung", pendaftar.nama_ibu_kandung || "-"],
  ];

  autoTable(doc, {
    startY: y,
    head: [],
    body: dataDiri,
    theme: "striped",
    styles: { fontSize: 8.5, cellPadding: 1.5, textColor: [30, 30, 30] },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 45, textColor: [80, 80, 80] },
      1: { cellWidth: "auto" },
    },
    alternateRowStyles: { fillColor: [245, 255, 245] },
    margin: { left: margin, right: margin },
  });

  y = doc.lastAutoTable.finalY + 6;

  // ── ALAMAT & KONTAK ──────────────────────────────────────
  doc.setTextColor(30, 94, 63);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("ALAMAT & KONTAK", margin, y);
  doc.setLineWidth(0.4);
  doc.line(margin, y + 1, W - margin, y + 1);
  y += 5;

  const dataAlamat = [
    ["Alamat Rumah", pendaftar.alamat_rumah || "-"],
    ["Kota",         pendaftar.kota || "-"],
    ["Kode Pos",     pendaftar.kode_pos || "-"],
    ["Email",        pendaftar.email || "-"],
    ["No. Telp / HP",pendaftar.no_telp || "-"],
  ];

  autoTable(doc, {
    startY: y,
    head: [],
    body: dataAlamat,
    theme: "striped",
    styles: { fontSize: 8.5, cellPadding: 1.5, textColor: [30, 30, 30] },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 45, textColor: [80, 80, 80] },
      1: { cellWidth: "auto" },
    },
    alternateRowStyles: { fillColor: [245, 255, 245] },
    margin: { left: margin, right: margin },
  });

  y = doc.lastAutoTable.finalY + 6;

  // ── DOKUMEN ──────────────────────────────────────────────
  doc.setTextColor(30, 94, 63);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("DOKUMEN YANG DIUNGGAH", margin, y);
  doc.setLineWidth(0.4);
  doc.line(margin, y + 1, W - margin, y + 1);
  y += 6;

  // Fetch semua foto sekaligus
  const [b64KTP, b64Pas, b64NPWP] = await Promise.all([
    pendaftar.foto_identitas ? imageUrlToBase64(pendaftar.foto_identitas) : null,
    pendaftar.pas_foto       ? imageUrlToBase64(pendaftar.pas_foto)       : null,
    pendaftar.foto_npwp      ? imageUrlToBase64(pendaftar.foto_npwp)      : null,
  ]);

  const fotoLabels = ["Foto KTP / SIM", "Pas Foto 3×4", "NPWP"];
  const fotoData   = [b64KTP, b64Pas, b64NPWP];
  const fotoW      = (W - margin * 2 - 8) / 3; // lebar tiap foto
  const fotoH      = fotoW * 0.7;               // tinggi proporsional

  // Cek apakah masih cukup di halaman ini
  if (y + fotoH + 12 > doc.internal.pageSize.getHeight() - margin) {
    doc.addPage();
    y = margin;
  }

  fotoLabels.forEach((label, i) => {
    const x = margin + i * (fotoW + 4);

    // Border kotak foto
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.roundedRect(x, y, fotoW, fotoH, 2, 2);

    if (fotoData[i]) {
      try {
        // Deteksi format gambar
        const format = fotoData[i].includes("data:image/png") ? "PNG" : "JPEG";
        doc.addImage(fotoData[i], format, x + 1, y + 1, fotoW - 2, fotoH - 2);
      } catch {
        // Kalau gagal render foto, tampilkan placeholder
        doc.setFillColor(245, 245, 245);
        doc.rect(x, y, fotoW, fotoH, "F");
        doc.setTextColor(150, 150, 150);
        doc.setFontSize(7);
        doc.text("Gagal memuat foto", x + fotoW / 2, y + fotoH / 2, { align: "center" });
      }
    } else {
      // Placeholder kalau tidak ada foto
      doc.setFillColor(248, 248, 248);
      doc.rect(x, y, fotoW, fotoH, "F");
      doc.setTextColor(180, 180, 180);
      doc.setFontSize(7);
      doc.text("Tidak diunggah", x + fotoW / 2, y + fotoH / 2, { align: "center" });
    }

    // Label di bawah foto
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "bold");
    doc.text(label, x + fotoW / 2, y + fotoH + 4, { align: "center" });
  });

  y += fotoH + 12;

  // ── FOOTER ───────────────────────────────────────────────
  const pageH = doc.internal.pageSize.getHeight();
  doc.setDrawColor(30, 94, 63);
  doc.setLineWidth(0.3);
  doc.line(margin, pageH - 12, W - margin, pageH - 12);

  doc.setTextColor(120, 120, 120);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.text(
    `Dicetak pada ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })} · KSPPS BMT AL-ITTIHAD`,
    W / 2,
    pageH - 7,
    { align: "center" }
  );

  // ── SIMPAN ───────────────────────────────────────────────
  const fileName = `${pendaftar.pendaftar_id || "Pendaftar"}_${(pendaftar.nama_anggota || "").replace(/\s+/g, "_")}.pdf`;
  doc.save(fileName);
}
