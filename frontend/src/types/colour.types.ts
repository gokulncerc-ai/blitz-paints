export type ColourFamily =
    | 'reds'
    | 'oranges'
    | 'yellows'
    | 'greens'
    | 'teals'
    | 'blues'
    | 'purples'
    | 'pinks'
    | 'browns'
    | 'neutrals'
    | 'whites';

export interface ColourShade {
    id: string;
    name: string;
    hexCode: string;
    family: ColourFamily | string | null;
    createdAt: string;
}

export interface ColourQueryParams {
    family?: string;
    [key: string]: string | number | boolean | undefined;
}