import browser from "webdriverio/build/commands/browser";

describe('Login Page', function () {
    it('should let you log in', async function () {
        await browser.url('/');
     //   await browser.setValue('input[name="email"]', 'valid@user.com');
     //   await browser.setValue('input[name="password"]', 'hunter2');
      });
  });