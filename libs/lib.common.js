function Previous(page) {
  if (page - 1 <= 0) {
    return null;
  }

  return page - 1;
}

function Next(totalPages, page) {
  if (page + 1 > totalPages) {
    return null;
  }

  return page + 1;
}

async function Pagination(req, res, model) {
  const modelSetClone = model.clone();
  const modelSetPagin = model.clone();
  let page = 1;

  if (req.query.page) {
    page = parseInt(req.query.page) || page;
  }

  const pageLimit = req.query.limit ? parseInt(req.query.limit) : 10;
  const firstPage = page > 1 ? page * pageLimit - pageLimit : 0;

  const count = await modelSetClone.countDocuments();
  const totalPages = Math.ceil(count / pageLimit);
  const results = await modelSetPagin.limit(pageLimit).skip(firstPage);

  const previous = Previous(page);
  const next = Next(totalPages, page);

  return {
    next,
    previous,
    totalPages,
    count, 
    results: await results
  }

}



module.exports = {
  Pagination
}