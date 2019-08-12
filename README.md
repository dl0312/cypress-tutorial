# Cypress Tutorial

[cypress](https://github.com/cypress-io/cypress) - Fast, easy and reliable testing for anything that runs in a browser.
* OpenSource Project(MIT License)
* Browser Support: `Electron`, `Chrome`
* Element 접근: `Iframe`에 `Target Web`을 올린 뒤 `Browser` 내부에서 접근함.
* Headless Support: 지원
* CLI Support: 지원
* ScreenShot: 지원
* Video Record: `Electron`만 지원
* 심플한 API 제공
* `Mocha` 기반이기 때문에 `Nodejs` 개발자들에게 익숙합니다.
* 내부적으로 `queue`를 써서 `sync`인것 처럼 동작합니다.
  
## Cypress는 무엇인가?
`cypress`는 e2e<sup>End to End</sup> testing framework이다. 개발자 입장에서 프로그램의 모듈을 검증하는 유닛 테스트와 달리 e2e test는 사용자 입장에서 테스트하는 것을 뜻한다. e2e 테스트에 대한 자세한 설명은 "[E2E Test 알아보기](https://medium.com/hbsmith/e2e-test-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0-3c524862469d)"를 참고한다.

`cypress`는 각 테스트의 과정을 웹페이지를 통해 보여주는 매우 시각적 도구이다. 또한, 각 테스트 시행을 스냅샷처럼 찍어 해당 테스트환경으로도 돌아갈 수 있다.

## 왜 또 다른 테스트 도구가 필요한가?
기존의 테스트는 너무 어렵다.

기존 개발자들이 테스트 도구에 가지는 불만이 무엇인가?
* 기본 설정이 어렵다 - 진입장벽이 높다.
* 작성 - 테스트 코드를 작성하는 것이 어렵다.
* 관리 - 해당 테스트 코드의 결과가 이해하기 어렵고 다루기 어렵다.

대부분은 Selenium을 사용한 e2e 테스트 도구들의 문제는 다음과 같았다.
* 웹의 발전(Evolution) - AJAX의 등장으로 웹의 구조가 점점 더 복잡해졌다.
* 비동기 코드(Async Code)
* 구조(Architecture)
* 제어(Control) - 개발자가 완전한 통제권을 가지지 못한다.
* 속도(Speed) - 너무너무 느렸다.

# 간단한 Vux X Cypress Tutorial
우선 `vue-cli`@3.x 버전을 사용하여 프로젝트를 구성하고, 추가 설정은 다음과 같이 해준다.
```shell
$ vue create cypress-tutorial
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, Linter, E2E
? Pick a linter / formatter config: Basic
? Pick additional lint features: (Press <space> to select, <a> to toggle all, <i> to invert selection)Lint on save
? Pick a E2E testing solution: Cypress
? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? In dedicated config files
? Save this as a preset for future projects? No
```

설치가 마무리되면, `tests/e2e`라는 e2e 테스트 코드가 들어있는 폴더가 생긴다.
그리고, `tests/e2e/specs` 폴더에 있는 `test.js`가 우리가 사용할 e2e 테스트 코드이다.
```js
// test.js
// https://docs.cypress.io/api/introduction/api.html
describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'Welcome to Your Vue.js App')
  })
})
```
이 코드를 화면 중간에 나오는 링크의 갯수를 확인하는 코드로 바꿔보자 우선 `HelloWorld.vue` 파일을 수정해야한다.
Essential Links 아래 있는 ul tag에 `data-cy="links"`라는 속성을 주입한다. 이 속성은 `cypress`에서만 쓰이는 속성이 될 것 이다.
```html
<h3>Essential Links</h3>
<ul data-cy="links">
    <li>
    <a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a>
    </li>
    <li>
    <a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a>
    </li>
    <li>
    <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a>
    </li>
    <li>
    <a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a>
    </li>
    <li>
    <a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a>
    </li>
</ul>
```
그리고 해당 링크의 갯수를 확인하는 테스트 코드를 작성한다.
```js
// test.js
// https://docs.cypress.io/api/introduction/api.html
describe('Test main page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })
  it('check links', () => {
    cy.get('[data-cy=links]')
      .children()
      .should('have.length', 5)
  })
})
```
이제 테스트 코드가 잘 동작하는 지 확인하는 일만 남았다. 명령어는 `vue-cli`로 자동으로 생성된 `yarn test:e2e`를 이용한다.
```shell
$ yarn test:e2e
```
명령어를 입력하고 시간이 좀 지나면 브라우저 형태의 `cypress` 프로그램이 실행되면서 테스트가 진행될 것이다.

## References
* 📹[Testing The Way It Should Be (aka Intro Into Cypress)](https://youtu.be/pJ349YntoIs)