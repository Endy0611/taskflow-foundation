import React from "react";

export default function FeaturePage() {
    return (
        <div className="flex flex-col items-center w-full bg-gray-50">
            {/* Hero Section */}
            <section className="w-full max-w-7xl flex flex-col bg-gray-100 md:flex-row items-center justify-between px-6 md:px-12 py-16">
                <div className="max-w-xl space-y-6 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        Workspace
                    </h1>
                    <p className="text-gray-700 text-lg">
                        Create and manage workspaces, control visibility, and organize projects.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                            Try it’s for free!
                        </button>
                    </div>
                </div>
                <div className="mt-10 md:mt-0 flex justify-center">
                    <img
                        src="/workspace-hero.png"
                        alt="Workspace Illustration"
                        className="w-72 md:w-96 lg:w-[28rem]"
                    />
                </div>
            </section>

            {/* Dashboard Section */}
            <section className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-16 gap-10">
                <div className="md:w-1/2 flex justify-center">
                    <img
                        src="/dashboard.png"
                        alt="Dashboard Preview"
                        className="rounded-lg shadow-lg w-full max-w-md"
                    />
                </div>
                <div className="md:w-1/2 text-center md:text-left">
                    <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
                    <p className="text-gray-700">
                        Stay organized with your personal Dashboard, where all your tasks,
                        deadlines, and updates come together in one simple view, complete
                        with quick stats to track progress at a glance.
                    </p>
                </div>
            </section>

            {/* Project Management Section */}
            <section className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-16 gap-10">
                <div className="md:w-1/2 text-center md:text-left order-2 md:order-1">
                    <h2 className="text-3xl font-bold mb-4">Project Management</h2>
                    <p className="text-gray-700">
                        Stay focused with dashboards, task lists, and timelines that keep
                        your projects moving forward.
                    </p>
                </div>
                <div className="md:w-1/2 flex justify-center order-1 md:order-2">
                    <img
                        src="/project-management.png"
                        alt="Project Management"
                        className="rounded-lg shadow-lg w-full max-w-md"
                    />
                </div>
            </section>

            {/* Team Collaborators Section */}
            <section className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-16 gap-10">
                <div className="md:w-1/2 flex justify-center">
                    <img
                        src="/team-collaborators.png"
                        alt="Team Collaboration"
                        className="rounded-lg shadow-lg w-full max-w-md"
                    />
                </div>
                <div className="md:w-1/2 text-center md:text-left">
                    <h2 className="text-3xl font-bold mb-4">Team Collaborators</h2>
                    <p className="text-gray-700">
                        Add members to your workspace easily. Invite collaborators via email
                        or shareable link, and assign specific roles to control their access
                        and permissions.
                    </p>
                </div>
            </section>

            {/* Intuitive Organization Section */}
            <section className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-16 gap-10">
                <div className="md:w-1/2 text-center md:text-left order-2 md:order-1">
                    <h2 className="text-3xl font-bold mb-4">Intuitive organization</h2>
                    <p className="text-gray-700">
                        Clear out small to-dos right from your Inbox and keep your progress
                        moving forward.
                    </p>
                </div>
                <div className="md:w-1/2 flex justify-center order-1 md:order-2">
                    <img
                        src="/intuitive-organization.png"
                        alt="Intuitive Organization"
                        className="rounded-lg shadow-lg w-full max-w-md"
                    />
                </div>
            </section>


        </div>
    );
}
