import { portfolios } from '$lib/siteData.js';
import { error } from '@sveltejs/kit';

export const prerender = true;

export function entries() {
    let allEntries = [];
    for (let p of portfolios) {
        if (p.slugs) {
            for (let lang of ['es', 'en', 'de', 'pt', 'zh', 'hi', 'fr', 'it', 'ko']) {
                if (p.slugs[lang]) {
                    allEntries.push({ slug: p.slugs[lang] });
                }
            }
        }
    }
    return allEntries;
}

export function load({ params }) {
    const slug = params.slug;
    const project = portfolios.find(p => p.slugs && Object.values(p.slugs).includes(slug));
    
    if (!project) {
        error(404, 'Not found');
    }
    
    return {
        slug: slug,
        project: project
    };
}
