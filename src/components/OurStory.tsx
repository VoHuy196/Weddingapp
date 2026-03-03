import { type FC } from 'react';
import { motion } from 'framer-motion';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

const OurStory: FC = () => {
  const timeline: TimelineItem[] = [
    {
      year: '2018',
      title: 'Lần Gặp Đầu Tiên',
      description: 'Chúng mình gặp nhau tại một buổi họp mặt bạn bè và từ đó tâm sự không thôi 💕',
    },
    {
      year: '2020',
      title: 'Những Lần Hẹn Hò',
      description: 'Thời gian ta dành cho nhau từ những bữa cơm đơn giản đến những chuyến du lịch xa xôi.',
    },
    {
      year: '2022',
      title: 'Lời Cầu Hôn',
      description: 'Anh quỳ gối dưới ánh trăng và hỏi em: "Bạn có muốn là vợ của anh không?" 💍',
    },
    {
      year: '2024',
      title: 'Tình Yêu Trọn Vẹn',
      description: 'Chúng mình sắp nên vợ chồng và bắt đầu chương mới của tình yêu 👰💒',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="section-padding bg-gradient-to-b from-rose-50 to-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-gray-800 mb-4">
            Câu Chuyện Của Chúng Ta
          </h2>
          <p className="text-gray-600 text-lg">
            Hành trình tình yêu từ ngày gặp gỡ đến hôm nay
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-gold-300 via-gold-500 to-rose-400"></div>

          {timeline.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`mb-12 md:mb-16 flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Content */}
              <div className="md:w-1/2 md:px-8">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl p-6 md:p-8 shadow-lg border-2 border-gold-200 hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="text-gold-600 font-serif text-3xl font-bold mb-2">
                    {item.year}
                  </div>
                  <h3 className="font-serif text-2xl text-gray-800 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </div>

              {/* Timeline dot */}
              <div className="hidden md:flex md:w-0 justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="relative"
                >
                  <div className="w-6 h-6 bg-gold-500 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="absolute inset-0 w-6 h-6 bg-gold-500 rounded-full opacity-20 animate-ping"></div>
                </motion.div>
              </div>

              {/* Empty space for layout */}
              <div className="hidden md:block md:w-1/2"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Heart decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <div className="text-6xl">💕</div>
          <p className="text-gray-600 mt-4 text-lg font-light">
            Và chúng mình sẽ yêu thương nhau mãi mãi...
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OurStory;
