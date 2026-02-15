import { json } from "../../_utils";
import { loadCards } from "./_booking";

export const onRequestGet: PagesFunction = async (ctx) => {
  const url = new URL(ctx.request.url);
  const travelerId = url.searchParams.get("travelerId") || undefined;
  const includeFlown = url.searchParams.get("includeFlown") === "1";
  const cards = await loadCards(ctx.env.DB, { travelerId, includeFlown });
  return json(cards);
};
