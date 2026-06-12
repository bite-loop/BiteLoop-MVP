// components/restaurant/operating-hours.tsx
import { useState } from "react";
import { Calendar, ChevronRight } from "lucide-react";
import type { OperatingHours as OperatingHoursType } from "@/types/restaurant";
import { Button } from "@/components/ui/button";

interface OperatingHoursProps {
  operatingHours: OperatingHoursType;
}

export default function OperatingHours({ operatingHours }: OperatingHoursProps) {
  const [showHours, setShowHours] = useState(false);

  const getDayName = (day: string) => {
    const days: Record<string, string> = {
      monday: "Monday", tuesday: "Tuesday", wednesday: "Wednesday",
      thursday: "Thursday", friday: "Friday", saturday: "Saturday", sunday: "Sunday"
    };
    return days[day];
  };

  return (
    <div className="mb-6">
      <Button
        variant="ghost"
        onClick={() => setShowHours(!showHours)}
        className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-4"
      >
        <Calendar className="w-4 h-4" />
        {showHours ? "Hide" : "Show"} Operating Hours
        <ChevronRight className={`w-4 h-4 transition-transform ${showHours ? "rotate-90" : ""}`} />
      </Button>

      {showHours && (
        <div className="bg-secondary/20 rounded-xl p-4 mb-8">
          <h3 className="font-semibold mb-3">Operating Hours</h3>
          <div className="space-y-2">
            {Object.entries(operatingHours).map(([day, hours]) => (
              <div key={day} className="flex justify-between text-sm">
                <span className="font-medium">{getDayName(day)}</span>
                {hours.isOpen ? (
                  <span className="text-muted-foreground">{hours.openTime} - {hours.closeTime}</span>
                ) : (
                  <span className="text-destructive">Closed</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}