export interface TokenRequest {
    client_id : string;
    code : string;
    redirect_uri : string;
    code_verifier : string;
    grant_type : string;
    refresh_token: string;
}