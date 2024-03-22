import { env } from "@/utils/env";

interface GoogleTokensResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  id_token: string;
}

export class GoogleServices {
  async getAccessToken(code: string) {
    const paramsValues = new URLSearchParams({
      code,
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      redirect_uri: env.GOOGLE_REDIRECT_URL,
      grant_type: "authorization_code",
    });

    const { access_token } = await fetch(
      `https://oauth2.googleapis.com/token?${paramsValues}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    ).then(res => res.json() as Promise<GoogleTokensResponse>);

    return access_token;
  }

  async getUserData(access_token: string) {
    const userData = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }).then(res => res.json());

    return userData;
  }
}