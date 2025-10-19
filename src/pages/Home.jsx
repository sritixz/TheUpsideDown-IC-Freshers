// src/pages/Home.jsx

import { Fog } from "../components/Fog";
import tree1 from "../assets/tree1.svg";
import tree2 from "../assets/tree2.svg";
import tree3 from "../assets/tree3.svg";
import { Countdown } from "../components/Countdown";
import { useEffect, useMemo, useState } from "react";
import { Timeline } from "../components/Timeline";
import { motion } from "framer-motion";

// --- Dummy "database" of invited guests (kept for future use) ---
// This is just a placeholder until your login system is built.
const invitedGuests = {
  "sritiz.ic.25@nitj.ac.in": {
    name: "Sritiz",
    rollNumber: "2511XXXX",
    branch: "Instrumentation & Control",
    status: "Hellfire Club VIP",
  },
  "someone.ic.24@nitj.ac.in": {
    name: "Jane Hopper",
    rollNumber: "2411XXXX",
    branch: "Psychology (Guest)",
    status: "Protected by Max",
  },
};


function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const eventDate = useMemo(() => new Date("2025-11-01T18:00:00+05:30"), []);
  
  // --- NEW state for download button ---
  const [isDownloading, setIsDownloading] = useState(false);

  // This email/handleSubmit logic is removed, as it will be on a separate login page.
  // const [email, setEmail] = useState("");
  // const handleSubmit = () => { ... };

  useEffect(() => {
    function updateCountdown() {
      const now = new Date();
      const diff = eventDate - now;

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [eventDate]);

  const swayVariants = {
    sway: {
      rotate: [0, -2, 0, 2, 0], 
      transition: {
        duration: 8, 
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    glow: {
      filter: [
        "drop-shadow(0 0px 5px rgba(205, 36, 4, 0.4))",
        "drop-shadow(0 0px 15px rgba(205, 36, 4, 0.8))",
        "drop-shadow(0 0px 5px rgba(205, 36, 4, 0.4))",
      ],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // --- NEW: handleDownloadPass function to fetch from backend ---
  const handleDownloadPass = async () => {
    if (isDownloading) return; // Prevent multiple clicks
    setIsDownloading(true);

    // 1. Get user data (placeholder for your auth system)
    // This will eventually come from your login/auth state
    const userEmail = Object.keys(invitedGuests)[0];
    const userData = invitedGuests[userEmail];

    try {
      // 2. Fetch the PDF from your backend API
      // REPLACE '/api/get-ticket' with your actual endpoint
      const response = await fetch('/api/get-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${yourAuthToken}` // Add auth token later
        },
        body: JSON.stringify({ email: userEmail, rollNumber: userData.rollNumber }),
      });

      if (!response.ok) {
        throw new Error('Ticket not found or error generating PDF.');
      }

      // 3. Get the PDF file as a 'blob'
      const pdfBlob = await response.blob();

      // 4. Create a temporary URL for the blob
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // 5. Create a temporary link to trigger the download
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `StrangerThings_Pass_${userData.rollNumber}.pdf`; // The filename
      
      // 6. Trigger the download
      document.body.appendChild(link);
      link.click();
      
      // 7. Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(pdfUrl);

    } catch (error) {
      console.error('Failed to download ticket:', error);
      alert('Could not download your ticket. Please try again later.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    // Use React Fragment <> to wrap multiple root elements
    <>
      <div className="w-[100vw] min-h-screen h-full flex flex-col gap-8 justify-center items-center py-10 overflow-x-hidden  relative">
        <div className="flex absolute top-0">
          <Fog />
        </div>
        <div className="flex justify-center items-center flex-col">
          <h1 className="font flex gap-3 stroked-text text-black/20 text-4xl md:text-6xl text-center">
            WELCOME TO THE UPSIDE{" "}
            <p className="rotate-x-180 bottom-5 relative">NWOD</p>
          </h1>
          <h3 className="font stroked-text text-black/20 text-2xl md:text-4xl text-center">
            Something STRANGE awaits...
          </h3>
        </div>
        <div className="font text-[#CD2404]">The portal is opening in</div>
        <div className="flex gap-8 md:gap-16 py-5">
          <Countdown num={timeLeft.days} text={"days"} />
          <Countdown num={timeLeft.hours} text={"hours"} />
          <Countdown num={timeLeft.minutes} text={"minutes"} />
          <Countdown num={timeLeft.seconds} text={"seconds"} />
        </div>
        
        {/* --- Animated Tree Images --- */}
        <div className="absolute z-[-10] left-0 bottom-0">
          <motion.img
            className="w-[200px] md:w-[400px]"
            src={tree1}
            alt=""
            variants={swayVariants}
            animate={["sway", "glow"]}
          />
        </div>
        <div className="absolute z-[-10] right-0 bottom-0">
          <motion.img
            className="w-[200px] md:w-[400px]"
            src={tree2}
            alt=""
            variants={swayVariants}
            animate={["sway", "glow"]}
            transition={{ ...swayVariants.sway.transition, delay: 1 }}
          />
        </div>
        <div className="absolute z-[-10] right-14 top-0">
          <motion.img
            className="w-[200px] md:w-[400px]"
            src={tree3}
            alt=""
            variants={swayVariants}
            animate={["sway", "glow"]}
            transition={{ ...swayVariants.sway.transition, delay: 0.5 }}
          />
        </div>
        
        {/* The responsive form container is now removed */}
      </div>

      {/* Make sure Timeline has a bg color so it's not transparent */}
      <div className="bg-black">
        <Timeline />
      </div>

      {/* --- Download Pass Section --- */}
      <div className="w-full flex flex-col items-center justify-center py-10 bg-black">
        <h2 className="text-3xl font text-[#CD2404] text-center mb-4 stroked-text text-black/20">
          Get Your Pass
        </h2>
        <button
          onClick={handleDownloadPass}
          disabled={isDownloading} // Disable button while downloading
          className="bg-[#CD2404] rounded-lg p-4 px-8 font-bold font text-white text-xl hover:bg-[#FF5733] transition-all duration-300 shadow-lg hover:shadow-[#CD2404]/50
                     disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isDownloading ? 'Downloading...' : 'Download Your Invitation'}
        </button>
      </div>
    </>
  );
}

export default Home;