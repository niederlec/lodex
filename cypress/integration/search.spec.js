import { teardown } from '../support/authentication';
import * as homePage from '../support/homePage';
import * as datasetImportPage from '../support/datasetImportPage';
import * as searchDrawer from '../support/searchDrawer';

const initSearchDataset = (
    dataset = 'dataset/book_summary.csv',
    model = 'model/book_summary.json',
) => () => {
    teardown();
    homePage.openAdvancedDrawer();
    homePage.goToAdminDashboard();

    datasetImportPage.importDataset(dataset);
    datasetImportPage.importModel(model);
    datasetImportPage.publish();
    datasetImportPage.goToPublishedResources();
};

describe('Search', () => {
    describe('Basics', () => {
        beforeEach(initSearchDataset());

        it.skip('should have the right informations in the search results', () => {
            searchDrawer.openSearchDrawer();
            cy.get('.search-result').should('have.length', 10);
            cy.get('.drawer .load-more button').should('contain', '(10 / 12)');
        });

        it.skip('should export the dataset', () => {
            searchDrawer.openSearchDrawer();
            cy.get('.search-result').should('have.length', 10);
            cy.get('.export').click();
            cy.wait(300);
            cy.get('span[role="menuitem"]')
                .should('have.length', 9)
                .contains('Export as JSON')
                .should('be.visible');
        });

        it.skip('should do a search, and its result redirect to a resource', () => {
            searchDrawer.openSearchDrawer();
            searchDrawer.search('Annals of the rheumatic');

            searchDrawer
                .findSearchResultByTitle('Annals of the rheumatic diseases')
                .click();

            cy.url().should('contain', '/uid');
            cy.get('.loading').should('not.be.visible');
            cy.get('.property_value')
                .contains('Annals of the rheumatic diseases')
                .should('be.visible');
        });

        it('should be able to load more search results several times', () => {
            searchDrawer.openSearchDrawer();

            searchDrawer.checkResultsCount(10);
            searchDrawer.checkMoreResultsCount(10, 12);

            searchDrawer.loadMore(); // Call load more for the first time

            searchDrawer.checkResultsCount(12);
            searchDrawer.checkMoreResultsNotExist();

            searchDrawer.search('bezoar');
            searchDrawer.search('dragoncelle');
            searchDrawer.clearSearch();

            searchDrawer.checkResultsCount(10);
            searchDrawer.checkMoreResultsCount(10, 12);

            searchDrawer.loadMore(); // Call load more for the second time

            searchDrawer.checkResultsCount(12);
            searchDrawer.checkMoreResultsNotExist();
        });

        it.skip('should mark active resource on the result list', () => {
            searchDrawer.openSearchDrawer();
            searchDrawer.search('Annals of the rheumatic');

            searchDrawer
                .findSearchResultByTitle('Annals of the rheumatic diseases')
                .click();

            cy.url().should('contain', '/uid');
            cy.get('.loading').should('not.be.visible');
            searchDrawer.openSearchDrawer();

            cy.get('.search-result-link[class*=activeLink_]').should('exist');
        });

        it.skip('should keep track of the current search after changing page', () => {
            const query = 'Annals of the rheumatic';
            searchDrawer.openSearchDrawer();
            searchDrawer.search(query);
            cy.get('.search-result').should('have.length', 1);

            searchDrawer
                .findSearchResultByTitle('Annals of the rheumatic diseases')
                .click();

            cy.url().should('contain', '/uid');
            cy.get('.loading').should('not.be.visible');
            searchDrawer.openSearchDrawer();

            cy.get('.search-result').should('have.length', 1);
            searchDrawer.searchInput().should('have.value', query);
        });

        it.skip('should sort result by pertinence', () => {
            searchDrawer.openSearchDrawer();
            searchDrawer.search('medicine');
            cy.get('.search-result').should('have.length', 2);

            searchDrawer.checkResultList([
                'Acupuncture in medicine',
                'Archives of emergency medicine',
            ]);
            searchDrawer.search(' archive');
            cy.get('.search-result').should('have.length', 5);

            searchDrawer.checkResultList([
                'Archives of emergency medicine',
                'Acupuncture in medicine',
                'Archives of disease in childhood',
                'Archives of disease in childhood. Education and practice edition',
                'Archives of disease in childhood. Fetal and neonatal edition',
            ]);
        });
    });

    describe.skip('Advanced Search', () => {
        beforeEach(initSearchDataset());

        it('should filter search results by facets', () => {
            searchDrawer.openSearchDrawer();
            cy.get('.search-result').should('have.length', 10);

            searchDrawer.setFacet('Dernière mise en ligne en', '2014');
            cy.get('.search-result').should('have.length', 1);
        });

        it('should allow to clear facets from the search results', () => {
            searchDrawer.openSearchDrawer();
            searchDrawer.setFacet('Dernière mise en ligne en', '2014');
            cy.get('.search-result').should('have.length', 1);

            searchDrawer.clearFacet('2014');
            cy.get('.search-result').should('have.length', 10);
        });

        it('should allow to sort facet', () => {
            searchDrawer.openSearchDrawer();
            searchDrawer.getFacet('Première mise en ligne en').click();
            searchDrawer.checkFacetsItem('Première mise en ligne en', [
                '2011',
                '1988',
                '2008',
                '1853',
                '1984',
                '1983',
                '2007',
                '1939',
                '1926',
                '2004',
            ]);
            searchDrawer.sortFacet('Première mise en ligne en', 'value');
            searchDrawer.checkFacetsItem('Première mise en ligne en', [
                '2011',
                '2008',
                '2007',
                '2004',
                '1988',
                '1984',
                '1983',
                '1939',
                '1926',
                '1853',
            ]);
            searchDrawer.sortFacet('Première mise en ligne en', 'value');
            searchDrawer.checkFacetsItem('Première mise en ligne en', [
                '1853',
                '1926',
                '1939',
                '1983',
                '1984',
                '1988',
                '2004',
                '2007',
                '2008',
                '2011',
            ]);
            searchDrawer.sortFacet('Première mise en ligne en', 'count');
            searchDrawer.checkFacetsItem('Première mise en ligne en', [
                '2011',
                '1988',
                '2008',
                '1853',
                '1984',
                '1983',
                '2007',
                '1939',
                '1926',
                '2004',
            ]);
            searchDrawer.sortFacet('Première mise en ligne en', 'count');
            searchDrawer.checkFacetsItem('Première mise en ligne en', [
                '2008',
                '1853',
                '1984',
                '1983',
                '2007',
                '1939',
                '1926',
                '2004',
                '2011',
                '1988',
            ]);
        });
    });

    describe.skip('Edge Cases', () => {
        beforeEach(
            initSearchDataset(
                'dataset/exotic-search-dataset.csv',
                'model/exotic-search-model.json',
            ),
        );

        it('should have a diacritic insensible text-based search', () => {
            searchDrawer.openSearchDrawer();
            searchDrawer.search('sirene');
            cy.get('.search-result').should('have.length', 1);
        });

        it('should allow to search for long sentences or descriptions', () => {
            searchDrawer.openSearchDrawer();
            searchDrawer.search('Lorem ipsum');
            cy.get('.search-result').should('have.length', 1);
        });
    });
});
