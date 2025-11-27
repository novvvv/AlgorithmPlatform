import { useParams, useNavigate } from "react-router-dom";
import StudyGroupCommon from "@/components/common/StudyGroupCommon";
import { leaveGroupAPI } from "@/apis/group"; 
import { getErrorMessage } from "@/apis/utils";
import { getCurrentUserAPI } from "@/apis/user"; 
import type { getCurrentUserResponse } from "@/types/user";

export default function StudyGroupDetailPage() {
  const params = useParams();
  const navigate = useNavigate();
  const groupId = Number(params.id || params['id']);

  const handleLeaveGroup = async () => {
    const ok = window.confirm('정말 그룹을 나가시겠습니까?');
    if (!ok) return;
    
    let memberId: number | null = null; 

    try {
      const response: getCurrentUserResponse = await getCurrentUserAPI();
      if (response.user && response.user.id) {
          memberId = response.user.id;
      }
    } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        alert(`사용자 정보를 가져오는 중 오류 발생: ${errorMessage}`);
        console.error("사용자 정보 조회 실패:", error);
        navigate('/login');
        return;
    }

    if (!memberId) {
      alert('사용자 정보를 찾을 수 없습니다. 로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    try {
        await leaveGroupAPI(groupId, memberId); 
        
        alert('그룹을 나갔습니다.');
        navigate('/home');
    } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        console.error("그룹 나가기 실패:", error);
        alert(`그룹 나가기 실패: ${errorMessage}`);
    }
  };

  return (
    <StudyGroupCommon 
      groupId={groupId}
      isDetailPage={true}
      onHeaderButtonClick={handleLeaveGroup}
    />
  );
}