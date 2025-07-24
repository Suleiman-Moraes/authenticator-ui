import { Direction } from "../enum/direction";

export interface Filter {
    paginate?: boolean;
    page?: number;
    size?: number;
    direction?: Direction;
    property?: string;
    searchText?: string | null;
}
