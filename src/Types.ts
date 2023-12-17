export enum Type {
    CLASSIC = "CLASSIC",
    SERVER_SIDE = "SERVER_SIDE",
    MVT = "MVT"
}

export enum Status {
    DRAFT = "DRAFT",
    ONLINE = "ONLINE",
    PAUSED = "PAUSED",
    STOPPED = "STOPPED",
}

export interface Site {
    id: number;
    url: string;
}

export interface IItem {
    id: number;
    name: string;
    type: Type;
    status: Status;
}

export interface Test extends IItem {
    siteId: number;
}

export interface ITest extends IItem {
    site: string;
    markColor: string;
}

export interface IStiles {
    display: string,
    transform: string
}

export interface IStrategy {
    type: string,
    col: string
}

export interface IChevronStyles {
    name: IStiles,
    type: IStiles,
    status: IStiles,
    site: IStiles,
}
