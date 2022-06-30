import { Selector } from 'testcafe';
import { expect } from 'chai';

fixture `This is my first test using testcafe`
 .page `http://www.google.com`;

test('should have a title', async t => {
  expect(await Selector("title").innerText).to.equal('Google');
});
