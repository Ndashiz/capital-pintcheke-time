import { useState } from "react";
import { Button } from "@/components/ui/button";
import BeerLoading from "@/components/BeerLoading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ViewState = "question" | "loading" | "result";

const DAYS = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
];

const Index = () => {
  const [view, setView] = useState<ViewState>("question");
  const [isThursday, setIsThursday] = useState(false);
  const [simulatedDay, setSimulatedDay] = useState<number | null>(null);
  const [devDialogOpen, setDevDialogOpen] = useState(false);

  const checkIfThursday = () => {
    const today = simulatedDay !== null ? simulatedDay : new Date().getDay();
    return today === 4; // Thursday is 4 in JavaScript (0 = Sunday)
  };

  const handleAnswer = () => {
    setView("loading");
    const thursday = checkIfThursday();
    setIsThursday(thursday);

    // Show loading for 2 seconds
    setTimeout(() => {
      setView("result");
    }, 2500);
  };

  const handleReset = () => {
    setView("question");
  };

  if (view === "loading") {
    return <BeerLoading />;
  }

  if (view === "result") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
        <div className="max-w-2xl text-center">
          {isThursday ? (
            <>
              <h1 className="mb-8 text-4xl font-bold text-primary md:text-6xl">
                Yes bruv, it's time to propose a pintcheke to your colleagues
              </h1>
              <div className="mb-8 overflow-hidden rounded-2xl border-4 border-primary/30">
                <iframe
                  src="https://giphy.com/embed/l0IykI5OLMkal48s8"
                  width="480"
                  height="270"
                  className="w-full"
                  frameBorder="0"
                  allowFullScreen
                  title="Trump Dancing"
                />
              </div>
            </>
          ) : (
            <h1 className="mb-8 text-4xl font-bold text-muted-foreground md:text-6xl">
              Not yet king, it's not Thursday yet
            </h1>
          )}
          <Button
            onClick={handleReset}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Check Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="max-w-2xl text-center">
        <h1 className="mb-12 text-5xl font-bold text-primary md:text-7xl">
          Is it capital o'clock?
        </h1>
        <Button
          onClick={handleAnswer}
          size="lg"
          className="bg-primary px-12 py-6 text-xl font-bold text-primary-foreground hover:bg-primary/90"
        >
          Answer
        </Button>
      </div>

      <Dialog open={devDialogOpen} onOpenChange={setDevDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="fixed bottom-4 right-4"
          >
            Developer Mode
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Simulate a Day</DialogTitle>
            <DialogDescription>
              Select a day to simulate for testing purposes
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2 py-4">
            {DAYS.map((day) => (
              <Button
                key={day.value}
                variant={simulatedDay === day.value ? "default" : "outline"}
                onClick={() => {
                  setSimulatedDay(day.value);
                  setDevDialogOpen(false);
                }}
                className="w-full"
              >
                {day.label}
              </Button>
            ))}
            {simulatedDay !== null && (
              <Button
                variant="secondary"
                onClick={() => {
                  setSimulatedDay(null);
                  setDevDialogOpen(false);
                }}
                className="w-full mt-2"
              >
                Reset to Real Day
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
