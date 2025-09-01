import { useQuery } from "@tanstack/react-query";
import { getSaboresRequest } from "../api/sabores.api";
import { Sabor } from "../types/General.types";

export const useProductosRequest = () => {
  const { data } = useQuery({
    queryKey: ["prodcutos"],
    queryFn: () => getSaboresRequest(),
  });

  const response = data?.data as Sabor[];

  return response
};
