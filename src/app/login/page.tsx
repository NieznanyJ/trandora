import AuthForm from "@/components/AuthForm";


export default function LoginPage() {
    

    return(
        <main className='h-screen max-w-[1440px] mx-auto flex items-center justify-start pt-20 p-4 flex-col gap-10'>
            <h1 className="text-2xl ">Login </h1>
            <AuthForm type='login' />
        </main>
    );
}