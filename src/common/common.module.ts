import { Module } from '@nestjs/common';
import { connect } from "amqplib";
import { CONNECTION_STRING } from './notifications/constants';
import { NotificationsProducerService } from './notifications/notifications-producer/notifications-producer.service';


const QueueConnectionProvider = {
    provide: "QueueConnection",
    useFactory: async () => {
        const connection = await connect(CONNECTION_STRING);
        return connection;
    }
}
@Module({
    providers: [
        QueueConnectionProvider,
        NotificationsProducerService
    ],
    exports: [
        NotificationsProducerService
    ]
})
export class CommonModule { }
