import styled from "styled-components";
import { useParams } from "react-router-dom";

export default function ProblemSolvePage() {
//   const { id } = useParams();

//   return (
//     <PageContainer>
//       <ProblemSection>
//         <ProblemTitle>문제 #{id}: 두 수의 합</ProblemTitle>
//         <ProblemDescription>
//           <h3>문제 설명</h3>
//           <p>
//             정수 배열 nums와 정수 target이 주어질 때,
//             nums에서 두 개의 서로 다른 인덱스 i와 j를 찾아서
//             nums[i] + nums[j] == target이 되도록 하는 인덱스 배열 [i, j]를 반환하세요.
//           </p>
//         </ProblemDescription>
//         <ProblemExample>
//           <h3>예시</h3>
//           <pre>Input: nums = [2, 7, 11, 15], target = 9
// Output: [0, 1]
// Explanation: nums[0] + nums[1] == 9</pre>
//         </ProblemExample>
//       </ProblemSection>

//       <EditorSection>
//         <EditorTitle>코드 편집기</EditorTitle>
//         <CodeEditorPlaceholder>
//           코드 편집기가 여기에 표시됩니다.
//         </CodeEditorPlaceholder>
//         <SubmitButton>제출</SubmitButton>
//       </EditorSection>
//     </PageContainer>
//   );
}

const PageContainer = styled.div`

`;

const ProblemSection = styled.div`
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
`;

const ProblemTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
`;

const ProblemDescription = styled.div`
  margin-bottom: 1.5rem;

  h3 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: #333;
  }

  p {
    line-height: 1.6;
    color: #555;
  }
`;

const ProblemExample = styled.div`
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;

  h3 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: #333;
  }

  pre {
    overflow-x: auto;
    color: #333;
    font-size: 0.9rem;
  }
`;

const EditorSection = styled.div`
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
`;

const EditorTitle = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #1a1a1a;
`;

const CodeEditorPlaceholder = styled.div`
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 2rem;
  text-align: center;
  color: #666;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const SubmitButton = styled.button`
  padding: 0.75rem 2rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
