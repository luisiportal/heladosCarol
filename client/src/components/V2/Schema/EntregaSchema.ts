import * as Yup from "yup";

export const EntregaSchema = Yup.object({
  ordenante: Yup.string()
    .required("Falta el Ordenante")
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/,
      "Solo se permiten letras en el Ordenante"
    )
    .max(400, "El Ordenante no debe tener más de 400 caracteres"),

  contacto_ordenante: Yup.string()
    .required("Falta contacto del ordenante")
    .matches(
      /^[a-zA-Z-@.0-9 ]*$/,
      "Solo se permiten letras y numeros en el contacto del Ordenante"
    )
    .max(400, "El correo de no debe tener más de 400 caracteres"),
  beneficiario: Yup.string()
    .required("Falta el beneficiario")
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/,
      "Solo se permiten letras en el Beneficiario"
    )
    .max(400, "El nombre del Beneficiario no debe tener más de 400 caracteres"),

  tel_beneficiario: Yup.string()
    .required("Falta teléfono beneficiario")
    .matches(
      /^[0-9-+ ]*$/,
      "Solo se permiten números en el teléfono del beneficiario"
    )
    .max(20, "El teléfono no debe tener más de 20 caracteres"),

  calle: Yup.string()
    .required("Falta la Calle")
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s0-9-.]*$/,
      "Solo se permiten letras, numeros y espacios en la Calle"
    )
    .max(400, "El nombre de la calle no debe tener más de 400 caracteres"),
  numero: Yup.string()
    .required("Falta la casa o APTO")
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s0-9-.]*$/,
      "Solo se permiten letras, números y espacios en Casa o APTO"
    )
    .max(20, "El número de la casa o APTO no debe tener más de 20 caracteres"),

  calle1: Yup.string()
    .required("Falta entre calles o Apto")
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s0-9-.]*$/,
      "Solo se permiten letras, números y espacios entre calles o Apto"
    )
    .max(40, "La calle no debe tener más de 400 caracteres"),

  p_referencia: Yup.string()

    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s0-9]*$/,
      "Solo se permiten letras, números y espacios en Referencia"
    )
    .max(400, "La Referencia no debe tener más de 400 caracteres"),

  observaciones: Yup.string()
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s0-9]*$/,
      "Solo se permiten letras, números y espacios en Observaciones"
    )
    .max(400, "No debe tener más de 400 caracteres la observación"),

});
