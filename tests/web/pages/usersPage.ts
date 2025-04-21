import { expect, Locator, Page } from '@playwright/test'
import data from '@testdata/data.json'
import { generateRandomInteger } from 'utils/utilsWeb'

export default class MembersPage {
    page: Page
    usersNav: Locator
    membersNav: Locator
    newMemberBtn: Locator
    tagsNav: Locator
    familyMembersNav: Locator
    personalDetailsHeader: Locator
    firstNameInput: Locator
    lastNameInput: Locator
    carePackageDropdown: Locator
    appUsernameInput: Locator
    appPasswordInput: Locator
    emailInput: Locator

    constructor(page: Page) {
        this.page = page

        // Navigation
        this.usersNav = page.getByText('Users')
        this.membersNav = page.getByRole('link', { name: 'Members', exact: true })
        this.tagsNav = page.getByRole('link', { name: 'Tags', exact: true })
        this.familyMembersNav = page.getByRole('link', { name: 'Family Members', exact: true })

        // Buttons
        this.newMemberBtn = page.getByText('New member')

        // Text/Label/Header
        this.personalDetailsHeader = page.getByText('Personal Details')

        // Inputs
        this.firstNameInput = page.locator('input[name="first_name"]')
        this.lastNameInput = page.locator('input[name="last_name"]')
        this.appUsernameInput = page.getByRole('textbox', { name: 'Username' })
        this.appPasswordInput = page.getByRole('textbox', { name: 'Password' })
        this.emailInput = page.getByRole('textbox', { name: 'Email', exact: true })
    }

    // Fill out personal details
    async enterPersonalDetails() {
        await this.firstNameInput.fill(data.personalDetails.firstname + generateRandomInteger())
        await this.lastNameInput.fill(data.personalDetails.lastname)
    }
}
