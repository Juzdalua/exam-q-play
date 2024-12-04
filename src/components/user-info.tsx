export const GetUserById = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`);
  return await res.json();
};

const UserInfo = async ({id}:{id:string}) => {
  const user = await GetUserById(id);
  return <h6>{JSON.stringify(user)}</h6>;
};

export default UserInfo;
