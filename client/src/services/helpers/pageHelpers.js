const pageSize = 8;

export const getItems = (items, page) => {
    var start = (page - 1) * pageSize;
    var end = start + pageSize;
    return items.slice(start, end)
}

export const getTotalPage = (items) => Math.ceil(items.length / pageSize)

export const getPage = pageInput => {

    var page = pageInput ? Number(pageInput) : 1;

    if (!isNaN(page) && Number.isInteger(page) && page >=1) return page

    return -1
}