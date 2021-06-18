import { useEffect } from "react";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar, logOutUser } from "../../apollo";

const SEE_ME_QUERY = gql`
  query seeMe {
    seeMe {
      username
    }
  }
`;

interface IUser {
  seeMe: {
    id: any;
    username: any;
  };
}

const useVerifyUser = () => {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery<IUser>(SEE_ME_QUERY, {
    skip: !hasToken,
    onCompleted: (data) => {
      console.log(`useVerifyUser / onCompleted`);
      console.log(data);
    },
    onError: (error) => {
      console.log(`useVerifyUser / onError`);
      console.log(error);
    },
  });

  useEffect(() => {
    if (data === undefined) return;
    // throw new Error("data is undefined");
    if (data.seeMe === null) {
      // There is a token on localStorage but the token didn't work on the backend
      logOutUser();
    }
  }, [data]);

  return { data };
};

export default useVerifyUser;
