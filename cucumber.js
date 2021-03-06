// if you develop locally you can influence the executed tests as follows:
// `process.env.TAGS = ' @some-tag'`
// IMPORTANT: never forget to delete it again, otherwise only those tests will run in CI/CD environment!

// common options also apply to live-mode
const common = [
    'src/features/',
    '--require-module ts-node/register',
    '--require src/**/*.ts'
  ];

//   if (process.env.LIVE_MODE !== 'on') {
    common.push('-f json:./reports/cucumber_report.json');
    common.push('-f progress-bar');
    // common.push('--retry 2');
//   }

  /**
   * A comma separated strings of tags that can be used to limit which feature files to run
   * @example @some-tag1, @some-tag2
   */
  const tags = (process.env.TAGS || '')
      .split(',')
      .map(item => item.trim())
      .join(' ');

//   if (!!tags.trim()) {
  common.push(`-t ${tags}`);
//   }

  // const parallel = (process.env.PARALLEL || '1');
  // common.push(`--parallel=${parallel}`);

  module.exports = {
    cucumber: common.join(' ')
  };
