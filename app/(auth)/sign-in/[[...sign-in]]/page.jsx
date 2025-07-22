// app/(auth)/sign-in/[[...sign-in]]/page.jsx

import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="rounded-xl shadow-xl transition-all hover:shadow-2xl duration-300">
        <SignIn
          
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





