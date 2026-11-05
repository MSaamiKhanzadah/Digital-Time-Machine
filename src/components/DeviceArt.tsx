import { useId } from 'react'
import '../styles/art.css'

type DeviceArtProps = {
  year: 1995 | 2010 | 2026
  category: 'computers' | 'internet' | 'software' | 'programming' | 'mobile'
  variant?: 'ai'
  className?: string
}

const INK = '#292b28'

function Computer({ year, id }: { year: DeviceArtProps['year']; id: string }) {
  if (year === 1995) {
    return (
      <g>
        <ellipse
          cx="181"
          cy="203"
          rx="123"
          ry="9"
          fill="#383b32"
          opacity=".11"
        />
        <path d="M250 30 266 43v117l-16 8Z" fill="#a8a590" />
        <path d="M98 29h152v137H98Z" fill={`url(#${id}-beige)`} />
        <path d="m98 29 13-9h143l12 23-16-13Z" fill="#e5dfc9" />
        <path d="M109 40h130v97H109Z" fill="#b9b6a2" />
        <path d="m113 44 7 7v77l-7 5Z" fill="#8c8e7c" />
        <path d="M120 51h110v77H120Z" fill="#333e36" />
        <rect x="124" y="55" width="102" height="69" rx="2" fill="#a0b4a3" />
        <path d="M124 55h102v9H124Z" fill="#d3d9c7" />
        <path
          d="M130 59h4m7 0h13m7 0h12m7 0h12"
          stroke="#4b5b4b"
          strokeWidth="2"
        />
        <rect
          x="139"
          y="76"
          width="70"
          height="36"
          fill="#d9ddcc"
          stroke="#4e6050"
        />
        <path d="M140 82h68m-58-4h47" stroke="#71806c" strokeWidth="1" />
        <path
          d="M165 91h13v12h-13Zm-4 1h4m13 0h4m-12 6h3m4 0h1"
          fill="none"
          stroke="#52604d"
        />
        <path
          d="M215 107v10l3-3 3 3 2-2-3-3h4Z"
          fill="#324234"
          stroke="#c7d2bb"
          strokeWidth=".5"
        />
        <path
          d="M194 145h34m-34 3h34m-34 3h34"
          stroke="#aaa88f"
          strokeWidth="1"
        />
        <circle cx="236" cy="148" r="2" fill="#6c8665" />
        <path
          d="M113 148c1-4 5-4 6-1 3-2 5 2 2 5-2 3-3 1-4 1-3 1-6-2-4-5Zm5-4 2-3"
          fill="#777f65"
        />
        <path d="M111 166h132l6 13H105Z" fill="#b6b49d" />
        <path d="M105 179h144v6H105Z" fill="#d4cfb6" />
        <path d="m274 39 11-6 43 10-11 6Z" fill="#e0dbc4" />
        <path d="m317 49 11-6v128l-11 8Z" fill="#a4a18b" />
        <path d="M274 39h43v140h-43Z" fill="#cec8af" />
        <path d="M279 48h33v39h-33Z" fill="#c0bca5" />
        <path d="M282 57h27v5h-27Z" fill="#6f7565" />
        <path
          d="M282 69h27v11h-27Z"
          fill="#d5cfb8"
          stroke="#a8a58f"
          strokeWidth=".7"
        />
        <path d="M285 74h20" stroke="#696f61" strokeWidth="2" />
        <circle cx="282" cy="100" r="2" fill="#6a8364" />
        <path
          d="M282 120h26m-26 4h26m-26 4h26m-26 4h26m-26 4h26m-26 4h26"
          stroke="#aaa68f"
          strokeWidth="1"
        />
        <path
          d="M280 156c1-3 4-3 5-1 3-2 4 1 2 4-2 3-3 1-4 1-2 1-5-1-3-4Zm4-3 2-2"
          fill="#798067"
        />
        <path d="M279 174h33" stroke="#ded9c0" />
        <path
          d="M246 183c22-17 21-27 33-23 14 5-16 17 4 23"
          fill="none"
          stroke="#b0ac98"
          strokeWidth="2"
        />
        <path d="m74 179 157 1 21 19H58Z" fill="#e3ddc5" stroke="#b7b29b" />
        <path d="M58 199h194v5H58Z" fill="#b6b19a" />
        {[0, 1, 2].map((row) => (
          <g key={row}>
            {Array.from({ length: 16 }, (_, col) => (
              <path
                key={col}
                d={`m${77 + col * 9 - row * 4} ${183 + row * 4.5}h6l2 2.6h-7Z`}
                fill="#c1bca4"
                stroke="#a9a58e"
                strokeWidth=".5"
              />
            ))}
          </g>
        ))}
        <path d="m109 197 80 .2" stroke="#a49f88" strokeWidth="3" />
        <path
          d="M279 179c0-5 19-5 20 1l3 12c-3 7-25 5-25-1Z"
          fill="#d8d3bb"
          stroke="#aaa691"
        />
        <path d="m283 182 12 .5 1 5h-13Z" fill="#b9b59e" />
        <path d="M99 31h150" stroke="#f1ebd8" />
      </g>
    )
  }

  const modern = year === 2026
  return (
    <g>
      <ellipse cx="183" cy="204" rx="140" ry="8" fill="#242721" opacity=".12" />
      <rect
        x="72"
        y="25"
        width="218"
        height="143"
        rx="8"
        fill={modern ? '#383a35' : '#b7bab7'}
      />
      <rect
        x="74"
        y="27"
        width="214"
        height="140"
        rx="7"
        fill={modern ? '#242621' : '#252b2b'}
      />
      <rect
        x="81"
        y="35"
        width="200"
        height="122"
        rx="2"
        fill={modern ? '#141b19' : `url(#${id}-blue)`}
      />
      {modern ? (
        <>
          <path
            d="M81 134c57-51 72-109 123-99 23 5 27 48 77 43v79H81Z"
            fill="#273c32"
          />
          <path
            d="M119 157c18-26 19-42 41-50 49-19 55-4 82-31 13-13 20-24 39-24v105Z"
            fill="#344635"
          />
          <path
            d="M117 157c18-44 52-16 72-55 24-46 64 22 92-12"
            fill="none"
            stroke="#d06736"
            strokeWidth="29"
          />
          <path
            d="M117 157c18-44 52-16 72-55 24-46 64 22 92-12"
            fill="none"
            stroke="#ef8951"
            strokeWidth="13"
          />
          <path
            d="M117 157c18-44 52-16 72-55 24-46 64 22 92-12"
            fill="none"
            stroke="#fbb27a"
            strokeWidth="3"
            opacity=".7"
          />
          <rect
            x="117"
            y="51"
            width="125"
            height="70"
            rx="4"
            fill="#242d28"
            opacity=".92"
            stroke="#7f8a72"
            strokeWidth=".6"
          />
          <circle cx="124" cy="57" r="1.5" fill="#eb7543" />
          <circle cx="130" cy="57" r="1.5" fill="#a19d7d" />
          <circle cx="136" cy="57" r="1.5" fill="#708f6f" />
          <path
            d="m132 74 8 6-8 6m14 0h18"
            fill="none"
            stroke="#e8ab74"
            strokeWidth="2.5"
          />
          <path
            d="M132 98h48m-48 6h77m-77 6h61"
            stroke="#8a9d87"
            strokeWidth="2"
            opacity=".65"
          />
          <rect
            x="145"
            y="147"
            width="70"
            height="5"
            rx="2.5"
            fill="#dee4d3"
            opacity=".24"
          />
        </>
      ) : (
        <>
          <path
            d="m81 139 50-65 26 27 37-61 39 53 21-11 27 42v33H81Z"
            fill="#c7e3e6"
            opacity=".92"
          />
          <path
            d="m105 126 40-49 19 27 28-28 31 25 19-9 39 36v29H81Z"
            fill="#5d8ea4"
          />
          <path d="m81 146 66-23 51 10 38-14 45 25v13H81Z" fill="#244f69" />
          <rect x="108" y="56" width="122" height="76" rx="3" fill="#f7f7f0" />
          <path
            d="M108 59a3 3 0 0 1 3-3h116a3 3 0 0 1 3 3v7H108Z"
            fill="#dedfda"
          />
          <circle cx="114" cy="61" r="2" fill="#d07e6e" />
          <circle cx="120" cy="61" r="2" fill="#d9ba66" />
          <circle cx="126" cy="61" r="2" fill="#97b17c" />
          <path d="M113 70h25v57h-25Z" fill="#e1e7e9" />
          <path
            d="M117 76h16m-16 6h14m-14 6h11m-11 6h15"
            stroke="#a0b2ba"
            strokeWidth="2"
          />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect
                x={145 + i * 26}
                y="75"
                width="19"
                height="22"
                rx="2"
                fill={['#bbd8e5', '#d9cfb0', '#b6cbb9'][i]}
              />
              <path
                d={`M${145 + i * 26} 103h19m-19 5h15`}
                stroke="#b2bab8"
                strokeWidth="2"
              />
            </g>
          ))}
          <rect
            x="112"
            y="144"
            width="137"
            height="10"
            rx="3"
            fill="#eef5f2"
            opacity=".45"
          />
          {Array.from({ length: 13 }, (_, i) => (
            <rect
              key={i}
              x={117 + i * 9.7}
              y="144"
              width="7"
              height="8"
              rx="1.5"
              fill={['#5496b7', '#bdd6cf', '#6f92ad', '#e8ba76'][i % 4]}
            />
          ))}
        </>
      )}
      <circle cx="181" cy="31" r="1.4" fill="#67756a" />
      <path
        d="M72 168h218l39 28H32Z"
        fill={modern ? `url(#${id}-dark)` : `url(#${id}-silver)`}
      />
      <path d="M32 196h297l-8 5H40Z" fill={modern ? '#333630' : '#969d9a'} />
      <path
        d="m85 172 192 .1 16 13H68Z"
        fill={modern ? '#171c18' : '#535b59'}
      />
      {[0, 1, 2].map((row) => (
        <g key={row}>
          {Array.from({ length: 16 }, (_, col) => (
            <path
              key={col}
              d={`m${88 + col * 11.8 - row * 3.2} ${173 + row * 3.5}h8.5l1.7 2.2h-9Z`}
              fill={modern ? '#42483d' : '#a5aeaa'}
              opacity=".75"
            />
          ))}
        </g>
      ))}
      <path
        d="m152 188 55 .1 4 6h-63Z"
        fill={modern ? '#54594e' : '#c5cbc6'}
        stroke={modern ? '#6a6d60' : '#a3aaa6'}
        strokeWidth=".6"
      />
      <path d="M148 196h63l-2 2h-59Z" fill={modern ? '#151b15' : '#79837d'} />
      <path
        d="M74 165h214"
        stroke={modern ? '#9f6d45' : '#e0e5de'}
        strokeWidth=".8"
      />
    </g>
  )
}

