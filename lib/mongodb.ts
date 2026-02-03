import mongoose from 'mongoose';

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

// Declare the global type to avoid TS errors on 'global.mongoose'
declare global {
    var mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}

/**
 * Global cache object. In development, we use a global variable so the
 * connection is preserved. In production, we use a local variable.
 */
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<typeof mongoose> {
    // If a connection is already established, return it immediately
    if (cached?.conn) {
        return cached.conn;
    }

    // If no connection promise exists, create a new one
    if (!cached?.promise) {
        const opts = {
            bufferCommands: false, // Disable buffering for faster error reporting
        };

        cached!.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        // Wait for the connection promise to resolve
        cached!.conn = await cached!.promise;
    } catch (e) {
        // If an error occurs, reset the promise so we can try again
        cached!.promise = null;
        throw e;
    }

    return cached!.conn;
}

export default dbConnect;