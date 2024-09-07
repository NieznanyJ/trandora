import AuthForm from "@/components/AuthForm";


export default function RegisterPage() {
    

    return(
        <main className='h-screen max-w-[1440px] mx-auto flex items-center justify-start pt-20 p-4 flex-col gap-10'>
            <h1 className="text-2xl ">Sign up </h1>
            <AuthForm type='register'/>
        </main>
    );
}