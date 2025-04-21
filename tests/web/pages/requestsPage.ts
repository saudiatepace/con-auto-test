import { expect, Locator, Page } from '@playwright/test'
import * as fs from 'fs'
import * as path from 'path'
import { generateRandomInteger, getTomorrowDay } from 'utils/utilsWeb'

export default class RequestsPage {
    page: Page
    requestsNav: Locator
    activeNav: Locator

    constructor(page: Page) {
        this.page = page
        this.requestsNav = page.getByRole('button', { name: 'Requests' })
        this.activeNav = page.getByRole('link', { name: 'Active' })
    }
    async generateRequestTitle() {
        const requestTitle = 'Test New Request ' + generateRandomInteger()
        const data = { title: requestTitle }

        const filePath = path.resolve(__dirname, '..', 'testdata', 'requestTitle.json')

        try {
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
        } catch (err) {
            console.error('Error writing file:', err)
        }
    }

    async createRequest() {
        const filePath = path.resolve(__dirname, '..', 'testdata', 'requestTitle.json')
        const titleRequestRaw = fs.readFileSync(filePath, 'utf-8')
        const requestTitle = JSON.parse(titleRequestRaw)

        await this.page.getByRole('button', { name: 'New request' }).click()
        await this.page.getByRole('combobox', { name: 'Member' }).click()
        await this.page.getByRole('option', { name: 'YT yanie test' }).getByRole('paragraph').click()
        await this.page.getByRole('combobox', { name: 'Type' }).click()
        await this.page.getByRole('option', { name: 'Gym Request' }).click()
        await this.page.getByRole('textbox', { name: 'Subject' }).fill(requestTitle.title)
        await this.page.getByRole('textbox', { name: 'Description' }).fill('Test description')
        await this.page.getByRole('button', { name: 'Choose date' }).click()
        await this.page.getByRole('gridcell', { name: String(getTomorrowDay()) }).click({ force: true })
        await this.page.getByRole('combobox', { name: 'Assign admin' }).click()
        await this.page.getByText('yan-admin1 test').click()

        // Save request
        await this.page.getByRole('button', { name: 'Create' }).click()
    }
}
