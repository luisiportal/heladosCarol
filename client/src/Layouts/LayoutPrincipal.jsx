const LayoutPrincipal = ({ titulo, children }) => {
  return (
    <div className="pt-16">
      <div className="pt-4 px-6 m-4 pb-6 text-slate-600 text-justify bg-white shadow-md rounded-xl flex flex-col leading-relaxed">
        <h1 className="flex justify-center text-slate-700 font-semibold font-inspiration text-2xl">
          {titulo}
        </h1>
        {children}
      </div>
    </div>
  );
};

export default LayoutPrincipal;
