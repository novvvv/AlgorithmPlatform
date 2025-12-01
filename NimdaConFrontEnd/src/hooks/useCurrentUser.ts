import { useState, useEffect, useCallback } from "react";
import { getCurrentUserAPI } from "@/apis/user";
import { getErrorMessage } from "@/apis/utils";
import type { IUserDetail } from "@/types/user";

export const useCurrentUser = () => {
  const [user, setUser] = useState<IUserDetail | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getCurrentUserAPI();
      const userData = (response as any).user || response; 
      
      setUser(userData);
      setUserId(userData.id);
    } catch (error) {
      console.error("사용자 정보 로딩 실패. Mock ID (101) 사용:", getErrorMessage(error));
      setUserId(101); // Fallback ID
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, userId, isLoading, refetch: fetchUser };
};