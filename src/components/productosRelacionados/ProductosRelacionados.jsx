import { useEffect, useState } from 'react';
import './productosRelacionados.scss';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const ProductosRelacionados = ({ categoriaActual, productoId }) => {
  const [relacionados, setRelacionados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const db = getFirestore();
    const productosRef = collection(db, 'productos');

    const q = query(productosRef, where('category', '==', categoriaActual));

    getDocs(q).then((snapshot) => {
      const productos = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((prod) => prod.id !== productoId); // Excluir el actual

      setRelacionados(productos);
    });
  }, [categoriaActual, productoId]);

  if (relacionados.length === 0) return null;

  return (
    <section className="relacionados px-6 py-10 bg-gray-50">
      <h3 className="text-xl font-semibold text-black mb-4">Productos relacionados</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {relacionados.map((prod) => (
          <div
            key={prod.id}
            onClick={() => navigate(`/item/${prod.id}`)}
            className="bg-white shadow-md p-4 rounded hover:shadow-lg cursor-pointer transition"
          >
            <img src={prod.img} alt={prod.name} className="w-full h-40 object-cover rounded" />
            <p className="text-black font-semibold">${prod.price}</p>
            <h4 className="text-black mt-2">{prod.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

ProductosRelacionados.propTypes = {
  categoriaActual: PropTypes.string.isRequired,
  productoId: PropTypes.any.isRequired,
};