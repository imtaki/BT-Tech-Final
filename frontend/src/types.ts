export type conferenceYear = {
    id: number,
    year: number,
}

export type subpageData = {
    id: number,
    year: number,
    title: string,
    content: string,
    slug: string
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

export type customFile = {
    id: number,
    name: string,
    path: string
}

export type pageData = {
    id: number,
    slug: string,
    title: string,
    content: string,
    is_link: boolean | number,
    is_index: boolean | number
}