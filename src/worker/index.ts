import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-pages'

type Bindings = {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>()

// API Route
app.get('/api/shipments/:shipmentId', async (c) => {
  const { shipmentId } = c.req.param()
  try {
    const shipment = await c.env.DB.prepare('SELECT * FROM shipments WHERE shipment_id = ?').bind(shipmentId).first()
    if (!shipment) return c.json({ error: 'Not Found' }, 404)

    const history = await c.env.DB.prepare('SELECT * FROM location_history WHERE shipment_id = ? ORDER BY timestamp DESC').bind(shipmentId).all()
    return c.json({ shipment, history: history.results || [] })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

// Serve the frontend application
app.get('*', serveStatic())

export default app
