export type conferenceYear = {
    id: number,
    year: number,
}

export type subpageData = {
    id: number,
    year: number,
    title: string,
    content: string,
}

export type adminUser = {
    id: number,
    email: string,
    name: string
}

export type editorUser = {
    id: number,
    email: string,
    name: string,
    conferenceYears: conferenceYear[];
}