"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const GetTestUsers = async (query: string) => {
  let endpoint;
  if (query) endpoint = `/api/supabase?id=${query}`;
  else endpoint = `/api/supabase`;

  const res = await fetch(endpoint);
  return res.json();
};

const GetAllUsers = () => {
  const searchParams = useSearchParams();
  const [paramId, setParamId] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    if (!searchParams.get("id")) setParamId(1);
    else setParamId(searchParams.get("id"));

    const fetchData = async () => {
      const data = await GetTestUsers(paramId);
      setUsers(data.data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-full">
      {users && users.length > 0 ? (
        users.map((user: { id: number; name: string; age: number }) => (
          <div key={user.id} className="mb-4">
            <div>
              <strong>ID:</strong> {user.id}
            </div>
            <div>
              <strong>Name:</strong> {user.name}
            </div>
            <div>
              <strong>Age:</strong> {user.age}
            </div>
          </div>
        ))
      ) : (
        <div>Data is not an array</div>
      )}
    </div>
  );
};

export default GetAllUsers;
