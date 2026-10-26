import type { jsPDF as JsPDF } from 'jspdf';
import { Copy, CV_PHOTO, EMAIL, LINKEDIN_URL, TOOLS } from '../content/copy';
import { CvItem } from '../data/cvData';
import { PERSONAL_PROJECTS } from '../data/personalProjects';
import { Language } from '../types';

type RGB = [number, number, number];

const PAGE_W = 210;
const PAGE_H = 297;
const M = 18; // page margin
const COL = 64; // x where the positions column starts
const FOOTER = 14; // space reserved for the footer

const MORADO: RGB = [54, 1, 133];
const VIOLETA: RGB = [143, 1, 119];
const MAGENTA: RGB = [222, 26, 88];
const INK: RGB = [30, 14, 53];
const INK_2: RGB = [75, 61, 92];
const MUTED: RGB = [140, 127, 148];
const LINE: RGB = [232, 228, 236];
const DOT: RGB = [226, 224, 230];

const FONTS = [
  ['DMSans-Regular.ttf', 'DMSans', 'normal'],
  ['DMSans-SemiBold.ttf', 'DMSans', 'bold'],
  ['Bricolage-Bold.ttf', 'Bricolage', 'bold'],
  ['PixelifySans-Medium.ttf', 'Pixelify', 'normal'],
] as const;

async function toBase64(url: string) {
  const buffer = await (await fetch(url)).arrayBuffer();
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(binary);
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/** Square photo with rounded corners on a white ground, as a JPEG data URL. */
async function photoDataUrl(src: string) {
  const img = await loadImage(src);
  const size = 600;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, size, size);
  ctx.beginPath();
  ctx.roundRect(0, 0, size, size, 70);
  ctx.clip();
  const side = Math.min(img.width, img.height);
  ctx.drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, size, size);
  return canvas.toDataURL('image/jpeg', 0.9);
}

/** The loOS emblem as a PNG data URL (same drawing as the favicon). */
async function emblemDataUrl() {
  const img = await loadImage('favicon.svg');
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 256;
  canvas.getContext('2d')!.drawImage(img, 0, 0, 256, 256);
  return canvas.toDataURL('image/png');
}

function dotField(doc: JsPDF, x: number, y: number, w: number, h: number) {
  doc.setFillColor(...DOT);
  for (let dx = 2; dx < w; dx += 4) for (let dy = 2; dy < h; dy += 4) doc.circle(x + dx, y + dy, 0.28, 'F');
}

