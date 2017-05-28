let jsdom = require('jsdom');

global.document = jsdom.jsdom('<!DOCTYPE html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = { userAgent: 'node.js' };
