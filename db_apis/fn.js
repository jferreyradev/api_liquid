const database = require('../services/database');
const oracledb = require('oracledb');

function getSQLcall(fn) {
    let sqlCab = 'BEGIN  :' + fn.out_param.varName + ' := ' + fn.fn_name + '(';
    let first = true;
    for (const key in fn.in_param) {
        if (first) {
            first = false;
        } else {
            sqlCab += ', ';
        }
        sqlCab += ':' + key;
    }

    sqlCab += ');';
    sqlCab += ' END;';

    return sqlCab;
}

async function execFn(context, fn) {
    let query = getSQLcall(fn);

    const binds = {};

    for (const key in context) {
        binds[key] = context[key];
    }

    binds[fn.out_param.varName] = { dir: oracledb.BIND_OUT, type: oracledb.NUMBER };

    //console.log(query);
    //console.log(binds);

    let result = await database.simpleExecute(query, binds);

    //let json = { 'result': result, 'status': 200, rows: [] };
    //return json;

    //console.log(result);

    return result.outBinds;
}

module.exports.execFn = execFn;