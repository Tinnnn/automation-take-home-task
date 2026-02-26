import { home } from '../pages'

describe('Homepage Navigation', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('should navigate to Why Matomo? > List of all features ', () => {
    home.clickWhyMatomoMenu()
    home.clickListOfAllFeaturesSubMenu()
    home.verifyListOfAllFeaturesPage()
  })

  it('should navigate to Use Cases > Complete Analytics', () => {
    home.clickUseCasesMenu()
    home.clickCompleteAnalyticsSubMenu()
    home.verifyCompleteAnalyticsPage()
  })

  it ('should navigate to Cloud', () => {
    home.clickCloudMenu()
    home.verifyCloudPage()
  })
})