import * as fs from 'fs'
import * as path from 'path'
import { test, expect } from 'fixtures/basePage'
import data from '@testdata/data.json'
import { generateRandomInteger } from 'utils/utilsWeb'

/***
 * Verify the following major functionalities:
 * 1. Create a member (created, invited status)
 * 2. Create broadcast message
 * 3. Create conversation message
 * 4. Create a new event
 * 5. Create and complete a new request
 * 6. Reject a request
 */
test.describe('Smoke Test @smoke', async () => {
    test.beforeEach('should be able to login', async ({ page, loginPage }) => {
        await loginPage.navigateToDashboard()
        await expect(loginPage.signInButton).toBeVisible({ timeout: 20000 })

        // Fillout Login form
        await loginPage.login(data.loginDetails.username, data.loginDetails.password)
        await expect(page.getByText('Dashboard')).toBeVisible({ timeout: 10000 })
    })

    test('should be able to create a new member ', async ({ page, usersPage }) => {
        const firstName = 'yan' + generateRandomInteger()

        await test.step('navigate to members', async () => {
            await usersPage.usersNav.click()
            await expect(usersPage.membersNav).toBeVisible({ timeout: 10000 })
            await usersPage.membersNav.click()
            await expect(usersPage.newMemberBtn).toBeVisible({ timeout: 10000 })
            await usersPage.newMemberBtn.click()
            await expect(usersPage.personalDetailsHeader).toBeVisible({ timeout: 10000 })
        })

        await test.step('create member', async () => {
            await usersPage.firstNameInput.fill(firstName)
            await usersPage.lastNameInput.fill('test')
            await page.getByRole('combobox', { name: 'Care Package' }).click()
            await page.getByRole('option', { name: 'CHSP - Home Care' }).click()
            await page
                .locator('div')
                .filter({ hasText: /^Date of birth$/ })
                .getByLabel('Choose date')
                .click()
            await page.getByRole('gridcell', { name: '7', exact: true }).click()
            await page.getByRole('gridcell', { name: '7', exact: true }).click()
            // await page.getByRole('radio', { name: 'Female' }).check()
            await usersPage.emailInput.fill(firstName + '@gmail.com')
            // await page.getByRole('textbox', { name: 'Mobile phone' }).fill('0415 678 3467')
            await page.getByRole('textbox', { name: 'Username' }).fill(firstName)
            await page.getByRole('textbox', { name: 'Password' }).fill('Conpago123')
            await page.getByRole('checkbox', { name: 'Add another member' }).uncheck()
            await page.getByRole('button', { name: 'Create member' }).click()
            await page.waitForTimeout(2000)
        })

        await test.step('verify member if successfully created', async () => {
            await usersPage.membersNav.click()
            await page.getByRole('textbox', { name: 'Search...' }).fill(firstName + ' ' + 'test')
            await expect(page.getByText(firstName + ' ' + 'test')).toHaveCount(1)
        })

        await test.step('verify if status is created', async () => {
            await page.getByRole('link', { name: `${firstName} test` }).click()
            await page.waitForTimeout(2000)
            await expect(page.getByText('Created')).toBeVisible({ timeout: 10000 })
        })

        await test.step('verify if status is created', async () => {
            await page.getByRole('button', { name: 'Invite' }).click()
            await page.waitForTimeout(2000)
            await expect(page.getByText('Invited')).toBeVisible({ timeout: 10000 })
        })

        // TODO: add test script for Verified status
    })

    test('should be able to create a broadcast message', async ({ page, messagesPage }) => {
        await test.step('navigate to broadcast message', async () => {
            await messagesPage.messagesNav.click()
            await page.getByRole('button', { name: 'New conversation' }).click()
        })

        await test.step('create broadcast message', async () => {
            await page.getByRole('textbox', { name: 'Title (optional)' }).fill('Broadcast' + generateRandomInteger())
            await page
                .locator('div')
                .filter({ hasText: /^Tags$/ })
                .locator('div')
                .click()
            await page.getByRole('option', { name: 'test-tag', exact: true }).click()
            await page.getByRole('button', { name: 'Close' }).click()
            await page
                .locator('div')
                .filter({ hasText: /^Roles$/ })
                .getByLabel('Open')
                .click()
            await page.getByRole('option', { name: 'Care Worker' }).click()
            await page.getByRole('button', { name: 'Close' }).click()
            await page.getByRole('button', { name: 'Create' }).click()
        })

        await test.step('verify if broadcast message is created successfully', async () => {
            const message = 'broadcast test message' + generateRandomInteger()
            await page.getByRole('textbox', { name: 'Type a message' }).fill(message)
            await page.getByRole('textbox', { name: 'Type a message' }).press('Enter')
            await expect(page.getByText(message)).toBeVisible({ timeout: 10000 })
        })
    })

    test('should be able to create a conversation message', async ({ page, messagesPage }) => {
        await test.step('navigate to conversation message', async () => {
            await messagesPage.messagesNav.click()
            await page.getByRole('button', { name: 'New conversation' }).click()
        })

        await test.step('create conversation message', async () => {
            await page.getByRole('tab', { name: 'Conversation' }).click()
            await page.getByRole('combobox', { name: 'Recipients' }).click()
            await page.getByRole('option', { name: 'YT yanie test' }).click()
            await page.locator('div').filter({ hasText: 'Create' }).nth(1).click()
            await page.getByRole('button', { name: 'Create' }).click()
        })

        await test.step('verify if conversation message is created successfully', async () => {
            const message = 'conversation test message' + generateRandomInteger()

            await page.getByRole('textbox', { name: 'Type a message' }).fill(message)
            await page.getByRole('textbox', { name: 'Type a message' }).press('Enter')
            await expect(page.getByText(message)).toBeVisible({ timeout: 10000 })
        })
    })

    test('should be able to create new event', async ({ page, calendarPage }) => {
        const eventTitle = 'Test New Event' + generateRandomInteger()

        await test.step('navigate to calendar events', async () => {
            await calendarPage.calendarNav.click()
            await calendarPage.eventsNav.click()
        })

        await test.step('add event title', async () => {
            await page.getByRole('link', { name: 'New event' }).click()
            await page.getByRole('textbox', { name: 'Event Title' }).fill(eventTitle)
        })

        await test.step('add guests', async () => {
            await page.waitForTimeout(2000)
            await page.getByRole('tab', { name: 'Guests' }).click()
            await page.getByRole('button', { name: 'Add Guest' }).click()
            await page.getByRole('combobox', { name: 'Add Guest' }).click()
            await page.getByRole('option', { name: 'YT yanie test' }).click()
            await page.locator('.MuiPopover-root > .MuiBackdrop-root').click()
        })

        await test.step('save event', async () => {
            await page.getByRole('button', { name: 'Create Event' }).click()
        })

        await test.step('verify event if added in the calendar', async () => {
            await expect(page.getByText(eventTitle)).toBeVisible({ timeout: 10000 })
        })

        await test.step('delete event', async () => {
            await page.getByText(eventTitle).click()
            await page.getByLabel('Delete this event').getByRole('button').click()
            await page.getByRole('button', { name: 'Yes, delete this event' }).click()
            await expect(page.getByText(eventTitle)).toHaveCount(0)
        })
    })
    test('should be able to create and complete a new request', async ({ page, requestsPage }) => {
        await test.step('select a site', async () => {
            await page.getByRole('button', { name: 'All Sites' }).click()
            await page.getByText('Brisbane').click()
            await page.getByRole('button', { name: 'Confirm' }).click()
        })

        await test.step('navigate to active request', async () => {
            await requestsPage.requestsNav.click()
            await requestsPage.activeNav.click()
            await expect(page.getByRole('button', { name: 'New request' })).toBeVisible({ timeout: 10000 })
        })

        await test.step('create a new request', async () => {
            await requestsPage.generateRequestTitle()
            await requestsPage.createRequest()
        })

        const filePath = path.resolve(__dirname, '..', 'testdata', 'requestTitle.json')
        const titleRequestRaw = fs.readFileSync(filePath, 'utf-8')
        const requestTitle = JSON.parse(titleRequestRaw)

        await test.step('verify if request is created successfully', async () => {
            await expect(page.getByText(requestTitle.title)).toBeVisible({ timeout: 10000 })
        })

        await test.step('accept the request', async () => {
            await page.getByText(requestTitle.title).click()
            await page.getByRole('button', { name: 'Accept' }).click()
            await expect(page.getByText('Set In Progress')).toBeVisible({ timeout: 10000 })
        })

        await test.step('move request to in progress', async () => {
            await page.getByRole('button', { name: 'Set In Progress' }).click()
            await expect(page.getByText('Mark Completed')).toBeVisible({ timeout: 10000 })
        })

        await test.step('complete the request', async () => {
            await page.getByRole('button', { name: 'Mark Completed' }).click()
            await page.getByRole('button', { name: 'Confirm' }).click()
            await expect(page.getByText('Mark Completed')).not.toBeVisible({ timeout: 10000 })
        })

        await test.step('archieved a completed request', async () => {
            await page.getByRole('button').filter({ hasText: /^$/ }).first().click()
            await page.getByRole('menuitem', { name: 'Archive' }).click()
            await page.getByRole('button', { name: 'Archive' }).click()
            await expect(page.getByText(requestTitle.title)).toHaveCount(0)
        })
    })

    test('should be able to reject a new request', async ({ page, requestsPage }) => {
        await test.step('select a site', async () => {
            await page.getByRole('button', { name: 'All Sites' }).click()
            await page.getByText('Brisbane').click()
            await page.getByRole('button', { name: 'Confirm' }).click()
        })

        await test.step('navigate to active request', async () => {
            await requestsPage.requestsNav.click()
            await requestsPage.activeNav.click()
            await expect(page.getByRole('button', { name: 'New request' })).toBeVisible({ timeout: 10000 })
        })

        await test.step('create a new request', async () => {
            await requestsPage.generateRequestTitle()
            await requestsPage.createRequest()
        })

        const filePath = path.resolve(__dirname, '..', 'testdata', 'requestTitle.json')
        const titleRequestRaw = fs.readFileSync(filePath, 'utf-8')
        const requestTitle = JSON.parse(titleRequestRaw)

        await test.step('verify if request is created successfully', async () => {
            await expect(page.getByText(requestTitle.title)).toBeVisible({ timeout: 10000 })
        })

        await test.step('reject the request', async () => {
            await page.getByText(requestTitle.title).click()
            await page.getByRole('button', { name: 'Reject' }).click()
            await expect(page.getByRole('heading', { name: 'Reject request' })).toBeVisible({ timeout: 10000 })
        })

        await test.step('confirm to reject the request', async () => {
            await page.getByRole('button', { name: 'Reject' }).click()
            await expect(page.getByRole('button', { name: 'Reject' })).toBeHidden()
        })
    })
})
