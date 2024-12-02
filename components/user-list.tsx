export const GetUsers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`);
  return await res.json();
};

const UserList = async () => {
  const users = await GetUsers();
  return <h6>{JSON.stringify(users)}</h6>;
};

export default UserList;