function Browser({ year }: { year: DeviceArtProps['year'] }) {
  const old = year === 1995
  const current = year === 2026
  const accent = old ? '#5c8c83' : current ? '#e66a3d' : '#5e8eab'
  return (
    <g transform={old ? 'translate(0 0) rotate(-3 180 112)' : 'translate(0 0)'}>
      <ellipse cx="184" cy="199" rx="131" ry="9" fill={INK} opacity=".1" />
      {!old && (
        <rect
          x="82"
          y="22"
          width="229"
          height="153"
          rx={current ? 10 : 5}
          fill={current ? '#b6b6a4' : '#b7c6cb'}
          transform="rotate(6 197 98)"
        />
      )}
      <rect
        x="48"
        y="33"
        width="257"
        height="159"
        rx={old ? 1 : 8}
        fill={old ? '#bbbeb0' : '#f3f1e8'}
        stroke={old ? '#4f5b51' : '#b4b7a9'}
        strokeWidth={old ? 1.5 : 1}
      />
      <path
        d={
          old
            ? 'M50 35h253v17H50Z'
            : 'M56 34h241a7 7 0 0 1 7 7v18H49V41a7 7 0 0 1 7-7Z'
        }
        fill={old ? '#385e63' : current ? '#343b31' : '#d5dee0'}
      />
      {old ? (
        <>
          <rect
            x="54"
            y="39"
            width="9"
            height="9"
            fill="#c3cabc"
            stroke="#e5ebda"
          />
          <path d="M70 43h100" stroke="#e3e6d5" strokeWidth="2" />
          <rect x="286" y="39" width="12" height="9" fill="#c3cabc" />
          <path d="m289 42 6 3m0-3-6 3" stroke="#43584b" />
        </>
      ) : (
        <>
          <circle cx="59" cy="44" r="2" fill="#d4866b" />
          <circle cx="66" cy="44" r="2" fill="#bdb16d" />
          <circle cx="73" cy="44" r="2" fill="#8ba383" />
          <path
            d="M86 41h67a4 4 0 0 1 4 4v10H82V45a4 4 0 0 1 4-4Z"
            fill={current ? '#eef0e5' : '#f7f9f6'}
          />
          <path d="M91 47h43" stroke="#8b9a90" strokeWidth="2" />
        </>
      )}
      <path d="M49 59h255v24H49Z" fill={old ? '#d0d2c3' : '#e7e9df'} />
      <path d="m60 71 5-4v8Zm15-4 5 4-5 4" fill="#788578" />
      <rect
        x="91"
        y="65"
        width="180"
        height="12"
        rx={old ? 0 : 6}
        fill="#fafbf3"
        stroke="#bcc5b5"
        strokeWidth=".6"
      />
      <path d="M102 71h82" stroke="#b0b9a9" strokeWidth="2" />
      <circle cx="289" cy="71" r="4" fill={accent} />
      {old ? (
        <>
          <rect x="57" y="90" width="239" height="93" fill="#e5e8d4" />
          <path d="M57 115h239v38H57Z" fill="#56877b" />
          <path
            d="m69 146 38-25 24 16 36-12 41 22 43-28 45 27v7H57Z"
            fill="#789a83"
          />
          <circle
            cx="178"
            cy="128"
            r="29"
            fill="#ebead6"
            stroke="#314d4b"
            strokeWidth="2"
          />
          <path
            d="M159 145v-34h7l24 27v-27h7v34h-8l-23-27v27Z"
            fill="#365d5c"
          />
          <path d="M82 103h66m53 0h65" stroke="#728577" strokeWidth="3" />
          <path d="M83 168h187m-172 7h154" stroke="#6c8679" strokeWidth="2" />
        </>
      ) : current ? (
        <>
          <rect x="60" y="94" width="231" height="86" rx="6" fill="#e1e5d6" />
          <path d="M77 108h70m-70 8h48" stroke="#364331" strokeWidth="5" />
          <path d="M77 132h85m-85 6h72" stroke="#9aa68f" strokeWidth="2" />
          <rect x="77" y="151" width="48" height="13" rx="6.5" fill="#e76739" />
          <path d="M87 157h24" stroke="#fff3d8" strokeWidth="2" />
          <circle cx="239" cy="132" r="28" fill="#e97944" />
          <path
            d="M219 110c24 21-8 26 9 45m25-47c-25 21 8 26-9 45"
            fill="none"
            stroke="#f9c69d"
            strokeWidth="8"
          />
          <rect
            x="190"
            y="156"
            width="82"
            height="17"
            rx="4"
            fill="#fafaf0"
            stroke="#bec9ae"
          />
          <circle cx="201" cy="164" r="4" fill="#93a47f" />
          <path d="M210 162h49m-49 4h32" stroke="#a7b398" strokeWidth="1.5" />
        </>
      ) : (
        <>
          <path d="M59 92h234v20H59Z" fill="#547d9c" />
          <path
            d="M70 102h42m85 0h12m8 0h12m8 0h12m8 0h23"
            stroke="#d9e6e8"
            strokeWidth="3"
          />
          <rect x="64" y="119" width="43" height="54" fill="#e0e7e4" />
          <circle cx="85" cy="134" r="9" fill="#8ea7a8" />
          <path
            d="M73 151h25m-25 6h20m-20 6h23"
            stroke="#9baca9"
            strokeWidth="2"
          />
          <rect
            x="116"
            y="119"
            width="116"
            height="58"
            fill="#fffef7"
            stroke="#d5ddd3"
          />
          <circle cx="128" cy="130" r="5" fill="#9fb8ad" />
          <path d="M139 126h64m-64 6h44" stroke="#a6b8b0" strokeWidth="2" />
          <rect x="123" y="142" width="102" height="27" fill="#b1cbd0" />
          <path d="m123 169 24-18 17 8 29-16 32 26" fill="#7ea4ac" />
          <path
            d="M243 123h40m-40 7h32m-32 13h40m-40 7h28m-28 13h40m-40 7h33"
            stroke="#b0bdb3"
            strokeWidth="2"
          />
        </>
      )}
    </g>
  )
}

