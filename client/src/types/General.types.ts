export type Imagen = {
  id_imagen: number;
  id_recurso: number;
  ruta_image: string;
  descripcion:string;
};

export type Sabor = {
  id_sabor: string;
  nombre_sabor: string;
  categoria: string;
  color: string;
  existencia: number;
  ruta_image: string;
  costo_unitario:number;
  precio_venta: number;
  precio_venta_cup: number;
  home_img: string;
  envase: string;
  stockMinimo:number;
  description: string;
  imagenes?: Imagen[];
};


