export interface IGetItems {
    items: IItems[],
    page: number,
    pages: number,
    size: number,
    total: number
}

export interface IItems {
    id: string,
    seen: boolean,
    price: number,
    title: string,
    address: string,
    about: string,
    createdAt: string
}

export type getItemsState = {
    getItems: IGetItems[],
    cardId: IItems
}