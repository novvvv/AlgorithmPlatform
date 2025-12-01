import { useParams, useNavigate } from "react-router-dom";
import StudyGroupCommon from "@/components/common/StudyGroupCommon";

export default function StudyGroupJoinPage() {
  const params = useParams();
  const navigate = useNavigate();
  const groupId = Number(params.id || params['id']);

  const handleJoinAction = () => {
    navigate(`/studygroup/${groupId}`);
  };

  return (
    <StudyGroupCommon 
      groupId={groupId}
      isDetailPage={false}
      onHeaderButtonClick={handleJoinAction}
    />
  );
}