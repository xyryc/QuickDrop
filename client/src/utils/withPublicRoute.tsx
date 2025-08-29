// src/utils/withPublicRoute.tsx

import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { FC,} from "react";
import { Navigate } from "react-router-dom";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";

export const withPublicRoute = (Component: FC) => {
  const PublicRoute = () => {
    const { data: userData, isLoading } = useUserInfoQuery(undefined);
    
    if (isLoading) {
      return <LoadingSkeleton />;
    }
    if (userData?.data?.email) {
      return <Navigate to="/" replace />;
    }
    
    return <Component />;
  };

  return PublicRoute;
};