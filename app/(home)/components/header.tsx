import Link from "next/link";

const TopLayout = () => {
  return (
    <div className="min-h-20 bg-neutral flex justify-end">
      <ul className="menu menu-horizontal content-center">
        <li>
          <Link href={`/`}>Home</Link>
        </li>
        <li>
        <Link href={`/auth/signin`}>Signin</Link>
        </li>
        <li>
        <Link href={`/auth/signup`}>Signup</Link>
        </li>
      </ul>
    </div>
  );
};

export default TopLayout;
