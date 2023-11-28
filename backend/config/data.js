//model product properties.
// 1. name
// 2. price
// 3. description
// 4. ratings
// 4. images (public_id, url)
// 5. category
// 6. seller
// 7. stock
// 8. numOfReviews
// 9. reviews ([name,rating,coment])
// 10. createAt


const products = [
    {
        "name" : "SanDisk 256GB Ultra microSDXC UHS-I Memory Card with Adapter - Up to 150MB/s, C10, U1, Full HD, A1, MicroSD Card - SDSQUAC-256G-GN6MA",
        "price" : 17.99,
        "description": "Ideal storage for Android smartphones and tablets Up to 256GB to store even more hours of Full HD video (1GB=1,000,000,000 bytes. Actual user storage less." +
        "Full HD (1920x1080) video support may vary based upon host device, file attributes, and other factors. See official SanDisk website.)" +
        "Up to 150MB/s transfer speeds to move up to 1000 photos per minute (Up to 150MB/s read speed, engineered with proprietary technology to reach speeds beyond UHS-I 104MB/s," +
        "require compatible devices capable of reaching such speed. Based on internal testing; performance may be lower depending on host device, interface, usage conditions, " +
        "and other factors. 1MB=1,000,000 bytes. Based on internal testing on images with an average file size of 3.55MB (up to 3.7GB total) with USB 3.0 reader. Your results will" +
        "vary based on host device, file attributes, and other factors.) Load apps faster with A1-rated performance (A1 performance is 1500 read IOPS, 500 write IOPS. Based on internal" + 
        "testing. Results may vary based on host device, app type, and other factors.) Class 10 for Full HD video recording and playback (Full HD (1920x1080) video support may vary " +
        "based upon host device, file attributes, and other factors. See official SanDisk website.)",
        "ratings" : 4.5,
        "images" : [{
            "public_id" : "products/tzfsnrli3szdn4jgge",
            "url" : "https://res.cloudinary.com/dpsigbiwg/image/upload/v1699721599/sandisk_256_u1stxc.jpg"

        }],
        "category" : "Electronics",
        "seller" : "Fred Manrique",
        "numOfReviews" : 125,
        "reviews" : [],
        "stock" : 1580
    },
    {
        "name" : "Samsung 990 PRO 2TB PCIe 4.0 (up to 7450 MB/s) NVMe M.2 (2280) Internal Solid State Drive (SSD) (MZ-V9P2T0BW)",
        "price" : 138.15,
        "description": "Powerful NVMe SSD of the 4th PCI Express generation for demanding 4K video and 3D graphics editing and high-end" +
        "gaming. Stunning speed: read/write speeds up to 7450/6900 MB/s (2TB variant).  High reliability thanks to heat spreader " +
        "and dynamic thermal guard technology for protection against overheating as well as up to 1200 TB total bytes writing" +
        "Storage capacity of up to 2 TB in compact M.2 form factor (2280), suitable for high-performance PCs and ultrabooks." +
        "The free Samsung Magician software optimises performance for you and keeps the drive up to date with updates.",
        "ratings" : 5,
        "images" : [{
            "public_id" : "products/tz100dsdsdjgge",
            "url" : "https://res.cloudinary.com/dpsigbiwg/image/upload/v1699886857/shopit/ssd_p9ilij.jpg"

        }],
        "category" : "Electronics",
        "seller" : "John Wick",
        "numOfReviews" : 105,
        "reviews" : [],
        "stock" : 2004
    },
    
];

export default products