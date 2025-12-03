import { useState, useEffect, useCallback } from "react";
import type { IUser } from "@/types/user";

export const useCurrentUser = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  const fetchUser = useCallback(() => {
    // localStorage에서 사용자 정보 가져오기
    const token = localStorage.getItem("authToken");
    const userStr = localStorage.getItem("user");
    
    if (token && userStr) {
      try {
        const userData: IUser = JSON.parse(userStr);
        setUser(userData);
        setUserId(userData.id);
        console.log("localStorage에서 사용자 정보 로드:", userData);
      } catch (err) {
        console.error("사용자 정보 파싱 실패:", err);
        setUser(null);
        setUserId(null);
      }
    } else {
      setUser(null);
      setUserId(null);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, userId, isLoading: false, refetch: fetchUser };
};