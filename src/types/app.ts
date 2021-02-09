export type ActiveRootView = "onboard" | "main" | "service"
export type OnBoardPanel = "onboard.select" | "onboard.info"
export type ServicePanel = "service.loading" | "service.error"
export type MainPanel = "main.ad" | "main.owner" |
    "main.ad.create-ad"

export interface HistoryItem {
    view: ActiveRootView,
    panel: OnBoardPanel | ServicePanel | MainPanel,
    modal?: string,
    canGoBack: boolean
}

export type History = HistoryItem[]

export type Modal = "filters" | "sort" | null

export interface FilterMinMax {
    min: number,
    max: number,
}

export interface FiltersInterface {
    subscribers: FilterMinMax,
    price: FilterMinMax,
}


export interface GroupInterface {
    name: string,
    subscribers: number,
    price: number,
    image?: string,
    id: number,
    cpv?: Number,
    isAutoPosting?: boolean,
    viewsPerPost?: number

    [key: string]: any
}

export type Sort = "by_price" | "by_subscribers"