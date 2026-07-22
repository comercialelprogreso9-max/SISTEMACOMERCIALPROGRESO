import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DeliveryNote, Invoice } from '../types';

export function generateDeliveryNotePDF(note: DeliveryNote) {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = 210;
  const margin = 20;
  let y = 20;

  // Header Banner
  doc.setFillColor(15, 52, 96); // #0f3460
  doc.rect(0, 0, pageWidth, 45, 'F');

  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('COMERCIAL "EL PROGRESO"', margin, 20);

  doc.setFontSize(9);
  doc.setTextColor(220, 220, 220);
  doc.setFont('helvetica', 'normal');
  doc.text('Venta de Computadoras, Accesorios y Servicio Técnico', margin, 27);
  doc.text('Especializado en Tecnología · Tel. +505 81295540', margin, 33);
  doc.text('Dirección: Colegio San Fco. ½ al Norte, Matagalpa, Nicaragua', margin, 39);

  // Red accent border line
  doc.setDrawColor(233, 69, 96);
  doc.setLineWidth(1.5);
  doc.line(0, 45, pageWidth, 45);

  y = 58;

  doc.setFontSize(18);
  doc.setTextColor(15, 52, 96);
  doc.setFont('helvetica', 'bold');
  doc.text('COMPROBANTE DE ENTREGA', pageWidth / 2, y, { align: 'center' });

  y += 10;
  doc.setDrawColor(15, 52, 96);
  doc.setLineWidth(0.5);
  doc.line(margin + 30, y, pageWidth - margin - 30, y);
  y += 12;

  doc.setFontSize(11);
  doc.setTextColor(40, 40, 40);
  doc.setFont('helvetica', 'bold');
  doc.text('NÚMERO DE ENTREGA:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(note.numero, margin + 50, y);
  y += 8;

  doc.setFont('helvetica', 'bold');
  doc.text('FECHA:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(note.fecha, margin + 50, y);
  y += 8;

  doc.setFont('helvetica', 'bold');
  doc.text('CLIENTE:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(note.cliente, margin + 50, y);
  y += 14;

  const tableData = note.items.map((item) => [item.codigo, item.cantidad.toString(), item.concepto]);

  autoTable(doc, {
    startY: y,
    head: [['CÓDIGO', 'CANTIDAD', 'CONCEPTO / DESCRIPCIÓN']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [15, 52, 96],
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: 'bold',
      halign: 'center',
    },
    styles: { fontSize: 10, cellPadding: 5 },
    columnStyles: {
      0: { cellWidth: 45, halign: 'left' },
      1: { cellWidth: 30, halign: 'center' },
      2: { cellWidth: 'auto', halign: 'left' },
    },
    margin: { left: margin, right: margin },
  });

  // @ts-expect-error autoTable adds lastAutoTable property
  y = (doc.lastAutoTable?.finalY || y) + 25;

  const centerX1 = margin + 35;
  const centerX2 = pageWidth - margin - 35;

  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');

  doc.text('ENTREGÓ CONFORME', centerX1, y, { align: 'center' });
  doc.text('RECIBIÓ CONFORME', centerX2, y, { align: 'center' });

  y += 20;

  doc.setDrawColor(15, 52, 96);
  doc.setLineWidth(0.8);
  doc.line(margin, y, margin + 70, y);
  doc.line(pageWidth - margin - 70, y, pageWidth - margin, y);

  y += 6;
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.setFont('helvetica', 'normal');
  doc.text('Firma y nombre completo', centerX1, y, { align: 'center' });
  doc.text('Firma y nombre completo', centerX2, y, { align: 'center' });

  doc.save(`Comprobante_Entrega_${note.numero || '001'}.pdf`);
}

export function generateInvoicePDF(invoice: Invoice) {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = 210;
  const margin = 15;
  let y = 15;

  // Header Banner
  doc.setFillColor(15, 52, 96);
  doc.rect(0, 0, pageWidth, 50, 'F');

  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('COMERCIAL "EL PROGRESO"', margin, 18);

  doc.setFontSize(8);
  doc.setTextColor(220, 220, 220);
  doc.setFont('helvetica', 'normal');
  doc.text('Dirección: Colegio San Fco. ½ al Norte, Matagalpa, Nicaragua', margin, 25);
  doc.text('Especializado en Tecnología · Venta y Servicio Técnico', margin, 31);
  doc.text('Teléfono / WhatsApp: +505 81295540 · Email: comercialelprogreso9@gmail.com', margin, 37);

  doc.setDrawColor(233, 69, 96);
  doc.setLineWidth(1.5);
  doc.line(0, 50, pageWidth, 50);

  y = 60;

  doc.setFontSize(18);
  doc.setTextColor(15, 52, 96);
  doc.setFont('helvetica', 'bold');
  doc.text('FACTURA DE VENTA', pageWidth / 2, y, { align: 'center' });

  y += 8;
  doc.setDrawColor(15, 52, 96);
  doc.setLineWidth(0.3);
  doc.line(margin + 30, y, pageWidth - margin - 30, y);
  y += 10;

  const symbol = invoice.moneda === 'Córdobas' ? 'C$' : '$';

  doc.setFontSize(10);
  doc.setTextColor(40, 40, 40);

  doc.setFont('helvetica', 'bold');
  doc.text('Nº FACTURA:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(invoice.numero, margin + 30, y);

  doc.setFont('helvetica', 'bold');
  doc.text('FECHA:', margin + 110, y);
  doc.setFont('helvetica', 'normal');
  doc.text(invoice.fecha, margin + 130, y);
  y += 7;

  doc.setFont('helvetica', 'bold');
  doc.text('CLIENTE:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(invoice.cliente, margin + 30, y);
  y += 7;

  doc.setFont('helvetica', 'bold');
  doc.text('DIRECCIÓN:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(invoice.direccion || 'N/A', margin + 30, y);
  y += 7;

  doc.setFont('helvetica', 'bold');
  doc.text('MÉTODO PAGO:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(invoice.metodoPago, margin + 35, y);

  doc.setFont('helvetica', 'bold');
  doc.text('MONEDA:', margin + 110, y);
  doc.setFont('helvetica', 'normal');
  doc.text(invoice.moneda, margin + 130, y);
  y += 10;

  const tableData = invoice.items.map((item) => [
    item.codigo,
    item.cantidad.toString(),
    item.descripcion,
    `${symbol} ${item.precioUnitario.toFixed(2)}`,
    `${symbol} ${item.total.toFixed(2)}`,
  ]);

  autoTable(doc, {
    startY: y,
    head: [['CÓDIGO', 'CANT.', 'DESCRIPCIÓN', 'P. UNITARIO', 'TOTAL']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [15, 52, 96],
      textColor: [255, 255, 255],
      fontSize: 9,
      fontStyle: 'bold',
      halign: 'center',
    },
    styles: { fontSize: 9, cellPadding: 4 },
    columnStyles: {
      0: { cellWidth: 30, halign: 'left' },
      1: { cellWidth: 20, halign: 'center' },
      2: { cellWidth: 'auto', halign: 'left' },
      3: { cellWidth: 32, halign: 'right' },
      4: { cellWidth: 32, halign: 'right' },
    },
    margin: { left: margin, right: margin },
  });

  // @ts-expect-error autoTable adds lastAutoTable property
  y = (doc.lastAutoTable?.finalY || y) + 8;

  // Total Box
  doc.setFillColor(240, 244, 248);
  doc.setDrawColor(15, 52, 96);
  doc.roundedRect(pageWidth - margin - 80, y, 80, 14, 2, 2, 'FD');

  doc.setFontSize(12);
  doc.setTextColor(15, 52, 96);
  doc.setFont('helvetica', 'bold');
  doc.text(`TOTAL: ${symbol} ${invoice.totalGeneral.toFixed(2)}`, pageWidth - margin - 5, y + 9, {
    align: 'right',
  });

  y += 25;

  const centerX1 = margin + 35;
  const centerX2 = pageWidth - margin - 35;

  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');

  doc.text('ENTREGÓ CONFORME', centerX1, y, { align: 'center' });
  doc.text('RECIBIÓ CONFORME', centerX2, y, { align: 'center' });

  y += 18;

  doc.setDrawColor(15, 52, 96);
  doc.setLineWidth(0.8);
  doc.line(margin, y, margin + 70, y);
  doc.line(pageWidth - margin - 70, y, pageWidth - margin, y);

  y += 5;
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.setFont('helvetica', 'normal');
  doc.text('Firma y nombre', centerX1, y, { align: 'center' });
  doc.text('Firma y nombre', centerX2, y, { align: 'center' });

  doc.save(`Factura_${invoice.numero || '001'}.pdf`);
}
