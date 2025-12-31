'use client';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaMobileAlt, FaShoppingCart, FaLeaf, FaSatellite, FaChartBar } from 'react-icons/fa';

export default function Services() {
  const services = [
    {
      icon: FaLaptopCode,
      title: 'Sites Web Responsifs',
      description: 'Développement de sites vitrine modernes et performants avec Next.js, React et Tailwind CSS',
      color: 'bg-blue-500'
    },
    {
      icon: FaShoppingCart,
      title: 'E-commerce',
      description: 'Création de boutiques en ligne complètes avec systèmes de paiement et gestion de stocks',
      color: 'bg-green-500'
    },
    {
      icon: FaMobileAlt,
      title: 'Applications Mobile',
      description: 'Développement d\'applications iOS et Android avec Flutter pour une expérience native',
      color: 'bg-purple-500'
    },
    {
      icon: FaLeaf,
      title: 'Agriculture Numérique',
      description: 'Solutions SIG, télédétection et systèmes d\'information géographique pour l\'agriculture',
      color: 'bg-amber-600'
    },
    {
      icon: FaSatellite,
      title: 'Télédétection',
      description: 'Analyse d\'images satellites et cartographie pour le suivi des cultures et des terres',
      color: 'bg-red-500'
    },
    {
      icon: FaChartBar,
      title: 'IA & Analyse de Données',
      description: 'Développement de solutions d\'intelligence artificielle pour l\'analyse prédictive agricole',
      color: 'bg-indigo-500'
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nos Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expertise complète en développement - de la conception web/mobile à l'agriculture numérique
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`${service.color} w-16 h-16 rounded-lg flex items-center justify-center mb-6`}>
                <service.icon className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}