export function sequentialTest() {
  if (this.currentTest.state === 'failed') {
    Cypress.runner.stop();
  }
}
