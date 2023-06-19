const prefix = `This error happens because`

module.exports.makeErrorMessage = (e, field, moreDetails = '') => `Field: ${field}. ${e.stringCode}: ${e.description}. ${moreDetails}`

module.exports.errorCodes = new Map([
    [
        1,
        {
            numberCode: 1,
            stringCode: 'TYPE_ERROR', 
            name: 'Type Error', 
            description: 'Your data type is incorrect',
            explain: `${prefix} your data type is incorrect`,
        }
    ],
    [
        2,
        {
            numberCode: 2,
            stringCode: 'RANGE_ERROR', 
            name: 'Range Error', 
            description: 'Your data value is out of range',
            explain: `${prefix} your data value is out of range`,
        }
    ],
    [
        3,
        {
            numberCode: 3,
            stringCode: 'MISSING_ERROR', 
            name: 'Missing Error', 
            description: 'You are missing a data item',
            explain: `${prefix} you are missing a data item`,
        }
    ],
    [
        4,
        {
            numberCode: 4,
            stringCode: 'CONFLICT_ERROR', 
            name: 'Conflict Error', 
            description: 'Your data already exists',
            explain: `${prefix} your data already exists while you need a unique value`,
        }
    ],
    [
        5,
        {
            numberCode: 5,
            stringCode: 'DOES_NOT_EXIST_ERROR', 
            name: 'Does not exist Error', 
            description: 'Your data does not exists',
            explain: `${prefix} your data does not exists`,
        }
    ],
])