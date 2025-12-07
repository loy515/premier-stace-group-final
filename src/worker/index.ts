import { Hono } from "hono";
import { cors } from "hono/cors";

type Bindings = {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>();

app.use("/*", cors());

app.get("/api/shipments/:shipmentId", async (c) => {
  const shipmentId = c.req.param("shipmentId");
  
  try {
    const shipmentResult = await c.env.DB.prepare(
      `SELECT * FROM shipments WHERE shipment_id = ?`
    ).bind(shipmentId).first();

    if (!shipmentResult) {
      return c.json({ error: "Shipment not found" }, 404);
    }

    const historyResult = await c.env.DB.prepare(
      `SELECT * FROM location_history WHERE shipment_id = ? ORDER BY timestamp DESC`
    ).bind(shipmentId).all();

    return c.json({
      shipment: shipmentResult,
      history: historyResult.results || []
    });
  } catch (error: any) {
    console.error("Error fetching shipment:", error.message);
    return c.json({ error: "Failed to fetch shipment details." }, 500);
  }
});

export default app;
