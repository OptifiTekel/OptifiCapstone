"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Plus, Edit, Trash2 } from "lucide-react";

// Custom calendar components to improve interaction
const CustomCalendar = ({ events, ...props }: any) => {
  console.log("CustomCalendar received events:", events);
  return (
    <div className="calendar-container">
      <Calendar events={events} {...props} />
    </div>
  );
};

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  category: string;
  color: string;
  allDay?: boolean;
}

const categoryColors = {
  work: "#3b82f6",
  personal: "#10b981",
  meeting: "#f59e0b",
  reminder: "#ef4444",
  travel: "#8b5cf6",
  health: "#06b6d4",
};

const categories = [
  { value: "work", label: "Work", color: categoryColors.work },
  { value: "personal", label: "Personal", color: categoryColors.personal },
  { value: "meeting", label: "Meeting", color: categoryColors.meeting },
  { value: "reminder", label: "Reminder", color: categoryColors.reminder },
  { value: "travel", label: "Travel", color: categoryColors.travel },
  { value: "health", label: "Health", color: categoryColors.health },
];

export default function CalendarPage() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Team Meeting",
      start: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        15,
        10,
        0
      ),
      end: new Date(new Date().getFullYear(), new Date().getMonth(), 15, 11, 0),
      description: "Weekly team sync",
      category: "meeting",
      color: categoryColors.meeting,
    },
    {
      id: "2",
      title: "Doctor Appointment",
      start: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        16,
        14,
        0
      ),
      end: new Date(new Date().getFullYear(), new Date().getMonth(), 16, 15, 0),
      description: "Annual checkup",
      category: "health",
      color: categoryColors.health,
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [view, setView] = useState("month");

  const eventStyleGetter = useCallback((event: Event) => {
    return {
      style: {
        backgroundColor: event.color,
        borderRadius: "4px",
        opacity: 0.8,
        color: "white",
        border: "0px",
        display: "block",
      },
    };
  }, []);

  const handleSelect = useCallback(
    ({ start, end, action }: { start: Date; end: Date; action?: string }) => {
      // Create events on click, select, or touch actions
      if (action === "click" || action === "select" || action === "touch") {
        setSelectedEvent({
          id: "",
          title: "",
          start,
          end,
          description: "",
          category: "work",
          color: categoryColors.work,
        });
        setIsEventDialogOpen(true);
      }
    },
    []
  );

  const handleEventSelect = useCallback((event: Event) => {
    setSelectedEvent(event);
    setIsEventDialogOpen(true);
  }, []);

  const handleEventDrop = useCallback(
    ({ event, start, end }: { event: Event; start: Date; end: Date }) => {
      setEvents((prev) =>
        prev.map((e) => (e.id === event.id ? { ...e, start, end } : e))
      );
    },
    []
  );

  const handleEventResize = useCallback(
    ({ event, start, end }: { event: Event; start: Date; end: Date }) => {
      setEvents((prev) =>
        prev.map((e) => (e.id === event.id ? { ...e, start, end } : e))
      );
    },
    []
  );

  const handleSaveEvent = useCallback(
    (eventData: Partial<Event>) => {
      if (selectedEvent?.id) {
        // Update existing event
        setEvents((prev) =>
          prev.map((e) =>
            e.id === selectedEvent.id ? { ...e, ...eventData } : e
          )
        );
      } else {
        // Create new event
        const newEvent: Event = {
          id: Date.now().toString(),
          title: eventData.title || "",
          start: eventData.start || new Date(),
          end: eventData.end || new Date(),
          description: eventData.description || "",
          category: eventData.category || "work",
          color:
            categoryColors[eventData.category as keyof typeof categoryColors] ||
            categoryColors.work,
        };
        console.log("Creating new event:", newEvent);
        setEvents((prev) => {
          const updatedEvents = [...prev, newEvent];
          console.log("Updated events array:", updatedEvents);
          return updatedEvents;
        });
      }
      setIsEventDialogOpen(false);
      setSelectedEvent(null);
    },
    [selectedEvent]
  );

  const handleDeleteEvent = useCallback((eventId: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
    setIsEventDialogOpen(false);
    setSelectedEvent(null);
  }, []);

  const messages = {
    allDay: "All Day",
    previous: "<",
    next: ">",
    today: "Today",
    month: "Month",
    week: "Week",
    day: "Day",
    agenda: "Agenda",
    date: "Date",
    time: "Time",
    event: "Event",
    noEventsInRange: "There are no events in this range.",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        <div className="mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Calendar Event Scheduler
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage your events with day, week, and month views
          </p>
        </div>

        <Card className="mb-4 sm:mb-6">
          <CardHeader className="p-3 sm:p-6">
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <CalendarIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                Event Calendar
              </CardTitle>

              <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
                {/* Category badges - scrollable on mobile */}
                <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 sm:pb-0">
                  {categories.map((category) => (
                    <Badge
                      key={category.value}
                      style={{ backgroundColor: category.color }}
                      className="text-white text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
                    >
                      {category.label}
                    </Badge>
                  ))}
                </div>

                {/* Debug info - remove in production */}
                <div className="text-xs text-gray-500">
                  Events: {events.length}
                </div>

                {/* View buttons */}
                <div className="flex items-center gap-1 sm:gap-2">
                  <Button
                    variant={view === "day" ? "default" : "outline"}
                    size="sm"
                    className="text-xs sm:text-sm px-2 sm:px-3"
                    onClick={() => setView("day")}
                  >
                    Day
                  </Button>
                  <Button
                    variant={view === "week" ? "default" : "outline"}
                    size="sm"
                    className="text-xs sm:text-sm px-2 sm:px-3"
                    onClick={() => setView("week")}
                  >
                    Week
                  </Button>
                  <Button
                    variant={view === "month" ? "default" : "outline"}
                    size="sm"
                    className="text-xs sm:text-sm px-2 sm:px-3"
                    onClick={() => setView("month")}
                  >
                    Month
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-2 sm:p-6">
            <div className="h-[500px] sm:h-[500px] lg:h-[600px]">
              <CustomCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "100%" }}
                onSelectSlot={handleSelect}
                onSelectEvent={handleEventSelect}
                onEventDrop={handleEventDrop}
                onEventResize={handleEventResize}
                resizable
                popup
                messages={messages}
                view={view as any}
                onView={(newView: string) => setView(newView)}
                eventPropGetter={eventStyleGetter}
                step={60}
                timeslots={1}
                defaultView="month"
                min={new Date(0, 0, 0, 8, 0, 0)}
                max={new Date(0, 0, 0, 20, 0, 0)}
                selectable="ignoreEvents"
                longPressThreshold={100}
              />
            </div>
          </CardContent>
        </Card>

        <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
          <DialogContent className="w-[95vw] max-w-[425px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedEvent?.id ? "Edit Event" : "Add New Event"}
              </DialogTitle>
            </DialogHeader>
            <div className="relative">
              <EventForm
                event={selectedEvent}
                onSave={handleSaveEvent}
                onDelete={handleDeleteEvent}
                onCancel={() => {
                  setIsEventDialogOpen(false);
                  setSelectedEvent(null);
                }}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

