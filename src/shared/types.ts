import { z } from "zod";

export const ShipmentSchema = z.object({
  id: z.number(),
  shipment_id: z.string(),
  status: z.string(),
  current_location_city: z.string().nullable(),
  current_location_lat: z.number().nullable(),
  current_location_lon: z.number().nullable(),
  sender: z.string().nullable(),
  recipient: z.string().nullable(),
  recipient_address: z.string().nullable(),
  verified_address: z.string().nullable(),
  hold_reason: z.string().nullable(),
  etd: z.string().nullable(),
});

export const LocationHistorySchema = z.object({
  id: z.number(),
  shipment_id: z.string(),
  timestamp: z.string(),
  location_city: z.string().nullable(),
  status: z.string().nullable(),
  updated_by: z.string().nullable(),
  notes: z.string().nullable(),
});

export type Shipment = z.infer<typeof ShipmentSchema>;
export type LocationHistory = z.infer<typeof LocationHistorySchema>;

export interface ShipmentResponse {
  shipment: Shipment;
  history: LocationHistory[];
}
