import { useParams, useNavigate } from "react-router-dom";
import StudyGroupCommon from "@/components/common/StudyGroupCommon";

export default function StudyGroupJoinPage() {
  const params = useParams();
  const navigate = useNavigate();

  const rawId = params.id;
  const groupId = Number(rawId);

  // ID가 유효하지 않으면 에러 메시지 표시 또는 리다이렉트
  if (!rawId || isNaN(groupId)) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>유효하지 않은 그룹 ID입니다.</div>;
  }

  const handleJoinAction = () => {
    if (groupId && groupId > 0) {
      navigate(`/studygroup/${groupId}`);
    }
  };

  return (
    <StudyGroupCommon 
      groupId={groupId}
      isDetailPage={false}
      onHeaderButtonClick={handleJoinAction}
    />
  );
}