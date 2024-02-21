/* global cy */
import { MainPageObject } from '../pageObjects/pageObject';
const mainPageObject = new MainPageObject();

describe('User Journey', () => {
  beforeEach(() => {
    mainPageObject.visit();
  });

  it('shows a loading skeleton then shows 5 articles when they are loaded', () => {
    const newsWidget = mainPageObject.getNewsWidget();
    newsWidget.getApiAlias();

    newsWidget.getNewsContainer().should("be.visible")
    newsWidget.getLoadingArticles().should("be.visible")
    
    cy.wait('@api') // Wait for API response
    newsWidget.getFifthArticle().should("be.visible")
  });

  it('shows an error message if news items could not be loaded', () => {
    const newsWidget = mainPageObject.getNewsWidget();
    newsWidget.getApiError();
    cy.wait('@apiError')
    newsWidget.getFailedToLoad().should("have.value", "Failed to load new articles")
  })
});
