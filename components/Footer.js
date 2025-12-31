'use client';
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* À propos */}
          <div>
            <h3 className="text-2xl font-bold text-amber-500 mb-4">Bassiroudev</h3>
            <p className="text-gray-400">
              Développeur Full-Stack et spécialisé en agriculture numérique. 
              Expert en web, mobile, SIG et IA.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4 text-amber-500">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-amber-500 transition-colors cursor-pointer">
                Sites Web & Mobile
              </li>
              <li className="hover:text-amber-500 transition-colors cursor-pointer">
                E-commerce
              </li>
              <li className="hover:text-amber-500 transition-colors cursor-pointer">
                Agriculture Numérique
              </li>
              <li className="hover:text-amber-500 transition-colors cursor-pointer">
                SIG & Télédétection
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-amber-500">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="tel:+221763900159" className="hover:text-amber-500 transition-colors">
                  Téléphone : +221763900159
                </a>
              </li>
              <li>
                <a href="mailto:bassiroufaye765@gmail.com" className="hover:text-amber-500 transition-colors">
                  Email : bassiroufaye765@gmail.com
                </a>
              </li>
              <li className="hover:text-amber-500 transition-colors">
                Adresse : Kaolack, Dakar, Sénégal
              </li>
            </ul>
          </div>

          {/* Horaires */}
          <div>
            <h4 className="font-bold mb-4 text-amber-500">Horaires</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Lundi - Vendredi : 08:00 - 18:00</li>
              <li>Samedi : 08:00 - 17:00</li>
              <li>Dimanche : Fermé</li>
            </ul>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © {currentYear} Bassiroudev. Tous droits réservés.
            </p>
            
            {/* Réseaux sociaux */}
            <div className="flex space-x-6">
              <a 
                href="https://wa.me/221763900159" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-500 transition-colors"
              >
                <FaWhatsapp size={24} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-amber-500 transition-colors"
              >
                <FaFacebook size={24} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-amber-500 transition-colors"
              >
                <FaInstagram size={24} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-amber-500 transition-colors"
              >
                <FaLinkedin size={24} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-amber-500 transition-colors"
              >
                <FaGithub size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Lien admin (caché) */}
        <div className="mt-8 text-center">
          <a 
            href="/admin" 
            className="text-gray-700 hover:text-gray-600 text-xs transition-colors"
          >
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
}