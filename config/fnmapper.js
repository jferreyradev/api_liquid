module.exports.jsonStoreFunction = {
    verifConcepto: {
        fn_name: 'MOD_FUNCIONES.EXISTE_CONCEPTO',
        in_param:{
            Rep: 'vRep_liq',
            Te: 'vIDTE',
            Codigo:'vCODIGO',
            SubCodigo: 'vSUBCOD',
            Vto: 'vFECHA'
        },
        out_param:{varName:'value'}
    }
}