function Software({ year, id }: { year: DeviceArtProps['year']; id: string }) {
  if (year === 1995)
    return (
      <g>
        <ellipse cx="183" cy="198" rx="116" ry="9" fill={INK} opacity=".1" />
        <g transform="rotate(-10 152 108)">
          <path d="M89 35h113l14 14v132H89Z" fill="#383f3b" />
          <path d="M97 35h91v57H97Z" fill="#a6b3a8" />
          <path d="M113 35h64v43h-64Z" fill="#cfd8c7" />
          <path d="M147 41h21v30h-21Z" fill="#535e55" />
          <rect x="108" y="108" width="88" height="65" rx="3" fill="#ece8d3" />
          <path
            d="M118 121h68m-68 8h68m-68 8h68m-68 8h42"
            stroke="#b6b7a2"
            strokeWidth="2"
          />
          <path d="M118 157h27" stroke="#759487" strokeWidth="6" />
          <rect x="94" y="167" width="7" height="7" fill="#171e1a" />
        </g>
        <circle
          cx="237"
          cy="130"
          r="57"
          fill={`url(#${id}-disc)`}
          stroke="#9cae9e"
          strokeWidth="1"
        />
        <circle cx="237" cy="130" r="20" fill="#b8c8bc" stroke="#e9edda" />
        <circle cx="237" cy="130" r="8" fill="#eeeae2" stroke="#87968b" />
        <path
          d="M203 103a45 45 0 0 1 57-12m-58 70a45 45 0 0 0 55 8"
          fill="none"
          stroke="#f5f5db"
          strokeWidth="3"
          opacity=".8"
        />
        <path
          d="M216 95a43 43 0 0 1 38 0"
          fill="none"
          stroke="#a1baab"
          strokeWidth="8"
          opacity=".5"
        />
      </g>
    )
  if (year === 2010)
    return (
      <g>
        <ellipse cx="181" cy="198" rx="115" ry="8" fill={INK} opacity=".1" />
        <rect
          x="85"
          y="34"
          width="189"
          height="143"
          rx="9"
          transform="rotate(-7 180 106)"
          fill="#aabfc2"
          opacity=".75"
        />
        <rect
          x="72"
          y="39"
          width="212"
          height="145"
          rx="9"
          fill={`url(#${id}-blue)`}
          stroke="#88a9b5"
        />
        <path d="M78 46h200v132H78Z" fill="#5b9abb" opacity=".55" />
        <path d="M89 57h19m8 0h18" stroke="#c7e4e5" strokeWidth="2" />
        <circle cx="267" cy="55" r="3" fill="#dbb9a3" />
        <path
          d="M106 90c47-18 86 3 134-10v60c-48 13-87-8-134 10Z"
          fill="#d9edf2"
          opacity=".2"
        />
        <g transform="rotate(7 177 111)">
          <path d="m128 74 46 7v35l-46-7Z" fill="#e58e4a" />
          <path d="m180 81 46-10v35l-46 10Z" fill="#8da876" />
          <path d="m128 115 46 7v35l-46-7Z" fill="#6eacd0" />
          <path d="m180 122 46-10v35l-46 10Z" fill="#dfc574" />
          <path
            d="m131 77 40 6m12 0 39-9"
            stroke="#f4dfbd"
            strokeWidth="2"
            opacity=".6"
          />
        </g>
        <path d="M101 166h155" stroke="#c4e0e2" strokeWidth="2" opacity=".65" />
      </g>
    )
  return (
    <g>
      <ellipse cx="180" cy="199" rx="119" ry="9" fill={INK} opacity=".1" />
      <g transform="rotate(-8 118 128)">
        <rect
          x="64"
          y="75"
          width="104"
          height="105"
          rx="13"
          fill="#e3dcca"
          stroke="#c1bfac"
        />
        <path
          d="m89 107 16-9 16 9v19l-16 9-16-9Z"
          fill="none"
          stroke="#7f8d68"
          strokeWidth="3"
        />
        <path
          d="m89 107 16 9 16-9m-16 9v19"
          fill="none"
          stroke="#7f8d68"
          strokeWidth="3"
        />
        <path d="M86 150h60m-49 8h38" stroke="#a6ad94" strokeWidth="3" />
      </g>
      <g transform="rotate(8 245 126)">
        <rect
          x="194"
          y="69"
          width="102"
          height="109"
          rx="13"
          fill="#c4ccba"
          stroke="#a3b298"
        />
        <path
          d="m229 100-13 12 13 12m31-24 13 12-13 12m-13-29-7 34"
          fill="none"
          stroke="#51624a"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M214 148h60m-49 8h38" stroke="#90a17f" strokeWidth="3" />
      </g>
      <rect
        x="122"
        y="37"
        width="116"
        height="123"
        rx="14"
        fill="#30382d"
        stroke="#57614b"
      />
      <path
        d="m164 70-16 9v28l16 9m31-46 16 9v28l-16 9"
        fill="none"
        stroke="#ec9867"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m186 68-11 50"
        stroke="#ec9867"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M149 134h62m-49 7h36" stroke="#8a967a" strokeWidth="3" />
      <circle cx="230" cy="153" r="14" fill="#ed7243" stroke="#f8b68a" />
      <path d="m224 153 4 4 8-9" fill="none" stroke="#fff3db" strokeWidth="2" />
    </g>
  )
}

