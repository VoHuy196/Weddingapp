import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Envelope      from './components/Envelope';
import InvitationCard from './components/InvitationCard';
import RSVPModal     from './components/RSVPModal';

function getGuestName(): string {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get('guest')?.trim();
  return raw && raw.length > 0 ? raw : 'Bạn và Người thương';
}

function App() {
  const [envelopeVisible, setEnvelopeVisible] = useState(true);
  const [modalOpen,       setModalOpen]       = useState(false);
  const guestName = getGuestName();

  const handleEnvelopeComplete = useCallback(() => setEnvelopeVisible(false), []);

  return (
    <div className="relative min-h-screen bg-white">

      {/* Nội dung chính – luôn nằm sẵn dưới lớp Envelope */}
      <main className="relative z-10">
        <InvitationCard guestName={guestName} onOpenModal={() => setModalOpen(true)} />
      </main>

      {/* Envelope overlay */}
      <AnimatePresence>
        {envelopeVisible && (
          <Envelope onComplete={handleEnvelopeComplete} />
        )}
      </AnimatePresence>

      {/* RSVP / Lời chúc modal */}
      <AnimatePresence>
        {modalOpen && (
          <RSVPModal guestName={guestName} onClose={() => setModalOpen(false)} />
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;