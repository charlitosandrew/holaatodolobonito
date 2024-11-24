import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ProductWidgetProps {
  product: {
    id: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    gradient: string;
  };
  onSelect: () => void;
}

const ProductWidget: React.FC<ProductWidgetProps> = ({ product, onSelect }) => {
  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full bg-gradient-to-r ${product.gradient} p-1 rounded-2xl`}
    >
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 h-full">
        <div className="flex flex-col items-center text-white">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            {product.icon}
          </motion.div>
          <h3 className="text-2xl font-bold mb-4">{product.title}</h3>
          <p className="text-lg opacity-90 mb-6 text-center">
            {product.description}
          </p>
          <motion.div
            whileHover={{ x: 10 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex items-center gap-2 text-lg font-semibold"
          >
            Personalizar
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </div>
      </div>
    </motion.button>
  );
};

export default ProductWidget;