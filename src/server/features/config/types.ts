export type ConfigType = {
    port: number;
    sessionSecret: string;
    packyTemplatesFolder: string;
    mongoPath: string;
    mongoUser: string;
    mongoPassword: string;
    Auth0Domain: string;
    Auth0PackyClientId: string;
    Auth0PackyClientSecret: string;
    Auth0PackyCallbackUrl: string;
    Auth0PackyBackendAppId: string;
    Auth0PackyBackendAppSecret: string;
    Auth0PackyApiId: string;
    IsWizziDev: boolean;
    MetaHtmlIttfPath: string;
    MetaFolderIttfPath: string;
    MetaHtmlTextPath: string;
    PackyApiEndpoint: string;
}

