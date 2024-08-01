import axios from "axios";

interface SignInResponse {
  id: string;
  email: string;
  token: string;
}

interface SignInRequest {
  email: string;
  password: string;
}

export const signinService = async ({
  email,
  password,
}: SignInRequest): Promise<SignInResponse> => {
  const { data } = await axios.post(
    "http://localhost:3001/auth/login",
    {
      email,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data as SignInResponse;
};
