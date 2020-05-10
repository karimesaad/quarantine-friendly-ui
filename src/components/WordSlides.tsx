import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";

const variants = {
  enter: {
    y: "100%",
    opacity: 1,
  },
  center: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: "-100%",
    opacity: 1,
  },
};

interface WordSlidesProps {
  words: string[];
  width?: number;
  interval?: number;
  className?: string;
  style?: React.CSSProperties;
}

const WordSlides = ({
  words = [],
  width = 150,
  interval = 2000,
  className,
  style,
}: WordSlidesProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => {
      clearInterval(id);
    };
  }, [interval, words.length]);

  return (
    <AnimatePresence>
      <span
        className={className}
        style={{
          width,
          ...style,
          overflow: "hidden",
          display: "block",
        }}
      >
        <motion.div
          key={words[index]}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          {words[index]}
        </motion.div>
      </span>
    </AnimatePresence>
  );
};

export default WordSlides;
