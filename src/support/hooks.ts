import { unlinkSync } from 'fs';
import { After, AfterAll, BeforeAll, Status, Before } from 'cucumber';

import {
  BROWSER,
  BROWSER_FLAGS,
  LOCALE,
  RECORD_FAILED_ONLY,
  RECORD_SINGLE_FILE,
  RECORD_VIDEO,
  TEST_FAIL_FILE,
  VIDEO_DIR
} from '../environment';
import { SelectorFactoryInitializer } from '../utils/selector-factory';
import { testControllerHolder } from './test-controller-holder';
import { TestControllerConfig } from './test-controller-config';
import {
  addMetadata,
  createTestFailFile,
  createTestFile,
  fetchAndAddVersionsToMetadata,
  generateHtmlReport,
  generateJunitReport
} from './helper';

// tslint:disable-next-line
const createTestCafe: TestCafeFactory = require('testcafe');

const TEST_CAFE_HOST = 'localhost';
const TEST_FILE = 'test.js';
const DELAY = 5 * 1000;

let testCafe: TestCafe;

const state = {
  failedScenarios: 0,
  browserMedadataAdded: false,
  startTime: 0
};

/**
 * Creates a server instance of TestCafe and starts a test-runner.
 * For more info see {@link https://devexpress.github.io/testcafe/documentation/using-testcafe/programming-interface/testcafe.html}
 */
function createServerAndRunTests(): void {
  createTestCafe(TEST_CAFE_HOST)
    .then(async (tc: TestCafe) => {
      testCafe = tc;
      let runner: Runner = tc.createRunner();

      runner = runner
        .src(`./${TEST_FILE}`)
        .screenshots('reports/screenshots/', false) // we create screenshots manually!
        .browsers(`${BROWSER}${BROWSER_FLAGS}`.trim());
      if (RECORD_VIDEO) {
        runner = runner.video(VIDEO_DIR, {
          singleFile: RECORD_SINGLE_FILE,
          failedOnly: RECORD_FAILED_ONLY,
          pathPattern: '${TEST_INDEX}/${USERAGENT}/${FILE_INDEX}.mp4'
        });
      }

      return await runner.run({ quarantineMode: true }).catch((error: any) => console.error('Caught error: ', error));
    })
    .then(() => {
      if (state.failedScenarios > 0) {
        console.warn(`🔥🔥🔥 ${state.failedScenarios} scenarios (retry included) failed 🔥🔥🔥`);
      } else {
        console.log(`All tests passed 😊`);
      }
    });
}

/**
 * Runs before all tests are executed.
 *   - collect metadata for the HTML report
 *   - create the dummy test file to capture the {@link TestController}
 *   - create TestCafe and runs the {@link Runner} w.r.t. the set environment variables (config)
 */
BeforeAll((callback: any) => {
  process.env.E2E_META_BROWSER = '';
  addMetadata('Base URL', 'https://qa-test.avenuecode.io/');
  addMetadata('Locale', LOCALE);
  // tslint:disable-next-line:no-commented-code
  // TODO if you want to have the app version in the report fetchAndAddVersionsToMetadata();

  state.startTime = new Date().getTime();

  // testControllerHolder.register(new TestControllerConfig());
  // SelectorFactoryInitializer.init();

  // createTestFile(TEST_FILE);

  // createServerAndRunTests();

  setTimeout(callback, DELAY);
});

Before(async function () {
  testControllerHolder.register(new TestControllerConfig());
  SelectorFactoryInitializer.init();
  createTestFile(TEST_FILE);
  createServerAndRunTests();
})

/**
 * AfterEach (scenario):
 *   - add metadata regarding the environment (browser + OS)
 *   - take screenshot if the test case (scenario) has failed
 */
After(async function (testCase) {

  if (!state.browserMedadataAdded) {
    state.browserMedadataAdded = true;
    addMetadata('Environment', (await this.getTestController()).browser.prettyUserAgent);
    addMetadata('Browser Flags', BROWSER_FLAGS);
  }

  if (testCase.result.status === Status.FAILED) {
    state.failedScenarios += 1;
    await this.addScreenshotToReport();
  }

  unlinkSync(TEST_FILE);

  SelectorFactoryInitializer.destroy();
  testControllerHolder.destroy();
});

/**
 * Runs after all tests got executed.
 * Hook-Order:
 *   0. Hook: BeforeAll
 *     - execute dummy test ('fixture') and capture TestController
 *   1. Execute feature 1 -> feature n (Hook: After)
 *   2. Hook: After All
 *     - add metadata (start, stop and duration)
 *     - cleanup (destroy TestController, delete dummy test file)
 *     - generate reports (JSON, HTML and JUNIT)
 *     - create file to indicate that tests failed (for CI/CD) if test failed
 *     - shutdown TestCafe
 */
AfterAll((callback: any) => {
  const endTime = new Date().getTime();
  const duration = endTime - state.startTime;
  addMetadata('Duration', new Date(duration).toISOString().substr(11, 8));
  addMetadata('Start', new Date(state.startTime).toISOString());
  addMetadata('End', new Date(endTime).toISOString());
  setTimeout(callback, DELAY);
  // unlinkSync('reports/cucumber_report.html');
  setTimeout(async () => {
    generateHtmlReport();
    generateJunitReport();

    let exitNumber = 0;

    if (state.failedScenarios > 0 && TEST_FAIL_FILE) {
      createTestFailFile();
      exitNumber = 1;
    }
    console.log('Shutting down TestCafe...');
    await testCafe.close();

    process.exit(exitNumber);
  }, DELAY * 6);
});
