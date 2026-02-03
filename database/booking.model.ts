import { Schema, model, models, Document, Types } from 'mongoose';

export interface IBooking extends Document {
    eventId: Types.ObjectId;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
    {
        eventId: {
            type: Schema.Types.ObjectId,
            ref: 'Event',
            required: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
            trim: true
        },
    },
    { timestamps: true }
);

// Reference integrity check
BookingSchema.pre('save', async function (next) {
    const Event = models.Event || model('Event');
    const exists = await Event.exists({ _id: this.eventId });

    if (!exists) {
        return next(new Error('Referenced event does not exist'));
    }
    next();
});

const Booking = models.Booking || model<IBooking>('Booking', BookingSchema);
export default Booking;