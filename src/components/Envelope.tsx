import { type FC, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnvelopeProps {
  onComplete: () => void;
}

const BASE = import.meta.env.BASE_URL;

const Envelope: FC<EnvelopeProps> = ({ onComplete }) => {
  const [visible,  setVisible]  = useState(true);
  const [opening,  setOpening]  = useState(false);

  const dismiss = useCallback(() => {
    setVisible(false);
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const t1 = setTimeout(() => setOpening(true), 400);   // bắt đầu mở sớm
    const t2 = setTimeout(() => dismiss(),         1550);  // dismiss ngay khi slide gần xong
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [dismiss]);

  const ease = [0.76, 0, 0.24, 1] as const;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] overflow-hidden"
          // Nền đỏ lấp mọi khoảng trống giữa 2 ảnh
          style={{ background: '#C0181B' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* ── Nửa TRÁI ────────────────────────────────────── */}
          <motion.div
            className="absolute top-0 bottom-0 left-0 overflow-hidden"
            style={{ width: '50vw' }}
            animate={opening ? { x: '-100%' } : { x: 0 }}
            transition={{ duration: 1.0, ease }}
          >
            {/* Ảnh rộng 100vw gắn trái → hiện nửa trái */}
            <img
              src={`${BASE}vothiep.png`}
              alt=""
              style={{
                position: 'absolute',
                top: 0, left: 0,
                width: '100vw',
                height: '100%',
                objectFit: 'fill',
                display: 'block',
              }}
            />
          </motion.div>

          {/* ── Nửa PHẢI ────────────────────────────────────── */}
          <motion.div
            className="absolute top-0 bottom-0 right-0 overflow-hidden"
            style={{ width: '50vw' }}
            animate={opening ? { x: '100%' } : { x: 0 }}
            transition={{ duration: 1.0, ease }}
          >
            {/* Ảnh rộng 100vw gắn phải → hiện nửa phải */}
            <img
              src={`${BASE}vothiep2.png`}
              alt=""
              style={{
                position: 'absolute',
                top: 0, right: 0,
                width: '100vw',
                height: '100%',
                objectFit: 'fill',
                display: 'block',
              }}
            />
          </motion.div>

          {/* Nút bỏ qua */}
          <button
            onClick={dismiss}
            className="absolute bottom-6 right-6 z-10 text-sm"
            style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Quicksand, sans-serif' }}
          >
            Bỏ qua →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Envelope;
