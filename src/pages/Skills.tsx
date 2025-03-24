import React, { useState } from 'react';
import { Brain, Award, TrendingUp, ExternalLink } from 'lucide-react';

interface Course {
  id: number;
  name: string;
  provider: string;
  url: string;
  description: string;
}

interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  expiryDate: string;
  credentialId: string;
  url?: string;
}

const certifications: Certification[] = [
  {
    id: 1,
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023-12-15",
    expiryDate: "2026-12-15",
    credentialId: "AWS-123456",
    url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/"
  },
  {
    id: 2,
    name: "Professional Scrum Master I",
    issuer: "Scrum.org",
    date: "2023-08-20",
    expiryDate: "2025-08-20",
    credentialId: "PSM-987654",
    url: "https://www.scrum.org/professional-scrum-certifications"
  },
  {
    id: 3,
    name: "Google Cloud Professional Developer",
    issuer: "Google Cloud",
    date: "2024-01-10",
    expiryDate: "2027-01-10",
    credentialId: "GCP-456789",
    url: "https://cloud.google.com/certification/cloud-developer"
  }
];

const courses: Course[] = [
  {
    id: 1,
    name: "Advanced React Patterns",
    provider: "Frontend Masters",
    url: "https://frontendmasters.com/courses/advanced-react-patterns/",
    description: "Learn advanced React patterns and best practices"
  },
  {
    id: 2,
    name: "TypeScript Essential Training",
    provider: "LinkedIn Learning",
    url: "https://www.linkedin.com/learning/typescript-essential-training",
    description: "Master TypeScript fundamentals and advanced concepts"
  },
  {
    id: 3,
    name: "Node.js Advanced Concepts",
    provider: "Udemy",
    url: "https://www.udemy.com/course/advanced-node-for-developers",
    description: "Deep dive into Node.js internals and advanced features"
  }
];

const skillCategories = [
  {
    name: 'Technical Skills',
    skills: [
      { name: 'React', level: 85 },
      { name: 'Node.js', level: 75 },
      { name: 'TypeScript', level: 80 },
      { name: 'Python', level: 70 },
    ],
  },
  {
    name: 'Soft Skills',
    skills: [
      { name: 'Communication', level: 90 },
      { name: 'Leadership', level: 85 },
      { name: 'Problem Solving', level: 88 },
      { name: 'Teamwork', level: 92 },
    ],
  },
];

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState(skillCategories[0]);
  const [editingSkill, setEditingSkill] = useState<string | null>(null);
  const [skillLevels, setSkillLevels] = useState(
    skillCategories.reduce((acc, category) => {
      category.skills.forEach(skill => {
        acc[skill.name] = skill.level;
      });
      return acc;
    }, {} as Record<string, number>)
  );

  const handleSkillUpdate = (skillName: string, newLevel: number) => {
    setSkillLevels(prev => ({
      ...prev,
      [skillName]: newLevel
    }));
    setEditingSkill(null);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Skills Assessment</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Brain className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Skills</p>
              <p className="text-2xl font-semibold text-gray-900">24</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Award className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Certifications</p>
              <p className="text-2xl font-semibold text-gray-900">{certifications.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Growth Areas</p>
              <p className="text-2xl font-semibold text-gray-900">5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Professional Certifications</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <div key={cert.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-medium text-lg text-gray-900">{cert.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{cert.issuer}</p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Issued: {new Date(cert.date).toLocaleDateString()}</p>
                <p>Expires: {new Date(cert.expiryDate).toLocaleDateString()}</p>
                <p>Credential ID: {cert.credentialId}</p>
              </div>
              {cert.url && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-3 text-indigo-600 hover:text-indigo-800"
                >
                  View Certificate <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Skills Assessment */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {skillCategories.map((category) => (
              <button
                key={category.name}
                className={`py-4 px-6 text-sm font-medium ${
                  selectedCategory.name === category.name
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {selectedCategory.skills.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                  {editingSkill === skill.name ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={skillLevels[skill.name]}
                        onChange={(e) => {
                          const value = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
                          handleSkillUpdate(skill.name, value);
                        }}
                        className="w-16 px-2 py-1 border rounded"
                      />
                      <button
                        onClick={() => handleSkillUpdate(skill.name, skillLevels[skill.name])}
                        className="text-sm text-indigo-600 hover:text-indigo-800"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-500">{skillLevels[skill.name]}%</span>
                      <button
                        onClick={() => setEditingSkill(skill.name)}
                        className="text-sm text-gray-500 hover:text-gray-700"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-indigo-600 rounded-full transition-all duration-300"
                    style={{ width: `${skillLevels[skill.name]}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Courses */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Recommended Courses</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-medium text-lg text-gray-900">{course.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{course.provider}</p>
              <p className="text-sm text-gray-700 mb-4">{course.description}</p>
              <a
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
              >
                View Course <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;