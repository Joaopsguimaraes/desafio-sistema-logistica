import { motion } from 'framer-motion'
import { TruckIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingScreenProps {
  className?: string
}

export function LoadingScreen({ className }: LoadingScreenProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50',
        className,
      )}
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <div className="relative">
            <motion.div
              animate={{ scale: 2 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="text-coach-600"
            >
              <TruckIcon size={48} />
            </motion.div>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 rounded-full bg-coach-400/30 blur-xl"
              style={{ zIndex: -1 }}
            />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-xl font-bold text-gray-900 mb-2"
        >
          Logística
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="h-1 bg-coach-600 rounded-full mb-4"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-sm text-muted-foreground"
        >
          Carregando...
        </motion.div>
      </div>
    </div>
  )
}
