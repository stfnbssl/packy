export type ConfigType = {
    port: number;
    sessionSecret: string;
    packiTemplatesFolder: string;
    mongoPath: string;
    mongoUser: string;
    mongoPassword: string;
    Auth0Domain: string;
    Auth0PackiClientId: string;
    Auth0PackiClientSecret: string;
    Auth0PackiCallbackUrl: string;
    Auth0PackiBackendAppId: string;
    Auth0PackiBackendAppSecret: string;
    Auth0PackiApiId: string;
    GithubClientID: string;
    GithubClientSecret: string;
    GithubCallbackURL: string;
    IsWizziDev: boolean;
    MetaHtmlIttfPath: string;
    MetaFolderIttfPath: string;
    MetaHtmlTextPath: string;
    PackiApiEndpoint: string;
}