function Programming({ year }: { year: DeviceArtProps['year'] }) {
  const old = year === 1995
  const modern = year === 2026
  const foreground = old ? '#aac7a3' : modern ? '#a8b294' : '#a7bdc4'
  return (
    <g>
      <ellipse cx="181" cy="199" rx="125" ry="8" fill={INK} opacity=".1" />
      <rect
        x="60"
        y="33"
        width="245"
        height="151"
        rx={old ? 0 : 8}
        fill={old ? '#a5af9a' : modern ? '#a2ad94' : '#a8bfc5'}
        transform="rotate(4 182 109)"
      />
      <rect
        x="47"
        y="39"
        width="254"
        height="151"
        rx={old ? 1 : 7}
        fill={old ? '#303c31' : '#283333'}
        stroke={old ? '#687660' : '#516057'}
      />
      <path
        d="M48 46a6 6 0 0 1 6-6h240a6 6 0 0 1 6 6v15H48Z"
        fill={old ? '#b6c0ac' : '#3a4641'}
      />
      {old ? (
        <>
          <rect
            x="53"
            y="45"
            width="10"
            height="10"
            fill="#dce0cd"
            stroke="#5a6a55"
          />
          <path d="M70 50h91" stroke="#60745b" strokeWidth="3" />
          <path d="m284 46 8 7m0-7-8 7" stroke="#61735a" />
        </>
      ) : (
        <>
          <circle cx="59" cy="50" r="2.5" fill="#d48d73" />
          <circle cx="68" cy="50" r="2.5" fill="#c7b477" />
          <circle cx="77" cy="50" r="2.5" fill="#8da17d" />
          <path d="M145 50h62" stroke="#7d9180" strokeWidth="2" />
        </>
      )}
      {!old && (
        <>
          <path d="M48 62h47v127H48Z" fill="#333e38" />
          <path
            d="M59 75h24m-24 8h18m-18 8h26m-26 8h21m-21 8h23m-23 8h15"
            stroke="#6c7e6b"
            strokeWidth="2"
          />
          <path d="M96 62h204v16H96Z" fill="#303b34" />
          <path d="M105 70h43m14 0h27" stroke="#83927e" strokeWidth="2" />
        </>
      )}
      {Array.from({ length: 8 }, (_, i) => (
        <g key={i}>
          <path
            d={`M${old ? 59 : 104} ${89 + i * 10}h${old ? 3 : 4}`}
            stroke="#6a8068"
            strokeWidth="1.5"
          />
          <path
            d={`M${(old ? 73 : 117) + (i % 3) * 10} ${89 + i * 10}h${[25, 38, 17, 45, 18, 29, 31, 14][i]}`}
            stroke={
              i % 3 === 0
                ? modern
                  ? '#e6a175'
                  : old
                    ? '#c9d7a3'
                    : '#8fa9c7'
                : foreground
            }
            strokeWidth="2.5"
          />
          <path
            d={`M${(old ? 110 : 162) + (i % 3) * 9} ${89 + i * 10}h${[45, 61, 31, 52, 19, 36, 47, 17][i]}`}
            stroke={i % 2 ? '#7b9b86' : '#c8bd90'}
            strokeWidth="2.5"
          />
        </g>
      ))}
      <path
        d={old ? 'm61 177 5 3-5 3m12 0h9' : 'M49 180h250'}
        fill="none"
        stroke={old ? '#b1c7a3' : '#597b64'}
        strokeWidth={old ? 2 : 1}
      />
      {!old && (
        <path
          d="M56 185h29m147 0h25m9 0h23"
          stroke="#8da080"
          strokeWidth="1.5"
        />
      )}
      {modern && (
        <g transform="rotate(-5 279 149)">
          <rect
            x="250"
            y="121"
            width="65"
            height="57"
            rx="9"
            fill="#ef8050"
            stroke="#f2af80"
          />
          <path
            d="m271 139-9 9 9 9m22-18 9 9-9 9m-9-21-5 24"
            fill="none"
            stroke="#fff0d5"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}
    </g>
  )
}

function Mobile({ year, id }: { year: DeviceArtProps['year']; id: string }) {
  const old = year === 1995
  const modern = year === 2026
  if (old)
    return (
      <g transform="rotate(9 180 112)">
        <ellipse cx="180" cy="203" rx="65" ry="7" fill={INK} opacity=".12" />
        <path d="M154 23V5c0-6 8-6 8 0v18" fill="#3f4c44" />
        <path
          d="M147 22h68c6 0 10 5 10 12v144c0 15-16 25-44 25s-43-10-43-25V34c0-7 3-12 9-12Z"
          fill="#2f3b35"
        />
        <path
          d="M148 25h60c8 0 12 7 12 14v135c0 15-14 23-36 23s-39-8-39-23V38c0-6 0-10 3-13Z"
          fill="#5b6b5d"
        />
        <path d="M157 28h49l7 10v70l-8 10h-48l-8-10V39Z" fill="#83917a" />
        <path d="M170 38h26m-26 4h26" stroke="#445845" strokeWidth="2" />
        <rect
          x="155"
          y="53"
          width="53"
          height="45"
          rx="3"
          fill="#aeba89"
          stroke="#4a5f42"
          strokeWidth="2"
        />
        <path
          d="M161 61v8m4-6v6m4-9v9m26-7h8v5h-8Zm9 1h1"
          stroke="#475a36"
          strokeWidth="1.5"
          fill="none"
        />
        <path d="M165 77h34m-29 7h23" stroke="#475a36" strokeWidth="3" />
        <path d="M166 107h28" stroke="#3e5341" strokeWidth="2.5" />
        <rect x="170" y="119" width="24" height="11" rx="5.5" fill="#bbc2a1" />
        <path
          d="M153 121h10m38 0h10"
          stroke="#b7bea0"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {[0, 1, 2, 3].map((row) => (
          <g key={row}>
            {[0, 1, 2].map((col) => (
              <g key={col}>
                <rect
                  x={152 + col * 22}
                  y={136 + row * 13}
                  width="17"
                  height="9"
                  rx="4"
                  fill="#bdc5a8"
                />
                <path
                  d={`M${159 + col * 22} ${139 + row * 13}v3`}
                  stroke="#50634a"
                  strokeWidth="1.5"
                />
              </g>
            ))}
          </g>
        ))}
        <path d="M176 191h13" stroke="#415440" strokeWidth="2" />
        <path d="M142 41v134" stroke="#a0aa8d" opacity=".45" />
      </g>
    )
  return (
    <g transform={modern ? 'rotate(8 180 111)' : 'rotate(-8 180 111)'}>
      <ellipse cx="183" cy="205" rx="62" ry="7" fill={INK} opacity=".12" />
      <rect
        x="130"
        y="15"
        width="103"
        height="190"
        rx={modern ? 18 : 13}
        fill={modern ? '#42473e' : '#a3aaa5'}
      />
      <rect
        x="127"
        y="13"
        width="103"
        height="190"
        rx={modern ? 18 : 13}
        fill={modern ? '#252d24' : '#242c2b'}
        stroke={modern ? '#7b816c' : '#ced0c4'}
        strokeWidth="1.3"
      />
      <rect
        x="133"
        y={modern ? 19 : 40}
        width="91"
        height={modern ? 177 : 138}
        rx={modern ? 13 : 1}
        fill={modern ? '#dfdcbf' : `url(#${id}-blue)`}
      />
      {modern ? (
        <>
          <path d="M133 96c40-42 45-33 91-74v174h-91Z" fill="#a6b296" />
          <path d="M133 150c57-27 36-76 91-83v129h-91Z" fill="#d8794d" />
          <path d="M133 186c34-56 62-11 91-81v91h-91Z" fill="#eaa275" />
          <path
            d="M157 60h44m-40 8h36"
            stroke="#34442c"
            strokeWidth="3"
            opacity=".7"
          />
          <path
            d="M160 84h38"
            stroke="#34442c"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path d="M143 127h71v30h-71Z" fill="#f7efd9" opacity=".78" />
          <circle cx="154" cy="138" r="4" fill="#df8558" />
          <path
            d="M164 136h40m-40 5h30m-47 8h54"
            stroke="#8f9e80"
            strokeWidth="2"
          />
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={143 + i * 18}
              y="174"
              width="13"
              height="13"
              rx="4"
              fill={['#526349', '#faf0cf', '#e6bb82', '#6e8260'][i]}
            />
          ))}
          <rect x="162" y="24" width="33" height="8" rx="4" fill="#232b22" />
          <path
            d="M164 192h31"
            stroke="#f8edd7"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <path d="m133 129 26-30 19 17 16-25 30 40v47h-91Z" fill="#36718e" />
          <path
            d="M160 28h31"
            stroke="#677b78"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="151" cy="28" r="2" fill="#6c8580" />
          <path d="M139 45h13m54 0h12" stroke="#dbe8dd" strokeWidth="1.5" />
          {[0, 1, 2, 3].map((row) => (
            <g key={row}>
              {[0, 1, 2, 3].map((col) => (
                <g key={col}>
                  <rect
                    x={140 + col * 21}
                    y={54 + row * 26}
                    width="15"
                    height="16"
                    rx="3"
                    fill={
                      ['#a6bcb1', '#e2d5aa', '#6a9cb1', '#af9a86', '#6d9e95'][
                        (row + col) % 5
                      ]
                    }
                  />
                  <path
                    d={`M${143 + col * 21} ${59 + row * 26}h9m-7 4h5`}
                    stroke="#e6eddb"
                    strokeWidth="1"
                    opacity=".8"
                  />
                  <path
                    d={`M${141 + col * 21} ${74 + row * 26}h13`}
                    stroke="#d9e4db"
                    strokeWidth="1"
                  />
                </g>
              ))}
            </g>
          ))}
          <rect
            x="136"
            y="158"
            width="85"
            height="17"
            rx="3"
            fill="#d5e1d7"
            opacity=".45"
          />
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={141 + i * 21}
              y="160"
              width="13"
              height="13"
              rx="3"
              fill={['#8bab84', '#92bbc1', '#a8b2bd', '#c4b282'][i]}
            />
          ))}
          <circle cx="178" cy="190" r="8" fill="#2c3531" stroke="#536660" />
          <rect
            x="175"
            y="187"
            width="6"
            height="6"
            rx="1"
            fill="none"
            stroke="#8b9990"
          />
        </>
      )}
      <path
        d={modern ? 'M129 58v19m0 8v24m101-40v29' : 'M128 55v10m0 10v14m0 8v14'}
        stroke={modern ? '#8d937e' : '#c5cabb'}
        strokeWidth="2"
      />
      <path d="M133 33v141" stroke="#fffdeb" opacity=".1" />
    </g>
  )
}

