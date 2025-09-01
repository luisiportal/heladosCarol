interface Props {
  titulo: string;
}
const TituloModulo = ({ titulo }: Props) => {
  return (
    <h2 className="font-bold text-slate-700 text-2xl p-5 pl-2 min-h-20">
      {titulo}
    </h2>
  );
};

export default TituloModulo;
