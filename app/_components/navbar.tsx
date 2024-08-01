"use client";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "../_lib/redux/features/authSlice";
import { useRouter } from "next/navigation";

interface Props {
  isAuthenticated: boolean;
}

function Navbar({ isAuthenticated }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <header className="">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link href="/home">🍿 Cinem-app</Link>
        <div className="flex flex-1 items-center justify-end md:justify-end">
          <div className="flex items-center gap-4">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className="text-gray-500/75 transition hover:text-black"
                    href="/home"
                  >
                    🎥 Movies
                  </Link>
                </li>
                {isAuthenticated && (
                  <li>
                    <Link
                      className="text-gray-500/75 transition hover:text-black"
                      href="/booking"
                    >
                      🎟️ My reservations
                    </Link>
                  </li>
                )}

                <li>
                  {isAuthenticated ? (
                    <button
                      className="text-gray-500/75 transition hover:text-black"
                      onClick={() => {
                        dispatch(logout());
                        router.push("/home");
                      }}
                    >
                      🏃‍♂️ log out
                    </button>
                  ) : (
                    <Link
                      className="text-gray-500/75 transition hover:text-black"
                      href="/login"
                    >
                      🚪 Sign in
                    </Link>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
