// app/(auth)/sign-up/[[...sign-up]]/page.jsx

import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="rounded-xl shadow-xl transition-all hover:shadow-2xl duration-300">
        <SignUp
          
          appearance={{
            elements: {
              card: "shadow-lg rounded-xl",
            },
          }}
        />
      </div>
    </div>
  );
}
