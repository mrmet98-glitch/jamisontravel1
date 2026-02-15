import React, { useMemo, useState } from "react";
import { Bookings } from "./pages/Bookings";
import { Admin } from "./pages/Admin";
import { Button } from "./components/Button";

type Route = "bookings" | "admin";

export default function App() {
  const [route, setRoute] = useState<Route>(() => {
    const hash = (window.location.hash || "#/bookings").replace("#/", "");
    return (hash === "admin" ? "admin" : "bookings");
  });

  function nav(to: Route) {
    setRoute(to);
    window.location.hash = `#/${to}`;
  }

  const title = useMemo(() => route === "bookings" ? "Bookings" : "Admin", [route]);

  return (
    <div className="min-h-screen bg-board-bg text-slate-100">
      <header className="sticky top-0 z-40 backdrop-blur bg-board-bg/70 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-sky-500/15 border border-sky-400/20 flex items-center justify-center font-mono text-sky-200">
              ✈
            </div>
            <div>
              <div className="font-semibold tracking-wide">Family Travel Tracker</div>
              <div className="text-xs font-mono text-slate-400">Departure-board style dashboard</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" variant={route === "bookings" ? "primary" : "ghost"} onClick={() => nav("bookings")}>Bookings</Button>
            <Button size="sm" variant={route === "admin" ? "primary" : "ghost"} onClick={() => nav("admin")}>Admin</Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-4 text-xs font-mono text-slate-500">{title}</div>
        {route === "bookings" ? <Bookings /> : <Admin />}
      </main>

      <footer className="mx-auto max-w-6xl px-4 py-8 text-xs font-mono text-slate-500">
        Data is stored in Cloudflare D1 via Pages Functions.
      </footer>
    </div>
  );
}
