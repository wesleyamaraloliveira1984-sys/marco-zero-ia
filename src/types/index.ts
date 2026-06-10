// ============================================================================
// REGIME TRIBUTÁRIO
// ============================================================================

export type RegimeTributario = 'MEI' | 'SIMPLES_NACIONAL' | 'LUCRO_PRESUMIDO' | 'LUCRO_REAL'

// ============================================================================
// ESTRUTURA ORGANIZACIONAL
// ============================================================================

export interface Estabelecimento {
  cnpj: string
  nome: string
  localizacao: string
  tipo: 'matriz' | 'filial'
}

export interface Grupo {
  nome: string
  cnpjRaiz: string
  estabelecimentos: Estabelecimento[]
  cnpjConsolidado?: string
}

// ============================================================================
// DOCUMENTOS FINANCEIROS
// ============================================================================

export interface Movimentacao {
  data: string
  descricao: string
  tipo: 'entrada' | 'saida'
  valor: number
  categoria?: string
}

export interface Extrato {
  mes: string
  conta: string
  saldoInicial: number
  saldoFinal: number
  saldoMinimo: number
  saldoMaximo: number
  movimentacoes: Movimentacao[]
}

export interface DRE {
  periodo: string
  receitas: {
    bruta: number
    deducoes: number
    liquida: number
  }
  custos: {
    cogs: number
    variaveis: number
  }
  despesas: {
    operacionais: number
    administrativas: number
    vendas: number
    financeiras: number
  }
  resultados: {
    operacional: number
    financeiro: number
    tributario: number
    liquido: number
  }
}

export interface Folha {
  mes: string
  funcionarios: number
  salarioBruto: number
  inss: number
  fgts: number
  impostos: number
  descontos: number
  liquido: number
  encargosTotal: number
}

export interface NotaFiscal {
  nf: string
  data: string
  emissor: string
  receptor: string
  natureza: 'saida' | 'entrada'
  valorBruto: number
  impostos: number
  valorLiquido: number
  categoria: string
}

export interface Balancete {
  periodo: string
  contas: {
    ativo: {
      circulante: number
      naoCirculante: number
      total: number
    }
    passivo: {
      circulante: number
      naoCirculante: number
      total: number
    }
    patrimonio: number
  }
}

export interface Metadadados {
  dataColeta: string
  origem: string
  validado: boolean
}

export interface DocumentosFinanceiros {
  cnpj: string
  nome?: string
  regime: RegimeTributario
  periodo: string
  estabelecimento?: Estabelecimento
  grupo?: Grupo
  extratos: Extrato[]
  dre?: DRE
  folha?: Folha
  notasFiscaisSaida: NotaFiscal[]
  notasFiscaisEntrada: NotaFiscal[]
  balancete?: Balancete
  metadadados?: Metadadados
}

// ============================================================================
// INDICADORES FINANCEIROS
// ============================================================================

export interface IndicadorLiquidez {
  liquidezCorrente: number
  liquidezImediata: number
  liquidezSeca: number
}

export interface IndicadorMargem {
  margemBruta: number
  margemOperacional: number
  margemLiquida: number
}

export interface IndicadorEndividamento {
  endividamento: number
  imobilizacao: number
  composicaoEndividamento: number
  coberturaDividaOperacional: number
}

export interface IndicadorCiclo {
  cicloConversaoCaixa: number
  prazoRecebimento: number
  prazoPagamento: number
  giroCaixa: number
}

export interface IndicadorCaixa {
  diasCaixaDisponivel: number
  saldoMinimo: number
  saldoMaximo: number
  saldoMedio: number
  volatilidade: number
}

export interface IndicadorRentabilidade {
  roe: number
  roic: number
  roiAtivo: number
  ebitdaMargin: number
  giroAtivo: number
}

export interface Indicadores {
  // Liquidez
  liquidezCorrente: number
  liquidezImediata: number
  liquidezSeca?: number

  // Margem
  margemBruta: number
  margemOperacional: number
  margemLiquida: number

  // Endividamento
  endividamento: number
  imobilizacao: number
  composicaoEndividamento: number
  coberturaDividaOperacional?: number

  // Ciclo
  cicloConversaoCaixa: number
  prazoRecebimento: number
  prazoPagamento: number
  giroCaixa: number

  // Caixa
  diasCaixaDisponivel: number
  saldoMinimo: number
  saldoMaximo: number
  saldoMedio: number

  // Rentabilidade
  roe: number
  roic: number
  rentabilidadeAtivo: number
  ebitdaMargin: number
  giroAtivo: number

  // Concentração
  concentracaoRecebimento: number
  sazonalidade: number
}

// ============================================================================
// PADRÕES E CRÍTICAS
// ============================================================================

export interface PadraiCritico {
  tipo: string
  descricao: string
  severidade: 'baixa' | 'media' | 'alta' | 'critica'
  impacto: string
}

export interface Analise {
  resumo: string
  pontosFortess?: string[]
  pontosFracos?: string[]
}

// ============================================================================
// RESULTADOS DOS AGENTES
// ============================================================================

export interface ResultadoAgente2 {
  cnpj: string
  nome?: string
  periodo: string
  estabelecimento?: Estabelecimento
  grupo?: Grupo

