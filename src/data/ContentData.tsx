import React from 'react';
import { Briefcase, Code, Award, GraduationCap, Database, Terminal, Layers, Cpu, Shield, Layout, Zap } from 'lucide-react';

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
    proficiency: number; // 1-100
    icon: React.ReactNode;
  }[];
}

export const contentData: ContentData = {
  heroSections: [
    {
      id: 1,
      threshold: 0,
      text: "RAHUL SINGH. Engineering the Intelligent Enterprise.",
      subtextText: "SAP ABAP Lead | S/4HANA Migration & HANA Remediation Specialist"
    },
    {
      id: 2,
      threshold: 30,
      text: "Leading S/4HANA Migrations at Accenture. From Legacy to Cloud.",
      subtextText: "Software Development Lead | Optimization & Modernization Consultant"
    },
    {
      id: 3,
      threshold: 60,
      text: "SAP Certified Back-End Developer (ABAP Cloud). Precision at Scale.",
      subtextText: "CDS Views · RAP · OData mastery for modern digital cores"
    }
  ],
  projects: [
    {
      id: 'smartshift',
      title: "SmartShift Automation Tool",
      description: "Collaborated with SmartShift team to develop automation tools that streamline and enhance SAP business activities, specifically for S/4HANA migration workstreams.",
      tags: ["SAP ABAP", "SmartShift", "S/4HANA"],
      metrics: "Enterprise-wide adoption"
    },
    {
      id: 'traceability',
      title: "Traceability Report Development",
      description: "Engineered a custom reporting suite to simplify complex business processes, providing vital summary data on order/delivery information per business user requests.",
      tags: ["Business Process", "Reporting", "Analytics"],
      metrics: "Streamlined operational visibility"
    },
    {
      id: 'email-bol',
      title: "US Email Automation - BOL & Packing Slip",
      description: "Led the assessment and enhancement of email automation for Bill of Lading and packing slip outputs, consolidating multiple POs/DNs into a single document flow.",
      tags: ["Email Automation", "BOL", "Consolidation Logic"],
      metrics: "Optimized logistics communication"
    },
    {
      id: 'lt03-enhancement',
      title: "LT03 Transaction Enhancement",
      description: "Designed an end-to-end customized solution for LT03 transaction limitations, significantly improving manual entry flows for complex warehouse operations.",
      tags: ["SAP Transaction", "POC", "Custom T-Codes"],
      metrics: "Enhanced warehouse efficiency"
    },
    {
      id: 'copa-reconciliation',
      title: "COPA Report Reconciliation",
      description: "Architected a reconciliation solution to fetch frozen index data and calculate FI, COPA, and Statistical values based on post-posting background job processing.",
      tags: ["FI", "COPA", "Background Jobs"],
      metrics: "100% Financial accuracy"
    }
  ],
  stats: [
    {
      label: "INSTA Rewards (Infosys)",
      value: "16 Consecutive",
      icon: <Award className="text-royal-indigo" size={24} />
    },
    {
      label: "Unit Rise Award",
      value: "Rookie of the Quarter",
      icon: <Award className="text-vibrant-cyan" size={24} />
    },
    {
      label: " SAP ABAP Cloud Consultant",
      value: " SAP Certified",
      icon: <Shield size={24} className="text-royal-indigo" />
    },
    {
      label: "SAP Experience",
      value: "5+ Years",
      icon: <Briefcase className="text-electric-blue" size={24} />
    }
  ],
  skills: [
    { name: "RAP", proficiency: 94, icon: <Terminal size={24} /> },
    { name: "CDS Views", proficiency: 98, icon: <Layers size={24} /> },
    { name: "OData Services", proficiency: 92, icon: <Database size={24} /> },
    { name: "ABAP Cloud", proficiency: 96, icon: <Cpu size={24} /> },
    { name: "AMDP", proficiency: 88, icon: <Shield size={24} /> },
    { name: "SAP Fiori", proficiency: 85, icon: <Layout size={24} /> },
  ]
};
