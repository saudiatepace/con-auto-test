import { test, expect } from 'fixtures/basePage'
import data from '@testdata/data.json'

test.describe('[Staff] - Administrator @regression', async () => {
    test.beforeEach('should be able to login', async ({ page, loginPage }) => {
        await loginPage.navigateToDashboard()
        await expect(page.getByText('Forgot password?')).toBeVisible()

        // Fillout Login form
        await loginPage.login(data.loginDetails.username, data.loginDetails.password)
        await expect(page.getByText('Dashboard')).toBeVisible()
    })

    test('[WTC-0011] - should verify if user can view the list of All Administrators', async ({ page, staffPage }) => {
        await test.step('click Staff nav', async () => {
            await staffPage.staffNav.click()
        })
        await test.step('select Administrators', async () => {
            await staffPage.administratorsNav.click()
        })
        await test.step('click Verified tab', async () => {
            await staffPage.allTab.click()
        })
        await test.step('verify All Administrators table', async () => {
            await page.waitForSelector('tbody.MuiTableBody-root')
            const rows = page.locator('tbody.MuiTableBody-root tr')
            // Count the rows
            const rowCount = await rows.count()
            expect(rowCount >= 1).toBe(true)
        })
    })

    test('[WTC-0012] - should verify if user can view the list of Verified Admins', async ({ page, staffPage }) => {
        await test.step('click Staff nav', async () => {
            await staffPage.staffNav.click()
        })
        await test.step('select Administrators', async () => {
            await staffPage.administratorsNav.click()
        })
        await test.step('click Verified tab', async () => {
            await staffPage.verifiedTab.click()
        })
        await test.step('verify Verified Administrators table', async () => {
            await page.waitForSelector('tbody.MuiTableBody-root')
            const rows = page.locator('tbody.MuiTableBody-root tr')
            // Count the rows
            const rowCount = await rows.count()
            expect(rowCount >= 1).toBe(true)
        })
    })
    test('[WTC-0013] - should verify if user can view the list of Invited Admins', async ({ page, staffPage }) => {
        await test.step('click Staff nav', async () => {
            await staffPage.staffNav.click()
        })
        await test.step('select Administrators', async () => {
            await staffPage.administratorsNav.click()
        })
        await test.step('click Invited tab', async () => {
            await staffPage.invitedTab.click()
        })
        await test.step('verify Invited Administrators table', async () => {
            await page.waitForSelector('tbody.MuiTableBody-root')
            const rows = page.locator('tbody.MuiTableBody-root tr')
            // Count the rows
            const rowCount = await rows.count()
            expect(rowCount >= 1).toBe(true)
        })
    })
    test('[WTC-0014] - should verify if user can view the list of Created Admins', async ({ page, staffPage }) => {
        await test.step('click Staff nav', async () => {
            await staffPage.staffNav.click()
        })
        await test.step('select Administrators', async () => {
            await staffPage.administratorsNav.click()
        })
        await test.step('click Create tab', async () => {
            await staffPage.createdTab.click()
        })
        await test.step('verify Created Administrators table', async () => {
            await page.waitForSelector('tbody.MuiTableBody-root')
            const rows = page.locator('tbody.MuiTableBody-root tr')
            // Count the rows
            const rowCount = await rows.count()
            expect(rowCount >= 1).toBe(true)
        })
    })
})
