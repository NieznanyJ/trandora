import Image from 'next/image'
import ContactForm from '@/components/ContactForm'
import ShopNow from '@/components/ShopNow';
export default function ContactPage() {
    return (
        <main className='py-10'>

        <h1 className="font-heading text-4xl md:text-[5rem] xl:text-[4em] w-full text-center leading-[150%]  text-black  uppercase  tracking-[5%]">CONTACT US</h1>



            <section className='px-4 flex flex-col-reverse md:flex-row gap-10 items-start max-w-[1440px] mx-auto py-20'>
                <div className="flex flex-col w-full text-start  gap-6 text-black  flex-1 ">
                    <p>support@trendora.com</p>
                    <div className="flex flex-col gap-2 text-black">
                        <p>1234 Commerce Avenue, Suite 567</p>
                        <p>Mercantile Business Park</p>
                        <p>Metropolis, NY 10108</p>
                        <p>United States</p>
                    </div>
                    <div className="flex items-center gap-4 w-full text-center justify-start">
                        <Image className="fill-black" src='/x.svg' alt="x" width={25} height={25} />
                        <Image className="fill-black" src='/facebook.svg' alt="facebook" width={25} height={25} />
                        <Image className="fill-black" src='/instagram.svg' alt="instagram" width={25} height={25} />
                    </div>
                </div>
                <ContactForm />
            </section>

        </main>
    );
}