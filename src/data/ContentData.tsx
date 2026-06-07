import React from 'react';
import { Briefcase, Award, Database, Terminal, Layers, Cpu, Shield, Layout } from 'lucide-react';

export interface ProjectCard {
  id: string;
  title: string;
  description: string;
  tags: string[];
  metrics?: string;
  link?: string;
}

export interface ContentData {
  heroSections: {
    id: number;
    threshold: number;
    text: string;
    subtextText: string;
  }[];
  projects: ProjectCard[];
  stats: {
    label: string;
    value: string;
    icon: React.ReactNode;
  }[];
  skills: {
    name: string;
    proficiency: number; // 1–100
    icon: React.ReactNode;
  }[];
}

export const contentData: ContentData = {
  heroSections: [
    {
      id: 1,
      threshold: 0,
      text: "RAHUL SINGH. SAP ABAP Lead.",
      subtextText: "S/4HANA Migration · HANA Remediation · ABAP Cloud"
    },
    {
      id: 2,
      threshold: 30,
      text: "5+ Years. Accenture & Infosys. Enterprise Scale.",
      subtextText: "Leading ECC to S/4HANA migrations for global clients"
    },
    {
      id: 3,
      threshold: 60,
      text: "SAP Certified ABAP Cloud Developer.",
      subtextText: "CDS Views · RAP · OData · BRF Plus · Adobe Forms"
    }
  ],
  projects: [
    {
      id: 'smartshift',
      title: "SmartShift Automation Tool",
      description: "Collaborated with the SmartShift team at Accenture to build automation tooling for S/4HANA migration workstreams — reducing manual ABAP remediation effort and accelerating code analysis across large legacy codebases.",
      tags: ["SAP ABAP", "SmartShift", "S/4HANA", "Automation"],
      metrics: "Reduced manual ABAP remediation time across migration workstream"
    },
    {
      id: 'traceability',
      title: "Traceability Report Suite",
      description: "Engineered a custom ALV-based reporting suite providing end-to-end order and delivery visibility. Consolidated data from multiple SAP modules into a single summary view for business users, eliminating cross-system lookups.",
      tags: ["ALV Reports", "Business Process", "Analytics", "SAP ABAP"],
      metrics: "Eliminated cross-system manual lookups for operations team"
    },
    {
      id: 'email-bol',
      title: "US Email Automation — BOL & Packing Slip",
      description: "Designed and implemented email automation for Bill of Lading and packing slip outputs, introducing consolidation logic to combine multiple POs and delivery notes into a single document flow for US logistics operations.",
      tags: ["Email Automation", "BOL", "SmartForms", "Consolidation Logic"],
      metrics: "Consolidated multi-PO/DN flows into single document dispatch"
    },
    {
      id: 'lt03-enhancement',
      title: "LT03 Transaction Enhancement",
      description: "Built an end-to-end custom solution addressing LT03 standard transaction limitations in a complex warehouse environment. Designed new T-code flow with validation logic, improving manual entry accuracy and operator throughput.",
      tags: ["SAP WM", "Custom T-Code", "Enhancement", "POC"],
      metrics: "Resolved long-standing transaction limitation for warehouse ops"
    },
    {
      id: 'copa-reconciliation',
      title: "COPA Report Reconciliation",
      description: "Architected a reconciliation program to fetch frozen index data and calculate FI, COPA, and Statistical values after background job posting. Eliminated manual reconciliation cycles and achieved full financial accuracy across reporting periods.",
      tags: ["FI/CO", "COPA", "Background Jobs", "Financial Reporting"],
      metrics: "100% financial accuracy — eliminated manual reconciliation cycles"
    }
  ],
  stats: [
    {
      label: "INSTA Peer Awards (Infosys)",
      value: "16 Consecutive",
      icon: <Award className="text-royal-indigo" size={24} />
    },
    {
      label: "Rookie of the Quarter",
      value: "FY24 & FY25",
      icon: <Award className="text-vibrant-cyan" size={24} />
    },
    {
      label: "SAP Certified Developer",
      value: "ABAP Cloud",
      icon: <Shield size={24} className="text-royal-indigo" />
    },
    {
      label: "SAP Consulting Experience",
      value: "5+ Years",
      icon: <Briefcase className="text-electric-blue" size={24} />
    }
  ],
  skills: [
    // Proficiency reflects honest senior-level self-assessment (not inflated to 95–98%)
    { name: "ABAP / ABAP 7.5", proficiency: 90, icon: <Terminal size={24} /> },
    { name: "CDS Views", proficiency: 88, icon: <Layers size={24} /> },
    { name: "RAP / ABAP Cloud", proficiency: 85, icon: <Cpu size={24} /> },
    { name: "OData Services", proficiency: 84, icon: <Database size={24} /> },
    { name: "SAP Fiori / UI5", proficiency: 78, icon: <Layout size={24} /> },
    { name: "AMDP / HANA SQL", proficiency: 80, icon: <Shield size={24} /> },
  ]
};
