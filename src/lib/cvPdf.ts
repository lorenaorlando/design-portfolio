import { EMAIL, LINKEDIN_URL, TOOLS } from '../content/copy';
import { Copy } from '../content/copy';
import { CvItem } from '../data/cvData';

const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 18;
const COL = 62; // x where the positions column starts
const INK: [number, number, number] = [32, 32, 32];
const MUTED: [number, number, number] = [125, 125, 120];
const ACCENT: [number, number, number] = [47, 91, 234];

/** Builds the CV as a text PDF and triggers the download. */
export async function downloadCvPdf(cv: CvItem[], t: Copy) {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  let y = MARGIN;

  const ensure = (needed: number) => {
    if (y + needed > PAGE_H - MARGIN) {
      doc.addPage();
      y = MARGIN;
    }
  };
  const label = (text: string) => {
    ensure(14);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...ACCENT);
    doc.text(text.toUpperCase(), MARGIN, y, { charSpace: 0.6 });
    y += 3;
    doc.setDrawColor(225, 225, 220);
    doc.line(MARGIN, y, PAGE_W - MARGIN, y);
    y += 7;
  };

  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(...INK);
  doc.text('Lorena Orlando', MARGIN, y + 6);
  y += 14;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(...MUTED);
  doc.text(t.cv.role, MARGIN, y);
  y += 6;
  doc.setFontSize(9);
  doc.text(`${EMAIL}   ·   ${LINKEDIN_URL.replace('https://www.', '')}   ·   lorenaorlando.click`, MARGIN, y);
  y += 12;

  // Summary
  doc.setFontSize(10.5);
  doc.setTextColor(...INK);
  const summary = doc.splitTextToSize(t.cv.summary, PAGE_W - MARGIN * 2);
  doc.text(summary, MARGIN, y, { lineHeightFactor: 1.5 });
  y += summary.length * 5.6 + 8;

  // Experience
  label(t.cv.experience);
  for (const item of cv) {
    const blockHeight = item.positions.reduce((h, p) => h + 10 + (p.bullets?.length ?? 0) * 5, 0);
    ensure(Math.min(blockHeight, 40));
    const top = y;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11.5);
    doc.setTextColor(...INK);
    doc.text(doc.splitTextToSize(item.company, COL - MARGIN - 4), MARGIN, y);

    for (const pos of item.positions) {
      ensure(12);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(...INK);
      doc.text(pos.role, COL, y);
      y += 4.6;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...MUTED);
      doc.text(pos.period, COL, y);
      y += 5;
      doc.setTextColor(80, 80, 78);
      for (const bullet of pos.bullets ?? []) {
        const lines = doc.splitTextToSize(bullet, PAGE_W - MARGIN - COL - 4);
        ensure(lines.length * 4.4);
        doc.text('•', COL, y);
        doc.text(lines, COL + 4, y, { lineHeightFactor: 1.4 });
        y += lines.length * 4.4 + 0.6;
      }
      y += 2.5;
    }
    y = Math.max(y, top + 8) + 3;
  }

  // Tools
  y += 2;
  label(t.cv.tools);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...INK);
  doc.text(TOOLS.join('   ·   '), MARGIN, y);

  doc.save('Lorena-Orlando-CV.pdf');
}
