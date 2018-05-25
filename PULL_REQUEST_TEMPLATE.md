## Pull Request Code Review

Every piece of code that’s committed to the `master` branch of the repo is reviewed. 
The first step is pushing your branch to origin and opening a pull request on master.

### General PR review Process
- Checkout the branch.
- Verify PR is a single change type. Example, 'refactor' OR 'bugfix'. If it is more than 1 type, ask submitter to break out requests.
- Verify code under review has at least 80% unit test coverage.
- Verify tests are green in CI + run tests in local build by running `yarn / npm test`
- Verify no code quality violations are present from linting (should be reported in terminal)
- Review for obvious errors or bad coding practice. Use best judgement here.
- If the change results in needing updates to docs (such as public API change, module interface etc), add a label for "needs docs" and inform the submitter they must submit a docs PR to update the appropriate area of the external documentation **before the PR can merge**. Help them with finding where the docs are located if needed. 
- Once there is a +1 on the PR, merge to master
- Add notes for this submission to the project's [changelog](./CHANGELOG).

How to perform reviews?
- Please make sure you understand exactly what the submitter's intent is. 
- Look for improvements in code style (- please try to prevent "tabs vs. 4 spaces" opinions (smile))
- Look for improvements in design. (keep your code simple, maintainable and upgradable)
- Look for proper separation of concerns: views shouldn't usually talk to models, controllers shouldn't interact with views directly, etc.
- Point out refactorings to reuse code (i.e., keep your code D.R.Y)
- Evaluate if the main goal has reasonable test coverage and these don't assert on false positives

- Please also read the following important resources on performing code reviews:
    https://medium.com/@mrjoelkemp/giving-better-code-reviews-16109e0fdd36
    https://smartbear.com/learn/code-review/best-practices-for-peer-code-review/
    https://blog.asana.com/2016/12/7-ways-to-uplevel-your-code-review-skills/
    https://www.planetgeek.ch/wp-content/uploads/2013/06/Clean-Code-V2.2.pdf
    
Tips for submitters:
- Please keep the code short: Beyond 200 lines and the effectiveness of a review drops significantly. By the time you’re at more than 400 they become almost pointless.
  Provide context: Link to any related tickets, or the spec. Provide short, but useful commit messages and plenty of comments throughout your code. It’ll help the reviewer and you’ll get fewer issues coming back.
