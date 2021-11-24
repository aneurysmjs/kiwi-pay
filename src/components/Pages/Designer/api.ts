/* eslint-disable camelcase */

interface Options {
  premailerAPI: string;
  fetchHTML: boolean;
  fetchText: boolean;
  base_url?: string;
  line_length?: string;
  link_query_string?: string;
  preserve_styles?: string;
  remove_ids?: string;
  remove_classes?: string;
  remove_comments?: string;
}

function mailer(
  options = {
    premailerAPI: 'http://premailer.dialect.ca/api/0.1/documents',
    fetchHTML: true,
    fetchText: true,
  } as Options,
  next = () => {},
) {
  // if (_.has(options, 'baseUrl')) {
  //   options.base_url = options.baseUrl;
  // }
  // if (_.has(options, 'lineLength')) {
  //   options.line_length = options.lineLength;
  // }
  // if (_.has(options, 'linkQueryString')) {
  //   options.link_query_string = options.linkQueryString;
  // }
  // if (_.has(options, 'preserveStyles')) {
  //   options.preserve_styles = options.preserveStyles;
  // }
  // if (_.has(options, 'removeIds')) {
  //   options.remove_ids = options.removeIds;
  // }
  // if (_.has(options, 'removeClasses')) {
  //   options.remove_classes = options.removeClasses;
  // }
  // if (_.has(options, 'removeComments')) {
  //   options.remove_comments = options.removeComments;
  // }

  const send = _.pick(options, [
    'html',
    'url',
    'adapter',
    'base_url',
    'line_length',
    'link_query_string',
    'preserve_styles',
    'remove_ids',
    'remove_classes',
    'remove_comments',
  ]);

  const rtn = {};

  let apiResponse = null;

  function handlePremailerResponse(err, res, body) {

    if (err) {
      next(err);
      return;
    }
    
    try {
      apiResponse = JSON.parse(body);
    } catch (ex) {
      if (body.match(/Application Error/gi)) {
        return next('Premailer returned an unkown server error');
      }
      return next(ex);
    }
    if (options.fetchHTML) {
      getHTML();
    } else if (options.fetchText) {
      getText();
    } else {
      next(false, apiResponse);
    }
  }

  function getHTML() {
    request.get(apiResponse.documents.html, function (err, res, body) {
      if (err) {
        next(err);
        return;
      }
      rtn.html = body;
      if (options.fetchText) {
        getText();
      } else {
        next(false, rtn);
      }
    });
  }

  function getText(err, res, body) {
    request.get(apiResponse.documents.txt, function (err, res, body) {
      if (err) {
        next(err);
        return;
      }
      rtn.text = body;
      next(false, rtn);
    });
  }

  // request.post(options.premailerAPI, { form: send }, handlePremailerResponse);
}
