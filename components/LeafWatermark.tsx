/**
 * LeafWatermark — fundo branco com uma marca d'água de folha repetida.
 * ------------------------------------------------------------------
 * Fica fixo atrás de TODA a página (`fixed inset-0 -z-10`) — como ele não
 * rola junto com o conteúdo, a marca d'água aparece igual em qualquer parte
 * do site, sem precisar colocar esse componente em cada seção.
 *
 * Cada "folha" é montada com 7 pontas (`<use>` girado em ângulos diferentes
 * em volta de um centro), do mesmo jeito que uma folha de cannabis de
 * verdade — não é uma foto, é só um desenho leve repetido (`<pattern>` do
 * SVG), bem clarinho, pra não competir com o conteúdo da página.
 */

const BLADE_ANGLES = [-70, -45, -22, 0, 22, 45, 70];
const BLADE_LENGTHS = [26, 34, 40, 46, 40, 34, 26]; // a ponta do meio é a mais comprida

export default function LeafWatermark() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-white">
      <svg className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="leafWatermark" width="220" height="220" patternUnits="userSpaceOnUse" patternTransform="rotate(8)">
            <g transform="translate(110 130)" fill="#e7ede2">
              {BLADE_ANGLES.map((angle, i) => {
                const len = BLADE_LENGTHS[i];
                return (
                  <path
                    key={angle}
                    transform={`rotate(${angle})`}
                    d={`M0,0 Q-4,${-len * 0.5} -1,${-len} Q0,${-len - 4} 1,${-len} Q4,${-len * 0.5} 0,0 Z`}
                  />
                );
              })}
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#leafWatermark)" />
      </svg>
    </div>
  );
}
