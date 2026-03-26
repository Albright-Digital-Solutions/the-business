import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Availability {
  id: number;
  date: string;
  slot: 'morning' | 'afternoon';
  is_blocked: number;
}

interface CalendarProps {
  onSelectSlot: (date: string, slot: string) => void;
  isAdmin?: boolean;
}

export default function Calendar({ onSelectSlot, isAdmin = false }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  const fetchAvailability = async () => {
    setLoading(true);
    try {
      const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString().split('T')[0];
      const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString().split('T')[0];
      
      const response = await fetch("/api/availability?start=" + startDate + "&end=" + endDate);
      if (!response.ok) throw new Error('Failed to fetch availability');
      
      const data = await response.json();
      setAvailability(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Could not load calendar');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, [currentDate.getMonth(), currentDate.getFullYear()]);

  const toggleAdminBlock = async (dateStr: string, slot: string, isCurrentlyBlocked: boolean) => {
    if (!isAdmin) return;
    try {
      const res = await fetch('/api/admin/block-slot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: dateStr, slot, is_blocked: !isCurrentlyBlocked }),
      });
      if (res.ok) {
        fetchAvailability();
      }
    } catch (err) {
      console.error('Failed to toggle slot', err);
    }
  };

  const handleSlotClick = (dateStr: string, slotStr: string, isBlocked: boolean) => {
    if (isAdmin) {
      toggleAdminBlock(dateStr, slotStr, isBlocked);
    } else {
      if (!isBlocked) {
        onSelectSlot(dateStr, slotStr);
      }
    }
  };

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    for (let i = 0; i < firstDay; i++) {
        days.push(<div key={"empty-" + i} className="p-2 border border-transparent"></div>);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let day = 1; day <= daysInMonth; day++) {
        const dateObj = new Date(year, month, day);
        const dateStr = [
            year,
            String(month + 1).padStart(2, '0'),
            String(day).padStart(2, '0')
        ].join('-');
        
        const isPast = dateObj < today && !isAdmin;
        const isSelected = selectedDate?.toDateString() === dateObj.toDateString();
        // Allow Saturday (6), only block Sunday (0)
        const isWeekend = dateObj.getDay() === 0;

        const dayAvailability = availability.filter(a => a.date === dateStr);
        
        let morningStatus = 'available';
        let afternoonStatus = 'available';

        const morningData = dayAvailability.find(a => a.slot === 'morning');
        const afternoonData = dayAvailability.find(a => a.slot === 'afternoon');

        if (morningData && morningData.is_blocked) morningStatus = 'blocked';
        if (afternoonData && afternoonData.is_blocked) afternoonStatus = 'blocked';
        if (isWeekend && !isAdmin) {
            morningStatus = 'unavailable';
            afternoonStatus = 'unavailable';
        }

        const isFullyBlocked = morningStatus !== 'available' && afternoonStatus !== 'available';

        let classNames = "relative p-3 min-h-[80px] border border-white/5 transition-all ";
        classNames += (isPast || (isFullyBlocked && !isAdmin)) 
            ? "opacity-30 cursor-not-allowed bg-black/40 " 
            : "cursor-pointer hover:bg-zinc-900/60 ";
        classNames += isSelected ? "bg-red-600/10 border-red-500/50 " : "bg-zinc-900/30 ";

        let dayNumClass = "text-sm font-bold ";
        dayNumClass += isSelected ? "text-red-500" : "text-zinc-300";

        days.push(
            <div 
                key={day} 
                onClick={() => !isPast && !isFullyBlocked && setSelectedDate(dateObj)}
                className={classNames}
            >
                <div className={dayNumClass}>{day}</div>
                {!isPast && (!isWeekend || isAdmin) && (
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                        <div className={"w-2 h-2 rounded-full " + (morningStatus === 'available' ? 'bg-emerald-500' : morningStatus === 'blocked' ? 'bg-red-500' : 'bg-transparent')} title="Morning (8am-12pm)"></div>
                        <div className={"w-2 h-2 rounded-full " + (afternoonStatus === 'available' ? 'bg-emerald-500' : afternoonStatus === 'blocked' ? 'bg-red-500' : 'bg-transparent')} title="Afternoon (1pm-5pm)"></div>
                    </div>
                )}
            </div>
        );
    }

    return days;
  };

  const renderSelectedDaySlots = () => {
    if (!selectedDate) return null;

    const dateStr = [
        selectedDate.getFullYear(),
        String(selectedDate.getMonth() + 1).padStart(2, '0'),
        String(selectedDate.getDate()).padStart(2, '0')
    ].join('-');
    const dayAvailability = availability.filter(a => a.date === dateStr);
    
    const slots = [
        { id: 'morning', label: 'Morning (8:00 AM - 12:00 PM)' },
        { id: 'afternoon', label: 'Afternoon (1:00 PM - 5:00 PM)' }
    ];

    return (
        <motion.div 
            className="mt-6 border-t border-white/10 pt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h3 className="font-bold text-white mb-4 uppercase tracking-wider text-sm flex items-center justify-between">
                <span>Available Times on {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                {isAdmin && <span className="text-xs bg-red-600 text-white px-2 py-1 rounded">Admin Mode</span>}
            </h3>
            
            <div className="space-y-3">
                {slots.map(slot => {
                    const dbSlot = dayAvailability.find(a => a.slot === slot.id);
                    const isBlocked = !!(dbSlot && dbSlot.is_blocked);
                    
                    let btnClass = "w-full flex items-center justify-between p-4 border transition-all text-left uppercase tracking-widest text-xs font-bold ";
                    if (isBlocked) {
                        btnClass += isAdmin ? "border-red-500/50 bg-red-500/10 text-red-400 hover:bg-red-500/20" : "border-white/5 bg-black/50 text-zinc-600 cursor-not-allowed";
                    } else {
                        btnClass += "border-white/20 bg-zinc-900/50 text-white hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400";
                    }

                    return (
                        <button
                            key={slot.id}
                            onClick={() => handleSlotClick(dateStr, slot.id, isBlocked)}
                            disabled={isBlocked && !isAdmin}
                            className={btnClass}
                        >
                            <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {slot.label}
                            </span>
                            
                            <span>
                                {isBlocked ? (isAdmin ? 'Blocked (Click to Unblock)' : 'Unavailable') : 'Available'}
                            </span>
                        </button>
                    )
                })}
            </div>
            {!isAdmin && (
                <p className="text-xs text-zinc-500 mt-4 flex items-start gap-2 leading-relaxed">
                    <Info className="w-4 h-4 shrink-0 text-zinc-400" />
                    Selecting a time slot requires a $100 non-refundable deposit to hold the reservation. Estimates are completely free.
                </p>
            )}
        </motion.div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-white uppercase tracking-tight">
          {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex gap-2">
          <button 
            onClick={handlePrevMonth}
            className="p-2 border border-white/20 hover:bg-white/5 transition-colors text-white"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={handleNextMonth}
            className="p-2 border border-white/20 hover:bg-white/5 transition-colors text-white"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {error ? (
        <div className="p-4 bg-red-500/10 border border-red-500/50 text-red-500 text-sm">
          {error}
        </div>
      ) : (
        <>
            <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs font-bold text-zinc-500 uppercase tracking-widest py-2">
                    {day}
                </div>
                ))}
            </div>
            
            <div className={"grid grid-cols-7 gap-1 " + (loading ? 'opacity-50 pointer-events-none' : '')}>
                {renderCalendarDays()}
            </div>

            <AnimatePresence>
                {selectedDate && renderSelectedDaySlots()}
            </AnimatePresence>
        </>
      )}
    </div>
  );
}
