import { getTokenClient } from "../auth/getTokenClient";

export async function fetchAsyncToBackEnd(
  url: string,
  input: RequestInit = {}
) {
  const { headers: inputHeaders, body, ...rest } = input;

  // 기본 헤더 설정
  const defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getTokenClient()}`,
  };

  // 사용자로부터 전달된 헤더와 기본 헤더를 병합
  const headers = { ...defaultHeaders, ...inputHeaders };

  // body가 객체라면 JSON.stringify 처리
  const processedBody =
    body && typeof body === "object" ? JSON.stringify(body) : body;

  const finalInput = {
    headers,
    body: processedBody,
    ...rest,
  };

  console.log("Final input for fetch:", finalInput);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_END_POINT}${url}`,
    finalInput
  );

  // 필요하다면 여기서 response를 처리하거나 에러 핸들링 로직을 추가

  return response;
}
