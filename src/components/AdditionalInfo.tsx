import { products } from '@wix/stores';

interface AdditionalInfoProps {
  sections?: products.AdditionalInfoSection[];
}

export default function AdditionalInfo({ sections }: AdditionalInfoProps) {
  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <section className="w-full max-w-7xl mx-auto p-4 space-y-8">
      {sections.map((info, index) => (
        <div key={info.title} className="space-y-4">
          <div className="flex w-full items-center justify-between border-b pb-2 border-gray-200">
            <h2 className="text-2xl font-bold tracking-tight">{info.title}</h2>
          </div>
          <div className="prose max-w-none">
            <p>{info.description}</p>
          </div>
          {index < sections.length - 1 && <hr className="my-8" />}
        </div>
      ))}
    </section>
  );
}