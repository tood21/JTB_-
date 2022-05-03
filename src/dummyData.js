const data = [
  {
    id: 1,
    category: "프론트엔드 개발/JavaScript",
    date: "2022년 2월 22일",
    title:
      "Promise 정리: async/await 사용법 & then과의 차이Promise 정리: async/await 사용법 & then과의 차이Promise 정리: async/await 사용법 & then과의 차이",
    content:
      "Promise 객체를 반환하는 함수 asyncFunc 앞에 await를 붙이고, 이를 포함하는 함수 앞에 async를 붙여줍니다. 여기서는 sampleFunc에 할당하는 익명함수가 되겠습니다. await 키워드를 쓰려면 반드시 async 키워드로 선언된 함수 내부여야 합니다.이렇게 하면 result가 제대로 출력됩니다. asyncFunc함수의 실행결과가 반환되어 result에 할당되기 전까지, await 키워드가 console.log 함수의 실행을 지연시켰음을 알 수 있습니다.Promise 객체를 반환하는 함수 asyncFunc 앞에 await를 붙이고, 이를 포함하는 함수 앞에 async를 붙여줍니다. 여기서는 sampleFunc에 할당하는 익명함수가 되겠습니다. await 키워드를 쓰려면 반드시 async 키워드로 선언된 함수 내부여야 합니다.이렇게 하면 result가 제대로 출력됩니다. asyncFunc함수의 실행결과가 반환되어 result에 할당되기 전까지, await 키워드가 console.log 함수의 실행을 지연시켰음을 알 수 있습니다",
  },
  {
    id: 2,
    category: "리액트",
    date: "2022년 4월 05일",
    title: "JS 기술면접 스터디 6주차: immutable 객체부터 이벤트 루프까지",
    content:
      "1. JavaScript 코드를 디버깅하기 위해 어떤 도구와 기술을 사용하나요 debugger과 크롬 개발자도구를 사용하면 크롬에서 쉽게 코드 디버깅을 할 수 있습니다. 보통 console.log 함수를 이용해 디버깅을 하는 경우가 많지만, debugger 키워드를 JavaScript 코드 중간에 삽입하면 크롬에서 debugger가 적힌 부분까지 해당 코드를 실행하고 일시정지하고, 해당 부분까지의 컨텍스트를 보여줍니다. 최종결과만을 보여주며 코드를 복잡하게 만드는 console.log 함수로 체크하는 것보다 훨씬 더 효율적이고 정확하게 디버깅이 가능합니다. 이 외에도 React로 개발할 시 React Devtool을 사용하면 컴포넌트와 컴포넌트별 상태를 파악할 수 있습니다.",
  },
];

export default data;
