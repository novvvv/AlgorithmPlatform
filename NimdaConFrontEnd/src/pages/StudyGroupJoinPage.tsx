// StudyGroupJoinPage.tsx (수정 완료)
import { useParams, useNavigate } from "react-router-dom";
import StudyGroupCommon from "@/components/common/StudyGroupCommon";
import mockStudyGroups from "@/mocks/mockStudyGroups";
import { mockStudyGroupDetail } from "@/mocks/mockStudyGroupDetail";

export default function StudyGroupJoinPage() {
  const params = useParams();
  const navigate = useNavigate();
  const groupId = Number(params.id || params['id']);
  
  // 가입 성공 시 이동할 URL을 미리 계산 (mock 대비용)
  const groupData = mockStudyGroups.find(g => g.group_id === groupId) || mockStudyGroupDetail;

  const handleJoinAction = () => {
    // 실제 가입 API 호출 로직이 이 함수에 들어갑니다.
    // 성공 후 디테일 페이지로 이동
    navigate(`/studygroup/${groupData.group_id}`);
  };

  return (
    <StudyGroupCommon 
      groupId={groupId}
      isDetailPage={false}
      onHeaderButtonClick={handleJoinAction}
    />
  );
}