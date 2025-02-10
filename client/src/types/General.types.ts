export type Imagen = {
  id_imagen: number;
  id_recurso: number;
  ruta_image: string;
};

export type Sabor = {
  id_sabor: string;
  nombre_sabor: string;
  categoria: string;
  color: string;
  existencia: number;
  ruta_image: string;
  precio_venta: number;
  precio_venta_cup: number;
  home_img: string;
  envase: string;
  description: string;
  imagenes: Imagen[];
};