interface EventFormProps {
  event: Event | null;
  onSave: (eventData: Partial<Event>) => void;
  onDelete: (eventId: string) => void;
  onCancel: () => void;
}

function EventForm({ event, onSave, onDelete, onCancel }: EventFormProps) {
  const [formData, setFormData] = useState({
    title: event?.title || "",
    description: event?.description || "",
    category: event?.category || "work",
    start: event?.start || new Date(),
    end: event?.end || new Date(),
    allDay: event?.allDay || false,
  });

  // Separate date and time state for better UX
  const [startDate, setStartDate] = useState(
    event?.start
      ? format(event.start, "yyyy-MM-dd")
      : format(new Date(), "yyyy-MM-dd")
  );
  const [startTime, setStartTime] = useState(
    event?.start ? format(event.start, "HH:mm") : "09:00"
  );
  const [endDate, setEndDate] = useState(
    event?.end
      ? format(event.end, "yyyy-MM-dd")
      : format(new Date(), "yyyy-MM-dd")
  );
  const [endTime, setEndTime] = useState(
    event?.end ? format(event.end, "HH:mm") : "10:00"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Combine date and time before saving
    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);

    onSave({
      ...formData,
      start: startDateTime,
      end: endDateTime,
    });
  };

  // Update formData when date/time changes
  const updateFormData = () => {
    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);

    setFormData((prev) => ({
      ...prev,
      start: startDateTime,
      end: endDateTime,
    }));
  };

  // Update formData whenever date/time changes
  React.useEffect(() => {
    updateFormData();
  }, [startDate, startTime, endDate, endTime]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm sm:text-base">
          Event Title
        </Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter event title"
          className="text-sm sm:text-base"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm sm:text-base">
          Description
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Enter event description"
          rows={3}
          className="text-sm sm:text-base"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category" className="text-sm sm:text-base">
          Category
        </Label>
        <Select
          value={formData.category}
          onValueChange={(value) =>
            setFormData({ ...formData, category: value })
          }
        >
          <SelectTrigger className="text-sm sm:text-base">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm sm:text-base">{category.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm sm:text-base font-medium">
            Start Date & Time
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label
                htmlFor="startDate"
                className="text-xs sm:text-sm text-gray-600"
              >
                Date
              </Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="text-sm sm:text-base"
                required
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="startTime"
                className="text-xs sm:text-sm text-gray-600"
              >
                Time
              </Label>
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="text-sm sm:text-base"
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm sm:text-base font-medium">
            End Date & Time
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label
                htmlFor="endDate"
                className="text-xs sm:text-sm text-gray-600"
              >
                Date
              </Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="text-sm sm:text-base"
                required
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="endTime"
                className="text-xs sm:text-sm text-gray-600"
              >
                Time
              </Label>
              <Input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="text-sm sm:text-base"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="allDay"
          checked={formData.allDay}
          onChange={(e) =>
            setFormData({ ...formData, allDay: e.target.checked })
          }
          className="w-4 h-4"
        />
        <Label htmlFor="allDay" className="text-sm sm:text-base">
          All Day Event
        </Label>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-2 sm:space-x-2">
        {event?.id && (
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="text-xs sm:text-sm"
            onClick={() => onDelete(event.id)}
          >
            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Delete
          </Button>
        )}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="text-xs sm:text-sm"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit" size="sm" className="text-xs sm:text-sm">
          {event?.id ? (
            <>
              <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Update
            </>
          ) : (
            <>
              <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Create
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
