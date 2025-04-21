import { expect, Locator, Page } from '@playwright/test'
import data from '@testdata/data.json'

export default class LoginPage {
    page: Page
    usernameInput: Locator
    passwordInput: Locator
    signInButton: Locator
    membersNav: Locator

    constructor(page: Page) {
        this.page = page
        this.usernameInput = page.locator('input[name=username]')
        this.passwordInput = page.locator('input[name=password]')
        this.signInButton = page.locator('button[type="submit"]')
        this.membersNav = page.getByRole('link', { name: 'Members', exact: true })
    }

    // Navigate to the login page URL.
    async navigateToDashboard() {
        await this.page.goto('/')
        await this.page.waitForURL(data.authUrl)
    }

    // Perform the login action.
    async login(username: string, password: string) {
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.signInButton.click()
        await this.page.waitForTimeout(3000)
    }
}
