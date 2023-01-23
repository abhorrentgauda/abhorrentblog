import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../hooks';

type Props = {
  children: JSX.Element;
};

const AlreadyAuth: React.FC<Props> = ({ children }) => {
  const { token } = useAppSelector((state) => state.auth);

  if (token) return <Navigate to="/" />;

  return children;
};

export default AlreadyAuth;
