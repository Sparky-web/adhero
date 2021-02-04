export type ActiveRootView = "onboard" | "main" | "service"
export type OnBoardPanel = "onboard.select" | "onboard.info"
export type ServicePanel = "service.loading" | "service.error"
export type MainPanel = "main.ad" | "main.owner"

export interface HistoryItem {
    view: ActiveRootView,
    panel: OnBoardPanel | ServicePanel | MainPanel,
    modal?: string,
    canGoBack: boolean
}

export type History = HistoryItem[]