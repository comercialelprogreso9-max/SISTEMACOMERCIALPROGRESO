export interface DeliveryItem {
  id: string;
  codigo: string;
  cantidad: number;
  concepto: string;
}

export interface DeliveryNote {
  numero: string;
  fecha: string;
  cliente: string;
  items: DeliveryItem[];
}

export interface InvoiceItem {
  id: string;
  codigo: string;
  cantidad: number;
  descripcion: string;
  precioUnitario: number;
  total: number;
}

export interface Invoice {
  numero: string;
  fecha: string;
  cliente: string;
  direccion: string;
  metodoPago: 'Efectivo' | 'Transferencia';
  moneda: 'Córdobas' | 'Dólares';
  observacion: string;
  items: InvoiceItem[];
  totalGeneral: number;
}

export interface FlyerData {
  titleLine1: string;
  titleLine2: string;
  titleLine3: string;
  spec1: string;
  spec2: string;
  spec3: string;
  specExtra: string[];
  precio: number | string;
  moneda: string; // 'Dolares' | 'Córdobas'
  garantiaMeses: number | string; // e.g. 3
  condicion: string; // 'SEMI NUEVO', 'NUEVO', 'REACONDICIONADO'
  direccion: string;
  telefono: string;
  email: string;
  imagenUrl: string;
  logoSubtitulo: string;
}
