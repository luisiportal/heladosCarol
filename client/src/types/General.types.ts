export type Imagen = {
  id_imagen: number;
  id_recurso: number;
  ruta_image: string;
  descripcion: string;
};
export type DialogProps = {
  titulo: string;
  pregunta: string;
  handleClick: any;
  textoAceptar?: string;
  textoCancelar?: string;
};

export type Reparto = {
  reparto: string;
  costo: number;
  costo_cup: number;
  envio: number;
  label:string
};

export type Modal = {
  mensaje: string;
  errorColor?: boolean;
  activo: boolean;
  navegarA?: string;
};

export type Entrega = {
  ordenante: string;
  contacto_ordenante: string;
  beneficiario: string;
  tel_beneficiario: string;
  direccion: string;
  calle: string;
  numero: string;
  calle1: string;
  calle2: string;
  reparto: Reparto;
  p_referencia: string;
  observaciones: string;
};

export type Sabor = {
  id_sabor: string;
  cantidad?: number;
  nombre_sabor: string;
  categoria: string;
  color: string;
  reservar: boolean;
  existencia: number;
  ruta_image: string;
  costo_unitario: number;
  precio_venta: number;
  precio_venta_cup: number;
  home_img: string;
  envase: string;
  stockMinimo: number;
  description: string;
  imagenes?: Imagen[];
  nuevo: boolean;
};

export type Reserva = {
  productos: Sabor[];
  fecha: string;
};
