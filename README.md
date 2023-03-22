# todo-next: understanding test-driven-developlment with Angular best practices

## todo-next: our best practices 101 project

Constructing a to-do list application utilizing Angular 2.0 and above can facilitate the acquisition of best practices for single-page applications (SPAs). This is because such an endeavor necessitates the mastery of techniques for controlling application state, managing user interactions, and developing responsive interfaces. By prioritizing the adoption of best practices, one can gain insights into not only the fundamental elements of SPA applications, but also how to ensure their security, reliability, and proper functioning.

# Table of Contents

- [setting up the environment](#environment)
- [our first next app](#our-first-next-app)
- [enforcing code style](#code-enforing)
- [unit testing](#unit-test)
- [git + github workflows](#section-5)

1.**setting up the environment**
<a name="environment"></a>

  software prequisites:
   - [vs code](<[vs](https://code.visualstudio.com)>), 
   - [git](https://git-scm.com), 
   - [node/npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) are already installed and that we'll be developing on mac hardware–though this is largely irrelevant.

verifiy node, git, npm:

```zsh
john@$ %: node -v
v18.7.0
john@$ %: npm -v
8.18.0
john@$ %: git --version
git version 2.32.1 (Apple Git-133)
```

**important note:** node is an extremely popular js runtime that is used create backend applications of all sizes, with its package manager node hosts one of the richest ecosystems for developers to jump-in and begin coding. (The sever-side magic of next is powered by node "under the hood") 

2.**initialize our first next app**
<a name="our-first-next-app"></a>

```zsh
mkdir todo-next && cd todo-next
npm install -g @angular/cli
```

Angular CLI commands all start with ng, followed by what you'd like the CLI to do. In the Desktop directory, use the following ng new command to create a new application called todo:

```
ng new todo --routing=false --style=scss
```

Navigate into your new project with the following `cd` command:

```
cd todo
```

To run your `todo` application, use `ng serve`:

```
ng serve
```

3.**enforcing code style**

TBD

4.**unit testing**
<a name="unit-test"></a>

Let's examine the main reasons why utilizing unit testing is beneficial for your solution:

  - **`Enhance implementation design:`**
One of the common pitfalls developers encounter is coding without much thought for design. However, using unit testing forces you to consider and reconsider the design, particularly when using Test-Driven Development (TDD), which has an even greater impact.

  - **`Facilitate refactoring:`**
With pre-existing tests that guarantee the expected functionality, you can confidently make modifications to the code without introducing any bugs.

  - **`Prevent breaking functionality while adding new features:`**
Tests can be run to ensure that any newly added features do not disrupt existing application components.

While there are numerous other benefits, these three alone can provide a significant advantage to any project, making them crucial factors to consider. If you are still unconvinced, a few more advantages are worth mentioning.



**Karma**

Angular uses `Karma` as the built in testing engine. A typical test will look something like this...

```ts
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
```


