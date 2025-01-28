import React, { useState } from "react";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// PDF Template Component
const CVTemplate = ({ data }) => {
    const styles = StyleSheet.create({
        page: { padding: 40, fontSize: 12, fontFamily: "Helvetica" },
        header: { fontSize: 18, marginBottom: 10, textAlign: "center", fontWeight: "bold" },
        section: { marginBottom: 20 },
        title: { fontSize: 14, fontWeight: "bold", marginBottom: 5, textDecoration: "underline" },
        text: { marginBottom: 2 },
        list: { marginLeft: 10 },
        listItem: { marginBottom: 2 },
    });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header Section */}
                <View style={styles.header}>
                    <Text>{data.fullName || "name"}</Text>
                </View>

                {/* Contact Information */}
                <View style={styles.section}>
                    <Text style={styles.title}>Contact Information</Text>
                    <Text>Email: {data.email || "example@huzaifa.com"}</Text>
                    <Text>Phone: {data.phone || "+92 123 456 7890"}</Text>
                    <Text>LinkedIn: {data.linkedin || "linkedin.com"}</Text>
                    <Text>GitHub: {data.github || "github.com"}</Text>
                    <Text>Address: {data.address || "Your Address"}</Text>
                </View>

                {/* Education Section */}
                <View style={styles.section}>
                    <Text style={styles.title}>Education</Text>
                    <Text style={styles.text}>{data.degree || ""} - {data.institution || "XYZ University"} ({data.graduationYear || ""})</Text>
                    <Text style={styles.text}>CGPA: {data.cgpa || ""}</Text>
                    <Text style={styles.text}>Key Courses: {data.keyCourses || ""}</Text>
                </View>

                {/* Work Experience Section */}
                <View style={styles.section}>
                    <Text style={styles.title}>Work Experience</Text>
                    <Text style={styles.text}>
                        <Text style={{ fontWeight: "bold" }}>{data.jobTitle || ""}</Text> - {data.company || "ABC tech"} ({data.duration || "2024"})
                    </Text>
                    <Text style={styles.text}>- {data.experience1 || "."}</Text>
                    <Text style={styles.text}>- {data.experience2 || "."}</Text>
                </View>

                {/* Projects Section */}
                <View style={styles.section}>
                    <Text style={styles.title}>Projects</Text>
                    <Text style={styles.text}>
                        <Text style={{ fontWeight: "bold" }}>{data.project1 || "  "}</Text>
                    </Text>
                    <Text style={styles.text}>
                        - {data.projectDescription1 || "."}
                    </Text>
                    <Text style={styles.text}>
                        <Text style={{ fontWeight: "bold" }}>{data.project2 || ""}</Text>
                    </Text>
                    <Text style={styles.text}>{data.projectDescription2 || ""}</Text>
                </View>

                {/* Skills Section */}
                <View style={styles.section}>
                    <Text style={styles.title}>Skills</Text>
                    <View style={styles.list}>
                        {data.skills.split(',').map((skill, index) => (
                            <Text key={index} style={styles.listItem}>- {skill.trim()}</Text>
                        ))}
                    </View>
                </View>

                {/* Interests Section */}
                <View style={styles.section}>
                    <Text style={styles.title}>Interests</Text>
                    <Text style={styles.text}>- {data.interests1 || ""}</Text>
                    <Text style={styles.text}>- {data.interests2 || ""}</Text>
                    <Text style={styles.text}>- {data.interests3 || ""}</Text>
                </View>
            </Page>
        </Document>
    );
};

// Main Form Component
const CVForm = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        jobTitle: "",
        company: "",
        duration: "",
        degree: "",
        institution: "",
        graduationYear: "",
        cgpa: "",
        keyCourses: "",
        experience1: "",
        experience2: "",
        project1: "",
        projectDescription1: "",
        project2: "",
        projectDescription2: "",
        skills: "",
        interests1: "",
        interests2: "",
        interests3: "",
        linkedin: "",
        github: "",
    });

    const [isGenerated, setIsGenerated] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-6">
            <div className="max-w-[768px] w-full p-6 bg-white rounded-xl shadow-md flex flex-col gap-6">
                <h1 className="text-2xl font-bold text-[#001b1c]">Create Your CV</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    setIsGenerated(true);
                }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Details */}
                    <div className="col-span-2">
                        <h2 className="text-lg font-semibold text-gray-800">Personal Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            {["fullName", "email", "phone", "address"].map((field, index) => (
                                <div key={index}>
                                    <label className="block text-sm font-medium text-gray-600">
                                        {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                                    </label>
                                    <input
                                        name={field}
                                        type={field === "email" ? "email" : "text"}
                                        className="w-full p-3 border border-gray-300 rounded-lg"
                                        placeholder={`Enter your ${field}`}
                                        value={formData[field]}
                                        onChange={handleChange}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Work Experience */}
                    <div className="col-span-2">
                        <h2 className="text-lg font-semibold text-gray-800">Work Experience</h2>
                        {["jobTitle", "company", "duration"].map((field, index) => (
                            <input
                                key={index}
                                name={field}
                                type="text"
                                className={`w-full p-3 border border-gray-300 rounded-lg ${index > 0 ? "mt-4" : ""}`}
                                placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                                value={formData[field]}
                                onChange={handleChange}
                            />
                        ))}
                    </div>
                    <div className="col-span-2">
                        <h2 className="text-lg font-semibold text-gray-800">Education</h2>
                        {["degree", "institution", "graduationYear", "cgpa", "keyCourses"].map((field, index) => (
                            <input
                                key={index}
                                name={field}
                                type="text"
                                className={`w-full p-3 border border-gray-300 rounded-lg ${index > 0 ? "mt-4" : ""}`}
                                placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                                value={formData[field]}
                                onChange={handleChange}
                            />
                        ))}
                    </div>

                    <div className="col-span-2">
                        <h2 className="text-lg font-semibold text-gray-800">Skills</h2>
                        <textarea
                            name="skills"
                            rows="4"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            placeholder="List your skills separated by commas"
                            value={formData.skills}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div className="col-span-2">
                        <h2 className="text-lg font-semibold text-gray-800">Interests</h2>
                        {["interests1", "interests2", "interests3"].map((field, index) => (
                            <input
                                key={index}
                                name={field}
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg mt-4"
                                placeholder={`Enter your interest ${index + 1}`}
                                value={formData[field]}
                                onChange={handleChange}
                            />
                        ))}
                    </div>

                    {/* LinkedIn and GitHub */}
                    <div className="col-span-2">
                        <h2 className="text-lg font-semibold text-gray-800">Social Links</h2>
                        {["linkedin", "github"].map((field, index) => (
                            <input
                                key={index}
                                name={field}
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg mt-4"
                                placeholder={`Enter your ${field} URL`}
                                value={formData[field]}
                                onChange={handleChange}
                            />
                        ))}
                    </div>

                    <div className="col-span-2 flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 mr-1"
                        >
                            Generate CV
                        </button>
                        {isGenerated && (
                            <>
                                <PDFDownloadLink
                                    document={<CVTemplate data={formData} />}
                                    fileName="cv.pdf"
                                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 "
                                >
                                    Download CV
                                </PDFDownloadLink>
                            </>
                        )}
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CVForm;
