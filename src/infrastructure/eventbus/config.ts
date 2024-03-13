import {Options} from "amqplib"
import AppConfig from "../../domain/config"

export const config: Options.Connect = {
    username: AppConfig.RABBIT_USERNAME,
    password: AppConfig.RABBIT_PASSWORD,
    protocol: AppConfig.RABBIT_PROTOCOL,
    hostname: AppConfig.RABBIT_HOSTNAME,
    port: Number(AppConfig.RABBIT_PORT),
    vhost: AppConfig.RABBIT_VHOST
}

export const assertQueue: Options.AssertQueue = {
    exclusive: false,
    durable: true
}

export const assertExchange: Options.AssertExchange = {
    durable: true
}