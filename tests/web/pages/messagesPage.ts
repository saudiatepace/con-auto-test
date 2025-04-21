import { expect, Locator, Page } from '@playwright/test'
import data from '@testdata/data.json'

export default class MessagesPage {
    page: Page
    messagesNav: Locator

    constructor(page: Page) {
        this.page = page
        this.messagesNav = page.getByRole('link', { name: 'Messages', exact: true })
    }
}
