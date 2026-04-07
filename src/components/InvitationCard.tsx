import { type FC } from 'react';
import { motion } from 'framer-motion';

// ─── Khung viền từ ảnh ───────────────────────────────────────────────────────
const BORDER_URL = `${import.meta.env.BASE_URL}khungvien.png`;

/** Khung viền phủ toàn trang, không che nội dung */
const PageBorder: FC = () => (
  <div
    aria-hidden
    className="absolute inset-0 z-10 pointer-events-none"
    style={{ minHeight: '100%' }}
  >
    <img
      src={BORDER_URL}
      alt=""
      className="w-full h-full"
      style={{ objectFit: 'fill', opacity: 0.9, display: 'block' }}
    />
  </div>
);

// ─── Song Hỷ + fringe ─────────────────────────────────────────────────────────
const SongHy: FC = () => (
  <div className="flex flex-col items-center mb-6">
    <div className="flex items-center justify-center rounded-full border-4 shadow-lg"
      style={{ width: 96, height: 96, background: '#D62828', borderColor: '#D4AF37' }}>
      <span style={{ color: '#fff', fontSize: 44, fontFamily: 'serif', lineHeight: 1 }}>囍</span>
    </div>
    <div className="flex gap-1 mt-2">
      {[14, 18, 22, 26, 22, 30, 22, 26, 22, 18, 14].map((h, i) => (
        <div key={i} className="flex flex-col items-center gap-0.5">
          <div style={{ width: 2, height: h, background: '#D4AF37', borderRadius: 1 }} />
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#D4AF37' }} />
        </div>
      ))}
    </div>
  </div>
);

// ─── Divider ──────────────────────────────────────────────────────────────────
const GoldDivider: FC = () => (
  <div className="flex items-center gap-3 my-6 w-full max-w-xs mx-auto">
    <div className="flex-1 h-px" style={{ background: '#D4AF37' }} />
    <span style={{ color: '#D4AF37', fontSize: 16 }}>✦</span>
    <div className="flex-1 h-px" style={{ background: '#D4AF37' }} />
  </div>
);

// ─── Event card ──────────────────────────────────────────────────────────────
interface EventInfo {
  title:    string;
  time:     string;
  dayLabel: string;
  date:     string;
  lunar:    string;
  venue:    string;
  address?: string;
  mapUrl?:  string;
}

const EventCard: FC<EventInfo> = ({ title, time, dayLabel, date, lunar, venue, address, mapUrl }) => (
  <div className="rounded-2xl border p-5 text-center" style={{ borderColor: '#D4AF3355', background: '#fffdf8' }}>
    <p className="text-xs font-bold tracking-widest uppercase mb-2"
       style={{ color: '#D4AF37', fontFamily: 'Quicksand, sans-serif', letterSpacing: '0.2em' }}>
      {title}
    </p>
    <p className="text-2xl font-bold" style={{ color: '#D62828', fontFamily: 'Quicksand, sans-serif' }}>{time}</p>
    <p className="text-sm font-semibold text-gray-700 mt-1" style={{ fontFamily: 'Quicksand, sans-serif' }}>
      {dayLabel} · {date}
    </p>
    <p className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: 'Quicksand, sans-serif' }}>{lunar}</p>
    <div className="my-3 h-px w-10 mx-auto" style={{ background: '#D4AF37' }} />
    <p className="text-sm font-semibold text-gray-800" style={{ fontFamily: 'Quicksand, sans-serif' }}>{venue}</p>
    {address && <p className="text-xs text-gray-500 mt-1 leading-relaxed" style={{ fontFamily: 'Quicksand, sans-serif' }}>{address}</p>}
    {mapUrl && (
      <a href={mapUrl} target="_blank" rel="noopener noreferrer"
         className="inline-block mt-3 px-4 py-1.5 rounded-full text-xs font-bold border transition-colors"
         style={{ borderColor: '#D62828', color: '#D62828', fontFamily: 'Quicksand, sans-serif' }}>
        📍 Xem bản đồ
      </a>
    )}
  </div>
);

