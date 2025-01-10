"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const GetTestUsers = async (query: string) => {
  const res = await fetch(`/api/test-user?id=${query}`);
  return res.json();
};

const Test = () => {
  const searchParams = useSearchParams();
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const id = searchParams.get("id");
      if (id) {
        const data = await GetTestUsers(id);
        setUsers(data.data);
      }
    };
    fetchData();
  }, [searchParams]);

  return (
    <div className="flex flex-col h-full">
      {users && users.length > 0 ? (
      users.map((user: { id: number; name: string; age: number }) => (
        <div key={user.id} className="mb-4">
          <div><strong>ID:</strong> {user.id}</div>
          <div><strong>Name:</strong> {user.name}</div>
          <div><strong>Age:</strong> {user.age}</div>
        </div>
      ))
    ) : (
      <div>Data is not an array</div>
    )}
    </div>
  );
};

export default Test;
