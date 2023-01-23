import { useLocation, Navigate } from 'react-router-dom';

import { useAppSelector } from '../hooks';

type Props = {
  children: JSX.Element;
};

const RequireAuth: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const { token } = useAppSelector((state) => state.auth);

  if (!token) return <Navigate to="/sign-in" state={{ from: location }} />;

  return children;
};

export default RequireAuth;
