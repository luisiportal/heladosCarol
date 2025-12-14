import TituloModulo from "../V2/DesingSystem/TituloModulo"

const FacebookSeguir = () => {
  return (
     <div>
      <div className="flex items-center justify-between mx-2 my-5">
      <TituloModulo titulo="Síguenos en Facebook" />
      </div>

      <div className="w-full flex justify-center p-2">
        <iframe
          className="w-full"
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fheladoscarolhlg&tabs=timeline"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          title="Facebook Page"
        ></iframe>
      </div>
    </div>
  )
}

export default FacebookSeguir