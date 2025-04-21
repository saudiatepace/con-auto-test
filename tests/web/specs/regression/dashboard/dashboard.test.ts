import { test, expect } from 'fixtures/basePage'
import data from '@testdata/data.json'

test.describe('Dashboard @regression', async () => {
    test.beforeEach('should be able to login', async ({ page, loginPage }) => {
        await loginPage.navigateToDashboard()
        await expect(loginPage.signInButton).toBeVisible({ timeout: 20000 })

        // Fillout Login form
        await loginPage.login(data.loginDetails.username, data.loginDetails.password)
        await expect(page.getByText('Dashboard')).toBeVisible({ timeout: 10000 })
    })

    test('[WTC-0001] - should verify if user can selet a site', async ({ page, dashboardPage }) => {
        await test.step('select a site', async () => {
            await dashboardPage.allSitesDropdown.click()
            await dashboardPage.brisbaneOption.click()
            await dashboardPage.confirmBtn.click()
        })
        await test.step('verify selected site', async () => {
            await page.waitForTimeout(2000)
            await expect(dashboardPage.brisbaneOption).toBeVisible()
        })
    })

    test('[WTC-0002] - should verify if user can view all feature summary inside the Dashboard', async ({ page, dashboardPage }) => {
        await test.step('navigate to Dashboard', async () => {
            await dashboardPage.dashboardNav.click()
        })
        // TODO: Add test scripts to verify feature summary
    })
})
