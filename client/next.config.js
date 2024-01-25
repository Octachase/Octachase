/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: "http://localhost:8000/api/:path*", // Replace with your backend API URL
			},
		];
	},
	images: {
		domains: ["res.cloudinary.com", "procvcreator.s3.eu-north-1.amazonaws.com"],
	},
};

module.exports = nextConfig;
