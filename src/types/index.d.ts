/*
해결방안의 코드와 다른 점은 첫 줄의 export {}와 User type을 import 하는 방식, 2가지다.
global 객체를 확장할 때, 첫 줄의 export {}가 external module로 만들어 주는 역할을 한다.
그리고 global을 사용할 경우 User를 import 할 수 없게 된다. 이럴 때는 interface 안에서 바로 import를 하는 방식을 사용한다.
*/

export {};

declare global {
  namespace Express {
    interface Request {
      user?: import("../entities/User").default;
    }
  }
}