  indicadores: Indicadores
  padroesCriticos: string[]
  padroesDetalhados?: PadraiCritico[]

  recomendacoes: string[]
  scoreGeral: number

  analise?: Analise
}

export interface ImpactoMoedas {
  'r$': number
  dias: number
  semanas: number
  anos: number
}

export interface ComoDizer {
  tecnico: string
  humano: string
  metaforico: string
}

export interface ResultadoAgente4 {
  descricao: string
  impactoMoedas: ImpactoMoedas
  alteracaoPorcentual: number
  investimentoNecessario: number
  tempoImplementacao: number
  risco: 'baixo' | 'medio' | 'alto'
  dependencias?: string[]
  comoDizer?: ComoDizer
}

export interface CartaoExecutavel {
  titulo: string
  descricao: string
  diaInicio: number
  diaFim: number
  prioridade: 'alta' | 'media' | 'baixa'
  dependencias?: string[]
  recursosPessoa?: string
  recursosFinanceiro?: number
  indicadorSucesso: string
}

export interface KPIs {
  saldoMinimo?: number
  cicloConversao?: number
  margemLiquida?: number
  [key: string]: any
}

export type FaseNumero = 0 | 1 | 2 | 3 | 4
export type FaseNome = 'Sprint Emergencial' | 'Estabilização' | 'Reorganização' | 'Preparação Inflow' | 'Operação Contínua'

export interface FaseTransformacao {
  numero: FaseNumero
  nome: FaseNome
  diasInicio: number
  diasFim: number
  descricao?: string
  cards: CartaoExecutavel[]
  kpis: KPIs
}

export interface KPIsGlobais {
  saldoMinimoInicial: number
  saldoMinimoFinal: number
  cicloConversaoInicial?: number
  cicloConversaoFinal?: number
}

export interface ResultadoAgente6 {
  fases: FaseTransformacao[]
  kpisGlobais: KPIsGlobais
  scoreOriginal: number
  intensidade: 'leve' | 'moderada' | 'intensa'
  metasKpis?: { [key: string]: number }
}

export interface EstruturaOrganizacional {
  tipo: string
  matriz?: Estabelecimento
  filiais?: Estabelecimento[]
  grupos?: Grupo[]
}

export interface AnaliseJuridica {
  regimeAtual: RegimeTributario
  recomendacoes: string[]
}

export interface ResultadoAgente1 {
  estrutura: EstruturaOrganizacional
  analiseJuridica?: AnaliseJuridica
  scoreEstrutura: number
}

export interface PerfilPsicologico {
  nome: string
  trajetoria: string
  motorVerdadeiro: string
  pressoes: string[]
  valores: string[]
}

export interface ComportamentoFinanceiro {
  risco: 'conservador' | 'moderado' | 'agressivo'
  padroesTomadaDecisao: string[]
}

export interface ResultadoAgente3 {
  perfil: PerfilPsicologico
  comportamentoFinanceiro: ComportamentoFinanceiro
  recomendacoesPsicologicas: string[]
}

export interface SecaoNarrativa {
  titulo: string
  conteudo: string
  visual?: {
    tipo: 'tabela' | 'grafico' | 'diagrama'
    dados: any
  }
}

export interface CapituloNarrativa {
  numero: number
  titulo: string
  conteudo: string
  secoes?: SecaoNarrativa[]
}

export interface Relatorio {
  titulo: string
  introducao: string
  capitulos: CapituloNarrativa[]
  conclusao: string
}

export interface MetricasRelatorio {
  paginas: number
  palavras: number
  tempo_leitura_minutos: number
}

export interface ResultadoAgente5 {
  relatorio: Relatorio
  metricas: MetricasRelatorio
}

// ============================================================================
// TIPOS DE CONFIGURAÇÃO
// ============================================================================

export interface ConfiguracaoAgente {
  nome: string
  versao: string
  modelo: string
  parametros: { [key: string]: any }
}

export interface Paleta {
  primaria: string
  secundaria: string
  acento: string
}

export interface Tom {
  formal: number
  tecnico: number
  humano: number
}

export interface Empresa {
  nome: 'Marco Zero Inteligência Financeira'
  cnpj: string
  website?: string
}

export interface ConfiguracaoMarcaZero {
  empresa: Empresa
  paleta: Paleta
  tom: Tom
}

// ============================================================================
// TIPOS DE ERRO E VALIDAÇÃO
// ============================================================================

export type TipoErro = 'obrigatorio' | 'formato' | 'logica'

export interface ErroValidacao {
  campo: string
  mensagem: string
  tipo: TipoErro
}

export interface ResultadoValidacao {
  valido: boolean
  erros: ErroValidacao[]
}

// ============================================================================
// TIPOS AUXILIARES
// ============================================================================

export interface ResponseGenerico<T> {
  sucesso: boolean
  dados?: T
  erro?: ErroValidacao[]
  mensagem?: string
}

export interface PaginacaoConfig {
  pagina: number
  limite: number
  total?: number
}

export interface FilterConfig {
  campo: string
  operador: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains'
  valor: any
}
