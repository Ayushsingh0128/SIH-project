// Mock data for the Local Link platform

export const bhopalLocations = ["All", "Arera Colony", "MP Nagar", "Indrapuri", "Ashoka Garden", "BHEL", "Kolar Road", "Saket Nagar", "Gulmohar"];

export const services = [
    { name: 'Plumbers', description: 'Leaky faucet? Clogged drain? Find reliable plumbers for quick fixes.' },
    { name: 'Electricians', description: 'Safe and certified electricians for wiring, repairs, and installations.' },
    { name: 'Carpenters', description: 'Custom furniture, repairs, or installations by skilled carpenters.' },
    { name: 'Tiffin Services', description: 'Delicious, home-style meals delivered right to your doorstep.' },
    { name: 'PGs & Flats', description: 'Find safe and verified paying guest accommodations and flats for rent.' },
    { name: 'Cleaners', description: 'Professional cleaning services for a spotless home or office.' },
];

export const providers = [
    // Plumbers
    { id: 1, name: 'Ramesh Kumar', category: 'Plumbers', rating: 4, skills: 'Leak Repairs, CPVC Pipe Fitting (Standard & Premium fixes)', location: 'Arera Colony', address: 'Flat 12, Arera Colony, near SBI Bank', wage: 250, contact: '98260XXXXX', experience: '5 years', gender: 'Male', jobType: 'Full-time' },
    { id: 2, name: 'Suresh Singh', category: 'Plumbers', rating: 5, skills: 'Drain Cleaning, Modern Bathroom Fixture Installation', location: 'MP Nagar', address: 'Plot 8, Zone I, MP Nagar, opposite Jyoti Talkies', wage: 300, contact: '98260XXXXX', experience: '8 years', gender: 'Male', jobType: 'Full-time' },
    { id: 3, name: 'Amit Singh', category: 'Plumbers', rating: 4, skills: 'Pipe Installation, Emergency Leak Repair & Seepage Control', location: 'Kolar Road', address: 'Kolar main road, near Dmart Bhopal', wage: 280, contact: '98260XXXXX', experience: '3 years', gender: 'Male', jobType: 'Part-time' },
    { id: 4, name: 'Ravi Patel', category: 'Plumbers', rating: 4.5, skills: 'Tap Replacement, Instant/Gas Geyser Fitting', location: 'Ashoka Garden', address: 'House 19, Ashoka Garden, near Parihar Chouraha', wage: 350, contact: '98260XXXXX', experience: '6 years', gender: 'Male', jobType: 'Full-time' },
    { id: 22, name: 'Dinesh Yadav', category: 'Plumbers', rating: 4.5, skills: 'Water Tank & Pump Service, Underground Blockage Removal', location: 'BHEL', address: 'B-Sector, BHEL, near Jubilee Gate', wage: 400, contact: '98260XXXXX', experience: '10 years', gender: 'Male', jobType: 'Full-time' },
    { id: 23, name: 'Pramod Rai', category: 'Plumbers', rating: 5, skills: 'Bathroom & Kitchen Remodeling, Smart Pipe Relining', location: 'Saket Nagar', address: 'AIIMS road, near Saket market', wage: 550, contact: '98260XXXXX', experience: '15 years', gender: 'Male', jobType: 'Full-time' },
    { id: 24, name: 'Rajesh Sharma', category: 'Plumbers', rating: 4, skills: 'General Plumbing Maintenance, Quick Faucet Repair', location: 'Gulmohar', address: 'E-8 Extension, Gulmohar, near Aura Mall', wage: 220, contact: '98260XXXXX', experience: '2 years', gender: 'Male', jobType: 'Part-time' },
    { id: 25, name: 'Vijay Chandel', category: 'Plumbers', rating: 4.8, skills: 'Emergency 24/7 Pipe Burst & Flooding Repair', location: 'Arera Colony', address: 'E-7 Arera Colony, near 10 No. Market', wage: 600, contact: '98260XXXXX', experience: '9 years', gender: 'Male', jobType: 'Full-time' },

    // Electricians
    { id: 5, name: 'Amit Patel', category: 'Electricians', rating: 5, skills: 'Home Wiring, Smart Switch & Automation Setup', location: 'MP Nagar', address: 'Street 4, Zone II MP Nagar, near DB City Mall', wage: 450, contact: '98260XXXXX', experience: '7 years', gender: 'Male', jobType: 'Full-time' },
    { id: 6, name: 'Manoj Sharma', category: 'Electricians', rating: 4, skills: 'Appliance Repair, Load Capacity & Safety Checks', location: 'BHEL', address: 'C-Sector BHEL, near Piplani', wage: 350, contact: '98260XXXXX', experience: '4 years', gender: 'Male', jobType: 'Part-time' },
    { id: 7, name: 'Rahul Yadav', category: 'Electricians', rating: 5, skills: 'Full House Rewiring, Industrial AC Installation', location: 'Indrapuri', address: 'Indrapuri Sector A, near BHEL Gate 1', wage: 500, contact: '98260XXXXX', experience: '12 years', gender: 'Male', jobType: 'Full-time' },
    { id: 8, name: 'Pankaj Gupta', category: 'Electricians', rating: 4.5, skills: 'Ceiling Fan Repair, Heavy Inverter & Battery Setup', location: 'Arera Colony', address: 'E-1 Arera Colony, opposite Habibganj Station', wage: 380, contact: '98260XXXXX', experience: '6 years', gender: 'Male', jobType: 'Full-time' },
    { id: 26, name: 'Sumit Meena', category: 'Electricians', rating: 4, skills: 'Fuse & MCB Repair, New Meter Connection Setup', location: 'Gulmohar', address: 'Shapura road, Gulmohar market', wage: 300, contact: '98260XXXXX', experience: '3 years', gender: 'Male', jobType: 'Part-time' },
    { id: 27, name: 'Vikas Kushwah', category: 'Electricians', rating: 4.5, skills: 'Commercial Office Wiring, High-Res CCTV Installation', location: 'Kolar Road', address: 'Chuna Bhatti, near Kolar square', wage: 550, contact: '98260XXXXX', experience: '8 years', gender: 'Male', jobType: 'Full-time' },
    { id: 28, name: 'Lokesh Agrawal', category: 'Electricians', rating: 5, skills: 'Panel Board Upgrades, Solar Power Grid Wiring', location: 'MP Nagar', address: 'Zone I, near Manohar Dairy', wage: 600, contact: '98260XXXXX', experience: '15 years', gender: 'Male', jobType: 'Full-time' },

    // Carpenters
    { id: 9, name: 'Deepak Verma', category: 'Carpenters', rating: 4, skills: 'Furniture Making, Repairs (Teak, Sheesham wood)', location: 'Gulmohar', address: 'E-8 Gulmohar, near Shahpura Lake', wage: 400, contact: '98260XXXXX', experience: '5 years', gender: 'Male', jobType: 'Full-time' },
    { id: 10, name: 'Mohit Soni', category: 'Carpenters', rating: 4.5, skills: 'Modular Kitchen, Wardrobes (Engineered Wood & Mica)', location: 'Saket Nagar', address: 'Plot 45, Saket Nagar, near DRM Office', wage: 700, contact: '98260XXXXX', experience: '10 years', gender: 'Male', jobType: 'Full-time' },
    { id: 11, name: 'Arun Meena', category: 'Carpenters', rating: 5, skills: 'Custom Furniture, Antique Wood Polish & Lacquer', location: 'MP Nagar', address: 'Press Complex, Zone I MP Nagar', wage: 600, contact: '98260XXXXX', experience: '12 years', gender: 'Male', jobType: 'Full-time' },
    { id: 29, name: 'Ashish Chouhan', category: 'Carpenters', rating: 4, skills: 'Door & Window Installation, Home Decor Fitting', location: 'Arera Colony', address: 'E-6 Arera Colony, near Bittan Market', wage: 450, contact: '98260XXXXX', experience: '7 years', gender: 'Male', jobType: 'Part-time' },
    { id: 30, name: 'Gopal Lal', category: 'Carpenters', rating: 5, skills: 'Office Furniture, Commercial Partition Walls', location: 'Indrapuri', address: 'C-Sector Indrapuri, near Kalpana Nagar', wage: 800, contact: '98260XXXXX', experience: '20 years', gender: 'Male', jobType: 'Full-time' },
    { id: 31, name: 'Sanjay Prajapati', category: 'Carpenters', rating: 4.7, skills: 'Bed & Table Repair, Custom Shelving Units', location: 'BHEL', address: 'Govindpura Industrial Area', wage: 500, contact: '98260XXXXX', experience: '9 years', gender: 'Male', jobType: 'Full-time' },

    // Tiffin Services
    { id: 12, name: 'Sunita Devi', category: 'Tiffin Services', rating: 5, skills: 'North & South Indian, Home style oil-free daily meals', location: 'Indrapuri', address: 'Indrapuri C-Sector, near Career College', wage: 120, contact: '98260XXXXX', experience: '10 years', gender: 'Female', jobType: 'Full-time' },
    { id: 13, name: 'Madhuri Joshi', category: 'Tiffin Services', rating: 4.5, skills: 'Pure Vegetarian, Healthy Jain Satvik Food options', location: 'Arera Colony', address: 'E-7 Arera Colony, near Sai Mandir', wage: 150, contact: '98260XXXXX', experience: '7 years', gender: 'Female', jobType: 'Full-time' },
    { id: 14, name: 'Rajesh Tiffin Center', category: 'Tiffin Services', rating: 4, skills: 'Daily Office Lunch, Monthly Student Packages', location: 'MP Nagar', address: 'Chetak Bridge, near Chetak Chambers', wage: 100, contact: '98260XXXXX', experience: '5 years', gender: 'Male', jobType: 'Full-time' },
    { id: 32, name: 'Geeta Home Foods', category: 'Tiffin Services', rating: 5, skills: 'Healthy Low-Calorie Meals, Keto & Gym Diet Plans', location: 'Kolar Road', address: 'Kolar Road, near Sarvdharm colony', wage: 200, contact: '98260XXXXX', experience: '15 years', gender: 'Female', jobType: 'Part-time' },
    { id: 33, name: 'Bhojnalay', category: 'Tiffin Services', rating: 4.5, skills: 'Simple & Homely Unlimited Thali deals', location: 'BHEL', address: 'Piplani square, near BHEL market', wage: 90, contact: '98260XXXXX', experience: '8 years', gender: 'Male', jobType: 'Full-time' },
    { id: 34, name: 'Taste of Home', category: 'Tiffin Services', rating: 4.8, skills: 'Student Specials, Late Night Dinner Delivery', location: 'Saket Nagar', address: 'Saket Nagar main square', wage: 130, contact: '98260XXXXX', experience: '6 years', gender: 'Male', jobType: 'Part-time' },

    // PGs & Flats
    { id: 15, name: 'Sunrise Boys Hostel', category: 'PGs & Flats', rating: 4, skills: 'For Boys, All Meals Included, Shared Rooms', location: 'MP Nagar', address: 'Plot 12, Zone II, MP Nagar, near Chetak Bridge', wage: 300, contact: '98260XXXXX', experience: '3 years', gender: 'N/A', jobType: 'Full-time' },
    { id: 16, name: 'Priya Girls PG', category: 'PGs & Flats', rating: 5, skills: 'For Girls, AC Rooms, High Security Guard', location: 'Arera Colony', address: 'E-7/45, Arera Colony, near Sai Baba Board', wage: 400, contact: '98260XXXXX', experience: '5 years', gender: 'N/A', jobType: 'Full-time' },
    { id: 17, name: 'Independent 2 BHK Flat', category: 'PGs & Flats', rating: 4.5, skills: 'Co-living friendly, Fully Furnished options', location: 'Kolar Road', address: 'Chuna Bhatti Road, near Kolar Police Station', wage: 550, contact: '98260XXXXX', experience: '2 years', gender: 'N/A', jobType: 'Part-time' },
    { id: 18, name: 'Adarsh Boys PG', category: 'PGs & Flats', rating: 4, skills: 'For Boys, Walking distance to local Market', location: 'Saket Nagar', address: 'Plot 110, Saket Nagar, near AIIMS Hospital', wage: 250, contact: '98260XXXXX', experience: '4 years', gender: 'N/A', jobType: 'Full-time' },
    { id: 35, name: 'Star Living', category: 'PGs & Flats', rating: 4.5, skills: 'For Working Professionals, Single/Double Occupancy', location: 'Ashoka Garden', address: '80 Feet Road, near Ashoka Hotel', wage: 600, contact: '98260XXXXX', experience: '1 year', gender: 'N/A', jobType: 'Part-time' },
    { id: 36, name: 'Comfort Homes', category: 'PGs & Flats', rating: 4.2, skills: 'Family Apartments, Semi/Unfurnished configurations', location: 'Gulmohar', address: 'B-Sector, Gulmohar, near Trilanga', wage: 450, contact: '98260XXXXX', experience: '3 years', gender: 'N/A', jobType: 'Full-time' },

    // Cleaners
    { id: 19, name: 'Kiran Sharma', category: 'Cleaners', rating: 5, skills: 'Full Home Deep Cleaning, Organic Detergents', location: 'Gulmohar', address: 'Gulmohar Colony, opposite Aura Mall', wage: 200, contact: '98260XXXXX', experience: '6 years', gender: 'Female', jobType: 'Full-time' },
    { id: 20, name: 'Ravi Mishra', category: 'Cleaners', rating: 4.5, skills: 'Office Commercial Spaces, Fabric Sofa Shampooing', location: 'MP Nagar', address: 'Zone II MP Nagar, near Press Complex', wage: 350, contact: '98260XXXXX', experience: '8 years', gender: 'Male', jobType: 'Full-time' },
    { id: 21, name: 'Anjali Gupta', category: 'Cleaners', rating: 4, skills: 'Kitchen Degreasing, Complete Bathroom Sanitization', location: 'Ashoka Garden', address: 'Parihar Chouraha, Ashoka Garden', wage: 280, contact: '98260XXXXX', experience: '4 years', gender: 'Female', jobType: 'Part-time' },
    { id: 37, name: 'Spotless Services', category: 'Cleaners', rating: 5, skills: 'Carpet & Upholstery Steam Cleaning, Pest Control', location: 'BHEL', address: 'Jubilee Gate road, BHEL', wage: 450, contact: '98260XXXXX', experience: '10 years', gender: 'Male', jobType: 'Full-time' },
    { id: 38, name: 'Neat & Tidy Team', category: 'Cleaners', rating: 4, skills: 'Move-in/Move-out Deep Cleaning protocols', location: 'Indrapuri', address: 'Sector C, Indrapuri', wage: 300, contact: '98260XXXXX', experience: '5 years', gender: 'N/A', jobType: 'Full-time' },
    { id: 39, name: 'Bhopal Housekeeping', category: 'Cleaners', rating: 4.3, skills: 'Full House Vacuum Sanitization, Window Washing', location: 'Arera Colony', address: '10 No Market, Arera Colony', wage: 500, contact: '98260XXXXX', experience: '7 years', gender: 'N/A', jobType: 'Full-time' },
];

