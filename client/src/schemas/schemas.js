import * as Yup from "yup";

export const repartosSchema = Yup.object().shape({
  reparto: Yup.string().required("Nombre producto requerido"),
  costo: Yup.number()
    .typeError("Debes escribir solo números")
    .positive("El costo debe ser mayor que cero")
    .required("Costo Requerido"),
  costo_cup: Yup.number()
    .typeError("Debes escribir solo números")
    .positive("El costo debe ser mayor que cero")
    .required("Costo Requerido"),
});

export const saboresSchema = Yup.object().shape({
  nombre_sabor: Yup.string().required("Nombre producto requerido"),
  envase: Yup.string().required("Envase requerido"),
  costo_unitario: Yup.number()
    .typeError("Debes escribir solo números")
    .positive("El precio debe ser mayor que cero")
    .required("Costo Requerido"),
  precio_venta: Yup.number()
    .typeError("Debes escribir solo números")
    .positive("El precio debe ser mayor que cero")
    .required("Precio Requerido"),

  color: Yup.string(),
  stockMinimo: Yup.number().typeError("Debes escribir solo números"),
});
