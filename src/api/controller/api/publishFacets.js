import progress from '../../services/progress';
import { PUBLISH_FACET } from '../../../common/progressStatus';
import { jobLogger } from '../../workers/tools';

export default async (ctx, fields, withProgress = false) => {
    const facetFields = fields.filter(c => c.isFacet);
    if (!facetFields.length) {
        withProgress && progress.finish();
        return;
    }
    withProgress &&
        progress.start({
            status: PUBLISH_FACET,
            target: facetFields.length,
            label: 'publishing',
            type: 'publisher',
        });
    jobLogger.info(ctx.job, 'Publishing facets');

    const names = fields.map(({ name }) => name);
    await ctx.publishedFacet.remove({ field: { $in: names } });

    await facetFields
        .reduce(
            async (prevPromise, field) =>
                prevPromise.then(async () => {
                    const facets = await ctx.publishedDataset
                        .getFacetsForField(field.name)
                        .toArray();
                    if (!facets.length) {
                        return null;
                    }
                    await ctx.publishedFacet.insertMany(facets);
                    withProgress && progress.incrementProgress(1);
                }),
            Promise.resolve(),
        )
        .catch(error => {
            if (!withProgress) {
                throw error;
            }
            progress.throw(error);
        });
    progress.finish();
    jobLogger.info(ctx.job, 'Facets published');
};
