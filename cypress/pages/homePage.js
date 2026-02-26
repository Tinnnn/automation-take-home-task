export default class HomePage{
    clickWhyMatomoMenu(){
        cy.contains('a', 'Why Matomo?').click()
    }

    clickListOfAllFeaturesSubMenu(){
        cy.contains('a', 'List of all features').click()
    }

    verifyListOfAllFeaturesPage(){
        cy.url().should('include', '/features')
        cy.get('h1').should('be.visible').and('contain.text', 'List of all Matomo features')
    }

    clickUseCasesMenu(){
        cy.contains('a', 'Use Cases').click()
    }
    
    clickCompleteAnalyticsSubMenu(){
        cy.contains('a', 'Complete Analytics').click()
    }

    verifyCompleteAnalyticsPage(){
        cy.url().should('include', '/feature-overview')
        cy.get('h1').should('be.visible').and('contain.text', 'Complete Analytics. 100% Yours.')
    }

    clickCloudMenu(){
        cy.contains('a', 'Cloud').click()
    }

    verifyCloudPage(){
        cy.url().should('include', '/matomo-cloud')
        cy.get('h1').should('be.visible').and('contain.text', 'Cloud-Hosted Matomo Analytics')
    }

    verifyBrokenLinks(){
        // Array to store broken link details for reporting
        const brokenLinks = []
        
        cy.get('a').each(($link) => {
            const href = $link.prop('href')

            // Skip non-http links and anchors
            if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || href === '#') {
                return
            }
        
            cy.request({url: href, failOnStatusCode: false, headers: {
                // Adding a User-Agent header to mimic a real browser and potentially avoid bot-blocking
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/122.0.0.0'
            }  }).then((resp) => {
                // 400/403 responses are often bot-blocked; log them but do not fail the test
                const isBotBlocked = resp.status === 400 || resp.status === 403
                const isKnownBotBlock = href.includes('facebook.com') || href.includes('capterra.com') || href.includes('softwareadvice.com')
                
                // Log potential bot-blocking issues for known domains, but do not treat them as test failures
                if (isBotBlocked && isKnownBotBlock) {
                    cy.task('log', `Link potentially blocked by bot protection: ${href} → status ${resp.status}`)
                // Treat other 400+ responses as broken links
                } else if (resp.status >= 400) {
                    brokenLinks.push({ href, status: resp.status })
                    cy.task('log', `Broken link found: ${href} → status ${resp.status}`)
                }   
            })
        }).then(() => {
            if (brokenLinks.length > 0) {
                const brokenLinkDetails = brokenLinks.map(link => `- ${link.href} (status: ${link.status})`).join('\n')
                cy.task('log', `\nBroken links detected:\n${brokenLinkDetails}`)
                expect(brokenLinks.length, `Broken links found: ${brokenLinkDetails}`).to.eq(0)
            }
        })
    }
    
    verifyBrokenImages() {
        //array for storing broken image URLs for reporting
        const brokenImages = []

        cy.get('img').each($img => {
            const src = $img.prop('src')
            // Skip images without a src attribute
            if (!src) return
            
            // Scroll the image into view to trigger loading, then check if it loaded successfully
            cy.wrap($img).scrollIntoView().then($el => {
            if ($el.is(':visible')) {
                const width = $el[0].naturalWidth
                const height = $el[0].naturalHeight

                // If either dimension is zero, the image failed to load properly
                if (width === 0 || height === 0) {
                    brokenImages.push(src)
                    // Log the broken image URL for debugging purposes
                    cy.task('log', `Broken image (render failed): ${src}`)
                }
            }
        })
    
        }).then(() => {
            const brokenImageDetails = brokenImages.map(src => `- ${src}`).join('\n')
            if (brokenImages.length > 0) {
                cy.task('log', `\nBroken images detected:\n${brokenImageDetails}`)
            }
            expect(brokenImages.length, `Broken images found: ${brokenImageDetails}`).to.eq(0)
        })
            
    }
}

