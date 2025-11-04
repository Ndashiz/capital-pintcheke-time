import { useEffect, useState } from "react";

const BeerLoading = () => {
  const [fillHeight, setFillHeight] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFillHeight(100);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="relative mx-auto mb-8 h-48 w-32">
          {/* Beer glass */}
          <div className="absolute inset-0 rounded-b-3xl border-4 border-primary/30 bg-transparent">
            {/* Beer liquid */}
            <div
              className="absolute bottom-0 left-0 right-0 rounded-b-3xl bg-gradient-to-t from-[hsl(var(--beer-amber))] to-[hsl(var(--beer-gold))] transition-all duration-[2000ms] ease-out"
              style={{ height: `${fillHeight}%` }}
            />
            {/* Foam */}
            {fillHeight > 80 && (
              <div className="absolute -top-6 left-0 right-0 h-8">
                <div className="foam-bubble absolute left-1/4 top-0 h-4 w-4 rounded-full bg-[hsl(var(--beer-foam))]" />
                <div
                  className="foam-bubble absolute left-1/2 top-1 h-5 w-5 rounded-full bg-[hsl(var(--beer-foam))]"
                  style={{ animationDelay: "0.3s" }}
                />
                <div
                  className="foam-bubble absolute right-1/4 top-0 h-4 w-4 rounded-full bg-[hsl(var(--beer-foam))]"
                  style={{ animationDelay: "0.6s" }}
                />
              </div>
            )}
          </div>
        </div>
        <p className="text-2xl font-bold text-primary">Pouring your beer...</p>
      </div>
    </div>
  );
};

export default BeerLoading;
