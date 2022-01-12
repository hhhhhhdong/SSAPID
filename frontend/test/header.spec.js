import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
// 테스트할 컴포넌트 파일 Import
import Header from "../src/components/header";

/**
 * @jest-environment jsdom
 */

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

//테스트마다 일반적으로 React 트리를 document의 DOM 엘리먼트에 렌더링하는데,
//이는 DOM 이벤트를 수신하기 위해 중요합니다. 테스트가 끝날 때는, 테스트와 관련된
//설정 및 값에 대해 정리(clean up)를 하고 document 트리에서 마운트 해제합니다.

test("should render component, test textContent (테스트를 구분할수 있는 제목이 들어갑니다.", () => {
  act(() => {
    render(<Header />, container);
  });
  expect(container.querySelector("h1").textContent).toBe("Github");
});

//`act` 함수는 “unit”과 관련된 모든 업데이트 단위가 실행되기 전에 처리되고
//DOM에 적용되도록 돕습니다.
