'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    service: '',
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const services = [
    'Site Web Vitrine',
    'Site E-commerce',
    'Application Mobile (Flutter)',
    'Application Web',
    'SIG & Télédétection',
    'Agriculture Numérique',
    'Analyse de Données IA',
    'Autre'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (data.success) {
        // Ouvrir WhatsApp dans un nouvel onglet
        window.open(data.whatsappUrl, '_blank');
        
        // Réinitialiser le formulaire
        setFormData({ service: '', name: '', email: '', message: '' });
        
        alert('Votre message va s\'ouvrir dans WhatsApp !');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contactez-nous
          </h2>
          <p className="text-xl text-gray-600">
            Téléphone : <a href="tel:+221763900159" className="text-amber-700 hover:underline">+221 763900159</a><br />
            Email : <a href="mailto:bassiroufaye765@gmail.com" className="text-amber-700 hover:underline">bassiroufaye765@gmail.com</a><br />
            Adresse : Kaolack, Dakar, thés, Sénégal
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Informations de contact */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Horaires d'ouverture
              </h3>
              <div className="space-y-4 text-gray-600">
                <div className="flex justify-between">
                  <span className="font-semibold">Lundi - Vendredi :</span>
                  <span>08:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Samedi :</span>
                  <span>08:00 - 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Dimanche :</span>
                  <span>Fermé</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
              <div className="flex items-start space-x-4">
                <FaWhatsapp className="text-3xl text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900">WhatsApp</h4>
                  <p className="text-gray-600">+221 763900159</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <FaEnvelope className="text-3xl text-amber-700 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900">Email</h4>
                  <p className="text-gray-600">bassiroufaye765@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <FaMapMarkerAlt className="text-3xl text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900">Adresse</h4>
                  <p className="text-gray-600">Adresse : Kaolack, Dakar, thés, Sénégal</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Formulaire de contact */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg">
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Service souhaité *
                </label>
                <select
                  required
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent outline-none"
                >
                  <option value="">Sélectionnez un service</option>
                  {services.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent outline-none"
                  placeholder="Votre nom"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent outline-none"
                  placeholder="votre@email.com"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Message *
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent outline-none resize-none"
                  placeholder="Décrivez votre projet en détail..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-700 text-white py-4 rounded-lg hover:bg-amber-800 transition-colors duration-300 font-semibold text-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaWhatsapp className="text-2xl" />
                <span>{loading ? 'Envoi...' : 'Commander via WhatsApp'}</span>
              </button>

              <p className="text-sm text-gray-500 mt-4 text-center">
                En cliquant, vous serez redirigé vers WhatsApp avec votre message
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}