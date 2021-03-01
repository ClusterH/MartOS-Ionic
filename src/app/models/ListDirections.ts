import { Location } from "./Location";
import { Point } from "./Point";

export type ListDirections = {
    storesLocation: Location[];
    points: Point[];
    clientLocation: Location;
    riderLocation: Location;
}