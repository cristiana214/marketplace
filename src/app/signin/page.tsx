import { ReausableDialog } from "@/components/reusable/dialog";
import { FormCredentials } from "@/components/form-credentials";
import { GoogleSignInButton } from "@/components/button-auth";

export default function SigninPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10 ">
      <div className="flex w-full flex-col items-center justify-center py-2">
        <div className="mt-1 flex flex-col items-center p-10 shadow-md">
          <h1 className="mb-4 mt-10 text-4xl font-bold">Sign In</h1>
          <GoogleSignInButton />
          <FormCredentials />
        </div>
        <ReausableDialog />
      </div>
    </section>
  );
}
