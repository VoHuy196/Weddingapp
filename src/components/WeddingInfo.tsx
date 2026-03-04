import { type FC } from 'react';
import { motion } from 'framer-motion';

const WeddingInfo: FC = () => {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-gray-800 mb-4">
            Thông Tin Lễ Cưới
          </h2>
          <p className="text-gray-600 text-lg">
            Chúng tôi mong bạn tham dự buổi lễ trọng đại của mình
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Ceremony */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-gold-50 to-yellow-50 rounded-2xl p-8 border-2 border-gold-200 shadow-lg"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-gray-800">Lễ Cưới</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-gold-500 mr-3 mt-1 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 110 20 10 10 0 010-20zm0 18a8 8 0 100-16 8 8 0 000 16zm3.5-9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
                <div>
                  <p className="font-semibold text-gray-800">Thời Gian</p>
                  <p className="text-gray-600">16 Tháng 4, 2026 · 17:00 - 19:00</p>
                </div>
              </div>

              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-gold-500 mr-3 mt-1 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-semibold text-gray-800">Địa Điểm</p>
                  <p className="text-gray-600">
                    Nhà Thờ / Hội Trường Cưới<br />
                    Địa chỉ: [Điền địa chỉ cụ thể]<br />
                    TP. [Tên thành phố], Việt Nam
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-gold-500 mr-3 mt-1 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.26.559.668 1.3 1.414 2.046.746.746 1.487 1.153 2.046 1.414l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <div>
                  <p className="font-semibold text-gray-800">Liên Hệ</p>
                  <p className="text-gray-600">
                    Huy: 0913 456 789<br />
                    Cô Dâu: 0912 345 678
                  </p>
                </div>
              </div>
            </div>

            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#"
              className="mt-6 inline-block btn-primary"
            >
              Chỉ Đường
            </motion.a>
          </motion.div>

          {/* Reception */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-8 border-2 border-rose-200 shadow-lg"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-gray-800">Tiệc Cưới</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-rose-500 mr-3 mt-1 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 110 20 10 10 0 010-20zm0 18a8 8 0 100-16 8 8 0 000 16zm3.5-9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
                <div>
                  <p className="font-semibold text-gray-800">Thời Gian</p>
                  <p className="text-gray-600">16 Tháng 4, 2026 · 19:30 - 23:00</p>
                </div>
              </div>

              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-rose-500 mr-3 mt-1 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-semibold text-gray-800">Địa Điểm</p>
                  <p className="text-gray-600">
                    Nhà Hàng / Khách Sạn [Tên]<br />
                    Địa chỉ: [Điền địa chỉ cụ thể]<br />
                    TP. [Tên thành phố], Việt Nam
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-rose-500 mr-3 mt-1 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14.004 6.414 15.76c1.782 1.752 3.94 2.646 5.96 2.646.92 0 1.797-.182 2.6-.535A6.996 6.996 0 0017 16a1 1 0 100-2 5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 .92.182 1.797.535 2.6.353.803.814 1.526 1.373 2.085a1 1 0 11-1.414 1.414c-.94-.94-1.759-2.108-2.308-3.597-.549-1.489-.849-3.124-.849-4.913a5 5 0 0110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 .92.182 1.797.535 2.6.353.803.814 1.526 1.373 2.085a1 1 0 11-1.414 1.414c-.94-.94-1.759-2.108-2.308-3.597-.549-1.489-.849-3.124-.849-4.913a5 5 0 0110 0 1 1 0 11-2 0 3 3 0 10-6 0z" />
                </svg>
                <div>
                  <p className="font-semibold text-gray-800">Menu</p>
                  <p className="text-gray-600">
                    Đặc sản địa phương<br />
                    Nước uống và tráng miệng
                  </p>
                </div>
              </div>
            </div>

            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#"
              className="mt-6 inline-block px-8 py-3 bg-rose-500 text-white font-semibold rounded-lg hover:bg-rose-600 transition-colors duration-300"
            >
              Chỉ Đường
            </motion.a>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden shadow-2xl border-2 border-gold-200"
        >
          <iframe
            className="w-full h-96"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3823.8427897640827!2d104.92209759999999!3d21.029169700000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31341a2d0000bb1d%3A0x8f9f4d0c0d0d0d0d!2zSMOgIE7hu5lpIEJpbmggVMESb25nLCBWaWV0bmFt!5e0!3m2!1svi!2s!4v1234567890"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default WeddingInfo;