// ─── Photo Gallery ────────────────────────────────────────────────────────────
// ✏️ Điền URL ảnh vào mảng bên dưới (có thể thêm hoặc bớt phần tử)
const PHOTOS: string[] = [
  '', '', '', '', '', '',
];

const PhotoGallery: FC = () => (
  <section className="py-12 px-4">
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7 }}
                className="text-center mb-8">
      <p className="text-xs font-bold tracking-widest uppercase mb-2"
         style={{ color: '#D4AF37', fontFamily: 'Quicksand, sans-serif', letterSpacing: '0.25em' }}>
        ✦ Khoảnh Khắc ✦
      </p>
      <h2 className="font-serif text-2xl md:text-3xl text-gray-800">Những Khoảnh Khắc Đẹp</h2>
    </motion.div>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
      {PHOTOS.map((src, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
          className="aspect-square rounded-xl overflow-hidden shadow-md"
          style={{ background: '#f9f5ef', border: '1px solid #D4AF3344' }}>
          {src ? (
            <img src={src} alt={`Ảnh ${i + 1}`}
                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 opacity-40">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
              <span style={{ fontSize: 11, color: '#D4AF37', fontFamily: 'Quicksand, sans-serif' }}>Ảnh {i + 1}</span>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  </section>
);

// ─── Fade-up helper ───────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true },
  transition:  { duration: 0.75, delay },
});

// ─── Main InvitationCard ──────────────────────────────────────────────────────
interface InvitationCardProps { guestName: string; }

const InvitationCard: FC<InvitationCardProps> = ({ guestName }) => {
  // ═══════════════════════════════════════════════════════
  //  🎊 THÔNG TIN CẶP ĐÔI – chỉnh sửa tại đây
  // ═══════════════════════════════════════════════════════
  const GROOM = 'Phạm Tá';
  const BRIDE = 'Thu Huyền';

  // Để father rỗng ('') nếu không có / đã mất
  const GROOM_FAMILY = {
    father:  '',
    mother:  'Vũ Thị Mỵ',
    address: 'Nam Hồng, Tiền Hải, Thái Bình (cũ)',
  };
  const BRIDE_FAMILY = {
    father:  'Nguyễn Trọng Phương',
    mother:  'Nguyễn Thị Lê',
    address: '14/93 Trần Xuân Soạn, P. Đông Thọ, TP. Thanh Hóa',
  };

  // ── Các sự kiện ──────────────────────────────────────
  const EVENTS_TRAI: EventInfo[] = [
    {
      title:    'Lễ Thành Hôn',
      time:     '11:15',
      dayLabel: 'Thứ Tư',
      date:     '22/04/2026',
      lunar:    'Mùng 6 tháng 3 năm Bính Ngọ',
      venue:    'Tư gia nhà trai',
      address:  'Nam Hồng, Tiền Hải, Thái Bình',
    },
    {
      title:    'Tiệc Mừng Lễ Thành Hôn',
      time:     '17:30',
      dayLabel: 'Thứ Ba',
      date:     '21/04/2026',
      lunar:    'Mùng 5 tháng 3 năm Bính Ngọ',
      venue:    'Tư gia nhà trai',
      address:  'Nam Hồng, Tiền Hải, Thái Bình (cũ)',
      mapUrl:   'https://www.google.com/maps/place//@20.3272472,106.5081915,19z/data=!3m1!4b1!4m6!1m5!3m4!2zMjDCsDE5JzM4LjMiTiAxMDbCsDMwJzI4LjciRQ!8m2!3d20.3273056!4d106.5079722?entry=ttu&g_ep=EgoyMDI2MDQwMS4wIKXMDSoASAFQAw%3D%3D',
    },
  ];

  const EVENTS_GAI: EventInfo[] = [
    {
      title:    'Lễ Nạp Tài',
      time:     '15:00',
      dayLabel: 'Thứ Bảy',
      date:     '18/04/2026',
      lunar:    'Mùng 2 tháng 3 năm Bính Ngọ',
      venue:    'Tư gia nhà gái',
      address:  'P. Hàm Rồng, TP. Thanh Hóa',
    },
    {
      title:    'Tiệc Mừng Lễ Nạp Tài',
      time:     '17:15',
      dayLabel: 'Thứ Bảy',
      date:     '18/04/2026',
      lunar:    'Mùng 2 tháng 3 năm Bính Ngọ',
      venue:    'Nhà khách Z111',
      address:  '284 Bà Triệu, P. Hàm Rồng, TP. Thanh Hóa',
      mapUrl:   'https://maps.app.goo.gl/rgxg5XzKvSQkKpwb6',
    },
  ];
  // ═══════════════════════════════════════════════════════

  const sf = { fontFamily: 'Quicksand, sans-serif' };

  return (
    <div className="relative">
      <PageBorder />

      <main className="relative bg-transparent"
            style={{ paddingLeft: 'clamp(28px,5vw,56px)', paddingRight: 'clamp(28px,5vw,56px)' }}>

        {/* ── Header ───────────────────────────────────── */}
        <section className="flex flex-col items-center text-center pt-12 pb-8">

          <motion.p {...fadeUp(0)} className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: '#D4AF37', ...sf, letterSpacing: '0.3em' }}>
            🌸&ensp;Kính Mời&ensp;🌸
          </motion.p>

          <motion.p {...fadeUp(0.08)} className="text-lg font-bold mb-5"
            style={{ color: '#D62828', ...sf }}>
            {guestName}
          </motion.p>

          <GoldDivider />

          <motion.div {...fadeUp(0.15)}><SongHy /></motion.div>

          <motion.p {...fadeUp(0.2)} className="text-sm tracking-widest text-gray-600 mt-2 mb-4"
            style={{ ...sf, letterSpacing: '0.15em' }}>
            Trân Trọng Báo Tin Lễ Thành Hôn Của
          </motion.p>

          {/* Tên cặp đôi */}
          <motion.div {...fadeUp(0.25)} className="leading-none my-4 text-center">
            <span style={{ fontFamily: "'Great Vibes','Dancing Script',cursive", fontSize: 'clamp(58px,11vw,96px)', color: '#1a1a1a', lineHeight: 1.1 }}>
              {GROOM}
            </span>
            <span className="block font-serif font-bold"
                  style={{ fontSize: 'clamp(30px,5vw,48px)', color: '#D62828', lineHeight: 1.5 }}>
              &amp;
            </span>
            <span style={{ fontFamily: "'Great Vibes','Dancing Script',cursive", fontSize: 'clamp(58px,11vw,96px)', color: '#1a1a1a', lineHeight: 1.1 }}>
              {BRIDE}
            </span>
          </motion.div>

          <GoldDivider />
        </section>

        {/* ── Thông tin phụ huynh ──────────────────────── */}
        <motion.section {...fadeUp(0)}
          className="py-8 border-t border-b max-w-2xl mx-auto w-full"
          style={{ borderColor: '#D4AF3344' }}>
          <div className="relative flex flex-col sm:flex-row gap-6">
            {/* vertical divider */}
            <div className="hidden sm:block absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2"
                 style={{ background: '#D4AF3766' }} />

            {/* NHÀ TRAI */}
            <div className="flex-1 text-center px-3">
              <p className="text-xs font-bold tracking-widest uppercase mb-3"
                 style={{ color: '#D4AF37', ...sf, letterSpacing: '0.22em' }}>NHÀ TRAI</p>
              {GROOM_FAMILY.father && (
                <p className="text-sm font-semibold text-gray-700" style={sf}>
                  Ông <strong className="text-gray-900">{GROOM_FAMILY.father}</strong>
                </p>
              )}
              <p className="text-sm font-semibold text-gray-700" style={sf}>
                {GROOM_FAMILY.father ? '& ' : ''}Bà <strong className="text-gray-900">{GROOM_FAMILY.mother}</strong>
              </p>
              <p className="text-xs text-gray-500 mt-1" style={sf}>{GROOM_FAMILY.address}</p>
              <div className="mt-3 h-px w-10 mx-auto" style={{ background: '#D4AF37' }} />
              <p className="mt-2 text-xs tracking-widest uppercase text-gray-500" style={sf}>Chú Rể</p>
              <p className="font-bold text-gray-900" style={{ ...sf, fontSize: 16 }}>{GROOM}</p>
            </div>

            {/* NHÀ GÁI */}
            <div className="flex-1 text-center px-3">
              <p className="text-xs font-bold tracking-widest uppercase mb-3"
                 style={{ color: '#D4AF37', ...sf, letterSpacing: '0.22em' }}>NHÀ GÁI</p>
              {BRIDE_FAMILY.father && (
                <p className="text-sm font-semibold text-gray-700" style={sf}>
                  Ông <strong className="text-gray-900">{BRIDE_FAMILY.father}</strong>
                </p>
              )}
              <p className="text-sm font-semibold text-gray-700" style={sf}>
                {BRIDE_FAMILY.father ? '& ' : ''}Bà <strong className="text-gray-900">{BRIDE_FAMILY.mother}</strong>
              </p>
              <p className="text-xs text-gray-500 mt-1" style={sf}>{BRIDE_FAMILY.address}</p>
              <div className="mt-3 h-px w-10 mx-auto" style={{ background: '#D4AF37' }} />
              <p className="mt-2 text-xs tracking-widest uppercase text-gray-500" style={sf}>Cô Dâu</p>
              <p className="font-bold text-gray-900" style={{ ...sf, fontSize: 16 }}>{BRIDE}</p>
            </div>
          </div>
        </motion.section>

        {/* ── Events NHÀ TRAI ──────────────────────────── */}
        <motion.section {...fadeUp(0)} className="py-10 max-w-2xl mx-auto w-full">
          <p className="text-center text-xs font-bold tracking-widest uppercase mb-6"
             style={{ color: '#D4AF37', ...sf, letterSpacing: '0.25em' }}>✦ Lịch Nhà Trai ✦</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {EVENTS_TRAI.map((ev) => <EventCard key={ev.title} {...ev} />)}
          </div>
        </motion.section>

        {/* Ornamental divider */}
        <div className="w-full max-w-xs mx-auto flex items-center gap-3 mb-2">
          <div className="flex-1 h-px" style={{ background: '#D4AF3788' }} />
          <span style={{ color: '#D4AF37', fontSize: 20 }}>❧</span>
          <div className="flex-1 h-px" style={{ background: '#D4AF3788' }} />
        </div>

        {/* ── Events NHÀ GÁI ───────────────────────────── */}
        <motion.section {...fadeUp(0)} className="py-10 max-w-2xl mx-auto w-full">
          <p className="text-center text-xs font-bold tracking-widest uppercase mb-6"
             style={{ color: '#D4AF37', ...sf, letterSpacing: '0.25em' }}>✦ Lịch Nhà Gái ✦</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {EVENTS_GAI.map((ev) => <EventCard key={ev.title} {...ev} />)}
          </div>
        </motion.section>

        {/* ── Lời mời ──────────────────────────────────── */}
        <motion.section {...fadeUp(0)} className="py-8 text-center max-w-lg mx-auto">
          <div className="rounded-2xl border p-6" style={{ borderColor: '#D4AF3344', background: '#fffdf8' }}>
            <p className="text-2xl mb-2">💕</p>
            <p className="text-sm text-gray-600 leading-relaxed" style={sf}>
              Sự hiện diện của&nbsp;
              <span className="font-bold" style={{ color: '#D62828' }}>{guestName}</span>
              &nbsp;chính là niềm hạnh phúc lớn nhất của chúng mình trong ngày đặc biệt này.
            </p>
          </div>
        </motion.section>

      </main>

      {/* ── Gallery ảnh ──────────────────────────────────── */}
      <div style={{ paddingLeft: 'clamp(28px,5vw,56px)', paddingRight: 'clamp(28px,5vw,56px)' }}>
        <PhotoGallery />
      </div>
    </div>
  );
};

export default InvitationCard;
