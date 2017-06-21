/**
 *
 * @author iswujixiang@gmail.com
 */

'use strict';
const crypto    = require('crypto');

const request   = require('request');

const md5       = (str) => crypto.createHash('md5').update(str).digest('hex');


function Request(options) {
    let cache   = options.cache,
        maxAge  = options.maxAge;

    this.cache  = cache || require('lru-cache')({maxAge});
}

Request.prototype.request   = function (uri, options, timeout, callback) {
    if (typeof timeout === 'function') {
        callback = timeout;
        timeout = null;
    }

    let params = request.initParams(uri, options, callback);
    let defaults = {
        method          : 'GET',
        headers         : {},
        useQuerystring  : false,
        followRedirect  : false,
        followRedirects : false,
        followOriginalHttpMethod    : false,
        maxRedirects    : 10,
        removeRefererHeader : false
    };

    delete params.followRedirect;
    delete params.followRedirects;

    params  = Object.assign(defaults, params);
};