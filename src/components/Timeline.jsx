// src/components/Timeline.js

import React from "react";
import { motion } from "framer-motion";

// Timeline data remains the same
const timelineData = [
  {
    time: "2:00 PM - 5:00 PM",
    title: "Games and Activities",
    description: "Location: Student Activity Center (SAC)",
  },
  {
    time: "5:00 PM - 7:30 PM",
    title: "Rampwalk and Performances",
    description: "Location: Central Seminar Hall (CSH)",
  },
  {
    time: "7:30 PM - 10:00 PM",
    title: "DJ and Dinner",
    description: "Location: Student Activity Center (SAC)",
  },
];

export const Timeline = () => {
  // --- NEW "Stranger Things" ANIMATION ---
  // This will make the cards "flip" into view, as if
  // flipping over from the Upside Down.
  const cardVariants = {
    hidden: (isLeft) => ({
      opacity: 0,
      x: isLeft ? -50 : 50, // Still slide a bit
      rotateX: -180, // Start flipped upside down
      scale: 0.9,
    }),
    visible: {
      opacity: 1,
      x: 0,
      rotateX: 0, // Animate to a flat state
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 14,
        duration: 0.8,
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-10">
      <h2 className="text-3xl md:text-4xl font text-[#CD2404] text-center mb-12 stroked-text text-black/20">
        Timeline of the Night
      </h2>
      
      <div className="relative">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-[#CD2404]/30 -translate-x-1/2"></div>

        <div className="relative flex flex-col gap-12">
          {timelineData.map((item, index) => {
            const isLeft = index % 2 === 0; 

            return (
              <motion.div
                key={index}
                custom={isLeft}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }} 
                
                className={`relative flex items-center md:w-1/2 ${
                  isLeft ? "md:self-start md:pr-16" : "md:self-end md:pl-16"
                }`}
              >
                {/* --- Z-INDEX FIX IS HERE ---
                  I added `relative` and `z-20` to this div.
                  This puts the card content *above* the dot (which is z-10).
                */}
                <div className="w-full bg-black/80 p-6 rounded-lg shadow-lg border-l-4 border-[#CD2404] relative z-20">
                  <span className="font text-xl text-[#FF5733]">{item.time}</span>
                  <h3 className="font text-2xl text-white my-1">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>

                {/* This dot is z-10, so it will now be *behind* the card content */}
                <div className="hidden md:block absolute left-1/2 top-1/2 w-5 h-5 bg-[#CD2404] rounded-full z-10 
                               -translate-y-1/2 -translate-x-1/2
                               ring-4 ring-black">
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};