export function axiosError(error: any) {
  if (
    error?.response?.data?.message &&
    typeof error?.response?.data?.message === "string"
  ) {
    return error.response.data.message;
  } else if (
    error?.response?.message &&
    typeof error?.response?.message === "string"
  ) {
    return error.response.message;
  } else if (error?.message && typeof error?.message === "string") {
    return error.message;
  } else {
    return "Something went wrong";
  }
}
