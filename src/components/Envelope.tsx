import { type FC, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnvelopeProps {
  onComplete: () => void;
}

const BASE = import.meta.env.BASE_URL;

const Envelope: FC<EnvelopeProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);
  const [opening, setOpening] = useState(false);

  const dismiss = useCallback(() => {
    setVisible(false);
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    // Tự động mở sau 1.2s để người dùng thấy cái "khóa" ô vuông hoàn chỉnh
    const t1 = setTimeout(() => setOpening(true), 1200);
    const t2 = setTimeout(() => dismiss(), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [dismiss]);

  const ease = [0.76, 0, 0.24, 1] as const;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] overflow-hidden flex items-center justify-center"
          style={{ background: '#C0181B' }} // Nền đỏ trùng màu thiệp
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* CÁNH TRÁI - Chứa một nửa ô vuông bên trái + TOÀN BỘ CON DẤU */}
          <motion.div
            className="absolute top-0 bottom-0 left-0 overflow-hidden"
            // SỬA Ở ĐÂY: Tăng width tràn qua điểm giữa 80px để không cắt con dấu
            // Đặt zIndex: 10 để cánh trái đè lên cánh phải
            style={{ width: 'calc(50vw + 80px)', zIndex: 10 }}
            initial={{ x: 0 }}
            animate={opening ? { x: '-100%' } : { x: 0 }}
            transition={{ duration: 1.5, ease }}
          >
            <img
              src={`${BASE}vothiep.png`}
              alt="Cánh trái"
              className="h-full w-[100vw] max-w-none object-fill"
              style={{
                position: 'absolute',
                left: 0,
              }}
            />
          </motion.div>

          {/* CÁNH PHẢI - Chứa một nửa ô vuông bên phải */}
          <motion.div
            className="absolute top-0 bottom-0 right-0 overflow-hidden"
            // SỬA Ở ĐÂY: zIndex: 5 (nhỏ hơn trái) để nằm dưới con dấu của cánh trái
            style={{ width: '50vw', zIndex: 5 }}
            initial={{ x: 0 }}
            animate={opening ? { x: '100%' } : { x: 0 }}
            transition={{ duration: 1.5, ease }}
          >
            <img
              src={`${BASE}vothiep2.png`}
              alt="Cánh phải"
              className="h-full w-[100vw] max-w-none object-fill"
              style={{
                position: 'absolute',
                right: 0,
              }}
            />
          </motion.div>

          {/* Nút bỏ qua */}
          <button
            onClick={dismiss}
            className="absolute bottom-10 z-[20] px-6 py-2 rounded-full bg-white/10 text-white text-xs border border-white/20 backdrop-blur-md transition-opacity hover:bg-white/20"
          >
            Bỏ qua →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Envelope;