import { home } from '../pages'

describe('Homepage broken links and images', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('should verify no broken links on the homepage', () => {
      home.verifyBrokenLinks()
  })

  it('should verify no broken images on the homepage', () => {
      home.verifyBrokenImages()
  })

})