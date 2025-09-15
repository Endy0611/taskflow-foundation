// src/pages/AboutUs.jsx
import React, { useState } from "react";
import {
    FaGithub,
    FaLinkedin,
    FaFacebook,
    FaTwitter,
} from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";

const AboutUs = () => {
    // ======= Form State =======
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // You can replace with backend call
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    };

    // ======= Mentor Data =======
    const mentors = [
        {
            name: "Mr. Chan Chhaya",
            role: "Mentor",
            img: "src/assets/About/cher chhaya.png",
            github: "https://github.com/mentor1",
            linkedin: "https://linkedin.com/in/mentor1",
            email: "mailto:mentor1@email.com",
            quote: "Offer support in Java & API",
        },
        {
            name: "Ms. Srong Sokcheat",
            role: "Mentor",
            img: "src/assets/About/cher cheat.png",
            github: "https://github.com/mentor2",
            linkedin: "https://linkedin.com/in/mentor2",
            email: "mailto:mentor2@email.com",
            quote: "Offer support in Web Design",
        },
    ];

    // ======= Team Members Data =======
    const members = [
        {
            name: "Ms. Dorn Dana",
            role: "Web Design",
            img: "src/assets/About/dana.png",
            github: "#",
            linkedin: "#",
            email: "#",
            quote:
                "I am human compiler who turn nonsense requirements into broken code and pretend like I know why.",
        },
        {
            name: "Mr. Rith Saranamith",
            role: "Java App",
            img: "src/assets/About/Manith.png",
            github: "#",
            linkedin: "#",
            email: "#",
            quote:
                "Git commit messages should really just say: 'I have no idea what I'm doing, but it works.'",
        },
        {
            name: "Mr. Ong Endy",
            role: "Java App",
            img: "src/assets/About/endy.png",
            github: "#",
            linkedin: "#",
            email: "#",
            quote:
                "Coffee in one hand, confidence in the other, and a brilliant algorithm in my head. Error? No problem.",
        },
        {
            name: "Ms. Mon Sreynet",
            role: "Web Design",
            img: "src/assets/About/sreynet.png",
            github: "#",
            linkedin: "#",
            email: "#",
            quote:
                "My greatest achievement isn't the code I've written, but the problems I've solved from my coding.",
        },
        {
            name: "Ms. Tith Cholna",
            role: "Web Design",
            img: "src/assets/About/cholna.png",
            github: "#",
            linkedin: "#",
            email: "#",
            quote:
                "Dark mode isn’t just a feature... it’s how developers hide their tears in the UI.",
        },
        {
            name: "Lonh Raksmey",
            role: "Web Design",
            img: "src/assets/About/Smey.png",
            github: "#",
            linkedin: "#",
            email: "#",
            quote:
                "I am human compiler who turn nonsense requirements into broken code and then act like we know why.",
        },
    ];

    return (
        <div className="space-y-20 bg-white">
            {/* About Section */}
            <section className="bg-gray-50 py-16">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold text-gray-800 mb-6">
                            About <span className="text-blue-600">TaskFlow</span>
                        </h1>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            TaskFlow was founded with the belief that planning should never be
                            overwhelming. It started as a simple idea to help individuals or
                            teams track daily tasks more effectively.
                        </p>
                    </div>
                    <div className="flex-1">
                        <img
                            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop"
                            alt="Team collaboration"
                            className="rounded-lg shadow-lg w-full"
                        />
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1">
                        <img
                            src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop"
                            alt="Mission illustration"
                            className="w-full max-w-md mx-auto"
                        />
                    </div>
                    <div className="flex-1">
                        <p className="text-gray-600 text-lg leading-relaxed">
                            TaskFlow's vision is to make work organization simple, visual, and
                            powerful for everyone. We aim to create a platform where
                            individuals and teams can efficiently manage their workflows,
                            enabling them to focus on what truly matters: getting things done
                            and achieving success.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-blue-600 mb-12">
                        Contact Us
                    </h2>
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Get in Touch */}
                        <div className="flex-1 bg-gradient-to-br from-blue-100 to-purple-100 p-8 rounded-lg">
                            <h3 className="text-2xl font-bold text-orange-600 mb-6">
                                Get in Touch
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Feel free to reach out if you have any questions or need
                                assistance.
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-600 p-2 rounded-full">
                                        <FiMail className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Email Us</p>
                                        <p className="text-sm text-gray-600">taskflow@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-600 p-2 rounded-full">
                                        <FiPhone className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Call Us</p>
                                        <p className="text-sm text-gray-600">+855 12 345 78</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p className="font-semibold mb-3">Follow our social media</p>
                                <div className="flex gap-3">
                                    <FaFacebook className="text-blue-600 w-6 h-6 cursor-pointer hover:scale-110" />
                                    <FaTwitter className="text-blue-600 w-6 h-6 cursor-pointer hover:scale-110" />
                                    <FaLinkedin className="text-blue-600 w-6 h-6 cursor-pointer hover:scale-110" />
                                    <FaInstagram className="text-blue-600 w-6 h-6 cursor-pointer hover:scale-110" />
                                </div>
                            </div>
                        </div>

                        {/* Send Message Form */}
                        <div className="flex-1 bg-white p-8 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-bold text-orange-600 mb-6">
                                Send us a message
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                                <textarea
                                    name="message"
                                    placeholder="Message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                                ></textarea>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
                                >
                                    Send
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mentors Section */}
            <section className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-blue-600 mb-10">Our Mentors</h2>
                <div className="grid md:grid-cols-1 gap-10 max-w-5xl mx-auto">
                    {mentors.map((mentor, i) => (
                        <div
                            key={i}
                            className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-xl overflow-hidden"
                        >
                            {/* Image */}
                            <div className="w-full md:w-1/3 bg-blue-600 flex justify-center items-center p-6">
                                <img
                                    src={mentor.img}
                                    alt={mentor.name}
                                    className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-md"
                                />
                            </div>

                            {/* Info */}
                            <div className="w-full md:w-2/3 p-6 text-left">
                                <h3 className="text-2xl font-semibold text-blue-700">
                                    {mentor.name}
                                </h3>
                                <p className="text-gray-600">{mentor.role}</p>
                                <p className="mt-2 text-gray-500">{mentor.quote}</p>

                                {/* Links */}
                                <div className="mt-4 space-y-2">
                                    <p className="flex items-center text-gray-700">
                                        <FaGithub className="mr-2 text-blue-600" />
                                        <a href={mentor.github} target="_blank" rel="noreferrer">
                                            {mentor.github}
                                        </a>
                                    </p>
                                    <p className="flex items-center text-gray-700">
                                        <FiMail className="mr-2 text-blue-600" />
                                        <a href={mentor.email}>
                                            {mentor.email.replace("mailto:", "")}
                                        </a>
                                    </p>
                                    <p className="flex items-center text-gray-700">
                                        <FaLinkedin className="mr-2 text-blue-600" />
                                        <a href={mentor.linkedin} target="_blank" rel="noreferrer">
                                            {mentor.linkedin}
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Team Members Section */}
            <section className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-blue-600 mb-10">Team Members</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 justify-items-center">
                    {members.map((member, i) => (
                        <div
                            key={i}
                            className="relative bg-white rounded-xl shadow-lg p-6 text-left w-full max-w-md"
                        >
                            {/* Top Badge */}
                            <div className="absolute -top-3 left-0 bg-blue-600 text-white px-4 py-1 rounded-tr-xl rounded-bl-xl">
                                <h3 className="font-semibold text-sm">{member.name}</h3>
                                <p className="text-xs opacity-80">{member.role}</p>
                            </div>

                            {/* Quote */}
                            <p className="mt-10 italic text-gray-700">“ {member.quote} ”</p>

                            {/* Icons */}
                            <div className="flex gap-4 mt-6 text-xl text-blue-600">
                                <a href={member.github} target="_blank" rel="noreferrer">
                                    <FaGithub className="hover:scale-110 transition-transform" />
                                </a>
                                <a href={member.email} target="_blank" rel="noreferrer">
                                    <FiMail className="hover:scale-110 transition-transform" />
                                </a>
                                <a href={member.linkedin} target="_blank" rel="noreferrer">
                                    <FaLinkedin className="hover:scale-110 transition-transform" />
                                </a>
                            </div>

                            {/* Profile Pic */}
                            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full overflow-hidden border-4 border-orange-500 shadow-md">
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
