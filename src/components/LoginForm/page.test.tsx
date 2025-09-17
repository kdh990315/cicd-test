// src/components/LoginForm/index.test.tsx

import { fireEvent, render, screen } from "@testing-library/react";
import { LoginForm } from "./page";

test("로그인 폼의 이메일과 비밀번호 미입력 시 로그인 버튼 비활성화되는지 확인", () => {
  render(<LoginForm />);

  // 로그인 버튼과 입력 필드 가져오기
  const loginButton = screen.getByRole("button", { name: "로그인" });
  const emailInput = screen.getByLabelText("이메일");
  const passwordInput = screen.getByLabelText("비밀번호");

  // 입력 필드 값이 비어있는지 확인
  expect(emailInput).toHaveValue("");
  expect(passwordInput).toHaveValue("");

  // 로그인 버튼이 비활성화되어 있는지 확인
  expect(loginButton).toBeDisabled();
});

test("이메일, 비밀번호 입력 시 로그인 버튼 활성화되는지 확인", () => {
  render(<LoginForm />);
  const loginButton = screen.getByRole("button", { name: "로그인" });
  const emailInput = screen.getByLabelText("이메일");
  const passwordInput = screen.getByLabelText("비밀번호");

  // 이메일과 비밀번호 입력
  fireEvent.change(emailInput, { target: { value: "test" } });
  fireEvent.change(passwordInput, { target: { value: "test" } });

  // 로그인 버튼이 활성화되었는지 확인
  expect(loginButton).toBeEnabled();
});

test("제대로 된 이메일 입력 시 에러 메세지가 사라지는지 확인", () => {
  render(<LoginForm />);

  const emailInput = screen.getByLabelText("이메일");

  // 1. 잘못된 이메일 입력 후 에러 메세지 나오는지 확인
  fireEvent.change(emailInput, { target: { value: "test" } });
  const errorMessage = screen.getByText("올바른 이메일 형식이 아닙니다.");
  expect(errorMessage).toBeInTheDocument();

  // 2. 올바른 이메일 입력 후 에러 메세지 사라지는지 확인
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  expect(errorMessage).not.toBeInTheDocument();
});
