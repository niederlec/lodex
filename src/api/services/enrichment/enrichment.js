import * as fs from 'fs';
import path from 'path';

export const createEnrichmentRule = async ctx => {
    const enrichment = ctx.request.body;
    if (enrichment.advancedMode) {
        return enrichment;
    }

    if (!enrichment.webServiceUrl || !enrichment.sourceColumn) {
        throw new Error(`Missing parameters`);
    }

    const excerpt = await ctx.dataset.getExcerpt();
    let sourceData;
    for (let line of excerpt) {
        if (line[enrichment.sourceColumn]) {
            sourceData = line[enrichment.sourceColumn];
            break;
        }
    }
    let data;
    try {
        data = JSON.parse(sourceData);
    } catch {
        data = sourceData;
    }

    let rule = getEnrichmentRuleModel(data, enrichment);

    return {
        ...enrichment,
        rule: rule,
    };
};

const isDirectPath = sourceData => {
    return (
        typeof sourceData === 'string' ||
        typeof sourceData === 'number' ||
        (Array.isArray(sourceData) &&
            (typeof sourceData[0] === 'string' ||
                typeof sourceData === 'number'))
    );
};

const isSubPath = sourceData => {
    return (
        typeof sourceData === 'object' &&
        Array.isArray(sourceData) &&
        typeof sourceData[0] === 'object'
    );
};

export const getEnrichmentRuleModel = (sourceData, enrichment) => {
    try {
        let rule;
        if (!enrichment.sourceColumn) {
            throw new Error(`Missing source column parameter`);
        }
        if (isDirectPath(sourceData)) {
            const file = Array.isArray(sourceData)
                ? './directPathMultipleValues.txt'
                : './directPathSingleValue.txt';
            rule = fs.readFileSync(path.resolve(__dirname, file)).toString();
            rule = rule.replace(
                /\[\[SOURCE COLUMN\]\]/g,
                enrichment.sourceColumn,
            );
            rule = rule.replace(
                '[[WEB SERVICE URL]]',
                enrichment.webServiceUrl,
            );
        }

        if (isSubPath(sourceData)) {
            if (!enrichment.subPath) {
                throw new Error(`Missing sub-path parameter`);
            }
            const subPathData = sourceData[0][enrichment.subPath];
            if (!subPathData) {
                throw new Error(`No data with this sub-path`);
            }

            if (typeof subPathData === 'string' || Array.isArray(subPathData)) {
                const file = Array.isArray(subPathData)
                    ? './subPathMultipleValues.txt'
                    : './subPathSingleValue.txt';
                rule = fs
                    .readFileSync(path.resolve(__dirname, file))
                    .toString();
                rule = rule.replace(
                    '[[SOURCE COLUMN]]',
                    enrichment.sourceColumn,
                );
                rule = rule.replace(/\[\[SUB PATH\]\]/g, enrichment.subPath);
                rule = rule.replace(
                    '[[WEB SERVICE URL]]',
                    enrichment.webServiceUrl,
                );
            }
        }

        return rule;
    } catch (e) {
        console.error('Error:', e.stack);
        throw e;
    }
};