function AIAssistant() {
  return (
    <g>
      <ellipse cx="182" cy="201" rx="128" ry="9" fill={INK} opacity=".09" />
      <rect
        x="81"
        y="31"
        width="224"
        height="151"
        rx="12"
        fill="#c2c9b7"
        stroke="#aeb7a1"
        transform="rotate(5 193 107)"
      />
      <rect
        x="54"
        y="39"
        width="238"
        height="151"
        rx="12"
        fill="#30392e"
        stroke="#5a654e"
      />
      <path d="M55 68h236" stroke="#5a654e" strokeWidth=".8" />
      <circle cx="66" cy="53" r="2.5" fill="#de936d" />
      <circle cx="75" cy="53" r="2.5" fill="#b4ad7e" />
      <circle cx="84" cy="53" r="2.5" fill="#829674" />
      <path
        d="M145 53h61"
        stroke="#91a17e"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect x="123" y="80" width="149" height="27" rx="9" fill="#e6e7d5" />
      <path d="M259 103v10l-12-9" fill="#e6e7d5" />
      <path
        d="M137 91h87m-87 6h117"
        stroke="#92a080"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect x="72" y="120" width="20" height="20" rx="6" fill="#dd8c5b" />
      <path
        d="m82 124 1.5 4.5L88 130l-4.5 1.5L82 136l-1.5-4.5L76 130l4.5-1.5Z"
        fill="#fff0cf"
      />
      <path
        d="M105 124h93m-93 7h147m-147 7h125"
        stroke="#a5b292"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <rect
        x="72"
        y="156"
        width="201"
        height="23"
        rx="7"
        fill="#424d3c"
        stroke="#647357"
        strokeWidth=".7"
      />
      <path
        d="M83 167h62"
        stroke="#8d9b7c"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="260" cy="167" r="7" fill="#e78552" />
      <path
        d="m257 168 3-3 3 3m-3-3v6"
        stroke="#fff2d3"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g transform="rotate(10 281 65)">
        <rect
          x="252"
          y="34"
          width="61"
          height="61"
          rx="16"
          fill="#e47e4d"
          stroke="#efad7d"
        />
        <path
          d="m282 47 4.5 12.5L299 64l-12.5 4.5L282 81l-4.5-12.5L265 64l12.5-4.5Z"
          fill="#fff0d1"
        />
        <path
          d="m301 44 1.5 4.5L307 50l-4.5 1.5L301 56l-1.5-4.5L295 50l4.5-1.5Z"
          fill="#fff0d1"
          opacity=".8"
        />
      </g>
      <g transform="rotate(-10 49 133)">
        <rect
          x="29"
          y="111"
          width="42"
          height="43"
          rx="10"
          fill="#e2dfcc"
          stroke="#c1c6b1"
        />
        <path
          d="m44 123-8 9 8 9m12-18 8 9-8 9"
          fill="none"
          stroke="#7d906a"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </g>
  )
}

