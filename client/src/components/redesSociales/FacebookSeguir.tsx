import TituloModulo from "../V2/DesingSystem/TituloModulo";

const FacebookSeguir = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <TituloModulo titulo="Síguenos en Facebook" />
      </div>

      <div className="w-full flex justify-center">
        <iframe
        title="Facebook Helados Carol"
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fheladoscarolhlg&tabs=timeline&width=340&height=400&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=true&appId"
          width="375"
          height="400"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          className="rounded-xl"
        ></iframe>
      </div>
    </div>
  );
};

export default FacebookSeguir;
