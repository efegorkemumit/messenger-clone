import AuthForm from "@/app/(site)/components/site/AuthForm";
import Image from "next/image";

const Auth =()=> {
  return (
   <div className="flex min-h-full bg-gray-200 py-12 px-6 flex-col">
      <div className="w-full mx-auto max-w-md">
        <Image  alt="" width="48" height="48" src='/images/logo.png'
        className="mx-auto w-auto"></Image>

        <h2 className="mt-6 text-center text-4xl font-bold">
          Sign in your account
        </h2>

        <AuthForm></AuthForm>

      </div>
   </div>
  );
}
export default Auth