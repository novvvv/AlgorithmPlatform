import { useParams, useNavigate } from "react-router-dom";
import StudyGroupCommon from "@/components/common/StudyGroupCommon";
import { leaveGroupAPI } from "@/apis/group"; 
import { getErrorMessage } from "@/apis/utils";
import { getCurrentUserAPI } from "@/apis/user";

export default function StudyGroupDetailPage() {
  const params = useParams();
  const navigate = useNavigate();
  const groupId = Number(params.id || params['id']);

  const handleLeaveGroup = async () => {
    const ok = window.confirm('정말 그룹을 나가시겠습니까?');
    if (!ok) return;
    
    const memberId = getCurrentUserAPI(); 
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