export default function DeviceArt({
  year,
  category,
  variant,
  className = '',
}: DeviceArtProps) {
  const id = `device-${useId().replace(/:/g, '')}`
  return (
    <svg
      className={`device-art device-art--${year} device-art--${category} ${variant ? `device-art--${variant}` : ''} ${className}`}
      viewBox="0 0 360 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id={`${id}-beige`}
          x1="98"
          y1="29"
          x2="253"
          y2="168"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ddd8bf" />
          <stop offset="1" stopColor="#c8c2a9" />
        </linearGradient>
        <linearGradient
          id={`${id}-blue`}
          x1="100"
          y1="39"
          x2="260"
          y2="168"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#a0c6d1" />
          <stop offset=".5" stopColor="#4f90b4" />
          <stop offset="1" stopColor="#2b657e" />
        </linearGradient>
        <linearGradient
          id={`${id}-silver`}
          x1="181"
          y1="168"
          x2="181"
          y2="197"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#b8c0ba" />
          <stop offset="1" stopColor="#e7e9df" />
        </linearGradient>
        <linearGradient
          id={`${id}-dark`}
          x1="181"
          y1="168"
          x2="181"
          y2="197"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5c6153" />
          <stop offset="1" stopColor="#737766" />
        </linearGradient>
        <linearGradient
          id={`${id}-disc`}
          x1="197"
          y1="91"
          x2="279"
          y2="173"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#acbdaf" />
          <stop offset=".23" stopColor="#e6e8cc" />
          <stop offset=".48" stopColor="#b8c7bb" />
          <stop offset=".72" stopColor="#e1dcc5" />
          <stop offset="1" stopColor="#8fae9d" />
        </linearGradient>
      </defs>
      {variant === 'ai' ? (
        <AIAssistant />
      ) : (
        <>
          {category === 'computers' && <Computer year={year} id={id} />}
          {category === 'internet' && <Browser year={year} />}
          {category === 'software' && <Software year={year} id={id} />}
          {category === 'programming' && <Programming year={year} />}
          {category === 'mobile' && <Mobile year={year} id={id} />}
        </>
      )}
    </svg>
  )
}