/** Builds the branded CV PDF and triggers the download. */
export async function downloadCvPdf(cv: CvItem[], t: Copy, lang: Language) {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  const [fonts, photo, emblem] = await Promise.all([
    Promise.all(FONTS.map(([file]) => toBase64(`assets/fonts/${file}`))),
    photoDataUrl(CV_PHOTO).catch(() => null),
    emblemDataUrl().catch(() => null),
  ]);
  FONTS.forEach(([file, family, style], i) => {
    doc.addFileToVFS(file, fonts[i]);
    doc.addFont(file, family, style);
  });

  const font = (family: string, style: string, size: number, color: RGB) => {
    doc.setFont(family, style);
    doc.setFontSize(size);
    doc.setTextColor(...color);
  };

  let y = 0;
  const ensure = (needed: number) => {
    if (y + needed > PAGE_H - M - FOOTER) {
      doc.addPage();
      y = M;
    }
  };
  const label = (text: string) => {
    ensure(18);
    font('Pixelify', 'normal', 12, MAGENTA);
    doc.text(text, M, y);
    doc.setDrawColor(...VIOLETA);
    doc.setLineWidth(0.3);
    doc.line(M + doc.getTextWidth(text) + 3, y - 1.3, PAGE_W - M, y - 1.3);
    y += 8;
  };

  // Header: dotted band, photo, name, role, contact, emblem
  dotField(doc, 0, 0, PAGE_W, 64);
  if (photo) doc.addImage(photo, 'JPEG', M, 16, 36, 36);
  const textX = photo ? M + 44 : M;
  font('Bricolage', 'bold', 30, MORADO);
  doc.text('Lorena Orlando', textX, 30);
  font('Pixelify', 'normal', 13, MAGENTA);
  doc.text(t.cv.role, textX, 38.5);
  font('DMSans', 'normal', 9, INK_2);
  doc.text([EMAIL, LINKEDIN_URL.replace('https://www.', ''), 'lorenaorlando.click'].join('   ·   '), textX, 46);
  if (emblem) doc.addImage(emblem, 'PNG', PAGE_W - M - 13, 14, 13, 13);

  y = 72;
  // Tools as pills
  label(t.cv.tools);
  font('DMSans', 'normal', 9, VIOLETA);
  let x = M;
  for (const tool of TOOLS) {
    const w = doc.getTextWidth(tool) + 8;
    if (x + w > PAGE_W - M) {
      x = M;
      y += 9;
    }
    doc.setDrawColor(...VIOLETA);
    doc.setLineWidth(0.3);
    doc.roundedRect(x, y - 4.6, w, 6.6, 3.3, 3.3, 'S');
    doc.text(tool, x + 4, y);
    x += w + 3;
  }
  y += 10;

  // Summary
  font('DMSans', 'normal', 10.5, INK);
  const summary = doc.splitTextToSize(t.cv.summary, PAGE_W - M * 2);
  doc.text(summary, M, y, { lineHeightFactor: 1.55 });
  y += summary.length * 5.5 + 7;

  // Personal projects: a highlighted box with three columns
  {
    const boxH = 44;
    const colW = (PAGE_W - M * 2 - 10 - 8) / 3;
    doc.setFillColor(251, 247, 253);
    doc.setDrawColor(...VIOLETA);
    doc.setLineWidth(0.5);
    doc.roundedRect(M, y, PAGE_W - M * 2, boxH, 3, 3, 'FD');
    font('Pixelify', 'normal', 13, VIOLETA);
    doc.text(t.cv.personal, M + 5, y + 8);
    font('DMSans', 'normal', 7.5, MUTED);
    doc.text(t.cv.personalNote.toUpperCase(), PAGE_W - M - 5, y + 8, { align: 'right' });
    PERSONAL_PROJECTS.forEach((pp, i) => {
      const x = M + 5 + i * (colW + 4);
      const top = y + 15;
      font('Bricolage', 'bold', 10.5, MORADO);
      doc.textWithLink(pp.name, x, top, { url: pp.url });
      font('DMSans', 'bold', 7.2, MAGENTA);
      doc.text(pp.kind[lang].toUpperCase(), x, top + 4.6, { charSpace: 0.2 });
      font('DMSans', 'normal', 8.2, INK_2);
      const lines = doc.splitTextToSize(pp.description[lang], colW);
      doc.text(lines.slice(0, 5), x, top + 10, { lineHeightFactor: 1.35 });
    });
    y += boxH + 10;
  }

  // Experience
  label(t.cv.experience);
  // Estimated height of one company block, so it starts on a page where it fits.
  const blockHeight = (item: CvItem) =>
    item.positions.reduce((h, pos) => {
      font('DMSans', 'normal', 9, INK_2);
      const bullets = (pos.bullets ?? []).reduce((b, text) => b + doc.splitTextToSize(text, PAGE_W - M - COL - 5).length * 4 + 0.4, 0);
      return h + 8.6 + bullets + 1.6;
    }, 0) + 3;

  for (const item of cv) {
    ensure(Math.min(blockHeight(item), PAGE_H - M * 2 - FOOTER));
    const top = y;
    const startPage = doc.getNumberOfPages();
    font('Bricolage', 'bold', 11, MORADO);
    doc.text(doc.splitTextToSize(item.company, COL - M - 5), M, y);

    for (const pos of item.positions) {
      ensure(12);
      font('DMSans', 'bold', 10, INK);
      doc.text(pos.role, COL, y);
      y += 4.2;
      font('DMSans', 'normal', 8.5, MUTED);
      doc.text(pos.period, COL, y);
      y += 4.4;
      font('DMSans', 'normal', 9, INK_2);
      for (const bullet of pos.bullets ?? []) {
        const lines = doc.splitTextToSize(bullet, PAGE_W - M - COL - 5);
        ensure(lines.length * 4);
        doc.setFillColor(...MAGENTA);
        doc.circle(COL + 0.9, y - 1.2, 0.6, 'F');
        doc.text(lines, COL + 4, y, { lineHeightFactor: 1.35 });
        y += lines.length * 4 + 0.4;
      }
      y += 1.6;
    }
    y = (doc.getNumberOfPages() === startPage ? Math.max(y, top + 7) : y) + 0.6;
    doc.setDrawColor(...LINE);
    doc.setLineWidth(0.2);
    doc.line(M, y - 2.6, PAGE_W - M, y - 2.6);
    y += 2;
  }

  // Footer on every page
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setDrawColor(...LINE);
    doc.setLineWidth(0.2);
    doc.line(M, PAGE_H - 13, PAGE_W - M, PAGE_H - 13);
    if (emblem) doc.addImage(emblem, 'PNG', M, PAGE_H - 10.5, 5, 5);
    font('Pixelify', 'normal', 8.5, MORADO);
    doc.text('loOS', M + 7, PAGE_H - 7);
    font('DMSans', 'normal', 8, MUTED);
    doc.text(`lorenaorlando.click   ·   ${i}/${pages}`, PAGE_W - M, PAGE_H - 7, { align: 'right' });
  }

  doc.save('Lorena-Orlando-CV.pdf');
}
