/*
 * Placeholder projects — swap each entry for real work when available.
 * `accent` tints the section gradient while the project is active.
 * `art` picks one of the generated SVG thumbnail compositions.
 */
export const PROJECTS = [
  {
    id: 'hyzor',
    title: 'Hyzor Digital',
    kind: 'Software House',
    description:
      'Empresa desenvolvedora de sites, sistemas e soluções digitais sob medida.',
    challenge:
      'WebGL leve coexistindo com scroll suave — shaders pausam fora da viewport para poupar bateria.',
    stack: ['Vite', 'GSAP', 'WebGL'],
    accent: '#CA8A04',
    art: 'waves',
  },
  {
    id: 'domusdei',
    title: 'Loja Domus Dei Fit',
    kind: 'E-commerce',
    description:
      'Vitrine com transições de página compartilhadas: o produto viaja do grid ao carrinho sem cortes.',
    challenge:
      'Carrinho otimista com rollback animado quando a API falha — o estado visual nunca mente para o usuário.',
    stack: ['Node.js', 'Tailwind', 'GSAP'],
    accent: '#7FA08C',
    art: 'orbits',
  },
  {
    id: 'toninho',
    title: 'Toninho Car',
    kind: 'Dashboard App',
    description:
      'Aplicativo mobile para controle de estoque de uma mecânica automotiva.',
    challenge:
      'Criado para organizar o cadastro de peças e produtos, registrar entradas e saídas, consultar itens disponíveis e acompanhar preços e movimentações do estoque.',
    stack: ['React Native', 'Node.js', 'BD', 'GSAP'],
    accent: '#D9A441',
    art: 'bars',
  },
]
