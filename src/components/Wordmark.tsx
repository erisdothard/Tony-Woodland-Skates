// TONY over a rule over four wheels, from Eris's mockup; TODO(confirm) it is Tony's real mark. The wheels are the only circles on the site.
export function Wordmark({ className = '', size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const text = { sm: 'text-[1.05rem]', md: 'text-[1.6rem]', lg: 'text-[3rem]' }[size];
  const wheel = { sm: 'size-[0.62rem] border-[1.5px]', md: 'size-[0.95rem] border-2', lg: 'size-[1.8rem] border-[3px]' }[size];
  const gap = { sm: 'gap-[3px] pt-[3px]', md: 'gap-1 pt-1', lg: 'gap-2 pt-2' }[size];
  return (
    <span className={`inline-flex flex-col items-stretch ${className}`} aria-label="TONY">
      <span aria-hidden className={`type-brand block text-center leading-none tracking-[0.12em] pl-[0.12em] ${text}`}>
        TONY
      </span>
      <span aria-hidden className={`mt-[0.18em] block h-px w-full bg-current ${size === 'lg' ? 'h-[3px]' : size === 'md' ? 'h-[2px]' : ''}`} />
      <span aria-hidden className={`flex justify-between ${gap}`}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={`block rounded-full border-current ${wheel}`} />
        ))}
      </span>
    </span>
  );
}

// The four-wheel mark alone, used as a list bullet.
export function Wheels({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden className={`inline-flex gap-[3px] ${className}`}>
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="block size-[0.5em] rounded-full border-[1.5px] border-current" />
      ))}
    </span>
  );
}
