import { expect, Locator, Page } from '@playwright/test'
import data from '@testdata/data.json'

export default class DashboardPage {
    page: Page
    dashboardNav: Locator
    allSitesDropdown: Locator
    brisbaneOption: Locator
    confirmBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.dashboardNav = page.getByRole('link', { name: 'Dashboard' })
        this.allSitesDropdown = page.getByRole('button', { name: 'All Sites' })
        this.brisbaneOption = page.getByText('Brisbane')
        this.confirmBtn = page.getByRole('button', { name: 'Confirm' })
    }
}
