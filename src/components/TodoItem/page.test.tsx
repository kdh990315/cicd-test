import TodoItem from "./page";
import { render, screen } from "@testing-library/react";

// src/components/TodoItem.test.tsx
test("할 일 항목 상태 테스트", () => {
  // 완료된 할 일
  render(<TodoItem task="리액트 공부하기" completed={true} />);

  // 텍스트 내용 확인
  const taskText = screen.getByText("리액트 공부하기");
  expect(taskText).toHaveTextContent("리액트 공부하기");

  // 체크박스가 체크되어 있는지 확인
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).toBeChecked();

  // 체크박스가 비활성화되어 있는지 확인
  expect(checkbox).toBeDisabled();

  // 수정 버튼이 비활성화되어 있는지 확인
  const editButton = screen.getByRole("button", { name: "수정" });
  expect(editButton).toBeDisabled();

  // 항목에 'completed' 클래스가 있는지 확인
  const listItem = screen.getByRole("listitem");
  expect(listItem).toHaveClass("completed");
});
