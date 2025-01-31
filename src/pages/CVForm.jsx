import { useState } from "react";
import PropTypes from "prop-types";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const CVTemplate = ({ data }) => {
    const styles = StyleSheet.create({
        page: {
            padding: 40,
            fontSize: 12,
            fontFamily: "Helvetica",
            color: "#333"
        },

        header: {
            fontSize: 24,
            marginBottom: 10,
            textAlign: "center",
            fontWeight: "bold",
            textTransform: "uppercase",
            color: "#003366"
        },

        section: {
            marginBottom: 20,
            paddingBottom: 10,
            borderBottom: "1px solid #ccc"
        },

        title: {
            fontSize: 14,
            fontWeight: "bold",
            marginBottom: 5,
            color: "#003366",
            textTransform: "uppercase",
            borderBottom: "2px solid #003366",
            paddingBottom: 3
        },

        text: {
            marginBottom: 4,
            lineHeight: 1.5,
        },

        subText: {
            fontSize: 12,
            fontWeight: "bold",
            color: "#555",
            marginBottom: 2
        },

        list: {
            marginLeft: 10,
            marginTop: 5
        },

        listItem: {
            marginBottom: 4,
            fontSize: 12,
        },

        flexRow: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 5
        },

        highlight: {
            fontSize: 12,
            fontWeight: "bold",
            color: "#003366"
        }
    });


    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text>{data.fullName || "Name"}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>Contact Information</Text>
                    <Text>Email: {data.email || "example@huzaifa.com"}</Text>
                    <Text>Phone: {data.phone || "+92 123 456 7890"}</Text>
                    <Text>LinkedIn: {data.linkedin || "linkedin.com"}</Text>
                    <Text>GitHub: {data.github || "github.com"}</Text>
                    <Text>Address: {data.address || "Your Address"}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>Education</Text>
                    {data.education.map((edu, index) => (
                        <Text key={index} style={styles.text}>{edu.degree} - {edu.institution} ({edu.graduationYear})</Text>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>Work Experience</Text>
                    {data.experience.map((exp, index) => (
                        <Text key={index} style={styles.text}>{exp.jobTitle} at {exp.company} ({exp.duration})</Text>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>Skills</Text>
                    {data.skills.map((skill, index) => (
                        <Text key={index} style={styles.text}>- {skill}</Text>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>Interests</Text>
                    {data.interests.map((interest, index) => (
                        <Text key={index} style={styles.text}>- {interest}</Text>
                    ))}
                </View>
            </Page>
        </Document>
    );
};

const CVForm = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        linkedin: "",
        github: "",
        skills: [""],
        education: [{ degree: "", institution: "", graduationYear: "" }],
        experience: [{ jobTitle: "", company: "", duration: "" }],
        interests: [""],
    });

    const [isGenerated, setIsGenerated] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleArrayChange = (index, field, value, category) => {
        const updatedArray = [...formData[category]];
        updatedArray[index][field] = value;
        setFormData({ ...formData, [category]: updatedArray });
    };

    const handleInterestChange = (index, value) => {
        const updatedInterests = [...formData.interests];
        updatedInterests[index] = value;
        setFormData({ ...formData, interests: updatedInterests });
    };
    const handleSkillsChange = (index, value) => {
        const updatedSkills = [...formData.skills];
        updatedSkills[index] = value;
        setFormData({ ...formData, skills: updatedSkills });
    };

    const addField = (category, newField) => {
        setFormData({ ...formData, [category]: [...formData[category], newField] });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-6">
            <div className="max-w-[768px] w-full p-6 bg-white rounded-xl shadow-md flex flex-col gap-6">
                <h1 className="text-2xl font-bold text-[#001b1c] text-center">Create Your CV</h1>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        setIsGenerated(true);
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <h2 className="text-lg font-semibold text-gray-800 ">Personal Details</h2>
                    <div className=" grid col-span-2 grid-cols-2 gap-1">
                        {["fullName", "email", "phone", "address", "linkedin", "github"].map((field, index) => (
                            <input
                                key={index}
                                name={field}
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg mt-4"
                                placeholder={`Enter your ${field}`}
                                value={formData[field]}
                                onChange={handleChange}
                                required
                            />
                        ))}
                    </div>

                    <div className="col-span-2">
                        <h2 className="text-lg font-semibold text-gray-800">Work Experience</h2>
                        {formData.experience.map((exp, index) => (
                            <div key={index} className="mb-4">
                                {["jobTitle", "company", "duration"].map((field) => (
                                    <input
                                        key={field}
                                        type="text"
                                        placeholder={field}
                                        className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                                        value={exp[field]}
                                        onChange={(e) => handleArrayChange(index, field, e.target.value, "experience")}
                                        required
                                    />
                                ))}
                            </div>
                        ))}
                        <button type="button" className="text-white bg-blue-700 rounded-2xl p-2 mt-2" onClick={() => addField("experience", { jobTitle: "", company: "", duration: "" })}>
                            Add More
                        </button>
                    </div>

                    <div className="col-span-2">
                        <h2 className="text-lg font-semibold text-gray-800">Education</h2>
                        {formData.education.map((edu, index) => (
                            <div key={index} className="mb-4">
                                {["degree", "institution", "graduationYear"].map((field) => (
                                    <input
                                        key={field}
                                        type="text"
                                        placeholder={field}
                                        className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                                        value={edu[field]}
                                        onChange={(e) => handleArrayChange(index, field, e.target.value, "education")}
                                        required
                                    />
                                ))}
                            </div>
                        ))}
                        <button type="button" className="text-white bg-blue-700 rounded-2xl p-2 mt-2" onClick={() => addField("education", { degree: "", institution: "", graduationYear: "" })}>
                            Add More
                        </button>
                    </div>

                    <div className="col-span-2">
                        <h2 className="text-lg font-semibold text-gray-800">Interests</h2>
                        {formData.interests.map((interest, index) => (
                            <input
                                key={index}
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                                placeholder="Interest"
                                value={interest}
                                onChange={(e) => handleInterestChange(index, e.target.value)}
                                required
                            />
                        ))}
                        <button type="button" className="text-white bg-blue-700 rounded-2xl p-2 mt-2" onClick={() => addField("interests", "")}>
                            Add More
                        </button>
                    </div>
                    <div className="col-span-2">
                        <h2 className="text-lg font-semibold text-gray-800">Skills</h2>
                        {formData.skills.map((skills, index) => (
                            <input
                                key={index}
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                                placeholder="skills"
                                value={skills}
                                onChange={(e) => handleSkillsChange(index, e.target.value)}
                                required
                            />
                        ))}
                        <button type="button" className="text-white bg-blue-700 rounded-2xl p-2 mt-2" onClick={() => addField("skills", "")}>
                            Add More
                        </button>
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
CVTemplate.propTypes = {
    data: PropTypes.shape({
        fullName: PropTypes.string,
        email: PropTypes.string,
        phone: PropTypes.string,
        address: PropTypes.string,
        linkedin: PropTypes.string,
        github: PropTypes.string,
        skills: PropTypes.arrayOf(PropTypes.string),
        education: PropTypes.arrayOf(PropTypes.shape({
            degree: PropTypes.string,
            institution: PropTypes.string,
            graduationYear: PropTypes.string,
        })),
        experience: PropTypes.arrayOf(PropTypes.shape({
            jobTitle: PropTypes.string,
            company: PropTypes.string,
            duration: PropTypes.string,
        })),
        interests: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
};

export default CVForm;
