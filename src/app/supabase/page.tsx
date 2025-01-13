import { Metadata } from "next";
import GetAllUsers from "./components/get-all-users";

export const metadata: Metadata = {
  title: "Supabase",
};

const SupabaseTest = () => {
  return (
    <div className="flex flex-col h-full">
      <GetAllUsers />
    </div>
  );
};

export default SupabaseTest;
