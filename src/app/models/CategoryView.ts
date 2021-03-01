import { ProductTypeView } from "./ProductTypeView";

export type CategoryView = {
    name: string;
    productTypes: ProductTypeView[];
};
