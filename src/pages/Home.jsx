import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button";

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-3xl text-center">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Bem-vindo à Experiência FURIA
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-400 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Entre no universo dos fãs mais apaixonados do CS. Conheça estatísticas, jogadores, curiosidades e muito mais.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <Button onClick={() => navigate('/chat')}>Começar</Button>
        </motion.div>
      </div>
    </div>
  )
}