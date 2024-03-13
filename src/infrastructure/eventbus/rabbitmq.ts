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
                        new Process().run(processDto!)
                    }else{
                        console.log(msg?.properties.type)
                        this._channel.ack(msg!)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        )
    }

    public static async init() {
        await this.connection()
        await this.setQueue()
        await this.consume()
    }
}