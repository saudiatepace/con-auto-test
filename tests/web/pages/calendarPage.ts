import { expect, Locator, Page } from '@playwright/test'
import data from '@testdata/data.json'

export default class CalendarPage {
    page: Page
    calendarNav: Locator
    eventsNav: Locator

    constructor(page: Page) {
        this.page = page
        this.calendarNav = page.getByRole('button', { name: 'Calendar' })
        this.eventsNav = page.getByRole('link', { name: 'Events', exact: true })
    }
}
