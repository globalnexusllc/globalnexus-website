import SanityImage from '@/components/shared/SanityImage'

interface Member {
  name?: string
  role?: string
  photo?: any
  linkedin?: string
  slug?: {current: string}
}

interface TeamGridProps {
  heading?: string
  members?: Member[]
}

export default function TeamGrid({heading, members}: TeamGridProps) {
  if (!members?.length) return null

  return (
    <section className="py-24" style={{background: 'var(--dark-mid)', color: '#fff'}}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {heading && (
          <div className="mb-14 text-center">
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-3"
              style={{color: 'var(--gold)', fontFamily: 'var(--font-body)'}}
            >
              The Team
            </p>
            <h2
              className="font-bold text-white"
              style={{fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)'}}
            >
              {heading}
            </h2>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, i) => (
            <div key={i} className="text-center">
              {member.photo && (
                <div className="mb-5 mx-auto w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden ring-2 ring-white/10">
                  <SanityImage
                    image={member.photo}
                    alt={member.name || ''}
                    width={144}
                    height={144}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              )}
              <h3
                className="text-base font-bold text-white mb-1"
                style={{fontFamily: 'var(--font-display)'}}
              >
                {member.name}
              </h3>
              <p
                className="text-sm mb-3"
                style={{color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)'}}
              >
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
