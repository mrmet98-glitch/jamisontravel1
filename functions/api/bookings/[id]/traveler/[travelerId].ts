import { err, json, nowISO, readJson } from "../../../../_utils";

type Payload = {
  status: "active" | "canceled";
  refund?: {
    method: "eCredit" | "RefundToCard" | "Other";
    amount_usd: number;
    notes?: string;
  } | null;
};

export const onRequestPut: PagesFunction = async (ctx) => {
  const bookingId = ctx.params.id as string;
  const travelerId = ctx.params.travelerId as string;
  const p = await readJson<Payload>(ctx.request);

  if (!p.status) return err("status required");

  const exists = await ctx.env.DB.prepare(
    "SELECT booking_id FROM booking_travelers WHERE booking_id = ? AND traveler_id = ?"
  ).bind(bookingId, travelerId).first();

  if (!exists) return err("Traveler not found on booking", 404);

  if (p.status === "canceled") {
    const r = p.refund;
    await ctx.env.DB.prepare(
      `UPDATE booking_travelers
          SET status='canceled',
              refund_method=?,
              refund_amount_usd=?,
              refund_notes=?,
              canceled_at=?
        WHERE booking_id=? AND traveler_id=?`
    ).bind(
      r?.method ?? null,
      r?.amount_usd ?? 0,
      r?.notes ?? null,
      nowISO(),
      bookingId,
      travelerId
    ).run();
  } else {
    await ctx.env.DB.prepare(
      `UPDATE booking_travelers
          SET status='active',
              refund_method=NULL,
              refund_amount_usd=NULL,
              refund_notes=NULL,
              canceled_at=NULL
        WHERE booking_id=? AND traveler_id=?`
    ).bind(bookingId, travelerId).run();
  }

  return json({ ok: true });
};
