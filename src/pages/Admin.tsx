import React, { useEffect, useState } from "react";
import { api } from "../lib/api";
import type { Traveler } from "../types";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function Admin() {
  const [items, setItems] = useState<Traveler[]>([]);
  const [name, setName] = useState("");
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    try {
      setErr(null);
      setItems(await api.travelers.list());
    } catch (e: any) {
      setErr(e.message ?? "Failed");
    }
  }

  useEffect(() => { load(); }, []);

  async function add() {
    if (!name.trim()) return;
    try {
      await api.travelers.create(name.trim());
      setName("");
      await load();
    } catch (e: any) {
      setErr(e.message ?? "Failed");
    }
  }

  async function rename(id: string, newName: string) {
    try {
      await api.travelers.update(id, newName);
      await load();
    } catch (e: any) {
      setErr(e.message ?? "Failed");
    }
  }

  async function remove(id: string) {
    if (!confirm("Remove traveler? (This won't delete existing bookings, but traveler won't be selectable.)")) return;
    try {
      await api.travelers.remove(id);
      await load();
    } catch (e: any) {
      setErr(e.message ?? "Failed");
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-board-panel2 shadow-soft overflow-hidden">
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="font-semibold font-mono">Admin · Travelers</div>
          <div className="text-xs text-slate-400 font-mono">No login</div>
        </div>

        <div className="p-5 space-y-4">
          {err && <div className="rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">{err}</div>}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
            <Input label="Add traveler" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <div>
              <Button variant="primary" onClick={add}>Add</Button>
            </div>
          </div>

          <div className="space-y-2">
            {items.map(t => (
              <TravelerRow key={t.id} traveler={t} onRename={rename} onRemove={remove} />
            ))}
            {items.length === 0 && <div className="text-sm text-slate-400">No travelers yet.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

function TravelerRow({
  traveler,
  onRename,
  onRemove,
}: {
  traveler: Traveler;
  onRename: (id: string, name: string) => void;
  onRemove: (id: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(traveler.name);

  return (
    <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 flex items-center gap-3">
      {!editing ? (
        <>
          <div className="flex-1">
            <div className="text-sm">{traveler.name}</div>
            <div className="text-xs font-mono text-slate-500">{traveler.id}</div>
          </div>
          <Button size="sm" onClick={() => setEditing(true)}>Rename</Button>
          <Button size="sm" variant="danger" onClick={() => onRemove(traveler.id)}>Remove</Button>
        </>
      ) : (
        <>
          <div className="flex-1">
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <Button size="sm" variant="primary" onClick={() => { onRename(traveler.id, name.trim()); setEditing(false); }}>Save</Button>
          <Button size="sm" onClick={() => { setName(traveler.name); setEditing(false); }}>Cancel</Button>
        </>
      )}
    </div>
  );
}
