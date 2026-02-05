import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUserStore } from "@/store";
import { toastSuccess, axiosErrorToast } from "@/lib/utils/toast";
import Spinner from "@/assets/icons/Spinner";

export default function GoogleCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUser, setToken } = useUserStore();

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error) {
      axiosErrorToast(new Error(error));
      navigate("/auth/login");
      return;
    }

    if (token) {
      try {
        // Decode token to get user info (JWT payload is the second part)
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        const payload = JSON.parse(jsonPayload);

        setUser({
          id: payload.id,
          email: payload.email,
          fullName: payload.username,
          avatar: payload.avatar,
        });
        setToken(token);
        localStorage.setItem("token", token);

        toastSuccess("Welcome back!");
        navigate("/");
      } catch (err) {
        console.error("Failed to process Google callback:", err);
        axiosErrorToast(err as Error);
        navigate("/auth/login");
      }
    } else {
      navigate("/auth/login");
    }
  }, [searchParams, setUser, setToken, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <Spinner />
        <p className="mt-4 text-muted-foreground">Authenticating...</p>
      </div>
    </div>
  );
}
