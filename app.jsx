import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './index.css';

function App() {
  const [page, setPage] = useState(1);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, []);

  const handleNext = () => {
    setPage(2);
    if (audioRef.current) audioRef.current.play();
  };

  // Genera flores animadas cayendo
  const flores = [...Array(20)].map((_, i) => ({
    id: i,
    left: Math.random() * 100 + '%',
    duration: 5 + Math.random() * 5
  }));

  return (
    <div className="App">
      <audio ref={audioRef} src="/Himno.mp3" loop></audio>

      {page === 1 && (
        <motion.section
          className="page page1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h1>Para: Aventura</h1>
          <motion.img
            src="https://i.imgur.com/6i7R4kJ.png"
            alt="Ramo de flores"
            className="flower"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={handleNext}
          >
            Púlsame
          </motion.button>
        </motion.section>
      )}

      {page === 2 && (
        <motion.section
          className="page page2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Flores cayendo */}
          {flores.map(f => (
            <motion.img
              key={f.id}
              src="/flor.png"
              className="flor-cayendo"
              style={{ left: f.left }}
              animate={{ y: ['-10vh', '110vh'], rotate: [0, 360] }}
              transition={{ duration: f.duration, repeat: Infinity, ease: 'linear' }}
            />
          ))}

          {/* Escudos */}
          <div className="escudos-container">
            {[...Array(8)].map((_, i) => (
              <motion.img
                key={i}
                src="/escudo.png"
                alt="Escudo Madrid"
                className="escudo"
                whileHover={{ scale: 1.5, rotate: 15 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
            ))}
          </div>

          {/* Foto central con luz */}
          <motion.div
            className="photo-container"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.img
              src="/ven.jpg"
              alt="Foto de Aventura"
              className="center-photo"
              whileHover={{ scale: 1.1, rotate: -2, boxShadow: '0 0 50px #FFD700' }}
            />
          </motion.div>
        </motion.section>
      )}
    </div>
  );
}

export default App;
