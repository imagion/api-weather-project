import Weather from '@/app/components/Weather';

export default function Home() {
  return (
    <div className='w-[min(100%,25rem)] flex flex-col gap-3 bg-neutral-200 shadow-xl p-6 mt-10'>
      <Weather />
    </div>
  );
}
