export class IngresoEgreso {
  descripcion: string;
  monto: number;
  tipo: Tipos;
  uid?: string;

  constructor(obj: any) {
    this.descripcion = (obj && obj.descripcion) || null;
    this.monto = (obj && obj.monto) || null;
    this.tipo = (obj && obj.tipo) || null;
    // this.uid = (obj && obj.uid) || null;
  }
}

export type Tipos = "ingreso" | "egreso";
