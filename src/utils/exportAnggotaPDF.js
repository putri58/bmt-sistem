import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

// Export PDF satu anggota (lengkap + foto)
export async function exportAnggotaPDF(anggota) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const margin = 15;
  let y = margin;

  // ── HEADER ──────────────────────────────────────────────
  doc.setFillColor(30, 94, 63);
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
  doc.text("DATA ANGGOTA KOPERASI", W / 2, 24, { align: "center" });

  y = 35;

  // ── INFO KEANGGOTAAN ──────────────────────────────────────
  doc.setTextColor(30, 94, 63);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("INFORMASI KEANGGOTAAN", margin, y);
  doc.setDrawColor(30, 94, 63);
  doc.setLineWidth(0.4);
  doc.line(margin, y + 1, W - margin, y + 1);
  y += 5;

  autoTable(doc, {
    startY: y,
    head: [],
    body: [
      ["ID Anggota",    anggota.id_anggota || "-"],
      ["Status",        anggota.status_anggota || "-"],
      ["Tgl Daftar",    formatDate(anggota.tgl_daftar)],
      ["Tgl Disetujui", formatDate(anggota.tgl_disetujui)],
    ],
    theme: "plain",
    styles: { fontSize: 8.5, cellPadding: 1.5, textColor: [30, 30, 30] },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 45, textColor: [80, 80, 80] },
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

  autoTable(doc, {
    startY: y,
    head: [],
    body: [
      ["Nama Lengkap",      anggota.nama_anggota || "-"],
      ["Jenis Identitas",   anggota.jenis_identitas || "-"],
      ["No. Identitas",     anggota.no_identitas || "-"],
      ["Tempat Lahir",      anggota.tempat_lahir || "-"],
      ["Tanggal Lahir",     formatDate(anggota.tanggal_lahir)],
      ["Jenis Kelamin",     anggota.jenis_kelamin || "-"],
      ["Status Perkawinan", anggota.status_perkawinan || "-"],
      ["Kewarganegaraan",   anggota.kewarganegaraan || "-"],
      ["Nama Ibu Kandung",  anggota.nama_ibu_kandung || "-"],
    ],
    theme: "striped",
    styles: { fontSize: 8.5, cellPadding: 1.5, textColor: [30, 30, 30] },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 45, textColor: [80, 80, 80] },
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

  autoTable(doc, {
    startY: y,
    head: [],
    body: [
      ["Alamat Rumah",  anggota.alamat_rumah || "-"],
      ["Kota",          anggota.kota || "-"],
      ["Kode Pos",      anggota.kode_pos || "-"],
      ["Email",         anggota.email || "-"],
      ["No. Telp / HP", anggota.no_telp || "-"],
    ],
    theme: "striped",
    styles: { fontSize: 8.5, cellPadding: 1.5, textColor: [30, 30, 30] },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 45, textColor: [80, 80, 80] },
    },
    alternateRowStyles: { fillColor: [245, 255, 245] },
    margin: { left: margin, right: margin },
  });

  y = doc.lastAutoTable.finalY + 6;

  // ── DOKUMEN ──────────────────────────────────────────────
  if (anggota.foto_identitas || anggota.pas_foto || anggota.foto_npwp) {
    doc.setTextColor(30, 94, 63);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("DOKUMEN", margin, y);
    doc.setLineWidth(0.4);
    doc.line(margin, y + 1, W - margin, y + 1);
    y += 6;

    const [b64KTP, b64Pas, b64NPWP] = await Promise.all([
      anggota.foto_identitas ? imageUrlToBase64(anggota.foto_identitas) : null,
      anggota.pas_foto       ? imageUrlToBase64(anggota.pas_foto)       : null,
      anggota.foto_npwp      ? imageUrlToBase64(anggota.foto_npwp)      : null,
    ]);

    const fotoLabels = ["Foto KTP / SIM", "Pas Foto 3×4", "NPWP"];
    const fotoData   = [b64KTP, b64Pas, b64NPWP];
    const fotoW      = (W - margin * 2 - 8) / 3;
    const fotoH      = fotoW * 0.7;

    if (y + fotoH + 12 > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      y = margin;
    }

    fotoLabels.forEach((label, i) => {
      const x = margin + i * (fotoW + 4);
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.3);
      doc.roundedRect(x, y, fotoW, fotoH, 2, 2);

      if (fotoData[i]) {
        try {
          const format = fotoData[i].includes("data:image/png") ? "PNG" : "JPEG";
          doc.addImage(fotoData[i], format, x + 1, y + 1, fotoW - 2, fotoH - 2);
        } catch {
          doc.setFillColor(245, 245, 245);
          doc.rect(x, y, fotoW, fotoH, "F");
          doc.setTextColor(150, 150, 150);
          doc.setFontSize(7);
          doc.text("Gagal memuat foto", x + fotoW / 2, y + fotoH / 2, { align: "center" });
        }
      } else {
        doc.setFillColor(248, 248, 248);
        doc.rect(x, y, fotoW, fotoH, "F");
        doc.setTextColor(180, 180, 180);
        doc.setFontSize(7);
        doc.text("Tidak diunggah", x + fotoW / 2, y + fotoH / 2, { align: "center" });
      }

      doc.setTextColor(60, 60, 60);
      doc.setFontSize(7.5);
      doc.setFont("helvetica", "bold");
      doc.text(label, x + fotoW / 2, y + fotoH + 4, { align: "center" });
    });
  }

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
    W / 2, pageH - 7, { align: "center" }
  );

  const fileName = `${anggota.id_anggota || "Anggota"}_${(anggota.nama_anggota || "").replace(/\s+/g, "_")}.pdf`;
  doc.save(fileName);
}
