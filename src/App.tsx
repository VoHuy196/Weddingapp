import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Envelope       from './components/Envelope';
import InvitationCard from './components/InvitationCard';
import Footer         from './components/Footer';

function getGuestName(): string {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get('guest')?.trim();
  return raw && raw.length > 0 ? raw : 'Bạn và Người thương';
}

function App() {
  const [envelopeDone, setEnvelopeDone] = useState(false);
  const guestName = getGuestName();

  const handleEnvelopeComplete = useCallback(() => setEnvelopeDone(true), []);

  return (
    <div className="bg-white">

      {/* Envelope overlay – tự ẩn khi xong */}
      {!envelopeDone && (
        <Envelope guestName={guestName} onComplete={handleEnvelopeComplete} />
      )}

      {/*
        Pre-render nội dung nhưng ẩn bằng visibility:hidden trong lúc envelope còn.
        Khi envelopeDone=true → visible ngay, không cần mount lại → không bị delay.
      */}
      <motion.div
        style={{ visibility: envelopeDone ? 'visible' : 'hidden' }}
        animate={{ opacity: envelopeDone ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <InvitationCard guestName={guestName} />
        <Footer />
      </motion.div>

    </div>
  );
}

export default App;
