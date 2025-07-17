import useAccess from './useAccess';

interface AccessProps {
  roles: (number | string)[];
  children: React.ReactNode;
}

const Access: React.FC<AccessProps> = ({ roles, children }) => {
  const access = useAccess();

  return access(roles) ? <>{children}</> : null;
};

export default Access;
