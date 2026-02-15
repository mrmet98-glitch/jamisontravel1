import React, { useState } from "react";
import type { BookingCard, RefundInfo } from "../types";
import { Modal } from "./Modal";
import { Select } from "./Select";
import { Input } from "./Input";
import { Button } from "./Button";
import { api } from "../lib/api";

export function CancelTravelerModal({
  open,
  card,
  onClose,
  onSaved,
}: {
  open: boolean;
  card: BookingCard | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [method, setMethod] = useState<RefundInfo["method"]>("eCredit");
  const [amount, setAmount] = useState<number>(0);
  const [notes, setNotes] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit() {
    if (!card) return;
    if (!Number.isFinite(amount) || amount < 0) {
      setErr("Refund amount must be a valid number.");
      return;
    }
    setSaving(true);
    setErr(null);
    try {
      await api.bookings.setTravelerStatus(card.booking_id, card.traveler_id, {
        status: "canceled",
        refund: { method, amount_usd: amount, notes: notes.trim() || undefined },
      });
      onSaved();
      onClose();
    } catch (e: any) {
      setErr(e.message ?? "Failed");
    } finally {
      setSaving(false);
    }
  }

  if (!card) return null;

  return (
    <Modal open={open} title={`Cancel · ${card.traveler_name} · ${card.label}`} onClose={onClose}>
      {err && <div className="mb-4 rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">{err}</div>}

      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <div className="text-xs font-mono text-slate-400 mb-3">REFUND DETAILS</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Select label="Method" value={method} onChange={(e) => setMethod(e.target.value as any)}>
            <option value="eCredit">eCredit</option>
            <option value="RefundToCard">Refund to card</option>
            <option value="Other">Other</option>
          </Select>
          <Input label="Amount (USD)" type="number" min={0} step="1" value={String(amount)} onChange={(e) => setAmount(Number(e.target.value))} />
          <Input label="Notes (optional)" placeholder="e.g., credit exp 2026-11-01" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>

        <div className="mt-4 flex items-center justify-end gap-2">
          <Button onClick={onClose}>Close</Button>
          <Button variant="danger" onClick={submit} disabled={saving}>{saving ? "Saving…" : "Confirm cancel"}</Button>
        </div>
      </div>
    </Modal>
  );
}
