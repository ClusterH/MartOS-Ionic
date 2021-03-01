import { ExternalProvider } from "./ExternalProvider";

export type LoginViewModel = {
    username: string;
    password: string;
    rememberLogin: boolean;
    returnUrl: string;
    button: string;
    allowRememberLogin: boolean;
    enableLocalLogin: boolean;
    externalProviders: ExternalProvider[];
    visibleExternalProviders: ExternalProvider[];
    isExternalLoginOnly: string;
    externalLoginScheme: boolean;
};