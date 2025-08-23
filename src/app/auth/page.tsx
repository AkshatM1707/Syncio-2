
import { SignIn } from "@clerk/nextjs";

export default function AuthPage() {
  return (
    <div className="min-h-screen w-full flex">
      <div className="w-[40%] bg-white flex items-center justify-center">
        <img src="/logo.svg" alt="Syncio" className="max-w-[80%]" />
      </div>

      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-[#6e476a] to-[#3B2E5C] px-4">
        <div className="w-full max-w-[420px] min-h-[640px] p-6 flex items-center justify-center">
          <SignIn path="/auth" routing="path" />
        </div>
      </div>
    </div>
  );
}
