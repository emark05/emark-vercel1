export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">E-Mark</h3>
            <p className="text-gray-400 text-sm">Tu marketplace de confianza para comprar y vender productos.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Comprar</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Cómo comprar</li>
              <li>Métodos de pago</li>
              <li>Envíos</li>
              <li>Devoluciones</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Vender</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Cómo vender</li>
              <li>Tarifas</li>
              <li>Consejos</li>
              <li>Políticas</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Ayuda</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Centro de ayuda</li>
              <li>Contacto</li>
              <li>Términos y condiciones</li>
              <li>Privacidad</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          © 2025 E-Mark. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
