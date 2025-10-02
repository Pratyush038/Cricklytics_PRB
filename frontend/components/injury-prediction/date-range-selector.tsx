import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface DateRangeSelectorProps {
  timeRange: string;
  onTimeRangeChange: (timeRange: string) => void;
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  startCalendarOpen: boolean;
  setStartCalendarOpen: (open: boolean) => void;
  endCalendarOpen: boolean;
  setEndCalendarOpen: (open: boolean) => void;
  startDateValue: Date | undefined;
  setStartDateValue: (date: Date | undefined) => void;
  endDateValue: Date | undefined;
  setEndDateValue: (date: Date | undefined) => void;
  onApplyCustomRange: () => void;
  className?: string;
}

export function DateRangeSelector({
  timeRange,
  onTimeRangeChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  startCalendarOpen,
  setStartCalendarOpen,
  endCalendarOpen,
  setEndCalendarOpen,
  startDateValue,
  setStartDateValue,
  endDateValue,
  setEndDateValue,
  onApplyCustomRange,
  className = ""
}: DateRangeSelectorProps) {
  const handleStartDateSelect = (date: Date | undefined) => {
    if (date) {
      setStartDateValue(date);
      onStartDateChange(format(date, 'yyyy-MM-dd'));
      setStartCalendarOpen(false);
    }
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    if (date) {
      setEndDateValue(date);
      onEndDateChange(format(date, 'yyyy-MM-dd'));
      setEndCalendarOpen(false);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="space-y-2">
        <Label>Quick Time Ranges</Label>
        <Select value={timeRange} onValueChange={onTimeRangeChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="14d">Last 14 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 3 months</SelectItem>
            <SelectItem value="180d">Last 6 months</SelectItem>
            <SelectItem value="365d">Last year</SelectItem>
            <SelectItem value="all">All time</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {timeRange === "custom" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start-date">From Date</Label>
            <Popover open={startCalendarOpen} onOpenChange={setStartCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`w-full justify-start text-left font-normal ${
                    !startDate && "text-muted-foreground"
                  }`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDateValue || new Date(startDate), "PPP") : "Pick start date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDateValue}
                  onSelect={handleStartDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="end-date">To Date</Label>
            <Popover open={endCalendarOpen} onOpenChange={setEndCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`w-full justify-start text-left font-normal ${
                    !endDate && "text-muted-foreground"
                  }`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDateValue || new Date(endDate), "PPP") : "Pick end date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDateValue}
                  onSelect={handleEndDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="md:col-span-2 flex justify-end">
            <Button onClick={onApplyCustomRange} className="w-full md:w-auto">
              Apply Custom Range
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
