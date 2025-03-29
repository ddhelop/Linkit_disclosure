export interface TeamHistory {
  teamHistoryId: number
  historyName: string
  historyStartDate: string
  historyEndDate: string | null
  isHistoryInProgress: boolean
  historyDescription: string
}

export interface MonthHistory {
  [month: string]: TeamHistory[]
}

export interface YearHistory {
  [year: string]: MonthHistory[]
}

export type TeamHistoryCalendar = YearHistory[]
