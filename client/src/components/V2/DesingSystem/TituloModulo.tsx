interface Props {
  titulo: string;
}
const TituloModulo = ({ titulo }: Props) => {
  return (
    <h2 className="font-bold text-slate-700 text-3xl p-5 pl-2 mt-5 min-h-10">
      {titulo}
    </h2>
  );
};

export default TituloModulo;
