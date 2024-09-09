import Image from 'next/image';
import {Recycle, PackageOpen, ShieldCheck  } from 'lucide-react'

export default function AboutPage() {
  return (
    <main className="py-10">
      <h1 className="font-heading text-4xl md:text-[5rem] xl:text-[4em] w-full text-center leading-[150%] text-black uppercase tracking-[5%]">
        ABOUT OUR STORE
      </h1>

      <section className="px-4 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[1440px] mx-auto py-20">
        <div className="flex flex-col gap-6 text-black text-sm">
          <h2 className="font-heading text-2xl uppercase">Our Story</h2>
          <p>
            At Trend Emporium, we are passionate about bringing you the latest fashion trends and timeless classics that cater to your unique style. Founded in 2010, our mission is to provide a curated collection of high-quality, affordable clothing and accessories that empower you to express your individuality.
          </p>
          <p>
            With a focus on sustainability and ethical sourcing, we work closely with our global network of designers and manufacturers to ensure that every item in our store is crafted with care and attention to detail. Our commitment to quality and customer satisfaction is at the heart of everything we do.
          </p>
        </div>

        <div className="flex flex-col gap-6 text-black text-sm">
          <h2 className="font-heading text-2xl uppercase">Our Values</h2>
          <ul className="list-disc pl-4 space-y-2">
            <li>Sustainable and ethical production</li>
            <li>Commitment to quality and craftsmanship</li>
            <li>Inclusive and diverse representation</li>
            <li>Exceptional customer service</li>
            <li>Continuous innovation and trend-forward designs</li>
          </ul>
        </div>
      </section>

      <section className="px-4 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-[1440px] mx-auto pb-20">
        <div className="flex flex-col gap-4 items-center text-center">
          <ShieldCheck size={64} />
          <h3 className="font-heading text-xl uppercase">Quality Guarantee</h3>
          <p>
            We stand behind the quality of our products and offer a hassle-free return policy to ensure your satisfaction.
          </p>
        </div>

        <div className="flex flex-col gap-4 items-center text-center">
            <Recycle size={64} />
          <h3 className="font-heading text-xl uppercase">Sustainable Practices</h3>
          <p>
            Our commitment to sustainability extends from ethical sourcing to eco-friendly packaging, ensuring a greener future.
          </p>
        </div>

        <div className="flex flex-col gap-4 items-center text-center">
            <PackageOpen size={64} />
          <h3 className="font-heading text-xl uppercase">Exceptional Service</h3>
          <p>
            Our dedicated team is here to assist you with any questions or concerns, ensuring a seamless shopping experience.
          </p>
        </div>
      </section>
    </main>
  );
}