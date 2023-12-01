export interface IRegistro{
    item?: Number,
    fecha: String,
    h_ingreso: String,
    visitante: String,
    tipo_persona: String,
    tipo_doc: String,
    institucion:string,
    mot_visita: string,
    emp_publico:string,
    of_visitada: String,
    h_salida?: string,
    btnCheck?:boolean,
    btnSalida?:boolean
}


export interface IHoraSalida{
    item?: Number,
    h_salida?: string
}