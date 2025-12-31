'use client';
import { motion } from 'framer-motion';
import { FaCode, FaMobileAlt, FaLeaf, FaDatabase } from 'react-icons/fa';

export default function Hero() {
  const features = [
    { 
      icon: FaCode, 
      title: 'Web & Mobile', 
      desc: 'Next.js, React, Flutter' 
    },
    { 
      icon: FaMobileAlt, 
      title: 'Applications', 
      desc: 'iOS & Android' 
    },
    { 
      icon: FaLeaf, 
      title: 'Agriculture', 
      desc: 'SIG, Télédétection, envie , IA, ' 
    },
    { 
      icon: FaDatabase, 
      title: 'Data & IA', 
      desc: 'Analyse de données' 
    }
  ];

  return (
    <section id="accueil" className="pt-32 pb-20 bg-gradient-to-br from-amber-50 to-orange-100 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Texte à gauche */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Développeur Full-Stack
              <span className="text-amber-700"> & Agriculture Numérique</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Expert en développement web/mobile et informatique appliquée à l'agriculture.
              Spécialisé en SIG, télédétection et IA pour l'agriculture.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#services"
                className="bg-amber-700 text-white px-8 py-4 rounded-lg hover:bg-amber-800 transition-colors duration-300 font-semibold shadow-lg"
              >
                Découvrir mes services
              </a>
              <a
                href="#contact"
                className="border-2 border-amber-700 text-amber-700 px-8 py-4 rounded-lg hover:bg-amber-700 hover:text-white transition-all duration-300 font-semibold"
              >
                Me contacter
              </a>
            </div>
          </motion.div>

          {/* Cartes à droite */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-6"
          >
            {features.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <item.icon className="text-4xl text-amber-700 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}