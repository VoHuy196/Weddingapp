import { type FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Image {
  id: number;
  src: string;
  alt: string;
}

const Gallery: FC = () => {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  // Placeholder images - thay thế bằng ảnh cưới thực tế của bạn
  const images: Image[] = [
    { id: 1, src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80', alt: 'Wedding Photo 1' },
    { id: 2, src: 'https://images.unsplash.com/photo-1469927160602-89924c0b747d?w=500&q=80', alt: 'Wedding Photo 2' },
    { id: 3, src: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=500&q=80', alt: 'Wedding Photo 3' },
    { id: 4, src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80', alt: 'Wedding Photo 4' },
    { id: 5, src: 'https://images.unsplash.com/photo-1469927160602-89924c0b747d?w=500&q=80', alt: 'Wedding Photo 5' },
    { id: 6, src: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=500&q=80', alt: 'Wedding Photo 6' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-gray-800 mb-4">
            Những Khoảnh Khắc Yêu Thương
          </h2>
          <p className="text-gray-600 text-lg">
            Hình ảnh ghi lại các khoảnh khắc đẹp nhất của chúng mình
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {images.map((image) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedImage(image)}
              className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group aspect-square"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <svg
                    className="w-12 h-12 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                    />
                  </svg>
                  <p className="font-semibold">Xem Ảnh</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full"
              >
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-auto rounded-lg"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-200 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;
