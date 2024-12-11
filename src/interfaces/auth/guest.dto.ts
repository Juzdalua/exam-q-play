export type GuestSide = "wife" | "husband";

export interface Guest {
  id: number;
  name: string;
  password: string;
  side: GuestSide;
  createdAt: Date;
}