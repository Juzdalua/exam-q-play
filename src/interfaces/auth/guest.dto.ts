export type GuestSide = "wife" | "husband";

export interface Guest {
  id: number;
  name: string;
  side: GuestSide;
  createdAt: Date;
}