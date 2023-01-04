import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { selectCurrentUser } from "../../../core/store/current-user";
import { UserRole } from "../../../users/users.types";

type Props = {
  children: JSX.Element;
  requiredUserRole?: UserRole;
};

const PrivateRoute = ({ children, requiredUserRole }: Props): JSX.Element => {
  const currentUser = useSelector(selectCurrentUser);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (requiredUserRole) {
    if (currentUser.role !== requiredUserRole) {
      return <Navigate to="/login" />;
    }
  }

  return children;
};

export default PrivateRoute;
