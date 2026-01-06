import { DefineComponent } from "vue";

export default interface MenuSection {
    icon?: DefineComponent,
    title: string;
    route: string;
}