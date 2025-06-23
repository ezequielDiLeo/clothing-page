import PropTypes from 'prop-types';
import buzoImg from '../../assets/img/medidaBuzo.png';
import remeraImg from '../../assets/img/medidaRemera.png';
import camisaImg from '../../assets/img/medidaCamisa.png';
import pantalonImg from '../../assets/img/medidaPantalon.png';

export default function ProductDetails({ product }) {
  // Mostrar loading si no hay datos aún
  if (!product || !product.tipo) {
    return (
      <div className="text-center py-10 text-gray-500">
        Cargando detalles del producto...
      </div>
    );
  }

  // Medidas por defecto
  const medidasDefault = [
    { talle: 'S', ancho: '45 cm', largo: '65 cm', mangas: '60 cm', cuello: '15 cm' },
    { talle: 'M', ancho: '48 cm', largo: '67 cm', mangas: '62 cm', cuello: '16 cm' },
    { talle: 'L', ancho: '50 cm', largo: '70 cm', mangas: '63 cm', cuello: '17 cm' }
  ];

  const tipo = product.category;
  const categoria = product.category?.toLowerCase();

  // Determinar medidas según tipo
  const medidasPorTipo = product.medidas?.[tipo]?.length > 0
    ? product.medidas[tipo]
    : medidasDefault;


  const imagenes = {
    buzos: buzoImg,
    remeras: remeraImg,
    pantalones: pantalonImg,
    camperas: buzoImg,
    camisas: camisaImg,
  };

  const imagenSeleccionada = imagenes[categoria];

  console.log('product.category:', product.category);
console.log('imagenSeleccionada:', imagenSeleccionada);

  return (
    <section className="bg-gray-100 text-gray-800 py-12 px-6 md:px-12 mb-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        
        {/* Descripción y Cuidados */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Descripción</h3>
            <p className="whitespace-pre-line">{product.description}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Cuidados:</h4>
            <p>
              Lavar en agua fría.<br />
              A mano del lado del revés.<br />
              No usar lavandina.<br />
              No secar a máquina.<br />
              No planchar sobre estampa.
            </p>
          </div>
        </div>

        {/* Tabla de Talles Dinámica */}
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
              {medidasPorTipo.map((fila) => (
                <tr key={fila.talle} className="border-b">
                  <td className="p-2">{fila.talle}</td>
                  <td className="p-2">{fila.ancho}</td>
                  <td className="p-2">{fila.largo}</td>
                  <td className="p-2">{fila.mangas}</td>
                  <td className="p-2">{fila.cuello}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Imagen ilustrativa */}
        <div className="flex justify-center md:justify-end">
          <img
            src={imagenSeleccionada}
            alt={`Guía de medidas para ${product.category}`}
            className="max-w-xs md:max-w-sm object-contain"
          />
        </div>
      </div>
    </section>
  );
}


ProductDetails.propTypes = {
  product: PropTypes.shape({
    tipo: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    medidas: PropTypes.objectOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          talle: PropTypes.string.isRequired,
          ancho: PropTypes.string.isRequired,
          largo: PropTypes.string.isRequired,
          mangas: PropTypes.string.isRequired,
          cuello: PropTypes.string.isRequired,
        })
      )
    ),
  }).isRequired,
};