import PropTypes from 'prop-types';
import medidas from '../../assets/img/medidas.png'

export default function ProductDetails({ product }) {
  return (
    <section className="bg-gray-100 text-gray-800 py-12 px-6 md:px-12 mb-10" >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

        {/* Descripción y Cuidados */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Descripción</h3>
            <p className="whitespace-pre-line">{product.descripcion}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Cuidados:</h4>
            <p>
              Lavar en agua fria.
              A mano del lado del reves.
              No usar lavandina.
              No secar a maquina.
              No planchar sobre estampa.
            </p>
          </div>
        </div>

        {/* Tabla de Talles */}
        {/* Tabla de Talles (Datos manuales) */}
          <div className="overflow-x-auto">
            <h4 className="text-lg font-semibold mb-4">Medidas aproximadas</h4>
            <table className="min-w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-gray-200 text-gray-600">
                  <th className="p-2">Talle</th>
                  <th className="p-2">Ancho</th>
                  <th className="p-2">Largo</th>
                  <th className="p-2">Mangas</th>
                  <th className="p-2">Cuello-hombro</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b">
                  <td className="p-2">S</td>
                  <td className="p-2">45 cm</td>
                  <td className="p-2">65 cm</td>
                  <td className="p-2">60 cm</td>
                  <td className="p-2">15 cm</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">M</td>
                  <td className="p-2">48 cm</td>
                  <td className="p-2">67 cm</td>
                  <td className="p-2">62 cm</td>
                  <td className="p-2">16 cm</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">L</td>
                  <td className="p-2">50 cm</td>
                  <td className="p-2">70 cm</td>
                  <td className="p-2">63 cm</td>
                  <td className="p-2">17 cm</td>
                </tr>
                {/* Podés agregar más filas según necesites */}
              </tbody>
            </table>
          </div>


        {/* Imagen ilustrativa */}
        <div className="flex justify-center md:justify-end">
          <img
            src={medidas}
            alt="Guía de medidas"
            className="max-w-xs md:max-w-sm object-contain"
          />
        </div>
      </div>
    </section>
  );
}

ProductDetails.propTypes = {
  product: PropTypes.shape({
    descripcion: PropTypes.string.isRequired,
    cuidados: PropTypes.arrayOf(PropTypes.string).isRequired,
    medidas: PropTypes.arrayOf(
      PropTypes.shape({
        talle: PropTypes.string.isRequired,
        ancho: PropTypes.string.isRequired,
        largo: PropTypes.string.isRequired,
        mangas: PropTypes.string.isRequired,
        cuello: PropTypes.string.isRequired,
      })
    ).isRequired,
    imgMedidas: PropTypes.string,
  }).isRequired,
};
