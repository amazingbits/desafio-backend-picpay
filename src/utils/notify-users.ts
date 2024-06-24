type NotifyUserResponseProps = {
  status: string;
  message: string;
};

export const notifyUser = async (): Promise<NotifyUserResponseProps> => {
  const apiURL = "https://util.devi.tools/api/v1/notify";
  try {
    const apiResponse = await fetch(apiURL, { method: "POST" });
    if (apiResponse.status === 204) {
      return {
        status: "success",
        message: "User notified",
      };
    }

    return {
      status: "error",
      message: "User not notified",
    };
  } catch (err) {
    return {
      status: "error",
      message: err.message,
    };
  }
};
