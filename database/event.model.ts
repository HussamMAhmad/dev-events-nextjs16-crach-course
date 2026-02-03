import { Schema, model, models, Document } from 'mongoose';
import slugify from 'slugify';

export interface IEvent extends Document {
    title: string;
    slug: string;
    description: string;
    overview: string;
    image: string;
    venue: string;
    location: string;
    date: string;
    time: string;
    mode: 'online' | 'offline' | 'hybrid';
    audience: string;
    agenda: string[];
    organizer: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
    {
        title: { type: String, required: true, trim: true },
        slug: { type: String, unique: true, index: true },
        description: { type: String, required: true },
        overview: { type: String, required: true },
        image: { type: String, required: true },
        venue: { type: String, required: true },
        location: { type: String, required: true },
        date: { type: String, required: true },
        time: { type: String, required: true },
        mode: { type: String, enum: ['online', 'offline', 'hybrid'], required: true },
        audience: { type: String, required: true },
        agenda: { type: [String], required: true },
        organizer: { type: String, required: true },
        tags: { type: [String], required: true },
    },
    { timestamps: true }
);

// Slug generation and date/time normalization
EventSchema.pre('save', function (next) {
    if (this.isModified('title')) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }

    if (this.isModified('date')) {
        const d = new Date(this.date);
        if (isNaN(d.getTime())) return next(new Error('Invalid date format'));
        this.date = d.toISOString();
    }

    if (this.isModified('time')) {
        this.time = this.time.trim().toLowerCase();
    }

    next();
});

const Event = models.Event || model<IEvent>('Event', EventSchema);
export default Event;