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
      const target = new Date(targetDate);
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
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
            {timeLeft.days.toString().padStart(2, '0')}
          </div>
          <div className="text-xs sm:text-sm mt-1">Days</div>
        </div>
        <div className="text-center">
          <div className="bg-white text-black rounded-lg px-2 sm:px-4 py-1 sm:py-2 font-bold text-lg sm:text-2xl shadow-3d">
            {timeLeft.hours.toString().padStart(2, '0')}
          </div>
          <div className="text-xs sm:text-sm mt-1">Hours</div>
        </div>
        <div className="text-center">
          <div className="bg-white text-black rounded-lg px-2 sm:px-4 py-1 sm:py-2 font-bold text-lg sm:text-2xl shadow-3d">
            {timeLeft.minutes.toString().padStart(2, '0')}
          </div>
          <div className="text-xs sm:text-sm mt-1">Mins</div>
        </div>
        <div className="text-center">
          <div className="bg-white text-black rounded-lg px-2 sm:px-4 py-1 sm:py-2 font-bold text-lg sm:text-2xl shadow-3d">
            {timeLeft.seconds.toString().padStart(2, '0')}
          </div>
          <div className="text-xs sm:text-sm mt-1">Secs</div>
        </div>
      </div>
    </div>
  );
}
