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
