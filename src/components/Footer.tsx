import React, { FC } from 'react';
import { motion } from 'framer-motion';

const Footer: FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Thank You */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="font-serif text-2xl mb-4">Cảm Ơn</h3>
            <p className="text-gray-300 leading-relaxed">
              Chúng tôi vô cùng biết ơn sự có mặt và chúc phúc của bạn trong ngày trọng đại của mình.
            </p>
          </motion.div>

          {/* QR Code */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="font-serif text-2xl mb-4">Mừng Cưới</h3>
            <div className="bg-white p-4 rounded-lg inline-block">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VIETQR00010378935808HUY%20AND%20BRIDE"
                alt="QR Code Mừng Cưới"
                className="w-32 h-32"
              />
            </div>
            <p className="text-gray-300 text-sm mt-4">Quét QR để mừng cưới</p>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="font-serif text-2xl mb-4">Liên Hệ</h3>
            <p className="text-gray-300 mb-2">
              <svg
                className="w-5 h-5 inline-block mr-2 text-gold-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              contact@wedding.com
            </p>
            <p className="text-gray-300 mb-2">
              <svg
                className="w-5 h-5 inline-block mr-2 text-gold-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.26.559.668 1.3 1.414 2.046.746.746 1.487 1.153 2.046 1.414l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              +84 913 456 789
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <div className="text-3xl">💕</div>
            <p className="text-gray-400">
              © 2024 Huy & Cô Dâu | Tạo với yêu thương
            </p>
            <p className="text-gray-500 text-sm">
              "Tình yêu là chọn được cùng một người để yêu lâu dài" ❤️
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
