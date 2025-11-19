import { useParams, useNavigate } from "react-router-dom";
import StudyGroupCommon from "@/components/common/StudyGroupCommon";
import mockStudyGroups from "@/mocks/mockStudyGroups";
import type { IStudyGroup } from "@/types/studyGroup";

export default function StudyGroupJoinPage() {
  const params = useParams();
  const navigate = useNavigate();
  const groupId = Number(params.id || params['id']);

  const groupData: IStudyGroup | undefined = mockStudyGroups.find(g => g.group_id === groupId);

  if (!groupData) {
    navigate('/', { replace: true });
    return null; 
  }

  const handleJoinAction = () => {
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