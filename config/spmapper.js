module.exports.jsonStoreProcedure = {
    cambioPeriodo: {
        sp_name: 'MOD_CAMBIO_PERIODO.P_Cambio_Periodo',
        out_param: ['ValorSalida']
    },
    liq: {
        sp_name: 'MOD_LIQUIDACION.LIQ_PRINCIPAL',
        in_param: ['Periodo', 'GrupoRep', 'Rep', 'IdPersona', 'CargoId', 'TipoLiq', 'GrupoAdicional'],
        log: { status: false, type: 1 },
        opt:{sync: true}
    },
    transform: {
        sp_name: 'MOD_TRANS_NOV.PRINCIPAL',
        in_param: ['Periodo', 'GrupoRep', 'TipoLiq', 'GrupoAdicional'],
        log: { status: false, type: 1 },
        opt:{sync: true}
    },
    cabeceraValorCat: {
        sp_name: 'MOD_PARAM.P_DESC_CABVALCAT',
        in_param: ['Id', 'Descripcion'],
        out_param: ['ValorSalida']
    },
    descValorCat: {
        sp_name: 'MOD_PARAM.P_DESC_VALORCATEGORIA',
        in_param: ['Id', 'Descripcion', 'IdCabecera'],
        out_param: ['ValorSalida']
    },
    valorCat: {
        sp_name: 'MOD_PARAM.P_VALORCATEGORIA',
        in_param: ['Id', 'IdDesc', 'Cat', 'Valor'],
        out_param: ['ValorSalida']
    },
    cabeceraEscalaSalarial: {
        sp_name: 'MOD_PARAM.P_ESCALA',
        in_param: ['Id', 'Descripcion'],
        out_param: ['ValorSalida']
    },
    escalaSalarial: {
        sp_name: 'MOD_PARAM.P_ESCALASALARIAL',
        in_param: ['Id', 'IdCabecera', 'Cat', 'Descripcion', 'Detalle', 'Importe'],
        out_param: ['ValorSalida']
    },
    cabeceraValorFijo: {
        sp_name: 'MOD_PARAM.P_DESC_VALORFIJO',
        in_param: ['Id', 'Descripcion'],
        out_param: ['ValorSalida']
    },
    valorFijo: {
        sp_name: 'MOD_PARAM.P_VALORUNICO',
        in_param: ['Id', 'Descripcion', 'Valor', 'IdCabecera'],
        out_param: ['ValorSalida']
    },
    concepto: {
        sp_name: 'MOD_PARAM.P_CONCEPTO',
        in_param:
            ['Id', 'Codigo', 'SubCodigo', 'DescBreve', 'DescBoleta',
                'TipoConcepto', 'AcumRem', 'AcumJub', 'AcumOs',
                'Basico', 'Ticket', 'Bonificable', 'CalculaPersona',
                'DeduceJubilacion', 'DeducePension', 'Especial',
                'Reliquida', 'Observacion', 'AcumGan'
            ],
        out_param: ['ValorSalida']
    },
    histNomenclador: {
        sp_name: 'MOD_PARAM.P_HIST_NOMENCLADOR',
        in_param: ['Id', 'FechaInicio', 'FechaFin', 'IdNomenclador', 'IdEscala'],
        out_param: ['ValorSalida']
    },
    histConcepto: {
        sp_name: 'MOD_PARAM.P_HIST_CONCEPTO',
        in_param: ['Id', 'IdConcepto', 'Operacion'],
        out_param: ['ValorSalida']
    },
    histValUnico: {
        sp_name: 'MOD_PARAM.P_HIST_VALUNICO',
        in_param: ['Id', 'IdValorUnico', 'Operacion'],
        out_param: ['ValorSalida']
    },
    histValCat: {
        sp_name: 'MOD_PARAM.P_HIST_VALCATEGORIA',
        in_param: ['Id', 'IdDesc', 'Operacion'],
        out_param: ['ValorSalida']
    },
    generaFormula: {
        sp_name: 'SP_GENERAR_FORMULAS',
        in_param: ['Id', 'Condicion', 'Accion', 'Detalle', 'IdConcepto', 'DescripcionCorta'],
        out_param: ['ValorSalida', 'ValorError']
    },
    generaPrimitiva: {
        sp_name: 'SP_GENERAR_PRIMITIVAS',
        in_param: ['Id', 'Nombre', 'Descripcion', 'Cabecera', 'Cuerpo', 'Pie'],
        out_param: ['ValorSalida', 'ValorError']
    },
    importaHistNomenclador: {
        sp_name: 'MOD_PARAM.P_IMPORTA_HIST_NOM',
        in_param: ['HistIdOrigen', 'HistIdDestino'],
        out_param: ['ValorSalida']
    },
    importaHistNom: {
        sp_name: 'MOD_PARAM.P_IMPORTA_HIST_NOM',
        in_param: ['HistIdOrigen', 'HistIdDestino'],
        out_param: ['ValorSalida']
    },
    inseraHistNom: {
        sp_name: 'MOD_PARAM.P_IMPORTA_HIST_NOM',
        in_param:['Rep','Te','IdNom'],
        out_param: ['ValorSalida']
    },
    cargaLiqJSON: {
        sp_name: 'MOD_REPORTES.CARGA_JSNOLIQ',
        in_param: ['Periodo', 'GrupoRep', 'Rep', 'IdPersona', 'CargoId', 'TipoLiq', 'GrupoAdicional']
    },
    djPrevIncluyeLiqs: {
        sp_name: 'PKG_DDJJ_PREVISIONAL.INCLUYE_TIPOLIQ_PERIODOAPLIC',
        in_param: ['PeriodoDDJJ', 'TipoLiquidacionId', 'GrupoAdicionalId', 'ReparticionId', 'PeriodoLiq'],
        out_param: ['ValorSalida', 'ValorError']
    },
    djPrevExcluyeLiqs: {
        sp_name: 'PKG_DDJJ_PREVISIONAL.EXCLUYE_TIPOLIQ_PERIODOAPLIC',
        in_param: ['PeriodoDDJJ', 'TipoLiquidacionId', 'GrupoAdicionalId', 'ReparticionId', 'PeriodoLiq'],
        out_param: ['ValorSalida', 'ValorError']
    },
    djPrevCargaResumen: {
        sp_name: 'PKG_DDJJ_PREVISIONAL.CARGA_RESUMEN',
        in_param: ['PeriodoDDJJ'],
        out_param: ['ValorSalida', 'ValorError']
    },
    djPrevCargaDDJJ: {
        sp_name: 'PKG_DDJJ_PREVISIONAL.CARGA_DDJJ',
        in_param: ['PeriodoDDJJ'],
        out_param: ['ValorSalida', 'ValorError']
    },
    archivoIPSST: {
        sp_name: 'mod_exportacion.GENERA_ARCHIVO_IPSST ',
        in_param: ['Periodo', 'TipoLiquidacionId', 'GrupoAdicionalId']
    },
    estableceNoLey: {
        sp_name: 'MOD_FUNCIONES.ESTABLECE_NOLEY',
        in_param: ['Dni', 'Tipo', 'Periodo'],
        out_param: ['ValorSalida', 'ValorError']
    },
    eliminaNoLey: {
        sp_name: 'MOD_FUNCIONES.ELIMINA_NOLEY',
        in_param: ['Dni'],
        out_param: ['ValorSalida', 'ValorError']
    },
    generaAcredBco: {
        sp_name: 'MOD_ACREDITACION.P_GENERACION_ACRED_BCO',
        in_param: ['Periodo', 'TipoLiq', 'GrupoAdicional', 'ValorFijo', 'Cuotas'],
        out_param: ['ValorError']
    },
    cursorArchivoBco: {
        sp_name: 'MOD_ACREDITACION.C_ARCHIVO_BCO',
        in_param: ['Periodo', 'TipoLiq', 'GrupoAdicional', 'Cuotas'],
        out_param: ['Cursor'],
        fileName: 'AcredBco.txt'
    },
    totalArchivoBco: {
        sp_name: 'MOD_ACREDITACION.P_ARCHIVO_BCO_TOT',
        in_param: ['Periodo', 'TipoLiq', 'GrupoAdicional', 'Cuota'],
        out_param: ['Cantidad', 'Total']
    },
    repTeNomenclador:{
        sp_name: 'MOD_PARAM.P_REPTENOMENCLADOR',
        in_param: ['ReparticionId','TipoEmpleoId','NomencladorId','Operacion'],
        out_param: ['ValorSalida']
    },
    eliminaTipoEmpleo:{
        sp_name: 'MOD_MAESTROS.P_ELIMINA_TIPO_EMPLEO',
        in_param: ['Id'],
        out_param: ['ValorSalida', 'ValorError']
    },
    eliminaTipoLiq:{
        sp_name: 'MOD_MAESTROS.P_ELIMINA_TIPO_LIQ',
        in_param: ['Id'],
        out_param: ['ValorSalida', 'ValorError']
    },
    eliminaSitRev:{
        sp_name: 'MOD_MAESTROS.P_ELIMINA_SIT_REV',
        in_param: ['Id'],
        out_param: ['ValorSalida', 'ValorError']
    },
    generaResumenLiq:{
        sp_name: 'MOD_REPORTES.carga_resumenliq',
        in_param:['IdLiq','Periodo','TipoLiquidacionId', 'GrupoAdicionalId', 'GrupoRep', 'Rep']
    },
    eliminaTipoRev: {
        sp_name: "MOD_MAESTROS.P_ELIMINA_TIPO_REV",
        in_param: ["Id"],
        out_param: ["ValorSalida", "ValorError"]
    },
    estadoBoleta:{
        sp_name: "MOD_REPORTES.ESTABLECE_CONF_BOLETA",
        in_param:["IdLiq", "IdEstado"],
        out_param: ["ValorSalida", "ValorError"]
    },
    nuevoUsuario:{
        sp_name: "MOD_SEG.NUEVO_USUARIO",
        in_param:["DNI", "Usuario", "Clave","Mail", "Estado", "Rol", "App"],
        out_param: ["ValorSalida","ValorError"]
    },
    nuevoLog:{
        sp_name: "MOD_SEG.NUEVO_LOG",
        in_param:["Usuario", "Text"],
        out_param: ["ValorSalida","ValorError"]
    }
}
