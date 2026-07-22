import { toPng } from 'html-to-image';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function downloadFlyerAsPng(element: HTMLElement, filename = 'Flyer_Comercial_El_Progreso.png') {
  try {
    // First try html-to-image for crisp render
    const dataUrl = await toPng(element, {
      quality: 0.98,
      pixelRatio: 2,
      cacheBust: true,
    });

    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
    return true;
  } catch (err) {
    console.warn('html-to-image failed, falling back to html2canvas:', err);
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#070e20',
        logging: false,
      });

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      link.click();
      return true;
    } catch (fallbackErr) {
      console.error('Failed to export flyer as PNG:', fallbackErr);
      throw fallbackErr;
    }
  }
}

export async function downloadFlyerAsPdf(element: HTMLElement, filename = 'Flyer_Comercial_El_Progreso.pdf') {
  try {
    let dataUrl: string;
    try {
      dataUrl = await toPng(element, { quality: 0.98, pixelRatio: 2, cacheBust: true });
    } catch {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, allowTaint: true });
      dataUrl = canvas.toDataURL('image/png');
    }

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(filename);
    return true;
  } catch (err) {
    console.error('Failed to export flyer as PDF:', err);
    throw err;
  }
}
