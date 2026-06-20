import { Heart, Activity, Stethoscope, Microscope, Pill, Baby, UserPlus, PhoneCall, Syringe, Ambulance, Users, HeartPulse } from "lucide-react";

export type ServiceCategory = "All Services" | "Diagnostics" | "Treatment & Care" | "Surgery" | "Wellness" | "Support Services";

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: ServiceCategory;
  Icon: React.ElementType;
}

export const servicesData: ServiceItem[] = [
  {
    id: 1,
    title: "Advanced Diagnostics",
    description: "Accurate and fast diagnostic services using the latest imaging and laboratory technology.",
    image: "/images/services/service_1.jpg",
    category: "Diagnostics",
    Icon: Activity
  },
  {
    id: 2,
    title: "Outpatient Care",
    description: "Comprehensive outpatient services with expert consultation and personalized treatment.",
    image: "/images/services/service_2.jpg",
    category: "Treatment & Care",
    Icon: Stethoscope
  },
  {
    id: 3,
    title: "Surgical Services",
    description: "Advanced surgical procedures performed by experienced surgeons in modern theaters.",
    image: "/images/services/service_3.jpg",
    category: "Surgery",
    Icon: Syringe
  },
  {
    id: 4,
    title: "Inpatient Care",
    description: "Comfortable and well-equipped rooms with round-the-clock medical attention.",
    image: "/images/services/service_4.jpg",
    category: "Treatment & Care",
    Icon: Heart
  },
  {
    id: 5,
    title: "Cardiac Care",
    description: "Comprehensive heart care services including diagnostics, treatment and rehabilitation.",
    image: "/images/services/service_5.jpg",
    category: "Treatment & Care",
    Icon: HeartPulse
  },
  {
    id: 6,
    title: "Laboratory Services",
    description: "Reliable and timely lab tests with precise results for accurate diagnosis.",
    image: "/images/services/service_6.jpg",
    category: "Diagnostics",
    Icon: Microscope
  },
  {
    id: 7,
    title: "Physiotherapy",
    description: "Personalized physiotherapy and rehabilitation programs for faster recovery.",
    image: "/images/services/service_7.jpg",
    category: "Wellness",
    Icon: UserPlus
  },
  {
    id: 8,
    title: "Pharmacy Services",
    description: "Wide range of medicines available 24/7 with expert guidance from our pharmacists.",
    image: "/images/services/service_8.jpg",
    category: "Support Services",
    Icon: Pill
  },
  {
    id: 9,
    title: "Maternity & Women Care",
    description: "Complete care for women through every stage of pregnancy and beyond.",
    image: "/images/services/service_9.jpg",
    category: "Treatment & Care",
    Icon: Baby
  },
  {
    id: 10,
    title: "Pediatric Care",
    description: "Specialized healthcare for infants, children and adolescents.",
    image: "/images/services/service_10.jpg",
    category: "Treatment & Care",
    Icon: Users
  },
  {
    id: 11,
    title: "Elderly Care",
    description: "Compassionate care for senior citizens with specialized medical attention.",
    image: "/images/services/service_11.jpg",
    category: "Treatment & Care",
    Icon: Users
  },
  {
    id: 12,
    title: "Emergency Services",
    description: "24/7 emergency care and ambulance services for critical situations.",
    image: "/images/services/service_12.jpg",
    category: "Support Services",
    Icon: Ambulance
  }
];
