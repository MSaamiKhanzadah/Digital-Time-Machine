import { ArrowDownRight, ArrowUpRight, Orbit, Sparkles } from 'lucide-react'
import type { EraYear } from '../data/history'
import DeviceArt from './DeviceArt'

export default function TimeCore({
  year,
  destination = year,
}: {
  year: EraYear
  destination?: number
}) {
  return (
    <div
      className={`time-core core-${year}`}
      aria-label={`Time machine destination: ${destination}`}
    >
      <div className="core-topline">
        <span>
          <i /> TEMPORAL COORDINATES
        </span>
        <Orbit size={17} />
      </div>
      <div className="core-orbits" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="core-cross cross-one" aria-hidden="true">
        +
      </div>
      <div className="core-cross cross-two" aria-hidden="true">
        +
      </div>
      {year === 2026 ? (
        <>
          <div className="core-floating floating-one" aria-hidden="true">
            <Sparkles size={24} strokeWidth={1.3} />
          </div>
          <div className="core-year">
            {String(destination).slice(0, 2)}
            <span>{String(destination).slice(2)}</span>
            <span className="year-outline" aria-hidden="true">
              {destination}
            </span>
          </div>
          <div className="core-era-label">
            <span className="core-line" />{' '}
            {destination === 2026
              ? 'THE AGE OF POSSIBILITY'
              : 'A MOMENT THAT CHANGED EVERYTHING'}{' '}
            <ArrowUpRight size={15} />
          </div>
        </>
      ) : (
        <>
          <div className="core-historical-year" aria-hidden="true">
            {year}
          </div>
          <DeviceArt year={year} category="computers" className="hero-device" />
          <div className="core-era-label">
            {year === 1995
              ? 'CONNECTING TO THE WORLD…'
              : 'A MORE CONNECTED WORLD'}{' '}
            <ArrowUpRight size={15} />
          </div>
        </>
      )}
      <div className="core-bottomline">
        <span>DTM / {year === 1995 ? '01' : year === 2010 ? '02' : '03'}</span>
        <span>
          TIME IS A PLACE. <ArrowDownRight size={13} />
        </span>
      </div>
    </div>
  )
}
