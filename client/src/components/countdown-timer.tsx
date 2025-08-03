import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string | Date;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      try {
        const target = new Date(targetDate);
        const now = new Date();
        
        // Check if target date is valid
        if (isNaN(target.getTime())) {
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        
        const difference = target.getTime() - now.getTime();

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((difference / 1000 / 60) % 60);
          const seconds = Math.floor((difference / 1000) % 60);
          
          // Ensure no NaN values
          return {
            days: isNaN(days) ? 0 : days,
            hours: isNaN(hours) ? 0 : hours,
            minutes: isNaN(minutes) ? 0 : minutes,
            seconds: isNaN(seconds) ? 0 : seconds,
          };
        }

        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      } catch (error) {
        console.warn('Invalid target date for countdown:', targetDate);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="countdown-box text-white p-4 sm:p-6 text-center">
      <h3 className="text-lg sm:text-xl font-semibold mb-4">STAGE ENDS IN:</h3>
      <div className="flex justify-center space-x-2 sm:space-x-4 mb-2">
        <div className="text-center">
          <div className="bg-white text-black rounded-lg px-2 sm:px-4 py-1 sm:py-2 font-bold text-lg sm:text-2xl shadow-3d">
            {(timeLeft.days || 0).toString().padStart(2, '0')}
          </div>
          <div className="text-xs sm:text-sm mt-1">Days</div>
        </div>
        <div className="text-center">
          <div className="bg-white text-black rounded-lg px-2 sm:px-4 py-1 sm:py-2 font-bold text-lg sm:text-2xl shadow-3d">
            {(timeLeft.hours || 0).toString().padStart(2, '0')}
          </div>
          <div className="text-xs sm:text-sm mt-1">Hours</div>
        </div>
        <div className="text-center">
          <div className="bg-white text-black rounded-lg px-2 sm:px-4 py-1 sm:py-2 font-bold text-lg sm:text-2xl shadow-3d">
            {(timeLeft.minutes || 0).toString().padStart(2, '0')}
          </div>
          <div className="text-xs sm:text-sm mt-1">Mins</div>
        </div>
        <div className="text-center">
          <div className="bg-white text-black rounded-lg px-2 sm:px-4 py-1 sm:py-2 font-bold text-lg sm:text-2xl shadow-3d">
            {(timeLeft.seconds || 0).toString().padStart(2, '0')}
          </div>
          <div className="text-xs sm:text-sm mt-1">Secs</div>
        </div>
      </div>
    </div>
  );
}
