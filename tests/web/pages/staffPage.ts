import { expect, Locator, Page } from '@playwright/test'
import data from '@testdata/data.json'

export default class StaffPage {
    page: Page
    staffNav: Locator
    superAdminsNav: Locator
    allTab: Locator
    verifiedTab: Locator
    invitedTab: Locator
    createdTab: Locator
    administratorsNav: Locator

    constructor(page: Page) {
        this.page = page
        this.staffNav = page.getByRole('button', { name: 'Staff' })
        this.superAdminsNav = page.getByRole('link', { name: 'Super Admins' })
        this.allTab = page.getByRole('tab', { name: 'All' })
        this.verifiedTab = page.getByRole('tab', { name: 'Verified' })
        this.administratorsNav = page.getByRole('link', { name: 'Administrators' })
        this.invitedTab = page.getByRole('tab', { name: 'Invited' })
        this.createdTab = page.getByRole('tab', { name: 'Created' })
    }
}
