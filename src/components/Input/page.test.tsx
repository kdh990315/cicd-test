// src/components/Input/index.test.tsx

import { fireEvent, render, screen } from "@testing-library/react";
import { Input } from "./page";
import { useState } from "react";

test("Input 컴포넌트 미입력 시 X 버튼이 보이지 않아야 한다.", () => {
  render(<Input onChange={jest.fn()} onDelete={jest.fn()} />);

  const input = screen.getByRole("textbox");
  const deleteButton = screen.queryByRole("button", { name: "입력값 지우기" });

  // 입력값이 없고,
  expect(input).toHaveValue("");
  // X 버튼이 보이지 않아야 한다.
  expect(deleteButton).not.toBeInTheDocument();
});

test("Input 컴포넌트에 입력값이 있을 때 X 버튼이 보이는지 확인한다.", () => {
  render(<Input value="입력값" onChange={jest.fn()} onDelete={jest.fn()} />);

  const input = screen.getByRole("textbox");
  const deleteButton = screen.getByRole("button", { name: "입력값 지우기" });

  // 입력값이 있고,
  expect(input).toHaveValue("입력값");
  // X 버튼이 보인다.
  expect(deleteButton).toBeInTheDocument();
});

// test("X 버튼 클릭 시 입력값이 지워지는지 확인한다", () => {
//   render(<Input value="입력값" onChange={jest.fn()} onDelete={jest.fn()} />);

//   const input = screen.getByRole("textbox");
//   const deleteButton = screen.getByRole("button", { name: "입력값 지우기" });

//   // X 버튼 클릭
//   fireEvent.click(deleteButton);

//   // 입력값이 지워지고,
//   expect(input).toHaveValue("");
//   // X 버튼이 사라진다.
//   expect(deleteButton).not.toBeInTheDocument();
// });

// test("X 버튼 클릭 시 입력값이 지워지는지 확인한다", () => {
//   const handleDelete = jest.fn();
//   render(<Input value="입력값" onChange={jest.fn()} onDelete={jest.fn()} />);

//   const deleteButton = screen.getByRole("button", { name: "입력값 지우기" });

//   // X 버튼 클릭
//   fireEvent.click(deleteButton);

//   // 1. 그냥 handleDeleterk x버튼을 누르면 호출이 되는지만 확인한다
//   expect(handleDelete).toHaveBeenCalled();
// });

test("X 버튼 클릭 시 입력값이 지워지는지 확인한다", () => {
  // 삭제 기능을 테스트하기 위해 Wrapper 컴포넌트를 생성
  const Wrapper = () => {
    const [value, setValue] = useState("입력값");
    const handleDelete = () => setValue("");

    return (
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onDelete={handleDelete}
      />
    );
  };
  render(<Wrapper />);

  const input = screen.getByRole("textbox");
  const deleteButton = screen.getByRole("button", { name: "입력값 지우기" });

  // X 버튼 클릭
  fireEvent.click(deleteButton);

  // 입력값이 지워지고,
  expect(input).toHaveValue("");
  // X 버튼이 사라진다.
  expect(deleteButton).not.toBeInTheDocument();
});

test("Input 컴포넌트 에러 발생 시 에러 메세지가 보이는지 확인한다", () => {
  render(
    <Input
      isError={true}
      errorMessage="입력값에 문제가 있습니다"
      onChange={jest.fn()}
      onDelete={jest.fn()}
    />
  );

  const errorMessage = screen.getByText("입력값에 문제가 있습니다");

  // 에러 메세지가 보인다.
  expect(errorMessage).toBeInTheDocument();
});
