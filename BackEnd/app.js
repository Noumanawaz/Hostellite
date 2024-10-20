require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// CORS configuration
const corsOptions = {
    origin: '*', // Allow all origins for development (update for production)
    credentials: true, // Allow credentials if needed
};

// Middleware setup
app.use(cors(corsOptions));
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static('public')); // Serve static files from the 'public' directory

const port = process.env.PORT || 4000; // Use environment variable for port

// Check if the environment variables are loaded
console.log('Environment variables loaded:', {
    MONGODB_URI: process.env.MONGODB_URI,
    PORT: process.env.PORT,
});

// MongoDB connection
const mongoURI = mongodb+srv://noumannawaz2004:MiWbBL07lOVr1UVV@cluster0.isdx4.mongodb.net/hostels?retryWrites=true&w=majority&appName=Cluster0;
mongoose.connect(mongoURI, { connectTimeoutMS: 30000 }) // 30 seconds timeout
    .then(() => {
        console.log(`Connected to MongoDB at ${mongoURI}`);
    })
    .catch(err => {
        console.error('MongoDB connection error:', err.message);
    });

// Define the hostel schema
const hostelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    images: { type: [String] }, // Array of image URLs
    location: { type: String, required: true }, // Single string for location
    description: { type: String },
    category: {
        type: String,
        enum: ['boys', 'girls', 'co-ed'], // Define allowed categories
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    rooms: [
        {
            type: String,
            price: Number
        }
    ]
}, { collection: 'hostels' });

const Hostel = mongoose.model('Hostel', hostelSchema);

// Cache to store hostel data
let hostelCache = [];

// Function to prefetch hostel data
async function prefetchHostelData() {
    try {
        console.log('Prefetching hostel data...');
        // Limit the number of documents prefetched to reduce memory usage
        hostelCache = await Hostel.find().limit(100); // Adjust limit as needed
        console.log('Hostel data cached:', hostelCache.length, 'records');
    } catch (error) {
        console.error('Error pre-fetching hostel data:', error);
    }
}

// Prefetch hostel data on server startup
prefetchHostelData();

// Route for the home page
app.get('/', (req, res) => {
    res.send('Hello World');
    console.log(`Running in ${process.env.NODE_ENV || 'development'} mode`);
    console.log('MongoDB URI:', process.env.MONGODB_URI);
});

app.get('/about', (req, res) => {
    res.send('This is about page');
    console.log('MongoDB URI:', process.env.MONGODB_URI);
});

// Route for fetching hostel info by name
app.get('/hostel/:name', (req, res) => {
    const hostelName = req.params.name;
    const hostel = hostelCache.find(h => h.name === hostelName);
    if (hostel) {
        res.json(hostel);
    } else {
        res.status(404).send('Hostel not found');
    }
});

// Route to get limited hostel data from cache with pagination
app.get('/hostel-data', (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the page number from query parameter
    const limit = parseInt(req.query.limit) || 5; // Get the limit from query parameter
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    // Calculate total number of hostels from the cache
    const totalHostels = hostelCache.length;

    // Slice the cached data to get the current page of hostels
    const hostels = hostelCache.slice(skip, skip + limit);

    res.json({
        totalPages: Math.ceil(totalHostels / limit),
        currentPage: page,
        hostels
    });
});

// Route to filter hostels by category and rating
app.get('/hostels', (req, res) => {
    const { category, rating } = req.query;

    // Filter the cached hostels based on query parameters
    let filteredHostels = hostelCache;

    if (category) {
        filteredHostels = filteredHostels.filter(h => h.category === category);
        console.log(`Filtering by category: ${category}`);
    }

    if (rating) {
        const parsedRating = parseFloat(rating);
        if (!isNaN(parsedRating)) {
            filteredHostels = filteredHostels.filter(h => h.rating >= parsedRating);
            console.log(`Filtering by rating: ${parsedRating}`);
        } else {
            console.warn(`Invalid rating value provided: ${rating}`);
            return res.status(400).json({ message: 'Invalid rating value provided' });
        }
    }

    console.log(`Found ${filteredHostels.length} hostels matching the query.`);
    res.json(filteredHostels);
});

// Route for search requests
app.post('/search', (req, res) => {
    const { query } = req.body;

    // Filter hostels based on search query from cache
    const searchResults = hostelCache.filter(h =>
        h.location.match(new RegExp(query, 'i')) || h.name.match(new RegExp(query, 'i'))
    );

    res.json(searchResults);
});

// Route to get a limited number of hostels from cache
app.get('/hostel-limit', (req, res) => {
    const limit = parseInt(req.query.limit) || 5;
    const limitedHostels = hostelCache.slice(0, limit);
    res.json(limitedHostels);
});

// Start the server
app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
});
