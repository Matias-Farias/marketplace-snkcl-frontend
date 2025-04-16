import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-black text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-red-600 mb-4">Bienvenido a SneakerCL: El Marketplace #1 de Zapatillas en Chile</h3>
            <p className="text-gray-400">
            Compra y vende las zapatillas más exclusivas, desde los últimos lanzamientos hasta clásicos difíciles de encontrar. En SneakerCL, conectamos a coleccionistas, revendedores y amantes del streetwear con productos 100% verificados y asegurados. Encuentra tu próximo par hoy y lleva tu estilo al siguiente nivel. Autenticidad garantizada.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Consultas</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-red-600">Nosotros</a></li>
              <li><a href="#" className="text-gray-400 hover:text-red-600">Contacto</a></li>
              <li><a href="#" className="text-gray-400 hover:text-red-600">Preguntas Frecuentes</a></li>
              <li><a href="#" className="text-gray-400 hover:text-red-600">Envíos</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Servicio al Cliente</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-red-600">Seguimiento de pedidos</a></li>
              <li><a href="#" className="text-gray-400 hover:text-red-600">Devoluciones</a></li>
              <li><a href="#" className="text-gray-400 hover:text-red-600">Guia de Tallas</a></li>
              <li><a href="#" className="text-gray-400 hover:text-red-600">Soporte</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Siguenos</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-red-600">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-600">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-600">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-600">
                <Youtube size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 SneakerCL. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;