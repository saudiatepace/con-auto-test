import { test as base } from '@playwright/test'
import LoginPage from '../tests/web/pages/loginPage'
import DashboardPage from '../tests/web/pages/dashboardPage'
import StaffPage from '../tests/web/pages/staffPage'
import UsersPage from '../tests/web/pages/usersPage'
import MessagesPage from '../tests/web/pages/messagesPage'
import CalendarPage from '../tests/web/pages/calendarPage'
import RequestsPage from '../tests/web/pages/requestsPage'

export const test = base.extend<{
    loginPage: LoginPage
    dashboardPage: DashboardPage
    staffPage: StaffPage
    usersPage: UsersPage
    messagesPage: MessagesPage
    calendarPage: CalendarPage
    requestsPage: RequestsPage
}>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
    },
    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page))
    },
    staffPage: async ({ page }, use) => {
        await use(new StaffPage(page))
    },
    usersPage: async ({ page }, use) => {
        await use(new UsersPage(page))
    },
    messagesPage: async ({ page }, use) => {
        await use(new MessagesPage(page))
    },
    calendarPage: async ({ page }, use) => {
        await use(new CalendarPage(page))
    },
    requestsPage: async ({ page }, use) => {
        await use(new RequestsPage(page))
    },
})
export { expect, APIResponse } from '@playwright/test'
