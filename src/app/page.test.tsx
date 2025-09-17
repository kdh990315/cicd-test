import { render, screen } from "@testing-library/react";
import Home from "./page";

test("메인 페이지가 제대로 렌더링 되는지 확인", () => {
  //1. 화면 그리기
  render(<Home></Home>);

  const element = screen.getByText("컴포넌트 테스트 연습하기");

  expect(element).toBeInTheDocument();
});
