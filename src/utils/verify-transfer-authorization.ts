type VerifyTransferAthorizationResponseProps = {
  status: string;
  data: {
    authorization: boolean;
  };
};

export const verifyTransferAuthorization = async (): Promise<VerifyTransferAthorizationResponseProps> => {
  const apiURL = "https://util.devi.tools/api/v2/authorize";
  try {
    const apiResponse = await fetch(apiURL);
    const apiData = await apiResponse.json();
    return apiData;
  } catch (err) {
    return {
      status: "fail",
      data: {
        authorization: false,
      },
    };
  }
};
