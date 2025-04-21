import { test, expect } from 'fixtures/basePage'
import data from '@testdata/data.json'
import { generateRandomInteger } from 'utils/utilsWeb'
import * as fs from 'fs'
import * as path from 'path'

test.describe('[Staff] - Super Admins @regression', async () => {
    test.beforeEach('should be able to login', async ({ page, loginPage }) => {
        await loginPage.navigateToDashboard()
        await expect(page.getByText('Forgot password?')).toBeVisible()

        // Fillout Login form
        await loginPage.login(data.loginDetails.username, data.loginDetails.password)
        await expect(page.getByText('Dashboard')).toBeVisible()
    })

    test('[WTC-0003] - should verify if user can view the list of All Super Admins', async ({ page, staffPage }) => {
        await test.step('click Staff nav', async () => {
            await staffPage.staffNav.click()
        })
        await test.step('select Super Admin', async () => {
            await staffPage.superAdminsNav.click()
        })
        await test.step('verify All Super Admins table', async () => {
            await page.waitForSelector('tbody.MuiTableBody-root')
            const rows = page.locator('tbody.MuiTableBody-root tr')
            // Count the rows
            const rowCount = await rows.count()
            expect(rowCount >= 1).toBe(true)
        })
    })
    test('[WTC-0004] - should verify if user can view the list of Verified Super Admins', async ({ page, staffPage }) => {
        await test.step('click Staff nav', async () => {
            await staffPage.staffNav.click()
        })
        await test.step('select Super Admin', async () => {
            await staffPage.superAdminsNav.click()
        })
        await test.step('click Verified tab', async () => {
            await staffPage.verifiedTab.click()
        })
        await test.step('verify All Super Admins table', async () => {
            await page.waitForSelector('tbody.MuiTableBody-root')
            const rows = page.locator('tbody.MuiTableBody-root tr')
            // Count the rows
            const rowCount = await rows.count()
            expect(rowCount >= 1).toBe(true)
        })
    })

    test("[WTC-0008] - should verify if the user can edit Super Admin's personal and contact details", async ({ page, staffPage }) => {
        const firstName = 'Yan' + generateRandomInteger()

        await test.step('click Staff nav', async () => {
            await staffPage.staffNav.click()
        })
        await test.step('select Super Admin', async () => {
            await staffPage.superAdminsNav.click()
        })
        await test.step('click a specific Super Admin', async () => {
            await page.getByRole('link', { name: data.superAdminAccount.firstname + ' ' + data.superAdminAccount.lastname }).click()
        })
        await test.step('edit Personal details', async () => {
            await page.getByRole('textbox', { name: 'First name' }).fill(firstName)
            await page.getByRole('textbox', { name: 'Preferred name' }).fill(firstName)
        })
        await test.step('save changes', async () => {
            await page.getByRole('button', { name: 'Save changes' }).nth(1).click()
        })
        await test.step('update test data file', async () => {
            const filePath = path.resolve(__dirname, '..', '..', '..', 'testdata', 'data.json')

            const rawData = fs.readFileSync(filePath, 'utf-8')
            const jsonData = JSON.parse(rawData)

            jsonData.superAdminAccount.firstname = firstName

            fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf-8')
        })
        await test.step('verify changes in Super Admin list', async () => {
            await page.getByRole('main').getByRole('link', { name: 'Super Admins' }).click()
            await expect(page.getByText(data.superAdminAccount.firstname + ' ' + data.superAdminAccount.lastname)).toHaveCount(1)
        })
    })
})
