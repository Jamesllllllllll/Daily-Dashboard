// This function decodes an escaped URIs. This is needed for reddit API requests due to legacy JSON issues

const unescapeURL = url => decodeURI(url).replaceAll("&amp;", "&");

export default unescapeURL;