export const reviews = [
    { id: 1, name: 'Anjali S.', rating: 5, comment: 'Found an amazing electrician within minutes! The service was quick, professional, and very reliable. Highly recommend Local Link.' },
    { id: 2, name: 'Vikram Rathore', rating: 5, comment: 'The tiffin service I connected with is fantastic. Home-style food, delivered on time. It has made my life in Bhopal so much easier.' },
    { id: 3, name: 'Priya Sharma', rating: 4, comment: 'Good platform for finding local help. The plumber was skilled, though a bit late. Overall, a positive experience.' },
    { id: 4, name: 'Rohan Mehta', rating: 5, comment: 'I was struggling to find a decent PG. Local Link helped me find a verified and safe place near my college. Thank you!' },
    { id: 5, name: 'Sunita Patil', rating: 5, comment: 'The cleaning service was top-notch. The team was thorough and professional. My flat has never looked better.' },
    { id: 6, name: 'Amit Kumar', rating: 4, comment: 'The carpenter did a great job with my custom bookshelf. The quality is excellent.' },
    { id: 7, name: 'Sneha Gupta', rating: 5, comment: 'A lifesaver for anyone new to the city! All the essential contacts in one place. Very trustworthy.' },
    { id: 8, name: 'Deepak Verma', rating: 5, comment: 'Extremely satisfied with the electrician I hired through this app. He was knowledgeable and fixed the issue quickly.' },
    { id: 9, name: 'Kavita Singh', rating: 4, comment: 'The website is very easy to use. I found a great tiffin provider that offers healthy meals.' },
    { id: 10, name: 'Manish Joshi', rating: 5, comment: 'The plumber arrived on time and fixed my leak perfectly. The pricing was fair and transparent.' },
    { id: 11, name: 'Neha Desai', rating: 5, comment: 'Finding a flat in a new city is stressful, but Local Link made it seamless. The listings are genuine.' },
    { id: 12, name: 'Rajesh Nair', rating: 4, comment: 'Used the app to book a cleaner. They did a decent job.' },
    { id: 13, name: 'Pooja Agarwal', rating: 5, comment: 'Finally, a reliable service in Bhopal! I\'ve used it for a carpenter and a plumber, and both were excellent.' },
    { id: 14, name: 'Sameer Khan', rating: 5, comment: 'The best part is the verification. It gives you peace of mind knowing the service provider is reliable.' },
    { id: 15, name: 'Aditi Rao', rating: 4, comment: 'Good variety of services offered. The interface is clean and user-friendly.' },
];
