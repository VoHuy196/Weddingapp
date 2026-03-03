import { type FC, useState, type ChangeEvent, type FormEvent } from 'react';
import { motion } from 'framer-motion';

interface FormData {
  name: string;
  phone: string;
  message: string;
  attendance: 'yes' | 'no';
}

const RSVP: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    message: '',
    attendance: 'yes',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // gửi dữ liệu đến sheet.best
      const response = await fetch(
        'https://api.sheetbest.com/sheets/95fa570c-5998-4de8-a4e2-1fed5fca22ba',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log('RSVP Form Data sent to Sheet.best', formData);
        setSubmitted(true);
        // reset form immediately
        setFormData({
          name: '',
          phone: '',
          message: '',
          attendance: 'yes',
        });
        // clear success message after a few seconds
        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
      } else {
        const text = await response.text();
        console.error('Sheet.best returned error', response.status, text);
      }
    } catch (err) {
      console.error('Network error sending RSVP', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="section-padding bg-gradient-to-b from-white to-yellow-50">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-gray-800 mb-4">
            Xác Nhận Tham Dự
          </h2>
          <p className="text-gray-600 text-lg">
            Vui lòng cho chúng mình biết bạn sẽ tham dự bằng cách điền form dưới đây
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border-2 border-gold-200"
        >
          {/* Tên */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
              Họ và Tên <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold-500 focus:outline-none transition-colors"
              placeholder="Nhập họ tên của bạn"
            />
          </div>

          {/* Số điện thoại */}
          <div className="mb-6">
            <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
              Số Điện Thoại <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold-500 focus:outline-none transition-colors"
              placeholder="Nhập số điện thoại"
            />
          </div>

          {/* Lựa chọn tham dự */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-4">
              Bạn có thể tham dự không? <span className="text-rose-500">*</span>
            </label>
            <div className="flex gap-6">
              <motion.label
                whileHover={{ scale: 1.02 }}
                className="flex items-center cursor-pointer"
              >
                <input
                  type="radio"
                  name="attendance"
                  value="yes"
                  checked={formData.attendance === 'yes'}
                  onChange={handleChange}
                  className="w-5 h-5 text-gold-500 cursor-pointer"
                />
                <span className="ml-3 text-gray-700 font-medium">Tôi sẽ tham dự</span>
              </motion.label>
              <motion.label
                whileHover={{ scale: 1.02 }}
                className="flex items-center cursor-pointer"
              >
                <input
                  type="radio"
                  name="attendance"
                  value="no"
                  checked={formData.attendance === 'no'}
                  onChange={handleChange}
                  className="w-5 h-5 text-rose-500 cursor-pointer"
                />
                <span className="ml-3 text-gray-700 font-medium">Tôi không thể tham dự</span>
              </motion.label>
            </div>
          </div>

          {/* Lời chúc */}
          <div className="mb-8">
            <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
              Lời Chúc (Tùy Chọn)
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold-500 focus:outline-none transition-colors resize-none"
              placeholder="Gửi lời chúc của bạn cho cô dâu và chú rể..."
            ></textarea>
          </div>

          {/* Submit button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? 'Đang gửi…'
              : submitted
              ? '✓ Cảm ơn bạn!'
              : 'Gửi Xác Nhận'}
          </motion.button>

          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-green-50 border-2 border-green-300 rounded-lg text-green-700 text-center font-semibold"
            >
              Cảm ơn! Chúng tôi đã nhận được xác nhận của bạn 💕
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default RSVP;
