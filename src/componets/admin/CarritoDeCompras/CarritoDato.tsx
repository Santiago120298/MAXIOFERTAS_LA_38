// src/types/TipoDato.ts
export interface TipoDato {
  id: number;
  fecha_compra: string;
  cantidad_productos: number;
  valor_producto: number;
  valor_total: number;
  metodos_pago: string;
  servicios_id: number;
  usuarios_numero_doc: number;
  producto_id: number;
}
