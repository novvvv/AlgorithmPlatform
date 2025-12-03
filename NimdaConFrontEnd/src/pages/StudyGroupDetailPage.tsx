import { useParams, useNavigate } from "react-router-dom";
import StudyGroupCommon from "@/components/common/StudyGroupCommon";
import { leaveGroupAPI } from "@/apis/group"; 
import { getErrorMessage } from "@/apis/utils";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function StudyGroupDetailPage() {
  const params = useParams();
  const navigate = useNavigate();
  
  const rawId = params.id;
  const groupId = Number(rawId);

  const { userId, isLoading } = useCurrentUser();

  // ID가 유효하지 않으면 에러 메시지 표시 또는 리다이렉트
  if (!rawId || isNaN(groupId)) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>유효하지 않은 그룹 ID입니다.</div>;
  }

  const handleLeaveGroup = async () => {
    if (isLoading) return;
    if (!userId) {
      alert('사용자 정보를 찾을 수 없습니다. 로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    const ok = window.confirm('정말 그룹을 나가시겠습니까?');
    if (!ok) return;

    try {
        await leaveGroupAPI(groupId, userId); 
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