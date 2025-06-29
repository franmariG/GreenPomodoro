import React, { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import useIsMobile from "@/hooks/useIsMobile"

export default function PreviewApp() {
  const isMobile = useIsMobile()

  const images = isMobile
    ? [
        "/previewApp/previewAppMobile-1.png",
        "/previewApp/previewAppMobile-2.png",
        "/previewApp/previewAppMobile-3.png",
        "/previewApp/previewAppMobile-4.png",
        "/previewApp/previewAppMobile-5.png",
      ]
    : [
        "/previewApp/previewApp-1.png",
        "/previewApp/previewApp-2.png",
        "/previewApp/previewApp-3.png",
        "/previewApp/previewApp-4.png",
        "/previewApp/previewApp-5.png",
      ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [loadedImages, setLoadedImages] = useState(Array(images.length).fill(false))
  const [allImagesLoaded, setAllImagesLoaded] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (loadedImages.every(Boolean)) {
      setAllImagesLoaded(true)
    }
  }, [loadedImages])

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => {
      const updated = [...prev]
      updated[index] = true
      return updated
    })
  }

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)
  }

  const resetInterval = () => {
    clearInterval(intervalRef.current)
    startInterval()
  }

  useEffect(() => {
    startInterval()
    return () => clearInterval(intervalRef.current)
  }, [])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    resetInterval()
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    resetInterval()
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
    resetInterval()
  }

  return (
    <section className="bg-gradient-to-tr from-white to-green-100 py-16">
      <div className="w-full px-4 md:px-6 text-center mb-12">
        <motion.h2
          className="text-3xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Vista previa de la aplicación
        </motion.h2>

        <motion.p
          className="text-gray-600 max-w-2xl text-lg mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Una interfaz limpia y minimalista diseñada para maximizar tu productividad mientras cuidas el medio ambiente.
        </motion.p>

        {/* Carrusel */}
        <div className="max-w-4xl mx-auto mt-12 flex items-center justify-center gap-4">
          <button
            onClick={goToPrevious}
            className="bg-green-600 text-white p-2 rounded-full shadow-lg opacity-75 hover:opacity-100 transition-opacity flex-shrink-0"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="relative w-full aspect-[9/16] md:aspect-[16/9] max-w-sm sm:max-w-3xl">
            <Card className="overflow-hidden shadow-2xl w-full h-full relative">
              <CardContent className="p-0 bg-gradient-to-br from-green-300 to-green-400 w-full h-full flex items-center justify-center relative">
                {!allImagesLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10">
                    <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={`App Preview ${currentIndex + 1}`}
                    onLoad={() => handleImageLoad(currentIndex)}
                    className="w-full h-full object-contain rounded-lg"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>

          <button
            onClick={goToNext}
            className="bg-green-600 text-white p-2 rounded-full shadow-lg opacity-75 hover:opacity-100 transition-opacity flex-shrink-0"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Puntos indicadores */}
        <div className="flex justify-center mt-4 space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
                currentIndex === index ? "bg-green-600" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  )
}