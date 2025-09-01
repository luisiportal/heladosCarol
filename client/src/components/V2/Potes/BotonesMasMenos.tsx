const BotonesMasMenos = ({ mas, menos }: { mas: any; menos: any }) => {
  return (
    <>
      <button
        onClick={() => mas()}
        className="bg-slate-700 text-3xl font-bold text-white rounded-full w-8 h-8 aspect-square flex justify-center items-center"
      >
        <h2 className="mb-1">+</h2>
      </button>
      <button
        onClick={() => menos()}
        className="bg-slate-700 text-3xl font-bold text-white rounded-full w-8 h-8 aspect-square flex justify-center items-center mt-2"
      >
        <h2 className="mb-1">-</h2>
      </button>
    </>
  );
};

export default BotonesMasMenos;
