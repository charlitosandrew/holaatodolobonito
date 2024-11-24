import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send } from 'lucide-react';
import SuccessPopup from './SuccessPopup';

interface CustomizationFormProps {
  product: {
    id: string;
    title: string;
    formTitle: string;
    options: {
      [key: string]: string[] | boolean;
    };
    gradient: string;
  };
  onBack: () => void;
}

const CustomizationForm: React.FC<CustomizationFormProps> = ({ product, onBack }) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create email content
    const mailtoLink = `mailto:hiatodolobonito@gmail.com?subject=Nueva solicitud de ${product.title}&body=${encodeURIComponent(`
Detalles del pedido:

Producto: ${product.title}
Email del cliente: ${email}
${Object.entries(formData)
  .map(([key, value]) => `${key}: ${value}`)
  .join('\n')}
    `)}`;

    // Open email client
    window.location.href = mailtoLink;
    
    // Show success popup
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onBack();
  };

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: {
        duration: 0.2
      }
    }
  };

  const optionsToShow = Object.entries(product.options).filter(([key]) => key !== 'customization');

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={formVariants}
        className="max-w-2xl mx-auto"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white mb-8 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver a productos
        </button>

        <div className={`bg-gradient-to-r ${product.gradient} p-1 rounded-2xl`}>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Personaliza tu {product.formTitle}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-white text-lg">
                  Tu correo electrónico:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="ejemplo@correo.com"
                  required
                />
              </div>

              {optionsToShow.map(([key, values]) => (
                <div key={key} className="space-y-2">
                  <label className="block text-white text-lg capitalize">
                    {key}:
                  </label>
                  <select
                    value={formData[key] || ''}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                    required
                  >
                    <option value="" disabled>Selecciona una opción</option>
                    {(values as string[]).map((option) => (
                      <option key={option} value={option} className="text-black">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}

              <div className="space-y-2">
                <label className="block text-white text-lg">
                  ¿Cómo quieres personalizarlo?
                </label>
                <textarea
                  value={formData.customization || ''}
                  onChange={(e) => setFormData({ ...formData, customization: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[100px]"
                  placeholder="Describe cómo quieres personalizar tu producto..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white/20 hover:bg-white/30 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-5 h-5" />
                Enviar solicitud
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>

      <SuccessPopup isOpen={showSuccess} onClose={handleSuccessClose} />
    </>
  );
};

export default CustomizationForm;