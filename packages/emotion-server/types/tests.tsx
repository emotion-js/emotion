import { extractCritical, renderStylesToNodeStream, renderStylesToString } from '../';

declare const renderedString: string;
declare const renderedNodeStream: NodeJS.ReadableStream;

const { html, css, ids } = extractCritical(renderedString);

renderStylesToString(renderedString);

renderedNodeStream.pipe(renderStylesToNodeStream());
