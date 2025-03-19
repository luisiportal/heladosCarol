import { Sabor } from "../../models/Sabor.model.js";

export const checkExistencia = ({ productos }) => {
  
  const getProducto = async ({ id_sabor, cantidad }) => {
    try {
      const response = await Sabor.findByPk(id_sabor);

      if (response.existencia < cantidad) {
        return response.nombre_sabor;
      } else {
        console.log("proceda");
      }
    } catch (error) {
      console.log(error);
    }
  };

  for (const producto of productos) {
    return getProducto({
      id_sabor: producto.id_sabor,
      cantidad: producto.cantidad,
    });
  }
};
