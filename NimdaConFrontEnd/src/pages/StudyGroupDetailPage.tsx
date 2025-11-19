import { useParams, useNavigate } from "react-router-dom";
import StudyGroupCommon from "@/components/common/StudyGroupCommon";

export default function StudyGroupDetailPage() {
  const params = useParams();
  const navigate = useNavigate();
  const groupId = Number(params.id || params['id']);

  const handleLeaveGroup = () => {
    const ok = window.confirm('정말 그룹을 나가시겠습니까?');
    if (!ok) return;
    // 실제 그룹 나가기 API 호출 로직이 이 함수에 들어갑니다.
    // 성공 후 홈으로 이동
    alert('그룹을 나갔습니다.');
    navigate('/home');
  };

  return (
    <StudyGroupCommon 
      groupId={groupId}
      isDetailPage={true}
      onHeaderButtonClick={handleLeaveGroup}
    />
  );
}