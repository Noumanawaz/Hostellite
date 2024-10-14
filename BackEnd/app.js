const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const port = 4000;
app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Define the MongoDB URI and connect
const mongoURI = 'mongodb://localhost:27017/hostels';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        prefetchHostelData(); // Prefetch hostel data after MongoDB connection is established
    })
    .catch(err => console.error('MongoDB connection error:', err));

// Update the schema to include 'category' and 'rating'
const hostelSchema = new mongoose.Schema({
    name: String,
    images: {
        type: [String], // Array of image URLs
    },
    location: String, // Single string for location
    description: String,
    category: { // New field for category (boys, girls, etc.)
        type: String,
        enum: ['boys', 'girls', 'co-ed'], // Define allowed categories
        required: true
    },
    rating: { // New field for rating
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
        hostelCache = await Hostel.find(); // Fetch all hostels and store in cache
        console.log('Hostel data pre-fetched and cached');
    } catch (error) {
        console.error('Error pre-fetching hostel data:', error);
    }
}

// Route for the home page
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Route for the about page
app.get('/about', (req, res) => {
    res.send('This is the About page');
});

// Route for hostel info page
app.get('/hostel/:name', (req, res) => {
    const hostelName = req.params.name;
    // Fetch hostel data by name
    const hostel = hostelCache.find(h => h.name === hostelName);
    if (hostel) {
        res.json(hostel);
    } else {
        res.status(404).send('Hostel not found');
    }
});

// Route to get limited hostel data from cache
app.get('/hostel-data', async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the page number from query parameter
    const limit = parseInt(req.query.limit) || 5; // Get the limit from query parameter
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    try {
        const totalHostels = await Hostel.countDocuments(); // Get total count of hostels
        const hostels = await Hostel.find().skip(skip).limit(limit); // Fetch limited hostels with skip

        res.json({
            totalPages: Math.ceil(totalHostels / limit),
            currentPage: page,
            hostels
        }); // Send the paginated hostel data as JSON
    } catch (error) {
        console.error('Error fetching hostel data:', error);
        res.status(500).json({ message: 'Error fetching hostel data', error });
    }
});

// New route to filter hostels by category and rating
app.get('/hostels', async (req, res) => {
    const { category, rating } = req.query; // Get category and rating from query parameters

    try {
        // Build the query dynamically based on provided filters
        let query = {};

        // Check if category is provided
        if (category) {
            query.category = category; // Use the provided category for filtering
            console.log(`Filtering by category: ${category}`); // Log the category filter
        }

        // Initialize sorting variable
        let sort = {};

        // Check if rating is provided
        if (rating) {
            if (rating === "low-to-high") {
                // If user wants to sort from low to high
                sort.rating = 1; // Ascending
                console.log('Sorting by rating: low-to-high');
            } else if (rating === "high-to-low") {
                // If user wants to sort from high to low
                sort.rating = -1; // Descending
                console.log('Sorting by rating: high-to-low');
            } else {
                // Filtering by rating, assuming we want to filter ratings >= provided number
                const parsedRating = parseFloat(rating);
                if (!isNaN(parsedRating)) {
                    query.rating = { $gte: parsedRating }; // Get hostels with a rating greater or equal to the provided rating
                    console.log(`Filtering by rating: ${parsedRating}`); // Log the rating filter
                } else {
                    console.warn(`Invalid rating value provided: ${rating}`); // Log a warning for invalid rating
                    return res.status(400).json({ message: 'Invalid rating value provided' });
                }
            }
        }

        console.log('Query:', query); // Log the constructed query

        // Fetch hostels based on filters
        const filteredHostels = await Hostel.find(query).sort(sort);

        // Log the number of results found
        console.log(`Found ${filteredHostels.length} hostels matching the query.`);

        res.json(filteredHostels); // Send filtered hostels as JSON
    } catch (error) {
        console.error('Error fetching filtered hostel data:', error);
        res.status(500).json({ message: 'Error fetching filtered hostel data', error });
    }
});

// New route to handle search requests
app.post('/search', async (req, res) => {
    const { query } = req.body; // Extract the search query from the request body

    try {
        // Perform search: partial match on location or name
        const searchResults = await Hostel.find({
            $or: [
                { location: { $regex: query, $options: 'i' } }, // Partial match for location (case-insensitive)
                { name: { $regex: query, $options: 'i' } } // Partial match for name (case-insensitive)
            ]
        });

        res.json(searchResults); // Send the search results as JSON
    } catch (error) {
        console.error('Error performing search:', error);
        res.status(500).json({ message: 'Error performing search', error });
    }
});

// Route to get a limited number of hostels from cache
app.get('/hostel-limit', (req, res) => {
    const limit = parseInt(req.query.limit) || 5; // Default to 5 if no limit is specified
    const limitedHostels = hostelCache.slice(0, limit); // Get the limited number of hostels
    res.json(limitedHostels);
});

app.listen(port, () => {

    console.log(`App is running on http://localhost:${port}`);
});
