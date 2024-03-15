import {Channel, connect, Connection} from "amqplib"
import {assertExchange, assertQueue, config} from './config'
import AppConfig from "../../domain/config"
import {ProcessDto} from "../../domain/dtos/process/process.dto";
import {Process} from "./process";

export class Rabbitmq {
    private static _connection: Connection
    private static _channel: Channel

    public static async connection() {
        this._connection = await connect(config)
        this._channel = await this._connection.createConfirmChannel()
    }

    public static async setQueue() {
        await this._channel.assertQueue(
            AppConfig.RABBIT_QUEUE,
            assertQueue
        )

        await this._channel.assertExchange(
            AppConfig.RABBIT_EXCHANGE,
            AppConfig.RABBIT_TYPE_EXCHANGE,
            assertExchange
        )

        await this._channel.bindQueue(
            AppConfig.RABBIT_QUEUE,
            AppConfig.RABBIT_EXCHANGE,
            AppConfig.RABBIT_ROUTING_KEY
        )

        await this._channel.prefetch(Number(AppConfig.RABBIT_PREFETCH))
    }

    public static async consume() {
        await this._channel.consume(
            AppConfig.RABBIT_QUEUE,
            async (msg) => {
                try {
                    if(msg?.properties.type === "academic-administration.sign-ups.student_signedup"){
                        const [error,processDto] = ProcessDto.create(JSON.parse(msg?.content!.toString()))
                        console.log(msg?.content!.toString())
                        if (!error){
                            await new Process().run(processDto!)
                            this._channel.ack(msg!)
                        } else {
                            console.log(msg?.content!.toString())
                            console.error(error)
                        }
                    }else{
                        this._channel.ack(msg!)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        )
    }

    public static async fakeConsume(){
        const json = {
            "uuid":"3v31yn05-2302-0000-t3s7-pru6845q4ADg",
            "fired_at":"2024-02-22T19:49:19.139835Z",
            "student":{
                "uuid":"s7uD3N7-2302-0000-bee1-c4c70a3a5d11",
                "reference_id":5646475,
                "dni":"W87276287H",
                "first_name":"Estudiante",
                "last_name":"Pruebas AD",
                "user_name":"STUDENT0000",
                "password":"Moodle.123",
                "email":"estudiante.0000@devnull.org",
                "phone":"7827728735",
                "address":"Alta estudiante",
                "language":"es",
                "institution_abbreviation":"FBR",
                "created_at":"2024-02-22T19:49:19.101463Z",
                "inscriptions":[
                    {
                        "uuid":"1n5cr1p7-2302-0000-8121-a51eb9b0448a",
                        "reference_id":274491,
                        "language":"es",
                        "created_at":"2024-02-22T19:49:19.071457Z",
                        "registered_at":"2024-02-22T00:00:00.000000Z",
                        "started_at":"2024-02-22T00:00:00.000000Z",
                        "finished_at":"2026-02-22T00:00:00.000000Z",
                        "extension_finished_at":"2026-02-22T00:00:00.000000Z",
                        "status":"Baja",
                        "incidence":"Pruebas",
                        "academic_program":{
                            "uuid":"2c8bb310-0c08-57f0-a74c-933e78f8dbc3",
                            "reference_id":1106,
                            "type":"Program",
                            "abbreviation":"DDMBA",
                            "language":"es",
                            "name":"Máster Universitario en Administración y Dirección de Empresas",
                            "version":"2017-vEA-PPS-TFC-Oficial"
                        },
                        "introductory_module":[
                            {
                                "uuid":"31d517f9-8b06-5e2b-8718-b5f2e7f71f34",
                                "reference_id":1857,
                                "type":"Program",
                                "name":"Curso de Inducción",
                                "abbreviation":"NC",
                                "version":"2023",
                                "academic_element":[
                                    {
                                        "uuid":"af2cbb48-c2e7-52dd-b9ed-bb4dfe793435",
                                        "reference_id":273167,
                                        "reference_class":"AsignaturaVersion",
                                        "reference_type":"_OBLIGATORIO",
                                        "type":"Subject",
                                        "name":"Curso de Inducción",
                                        "abbreviation":"NC",
                                        "language":null,
                                        "version":"NC-vEA"
                                    }
                                ]
                            }
                        ],
                        "institution_abbreviation":"FBR",
                        "degrees":[
                            {
                                "reference_id":1499062,
                                "abbreviation":"FBR",
                                "status":"Creada",
                                "incidence":" - ",
                                "active":1
                            }
                        ],
                        "modality":"VIRTUAL",
                        "active":1,
                        "enrollments":[
                            {
                                "uuid":"8e1d36e5-6e19-5c2c-89bf-aaef7c21b47b",
                                "reference_id":577707,
                                "language":"es",
                                "started_at":"2024-02-22T14:02:24.000000Z",
                                "academic_program":{
                                    "uuid":"2c8bb310-0c08-57f0-a74c-933e78f8dbc3",
                                    "reference_id":1106,
                                    "type":"Program",
                                    "abbreviation":"DDMBA",
                                    "language":"es",
                                    "name":"Máster Universitario en Administración y Dirección de Empresas",
                                    "version":"2017-vEA-PPS-TFC-Oficial"
                                },
                                "academic_term":{
                                    "reference_id":1,
                                    "school_period":"Funiber",
                                    "study_model":"_SEMESTRE",
                                    "started_at":"2024-02-22T00:00:00.000000Z",
                                    "finished_at":"2026-02-22T00:00:00.000000Z"
                                },
                                "academic_selections":[
                                    {
                                        "uuid":"259e7256-716d-5a4f-9f84-58a2d999c4b5",
                                        "reference_id":759305,
                                        "admission_id":278896,
                                        "started_at":"2024-02-22T00:00:00.000000Z",
                                        "academic_element":[
                                            {
                                                "uuid":"dcf91050-b6b4-5c63-9d0b-ef42c17aca84",
                                                "reference_id":95587,
                                                "reference_class":"AsignaturaVersion",
                                                "reference_type":"_OBLIGATORIO",
                                                "type":"Subject",
                                                "name":"Fundamentos de Administración y Negocios",
                                                "abbreviation":"DD371",
                                                "language":null,
                                                "version":"DD371-vEA"
                                            }
                                        ]
                                    },
                                    {
                                        "uuid":"9d2655e1-02cb-5391-9383-6c921c57e808",
                                        "reference_id":759306,
                                        "admission_id":278896,
                                        "started_at":"2024-02-22T00:00:00.000000Z",
                                        "academic_element":[
                                            {
                                                "uuid":"f9ad7adc-b97d-54cd-9d20-3244dbdb2039",
                                                "reference_id":95601,
                                                "reference_class":"AsignaturaVersion",
                                                "reference_type":"_OBLIGATORIO",
                                                "type":"Subject",
                                                "name":"Administración y Dirección de Empresas",
                                                "abbreviation":"TR026",
                                                "language":null,
                                                "version":"TR026-vEA"
                                            }
                                        ]
                                    },
                                    {
                                        "uuid":"69f00ee3-9484-53b0-84be-482e0dbc5b04",
                                        "reference_id":759307,
                                        "admission_id":278896,
                                        "started_at":"2024-02-22T00:00:00.000000Z",
                                        "academic_element":[
                                            {
                                                "uuid":"d16a7c30-d6fb-5609-afa9-15295245fcb0",
                                                "reference_id":95727,
                                                "reference_class":"AsignaturaVersion",
                                                "reference_type":"_OBLIGATORIO",
                                                "type":"Subject",
                                                "name":"Dirección de Marketing",
                                                "abbreviation":"DD2865",
                                                "language":null,
                                                "version":"DD2865-vEA"
                                            }
                                        ]
                                    },
                                    {
                                        "uuid":"4d6eca54-11b3-59c8-8164-2d6eaa8f608f",
                                        "reference_id":759308,
                                        "admission_id":278896,
                                        "started_at":"2024-02-22T00:00:00.000000Z",
                                        "academic_element":[
                                            {
                                                "uuid":"b3d4a000-653d-5d22-acbf-a3749299e9ca",
                                                "reference_id":95615,
                                                "reference_class":"AsignaturaVersion",
                                                "reference_type":"_OBLIGATORIO",
                                                "type":"Subject",
                                                "name":"Dirección y Planificación Estratégica",
                                                "abbreviation":"DD014",
                                                "language":null,
                                                "version":"DD014-vEA"
                                            }
                                        ]
                                    },
                                    {
                                        "uuid":"9becccbf-50d4-5338-8fd4-13ee40723832",
                                        "reference_id":759309,
                                        "admission_id":278896,
                                        "started_at":"2024-02-22T00:00:00.000000Z",
                                        "academic_element":[
                                            {
                                                "uuid":"e84922ed-6294-5a49-9ddb-fc1db365b237",
                                                "reference_id":95629,
                                                "reference_class":"AsignaturaVersion",
                                                "reference_type":"_OBLIGATORIO",
                                                "type":"Subject",
                                                "name":"Ética empresarial y Responsabilidad Social Corporativa",
                                                "abbreviation":"DD090",
                                                "language":null,
                                                "version":"DD090-vEA"
                                            }
                                        ]
                                    },
                                    {
                                        "uuid":"d3dddeba-5a8d-5345-bbce-7db4468f1307",
                                        "reference_id":759310,
                                        "admission_id":278896,
                                        "started_at":"2024-02-22T00:00:00.000000Z",
                                        "academic_element":[
                                            {
                                                "uuid":"ea82ff09-cec9-594c-b1e7-7ce9f2353ecc",
                                                "reference_id":95643,
                                                "reference_class":"AsignaturaVersion",
                                                "reference_type":"_OBLIGATORIO",
                                                "type":"Subject",
                                                "name":"Introducción a la Gestión de Proyectos",
                                                "abbreviation":"DD070",
                                                "language":null,
                                                "version":"DD070-vEA"
                                            }
                                        ]
                                    },
                                    {
                                        "uuid":"27094d04-d4e9-54d4-a97e-db890f242193",
                                        "reference_id":759311,
                                        "admission_id":278896,
                                        "started_at":"2024-02-22T00:00:00.000000Z",
                                        "academic_element":[
                                            {
                                                "uuid":"0368e020-8e88-50da-b81e-f3f2fe9c78c4",
                                                "reference_id":95657,
                                                "reference_class":"AsignaturaVersion",
                                                "reference_type":"_OBLIGATORIO",
                                                "type":"Subject",
                                                "name":"Planificación y Gestión de Proyectos",
                                                "abbreviation":"TR038",
                                                "language":null,
                                                "version":"TR038-vEA"
                                            }
                                        ]
                                    },
                                    {
                                        "uuid":"d1e978cd-2c0d-551c-8c38-2878206c2ce6",
                                        "reference_id":759314,
                                        "admission_id":278896,
                                        "started_at":"2024-02-22T00:00:00.000000Z",
                                        "academic_element":[
                                            {
                                                "uuid":"6a28f836-5373-5ad2-ac2f-01c5a4944ec6",
                                                "reference_id":95699,
                                                "reference_class":"AsignaturaVersion",
                                                "reference_type":"_OBLIGATORIO",
                                                "type":"Subject",
                                                "name":"Dirección Financiera",
                                                "abbreviation":"TR047",
                                                "language":null,
                                                "version":"TR047-vEA"
                                            }
                                        ]
                                    },
                                    {
                                        "uuid":"04217a21-9026-5f5a-a144-342e9100394b",
                                        "reference_id":759315,
                                        "admission_id":278896,
                                        "started_at":"2024-02-22T00:00:00.000000Z",
                                        "academic_element":[
                                            {
                                                "uuid":"9afff1b9-154c-5819-86dd-53fd12bab582",
                                                "reference_id":95713,
                                                "reference_class":"AsignaturaVersion",
                                                "reference_type":"_OBLIGATORIO",
                                                "type":"Subject",
                                                "name":"Control y Gestión de Costes",
                                                "abbreviation":"DD002",
                                                "language":null,
                                                "version":"DD002-vEA"
                                            }
                                        ]
                                    },
                                    {
                                        "uuid":"77150f0c-f943-593d-aed1-a3bd8f253cc7",
                                        "reference_id":759316,
                                        "admission_id":278896,
                                        "started_at":"2024-02-22T00:00:00.000000Z",
                                        "academic_element":[
                                            {
                                                "uuid":"12c092c6-9524-5ce9-9acf-725e8ab81166",
                                                "reference_id":95741,
                                                "reference_class":"AsignaturaVersion",
                                                "reference_type":"_OBLIGATORIO",
                                                "type":"Subject",
                                                "name":"Gestión Estratégica de los Recursos Humanos",
                                                "abbreviation":"TR046",
                                                "language":null,
                                                "version":"TR046-vEA"
                                            }
                                        ]
                                    },
                                    {
                                        "uuid":"7f2db077-7433-523b-9de9-cd3f3f81f4f0",
                                        "reference_id":759317,
                                        "admission_id":278896,
                                        "started_at":"2024-02-22T00:00:00.000000Z",
                                        "academic_element":[
                                            {
                                                "uuid":"307e63e4-a558-539d-9167-58d55f58fe8d",
                                                "reference_id":95755,
                                                "reference_class":"AsignaturaVersion",
                                                "reference_type":"_OBLIGATORIO",
                                                "type":"Subject",
                                                "name":"Gestión y Dirección de Operaciones",
                                                "abbreviation":"DD370",
                                                "language":null,
                                                "version":"DD370-vEA"
                                            }
                                        ]
                                    },
                                    {
                                        "uuid":"ecb2fc7c-dad3-5cf4-89a3-3a4c3cd723a8",
                                        "reference_id":759318,
                                        "admission_id":278896,
                                        "started_at":"2024-02-22T00:00:00.000000Z",
                                        "academic_element":[
                                            {
                                                "uuid":"fcf561e5-ea4f-51c4-a310-df338ead7241",
                                                "reference_id":95769,
                                                "reference_class":"AsignaturaVersion",
                                                "reference_type":"_OBLIGATORIO",
                                                "type":"Subject",
                                                "name":"Técnicas de Dirección de Equipos de Trabajo",
                                                "abbreviation":"DD041",
                                                "language":null,
                                                "version":"DD041-vEA"
                                            }
                                        ]
                                    },
                                    {
                                        "uuid":"fa478dda-d272-5a3e-984d-a0fef6d89a71",
                                        "reference_id":759319,
                                        "admission_id":278896,
                                        "started_at":"2024-02-22T00:00:00.000000Z",
                                        "academic_element":[
                                            {
                                                "uuid":"e961c673-dcec-59f5-a570-4f22cef49f08",
                                                "reference_id":95783,
                                                "reference_class":"AsignaturaVersion",
                                                "reference_type":"_OBLIGATORIO",
                                                "type":"Subject",
                                                "name":"Técnicas de resolución de conflictos y negociación",
                                                "abbreviation":"DD040",
                                                "language":null,
                                                "version":"DD040-vEA"
                                            }
                                        ]
                                    },
                                    {
                                        "uuid":"a4543f3d-76bd-52bf-8e4b-34bdec478fec",
                                        "reference_id":759320,
                                        "admission_id":278896,
                                        "started_at":"2024-02-22T00:00:00.000000Z",
                                        "academic_element":[
                                            {
                                                "uuid":"a01e0867-a9f5-5bcf-ac74-0ee4f6d221d5",
                                                "reference_id":95797,
                                                "reference_class":"AsignaturaVersion",
                                                "reference_type":"_OBLIGATORIO",
                                                "type":"Subject",
                                                "name":"Liderazgo Organizacional y Coaching",
                                                "abbreviation":"DD372",
                                                "language":null,
                                                "version":"DD372-vEA"
                                            }
                                        ]
                                    },
                                    {
                                        "uuid":"bb1c380e-1213-58d5-8049-c949e15e4d74",
                                        "reference_id":759321,
                                        "admission_id":278896,
                                        "started_at":"2024-02-22T00:00:00.000000Z",
                                        "academic_element":[
                                            {
                                                "uuid":"d6778517-d70c-530f-a2f5-7dd9f0197d6e",
                                                "reference_id":95811,
                                                "reference_class":"AsignaturaVersion",
                                                "reference_type":"_OBLIGATORIO",
                                                "type":"Subject",
                                                "name":"Gestión de tiempo y Dirección de Reuniones",
                                                "abbreviation":"DD042",
                                                "language":null,
                                                "version":"DD042-vEA"
                                            }
                                        ]
                                    },
                                    {
                                        "uuid":"922818e7-6fd5-5658-9ee1-926fbcdccdd9",
                                        "reference_id":759322,
                                        "admission_id":278896,
                                        "started_at":"2024-02-22T00:00:00.000000Z",
                                        "academic_element":[
                                            {
                                                "uuid":"4ae41b6f-62ac-5e1d-950a-66173a1351b3",
                                                "reference_id":95825,
                                                "reference_class":"AsignaturaVersion",
                                                "reference_type":"_OBLIGATORIO",
                                                "type":"Subject",
                                                "name":"Técnicas de Presentación en Público",
                                                "abbreviation":"DD044",
                                                "language":null,
                                                "version":"DD044-vEA"
                                            }
                                        ]
                                    },
                                    {
                                        "uuid":"f9479598-906e-5517-8f20-18afa96c42b3",
                                        "reference_id":759323,
                                        "admission_id":278896,
                                        "started_at":"2024-02-22T00:00:00.000000Z",
                                        "academic_element":[
                                            {
                                                "uuid":"a0369ca2-4f2d-5bc6-bd9b-96c57f22ec71",
                                                "reference_id":95839,
                                                "reference_class":"AsignaturaVersion",
                                                "reference_type":"_OBLIGATORIO",
                                                "type":"Subject",
                                                "name":"Globalización y Negocios Internacionales",
                                                "abbreviation":"DD2867",
                                                "language":null,
                                                "version":"DD2867-vEA"
                                            }
                                        ]
                                    },
                                    {
                                        "uuid":"a28acf50-e7c8-542b-82da-134cb3400b00",
                                        "reference_id":759324,
                                        "admission_id":278896,
                                        "started_at":"2024-02-22T00:00:00.000000Z",
                                        "academic_element":[
                                            {
                                                "uuid":"74471ee9-1def-5848-9d19-b6df2837a358",
                                                "reference_id":95853,
                                                "reference_class":"AsignaturaVersion",
                                                "reference_type":"_OBLIGATORIO",
                                                "type":"Subject",
                                                "name":"Marketing digital y e-commerce",
                                                "abbreviation":"DD2793",
                                                "language":null,
                                                "version":"DD2793-vEA"
                                            }
                                        ]
                                    },
                                    {
                                        "uuid":"4c96f2ae-0485-5a97-8eeb-9f8c51aa5711",
                                        "reference_id":759325,
                                        "admission_id":278896,
                                        "started_at":"2024-02-22T00:00:00.000000Z",
                                        "academic_element":[
                                            {
                                                "uuid":"42227972-a86c-5717-88f3-0bcbfb599af5",
                                                "reference_id":95867,
                                                "reference_class":"AsignaturaVersion",
                                                "reference_type":"_OBLIGATORIO",
                                                "type":"Subject",
                                                "name":"Business Intelligence y Gestión Documental",
                                                "abbreviation":"TI016",
                                                "language":null,
                                                "version":"TI016-vEA"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }

                ]
            }
        };
        try {
            const [error,processDto] = ProcessDto.create(json)
            await new Process().run(processDto!)
        }catch (e) {
            console.log(e)
        }
    }

    public static async init() {
        await this.connection()
        await this.setQueue()
        await this.consume()
        //await this.fakeConsume()
    }
}