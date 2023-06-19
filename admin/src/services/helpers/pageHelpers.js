const pageSize = 10;

export const getItems = (items, page) => {
    var start = (page - 1) * pageSize;
    var end = start + pageSize;
    return items.slice(start, end)
}

export const getPage = pageInput => {
    var page = pageInput ? Number(pageInput) : 1;

    if (!isNaN(page) && Number.isInteger(page) && page >= 1 ) return page;

    return -1;
}

export const getTotalPage = (items) => Math.ceil(items.length / pageSize)

export const getOrder = (page, index) => (page - 1) * pageSize + index + 1;